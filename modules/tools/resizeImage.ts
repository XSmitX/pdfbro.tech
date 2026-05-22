// ============================================================
// RESIZE IMAGE — Canvas API based resizing
// ============================================================

import type { ProcessingResult } from "@/lib/types";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/utils";

export interface ResizeImageOptions {
  mode: "pixels" | "percentage" | "preset";
  width?: number;         // target width in pixels
  height?: number;        // target height in pixels
  percentage?: number;    // scale percentage (e.g. 50 = half size)
  preset?: "640x480" | "1280x720" | "1920x1080" | "2048x2048" | "800x600";
  maintainAspectRatio: boolean;
  outputFormat: "jpeg" | "png" | "webp";
  quality: number;        // 0–1 for jpeg/webp
}

const PRESETS: Record<string, [number, number]> = {
  "640x480": [640, 480],
  "800x600": [800, 600],
  "1280x720": [1280, 720],
  "1920x1080": [1920, 1080],
  "2048x2048": [2048, 2048],
};

/**
 * Resizes one or more images using the Canvas API.
 * Aspect ratio is optionally preserved.
 */
export async function resizeImages(
  files: File[],
  options: ResizeImageOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (files.length === 0) {
    return { success: false, files: [], error: "No images provided." };
  }

  const outputFiles: ProcessingResult["files"] = [];
  const mimeType = `image/${options.outputFormat}`;
  const ext = options.outputFormat;

  for (const file of files) {
    try {
      const img = await loadImageFromFile(file);
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;

      let targetW: number;
      let targetH: number;

      if (options.mode === "percentage") {
        const pct = (options.percentage ?? 100) / 100;
        targetW = Math.round(srcW * pct);
        targetH = Math.round(srcH * pct);
      } else if (options.mode === "preset" && options.preset) {
        [targetW, targetH] = PRESETS[options.preset] ?? [srcW, srcH];
        if (options.maintainAspectRatio) {
          const ratio = Math.min(targetW / srcW, targetH / srcH);
          targetW = Math.round(srcW * ratio);
          targetH = Math.round(srcH * ratio);
        }
      } else {
        // pixels mode
        targetW = options.width ?? srcW;
        targetH = options.height ?? srcH;

        if (options.maintainAspectRatio) {
          const srcRatio = srcW / srcH;
          if (options.width && !options.height) {
            targetH = Math.round(targetW / srcRatio);
          } else if (options.height && !options.width) {
            targetW = Math.round(targetH * srcRatio);
          } else {
            // Both specified — fit within box maintaining ratio
            const ratio = Math.min(targetW / srcW, targetH / srcH);
            targetW = Math.round(srcW * ratio);
            targetH = Math.round(srcH * ratio);
          }
        }
      }

      // Ensure minimum 1×1
      targetW = Math.max(1, targetW);
      targetH = Math.max(1, targetH);

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Fill white background for JPEG (removes transparency)
      if (options.outputFormat === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, targetW, targetH);
      }

      ctx.drawImage(img, 0, 0, targetW, targetH);

      const blob = await canvasToBlob(canvas, mimeType, options.quality);
      const baseName = stripExtension(file.name);

      outputFiles.push({
        name: `${baseName}_${targetW}x${targetH}.${ext}`,
        blob,
        size: blob.size,
        type: mimeType,
      });
    } catch {
      continue;
    }
  }

  if (outputFiles.length === 0) {
    return { success: false, files: [], error: "Failed to resize any images." };
  }

  return {
    success: true,
    files: outputFiles,
    processingTime: Date.now() - startTime,
  };
}
