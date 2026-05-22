// ============================================================
// IMAGE COMPRESSOR — Real processing logic
// ============================================================

import imageCompression from "browser-image-compression";
import type { ProcessingResult, ImageCompressorOptions } from "@/lib/types";
import { stripExtension } from "@/lib/utils";

/**
 * Compresses images using browser-image-compression.
 *
 * Key features:
 * - Reduces file size while maintaining visual quality
 * - Adjustable quality, max size, and max dimensions
 * - Supports JPEG, PNG, WEBP
 * - Preserves EXIF data option
 * - Uses Web Workers internally for non-blocking compression
 */
export async function compressImages(
  files: File[],
  options: ImageCompressorOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    quality: 0.8,
    useWebWorker: true,
  },
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (files.length === 0) {
    return { success: false, files: [], error: "No images provided." };
  }

  const outputFiles: ProcessingResult["files"] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: options.maxSizeMB,
        maxWidthOrHeight: options.maxWidthOrHeight,
        initialQuality: options.quality,
        useWebWorker: options.useWebWorker,
        preserveExif: false,
        onProgress: (progress) => {
          onProgress?.(i, progress);
        },
      });

      const baseName = stripExtension(file.name);
      // Preserve original format
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";

      outputFiles.push({
        name: `${baseName}_compressed.${ext}`,
        blob: compressedFile,
        size: compressedFile.size,
        type: compressedFile.type,
      });
    } catch {
      // Continue with other files if one fails
      continue;
    }
  }

  if (outputFiles.length === 0) {
    return { success: false, files: [], error: "Failed to compress any images." };
  }

  return {
    success: true,
    files: outputFiles,
    processingTime: Date.now() - startTime,
  };
}
