import type { NextRequest } from "next/server";
import { runProtectedConversion } from "@/lib/security/pythonConvert";
import { FILE_SIZE_LIMITS } from "@/lib/security/validation";

export const maxDuration = 90;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return runProtectedConversion(req, {
    scriptName: "convert_gif_to_mp4.py",
    inputExt: ".gif",
    outputExt: ".mp4",
    outputMime: "video/mp4",
    fileTypes: ["gif"],
    maxSize: FILE_SIZE_LIMITS.video,
    timeoutMs: 85_000,
  });
}
