import type { NextRequest } from "next/server";
import { runProtectedConversion } from "@/lib/security/pythonConvert";
import { FILE_SIZE_LIMITS } from "@/lib/security/validation";

export const maxDuration = 90;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return runProtectedConversion(req, {
    scriptName: "convert_pdf_to_excel.py",
    inputExt: ".pdf",
    outputExt: ".xlsx",
    outputMime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileTypes: ["pdf"],
    maxSize: FILE_SIZE_LIMITS.doc,
    timeoutMs: 85_000,
  });
}
