import type { NextRequest } from "next/server";
import { runProtectedConversion } from "@/lib/security/pythonConvert";
import { FILE_SIZE_LIMITS } from "@/lib/security/validation";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return runProtectedConversion(req, {
    scriptName: "convert_mp4_to_gif.py",
    inputExt: ".mp4",
    outputExt: ".gif",
    outputMime: "image/gif",
    fileTypes: ["mp4"],
    maxSize: FILE_SIZE_LIMITS.video,
    timeoutMs: 110_000,
  });
}
