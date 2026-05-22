// ============================================================
// ADD WATERMARK — Real processing logic using pdf-lib
// ============================================================

import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension, hexToRgb } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

export interface WatermarkOptions {
  text: string;
  fontSize: number;       // 12–200
  opacity: number;        // 0.0–1.0
  color: string;          // hex color
  rotation: number;       // degrees (e.g. 45 = diagonal)
  position: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Adds a diagonal text watermark to every page of a PDF.
 * Uses pdf-lib's standard font embedding + drawText().
 */
export async function addWatermark(
  file: File,
  options: WatermarkOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (!options.text.trim()) {
    return { success: false, files: [], error: "Watermark text cannot be empty." };
  }

  try {
    const bytes = await readFileAsArrayBuffer(file);
    let doc: PDFDocument;

    try {
      doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch {
      return { success: false, files: [], error: "Failed to load PDF." };
    }

    const font = await doc.embedFont(StandardFonts.HelveticaBold);
    const [r, g, b] = hexToRgb(options.color);
    const colorRgb = rgb(r / 255, g / 255, b / 255);

    const pages = doc.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();

      // Calculate text width to center it
      const textWidth = font.widthOfTextAtSize(options.text, options.fontSize);
      const textHeight = font.heightAtSize(options.fontSize);

      // Calculate position
      let x: number;
      let y: number;
      const margin = 40;

      switch (options.position) {
        case "top-left":
          x = margin;
          y = height - textHeight - margin;
          break;
        case "top-right":
          x = width - textWidth - margin;
          y = height - textHeight - margin;
          break;
        case "bottom-left":
          x = margin;
          y = margin;
          break;
        case "bottom-right":
          x = width - textWidth - margin;
          y = margin;
          break;
        case "center":
        default:
          x = (width - textWidth) / 2;
          y = (height - textHeight) / 2;
          break;
      }

      page.drawText(options.text, {
        x,
        y,
        size: options.fontSize,
        font,
        color: colorRgb,
        opacity: options.opacity,
        rotate: degrees(options.rotation),
      });
    }

    const outBytes = await doc.save();
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{ name: `${baseName}_watermarked.pdf`, blob, size: blob.size, type: "application/pdf" }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return { success: false, files: [], error: `Watermark failed: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
