// ============================================================
// CROP IMAGE — Canvas API based cropping
// ============================================================

import type { ProcessingResult } from "@/lib/types";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/utils";

export interface CropRegion {
  x: number;        // pixels from left edge
  y: number;        // pixels from top edge
  width: number;    // crop width in pixels
  height: number;   // crop height in pixels
}

export interface CropImageOptions {
  crop: CropRegion;
  outputFormat: "jpeg" | "png" | "webp";
  quality: number;  // 0–1
}

/**
 * Crops an image using Canvas API drawImage with source rectangle.
 * The crop region is specified in the original image's pixel space.
 */
export async function cropImage(
  file: File,
  options: CropImageOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const img = await loadImageFromFile(file);
    const { naturalWidth: srcW, naturalHeight: srcH } = img;

    // Validate crop region
    const { x, y, width, height } = options.crop;

    if (x < 0 || y < 0 || width <= 0 || height <= 0) {
      return { success: false, files: [], error: "Invalid crop region." };
    }

    const cropX = Math.max(0, Math.round(x));
    const cropY = Math.max(0, Math.round(y));
    const cropW = Math.min(Math.round(width), srcW - cropX);
    const cropH = Math.min(Math.round(height), srcH - cropY);

    if (cropW <= 0 || cropH <= 0) {
      return { success: false, files: [], error: "Crop region is outside the image bounds." };
    }

    const canvas = document.createElement("canvas");
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return { success: false, files: [], error: "Canvas not available." };
    }

    // Fill white bg for JPEG
    if (options.outputFormat === "jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cropW, cropH);
    }

    // Draw only the crop region
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const mimeType = `image/${options.outputFormat}`;
    const blob = await canvasToBlob(canvas, mimeType, options.quality);
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{
        name: `${baseName}_cropped.${options.outputFormat}`,
        blob,
        size: blob.size,
        type: mimeType,
      }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Crop failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Crops to a specific aspect ratio (center crop).
 * Useful for square/portrait/landscape presets.
 */
export function calculateAspectRatioCrop(
  imgWidth: number,
  imgHeight: number,
  targetRatioW: number,
  targetRatioH: number
): CropRegion {
  const targetRatio = targetRatioW / targetRatioH;
  const srcRatio = imgWidth / imgHeight;

  let cropW: number;
  let cropH: number;

  if (srcRatio > targetRatio) {
    // Image is wider than target — crop sides
    cropH = imgHeight;
    cropW = Math.round(imgHeight * targetRatio);
  } else {
    // Image is taller than target — crop top/bottom
    cropW = imgWidth;
    cropH = Math.round(imgWidth / targetRatio);
  }

  const x = Math.round((imgWidth - cropW) / 2);
  const y = Math.round((imgHeight - cropH) / 2);

  return { x, y, width: cropW, height: cropH };
}
