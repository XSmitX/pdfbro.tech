// ============================================================
// Shared helper for Python-based conversion API routes.
//
// Use:
//   return runProtectedConversion(req, {
//     scriptName: "convert_pdf_to_word.py",
//     inputExt: ".pdf",
//     outputExt: ".docx",
//     outputMime: "application/vnd.openxmlformats-...",
//     fileTypes: ["pdf"],
//     maxSize: FILE_SIZE_LIMITS.doc,
//     outputSuffix: "",  // baseName + outputExt
//     timeoutMs: 85_000,
//   });
//
// This applies ALL security checks consistently across all
// conversion endpoints.
// ============================================================

import { NextResponse, type NextRequest } from "next/server";
import { spawn } from "child_process";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import os from "os";
import { guardApiRequest, genericErrorResponse } from "./apiGuard";
import {
  validateFile,
  sanitizeFilename,
  secureRandomId,
  type FileValidationOptions,
} from "./validation";

const PDFBRO_TMP = path.join(os.tmpdir(), "pdfbro");

export interface ConversionConfig {
  /** Filename of the Python script in /scripts/ */
  scriptName: string;
  /** Required input extension, e.g. ".pdf" */
  inputExt: string;
  /** Output extension on the resulting file, e.g. ".docx" */
  outputExt: string;
  /** MIME type to send on the response */
  outputMime: string;
  /** Allowed file types (magic-byte validated) */
  fileTypes: FileValidationOptions["allowed"];
  /** Max input file size in bytes */
  maxSize: number;
  /** Optional suffix to add to output filename before extension (e.g. "_converted") */
  outputSuffix?: string;
  /** Subprocess timeout in ms (default 60s) */
  timeoutMs?: number;
}

export async function runProtectedConversion(
  req: NextRequest,
  cfg: ConversionConfig,
): Promise<NextResponse> {
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

    const check = await validateFile(file, {
      allowed: cfg.fileTypes,
      maxSize: cfg.maxSize,
      requiredExt: cfg.inputExt,
    });
    if (!check.ok) {
      return genericErrorResponse(check.error!, 400, respHeaders);
    }

    const scriptPath = path.join(process.cwd(), "scripts", cfg.scriptName);
    if (!existsSync(scriptPath)) {
      return genericErrorResponse(
        "This conversion is temporarily unavailable",
        503,
        respHeaders,
      );
    }

    const id = secureRandomId();
    inputPath = path.join(PDFBRO_TMP, `conv_${id}${cfg.inputExt}`);
    outputPath = path.join(PDFBRO_TMP, `conv_${id}_out${cfg.outputExt}`);
    await writeFile(inputPath, check.buffer!, { mode: 0o600 });

    const result = await runPython([scriptPath, inputPath, outputPath], cfg.timeoutMs ?? 60_000);

    if (!result.success) {
      return genericErrorResponse(
        "Unable to convert this file. It may be corrupted, encrypted, or in an unsupported format.",
        400,
        respHeaders,
      );
    }

    if (!existsSync(outputPath)) {
      return genericErrorResponse("Conversion failed", 500, respHeaders);
    }

    const outBytes = await readFile(outputPath);
    const baseName = sanitizeFilename(file!.name.replace(new RegExp(cfg.inputExt + "$", "i"), ""));
    const downloadName = baseName + (cfg.outputSuffix ?? "") + cfg.outputExt;

    return new NextResponse(outBytes, {
      status: 200,
      headers: {
        ...respHeaders,
        "Content-Type": cfg.outputMime,
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "Content-Length": String(outBytes.length),
      },
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[convert] ${cfg.scriptName}`, err);
    }
    return genericErrorResponse("Unable to process this file", 500, respHeaders);
  } finally {
    if (inputPath) { try { await unlink(inputPath); } catch {} }
    if (outputPath) { try { await unlink(outputPath); } catch {} }
  }
}

function runPython(args: string[], timeoutMs: number): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const child = spawn("python", args, {
      timeout: timeoutMs,
      windowsHide: true,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
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
