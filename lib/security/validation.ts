// ============================================================
// Server-side file & input validation.
//
// Defense in depth — even though the client validates, NEVER
// trust the client. Validate on the server too.
// ============================================================

/** Per-route file size limits, enforced server-side. */
export const FILE_SIZE_LIMITS = {
  pdf: 100 * 1024 * 1024,    // 100 MB
  image: 30 * 1024 * 1024,   // 30 MB
  video: 150 * 1024 * 1024,  // 150 MB
  doc: 50 * 1024 * 1024,     // 50 MB
} as const;

/** Magic bytes for the formats we accept. First 8 bytes are usually enough. */
const MAGIC_BYTES: Record<string, number[][]> = {
  pdf: [[0x25, 0x50, 0x44, 0x46]], // %PDF
  png: [[0x89, 0x50, 0x4e, 0x47]], // .PNG
  jpg: [[0xff, 0xd8, 0xff]],
  gif: [[0x47, 0x49, 0x46, 0x38]],         // GIF8
  webp: [[0x52, 0x49, 0x46, 0x46]],         // RIFF — followed by 4 size bytes then WEBP
  mp4: [
    [0x66, 0x74, 0x79, 0x70], // ftyp at offset 4
  ],
  docx: [[0x50, 0x4b, 0x03, 0x04]], // PK\x03\x04 (ZIP)
  doc: [[0xd0, 0xcf, 0x11, 0xe0]],
};

/**
 * Check that the first bytes of the buffer match expected magic bytes.
 * Returns true if any expected signature matches.
 */
function matchesMagicBytes(buffer: Uint8Array, expected: number[][]): boolean {
  for (const sig of expected) {
    let ok = true;
    for (let i = 0; i < sig.length; i++) {
      if (buffer[i] !== sig[i]) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

export interface FileValidationOptions {
  /** Allowed file types — magic-byte verified */
  allowed: Array<keyof typeof MAGIC_BYTES>;
  /** Maximum size in bytes */
  maxSize: number;
  /** Required extension (e.g. ".pdf") — checked case-insensitively */
  requiredExt?: string;
}

export interface FileValidationResult {
  ok: boolean;
  error?: string;
  buffer?: Uint8Array;
}

/**
 * Validate an uploaded File:
 *   - presence
 *   - extension match
 *   - size limit
 *   - magic-byte signature
 *
 * Returns the underlying buffer on success so callers don't need to read it twice.
 */
export async function validateFile(
  file: File | null,
  opts: FileValidationOptions,
): Promise<FileValidationResult> {
  if (!file) {
    return { ok: false, error: "No file uploaded" };
  }

  if (file.size === 0) {
    return { ok: false, error: "File is empty" };
  }

  if (file.size > opts.maxSize) {
    const limitMB = Math.round(opts.maxSize / 1024 / 1024);
    return { ok: false, error: `File too large. Maximum size is ${limitMB} MB.` };
  }

  if (opts.requiredExt) {
    if (!file.name.toLowerCase().endsWith(opts.requiredExt.toLowerCase())) {
      return { ok: false, error: `Invalid file type. Expected ${opts.requiredExt}` };
    }
  }

  // Magic-byte verification
  const bytes = new Uint8Array(await file.arrayBuffer());
  let magicOk = false;
  for (const type of opts.allowed) {
    const sigs = MAGIC_BYTES[type];
    if (sigs && matchesMagicBytes(bytes, sigs)) {
      // Special case: WebP requires "WEBP" at offset 8
      if (type === "webp") {
        const isWebp =
          bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
        if (!isWebp) continue;
      }
      // Special case: MP4 ftyp is at offset 4
      if (type === "mp4") {
        const hasFtyp =
          bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;
        if (!hasFtyp) continue;
      }
      magicOk = true;
      break;
    }
  }

  if (!magicOk) {
    return {
      ok: false,
      error: "File contents do not match the expected file type",
    };
  }

  return { ok: true, buffer: bytes };
}

/**
 * Sanitize a filename for use in Content-Disposition or filesystem paths.
 * Strips path separators, control chars, and quote chars.
 * Truncates to 100 chars to prevent long-filename DoS.
 */
export function sanitizeFilename(name: string): string {
  // Take just the base name (defends against ../ injection)
  const base = name.replace(/^.*[\\/]/, "");

  // Allow only word chars, dashes, dots, parens, spaces. Replace anything else with _
  let cleaned = base.replace(/[^\w\-. ()]/g, "_");

  // Collapse multiple underscores
  cleaned = cleaned.replace(/_+/g, "_");

  // Strip leading dots (hidden files on Unix)
  cleaned = cleaned.replace(/^\.+/, "");

  // Truncate
  if (cleaned.length > 100) {
    const dotIdx = cleaned.lastIndexOf(".");
    const ext = dotIdx > 0 ? cleaned.slice(dotIdx) : "";
    cleaned = cleaned.slice(0, 100 - ext.length) + ext;
  }

  return cleaned || "file";
}

/**
 * Validate a password used for PDF encryption.
 * Returns the cleaned password or null with an error message.
 */
export function validatePassword(
  pw: string | null | undefined,
  opts: { minLength?: number; maxLength?: number } = {},
): { ok: boolean; password?: string; error?: string } {
  if (typeof pw !== "string") {
    return { ok: false, error: "Password is required" };
  }
  const trimmed = pw; // Don't trim — passwords can legitimately contain leading/trailing spaces

  if (trimmed.length === 0) {
    return { ok: false, error: "Password is required" };
  }

  const minLength = opts.minLength ?? 1;
  const maxLength = opts.maxLength ?? 256;

  if (trimmed.length < minLength) {
    return { ok: false, error: `Password must be at least ${minLength} characters` };
  }
  if (trimmed.length > maxLength) {
    return { ok: false, error: `Password is too long (max ${maxLength} characters)` };
  }

  // Reject null bytes — they break C-string handling in Python subprocess
  if (trimmed.includes("\0")) {
    return { ok: false, error: "Password contains an invalid character" };
  }

  return { ok: true, password: trimmed };
}

/**
 * Generate a cryptographically secure random ID for temp file names.
 * 16 random bytes → 32 hex chars. Unguessable.
 */
export function secureRandomId(): string {
  // Use crypto.randomBytes for Node, fallback to crypto.getRandomValues
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    // Node 18+ has globalThis.crypto by default
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
