import type { NextRequest } from "next/server";
import { runProtectedConversion } from "@/lib/security/pythonConvert";
import { FILE_SIZE_LIMITS } from "@/lib/security/validation";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return runProtectedConversion(req, {
    scriptName: "pdf_to_pptx.py",
    inputExt: ".pdf",
    outputExt: ".pptx",
    outputMime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    fileTypes: ["pdf"],
    maxSize: FILE_SIZE_LIMITS.doc,
    timeoutMs: 110_000,
  });
}
