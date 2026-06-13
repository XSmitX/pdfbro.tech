import type { NextRequest } from "next/server";
import { runProtectedConversion } from "@/lib/security/pythonConvert";
import { FILE_SIZE_LIMITS } from "@/lib/security/validation";

export const maxDuration = 90;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return runProtectedConversion(req, {
    scriptName: "convert_pdf_to_word.py",
    inputExt: ".pdf",
    outputExt: ".docx",
    outputMime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileTypes: ["pdf"],
    maxSize: FILE_SIZE_LIMITS.doc,
    timeoutMs: 85_000,
  });
}
