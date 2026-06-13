import type { NextRequest } from "next/server";
import { runProtectedConversion } from "@/lib/security/pythonConvert";
import { FILE_SIZE_LIMITS } from "@/lib/security/validation";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return runProtectedConversion(req, {
    scriptName: "convert_word.py",
    inputExt: ".docx",
    outputExt: ".pdf",
    outputMime: "application/pdf",
    fileTypes: ["docx"],
    maxSize: FILE_SIZE_LIMITS.doc,
    timeoutMs: 55_000,
  });
}
