// ============================================================
// /api/protect/pdf — Add password protection (AES-256) to a PDF.
//
// Security: see /api/unlock/pdf for the security model.
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
  const guard = await guardApiRequest(req);
  if (guard.response) return guard.response;
  const respHeaders = guard.responseHeaders;

  let inputPath = "";
  let outputPath = "";

  try {
    if (!existsSync(PDFBRO_TMP)) {
      await mkdir(PDFBRO_TMP, { recursive: true, mode: 0o700 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const rawUserPassword = formData.get("userPassword");
    const rawOwnerPassword = formData.get("ownerPassword");

    // Validate file
    const fileCheck = await validateFile(file, {
      allowed: ["pdf"],
      maxSize: FILE_SIZE_LIMITS.pdf,
      requiredExt: ".pdf",
    });
    if (!fileCheck.ok) {
      return genericErrorResponse(fileCheck.error!, 400, respHeaders);
    }

    // Validate user password (required, min 4 chars for sensible security)
    const userPw = validatePassword(typeof rawUserPassword === "string" ? rawUserPassword : null, {
      minLength: 4,
      maxLength: 256,
    });
    if (!userPw.ok) {
      return genericErrorResponse(userPw.error!, 400, respHeaders);
    }

    // Owner password is optional
    let ownerPassword = "";
    if (typeof rawOwnerPassword === "string" && rawOwnerPassword.length > 0) {
      const op = validatePassword(rawOwnerPassword, { minLength: 4, maxLength: 256 });
      if (!op.ok) {
        return genericErrorResponse("Owner password: " + op.error, 400, respHeaders);
      }
      ownerPassword = op.password!;
    }

    const scriptPath = path.join(process.cwd(), "scripts", "protect_pdf.py");
    if (!existsSync(scriptPath)) {
      return genericErrorResponse(
        "Protection service is temporarily unavailable",
        503,
        respHeaders,
      );
    }

    const id = secureRandomId();
    inputPath = path.join(PDFBRO_TMP, `protect_${id}.pdf`);
    outputPath = path.join(PDFBRO_TMP, `protect_${id}_out.pdf`);
    await writeFile(inputPath, fileCheck.buffer!, { mode: 0o600 });

    const args = [scriptPath, inputPath, outputPath];

    const childEnv = { ...process.env, PDFBRO_USER_PASSWORD: userPw.password! } as Record<string, string>;
    if (ownerPassword) childEnv.PDFBRO_OWNER_PASSWORD = ownerPassword;

    const result = await runPython(args, childEnv);

    if (!result.success) {
      return genericErrorResponse(
        "Unable to protect the PDF. The file may be corrupted or already encrypted.",
        400,
        respHeaders,
      );
    }

    if (!existsSync(outputPath)) {
      return genericErrorResponse("Protection failed. Please try again.", 500, respHeaders);
    }

    const pdfBytes = await readFile(outputPath);
    const safeName = sanitizeFilename(file!.name.replace(/\.pdf$/i, "")) + "_protected.pdf";

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        ...respHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": String(pdfBytes.length),
      },
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[protect/pdf]", err);
    }
    return genericErrorResponse("Unable to process the PDF", 500, respHeaders);
  } finally {
    if (inputPath) { try { await unlink(inputPath); } catch {} }
    if (outputPath) { try { await unlink(outputPath); } catch {} }
  }
}

function runPython(args: string[], extraEnv?: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const child = spawn("python", args, {
      timeout: 55_000,
      windowsHide: true,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: extraEnv ? { ...process.env, ...extraEnv } : process.env,
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
