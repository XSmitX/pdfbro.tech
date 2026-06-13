// ============================================================
// /api/unlock/pdf — Remove password from a user-owned PDF.
//
// Security model:
//   - Rate limited (10/min, 100/hour per IP)
//   - Origin restricted (allowed domains only)
//   - File validated by magic bytes + size limit
//   - Password validated (no null bytes, length checks)
//   - Python invoked via spawn() with ARGS ARRAY — never shell
//   - Temp files in isolated directory with random IDs
//   - Generic error messages (no stderr leakage to client)
// ============================================================

import { NextResponse, type NextRequest } from "next/server";
import { spawn } from "child_process";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import os from "os";
import { guardApiRequest, genericErrorResponse } from "@/lib/security/apiGuard";
import {
  validateFile,
  validatePassword,
  sanitizeFilename,
  secureRandomId,
  FILE_SIZE_LIMITS,
} from "@/lib/security/validation";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const PDFBRO_TMP = path.join(os.tmpdir(), "pdfbro");

export async function POST(req: NextRequest) {
  // ── Security guard (CORS + rate limit) ──
  const guard = await guardApiRequest(req);
  if (guard.response) return guard.response;
  const respHeaders = guard.responseHeaders;

  let inputPath = "";
  let outputPath = "";

  try {
    // Ensure isolated temp directory exists
    if (!existsSync(PDFBRO_TMP)) {
      await mkdir(PDFBRO_TMP, { recursive: true, mode: 0o700 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawPassword = formData.get("password");

    // Validate file (magic bytes + size + extension)
    const fileCheck = await validateFile(file, {
      allowed: ["pdf"],
      maxSize: FILE_SIZE_LIMITS.pdf,
      requiredExt: ".pdf",
    });
    if (!fileCheck.ok) {
      return genericErrorResponse(fileCheck.error!, 400, respHeaders);
    }

    // Validate password (length, no null bytes)
    const pwCheck = validatePassword(typeof rawPassword === "string" ? rawPassword : null, {
      minLength: 1,
      maxLength: 256,
    });
    if (!pwCheck.ok) {
      return genericErrorResponse(pwCheck.error!, 400, respHeaders);
    }

    // Locate Python script
    const scriptPath = path.join(process.cwd(), "scripts", "unlock_pdf.py");
    if (!existsSync(scriptPath)) {
      return genericErrorResponse(
        "Unlock service is temporarily unavailable",
        503,
        respHeaders,
      );
    }

    // Write input file with unguessable filename
    const id = secureRandomId();
    inputPath = path.join(PDFBRO_TMP, `unlock_${id}.pdf`);
    outputPath = path.join(PDFBRO_TMP, `unlock_${id}_out.pdf`);
    await writeFile(inputPath, fileCheck.buffer!, { mode: 0o600 });

    const result = await runPython(scriptPath, inputPath, outputPath, pwCheck.password!);

    if (!result.success) {
      // Don't leak Python stderr to clients. Map known errors to clean messages.
      const safe = mapPythonError(result.error);
      return genericErrorResponse(safe, 400, respHeaders);
    }

    if (!existsSync(outputPath)) {
      return genericErrorResponse("Unlock failed. Verify the password is correct.", 400, respHeaders);
    }

    const unlockedBytes = await readFile(outputPath);
    const safeName = sanitizeFilename(file!.name.replace(/\.pdf$/i, "")) + "_unlocked.pdf";

    return new NextResponse(unlockedBytes, {
      status: 200,
      headers: {
        ...respHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": String(unlockedBytes.length),
      },
    });
  } catch (err) {
    // Log internally, return generic message externally
    if (process.env.NODE_ENV !== "production") {
      console.error("[unlock/pdf]", err);
    }
    return genericErrorResponse("Unable to process the PDF", 500, respHeaders);
  } finally {
    // Always clean up temp files, even on error
    if (inputPath) { try { await unlink(inputPath); } catch {} }
    if (outputPath) { try { await unlink(outputPath); } catch {} }
  }
}

/**
 * Run the Python unlock script SAFELY using spawn with an args array.
 * No string concatenation, no shell — completely immune to injection.
 */
function runPython(
  scriptPath: string,
  inputPath: string,
  outputPath: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const child = spawn("python", [scriptPath, inputPath, outputPath], {
      timeout: 55_000,
      windowsHide: true,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PDFBRO_PASSWORD: password },
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
    child.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });

    child.on("close", (code) => {
      if (code === 0 && stdout.includes("SUCCESS")) {
        resolve({ success: true });
      } else {
        resolve({
          success: false,
          error: (stderr.trim() || stdout.trim() || `exit ${code}`).slice(0, 500),
        });
      }
    });

    child.on("error", (e) => {
      resolve({ success: false, error: e.message });
    });
  });
}

/**
 * Translate raw Python errors into user-friendly messages
 * without exposing internal paths or stack traces.
 */
function mapPythonError(raw: string | undefined): string {
  if (!raw) return "Unable to unlock the PDF";
  const lower = raw.toLowerCase();
  if (lower.includes("password") || lower.includes("incorrect") || lower.includes("auth")) {
    return "Incorrect password. Please verify and try again.";
  }
  if (lower.includes("encrypted") || lower.includes("not encrypted")) {
    return "This PDF is not password-protected.";
  }
  if (lower.includes("corrupt") || lower.includes("invalid")) {
    return "The PDF file appears to be corrupted.";
  }
  if (lower.includes("timeout")) {
    return "Processing took too long. Try a smaller file.";
  }
  return "Unable to unlock the PDF";
}
