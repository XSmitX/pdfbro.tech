// ============================================================
// PNG TO JPEG — Real processing logic using Canvas API
// ============================================================

import type { ProcessingResult, PNGToJPEGOptions } from "@/lib/types";
import { loadImageFromFile, canvasToBlob, stripExtension, hexToRgb } from "@/lib/utils";

/**
 * Converts PNG files to JPEG format using the Canvas API.
 *
 * Key behaviors:
 * - Transparent pixels are filled with the specified background color (default: white)
 * - Quality is adjustable (0-100 mapped to 0.0-1.0)
 * - Preserves original dimensions
 * - Handles multiple files, returning one JPEG per PNG
 */
export async function pngToJpeg(
  files: File[],
  options: PNGToJPEGOptions = { quality: 85, background: "#ffffff" }
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (files.length === 0) {
    return { success: false, files: [], error: "No PNG files provided." };
  }

  const outputFiles: ProcessingResult["files"] = [];
  const [r, g, b] = hexToRgb(options.background);

  for (const file of files) {
    try {
      const img = await loadImageFromFile(file);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      // Fill background first (handles PNG transparency)
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the PNG on top
      ctx.drawImage(img, 0, 0);

      // Export as JPEG
      const quality = Math.max(0, Math.min(100, options.quality)) / 100;
      const jpegBlob = await canvasToBlob(canvas, "image/jpeg", quality);

      const baseName = stripExtension(file.name);
      outputFiles.push({
        name: `${baseName}.jpg`,
        blob: jpegBlob,
        size: jpegBlob.size,
        type: "image/jpeg",
      });
    } catch {
      // Skip failed files but continue processing others
      continue;
    }
  }

  if (outputFiles.length === 0) {
    return { success: false, files: [], error: "Failed to convert any PNG files." };
  }

  return {
    success: true,
    files: outputFiles,
    processingTime: Date.now() - startTime,
  };
}
