// ============================================================
// /api/convert/word-to-html — Convert DOCX to HTML for the
// in-browser Word editor.
//
// Returns JSON { html: string } (not a binary file).
// ============================================================

import { NextResponse, type NextRequest } from "next/server";
import { spawn } from "child_process";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import os from "os";
import { guardApiRequest, genericErrorResponse } from "@/lib/security/apiGuard";
import { validateFile, secureRandomId, FILE_SIZE_LIMITS } from "@/lib/security/validation";

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

    const check = await validateFile(file, {
      allowed: ["docx"],
      maxSize: FILE_SIZE_LIMITS.doc,
      requiredExt: ".docx",
    });
    if (!check.ok) {
      return genericErrorResponse(check.error!, 400, respHeaders);
    }

    const scriptPath = path.join(process.cwd(), "scripts", "convert_word_to_html.py");
    if (!existsSync(scriptPath)) {
      return genericErrorResponse(
        "Word conversion service is temporarily unavailable",
        503,
        respHeaders,
      );
    }

    const id = secureRandomId();
    inputPath = path.join(PDFBRO_TMP, `w2h_${id}.docx`);
    outputPath = path.join(PDFBRO_TMP, `w2h_${id}.html`);
    await writeFile(inputPath, check.buffer!, { mode: 0o600 });

    // SAFE: spawn with args array, no shell.
    const result = await runPython([scriptPath, inputPath, outputPath]);

    if (!result.success || !existsSync(outputPath)) {
      return genericErrorResponse(
        "Unable to read this Word document. It may be corrupted or password-protected.",
        400,
        respHeaders,
      );
    }

    const html = await readFile(outputPath, "utf8");

    return NextResponse.json({ html }, { headers: respHeaders });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[convert/word-to-html]", err);
    }
    return genericErrorResponse("Unable to process the Word document", 500, respHeaders);
  } finally {
    if (inputPath) { try { await unlink(inputPath); } catch {} }
    if (outputPath) { try { await unlink(outputPath); } catch {} }
  }
}

function runPython(args: string[]): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    const child = spawn("python", args, {
      timeout: 55_000,
      windowsHide: true,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
    child.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });

    child.on("close", (code) => {
      // word-to-html script may not output "SUCCESS" — check exit code only
      if (code === 0) {
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
