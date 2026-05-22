// ============================================================
// PDF UTILITY HELPERS — shared across PDF processing modules
// ============================================================

/**
 * Convert Uint8Array (pdf-lib output) to a Blob safely.
 * pdf-lib returns Uint8Array whose .buffer may be an ArrayBufferLike.
 * We always produce a fresh copy in a plain ArrayBuffer.
 */
export function uint8ToBlob(bytes: Uint8Array, mimeType: string): Blob {
  // Create a new Uint8Array from the data to ensure plain ArrayBuffer
  const copy = new Uint8Array(bytes);
  return new Blob([copy], { type: mimeType });
}

/** Convert Uint8Array to plain ArrayBuffer */
export function uint8ToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buf = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buf).set(bytes);
  return buf;
}
