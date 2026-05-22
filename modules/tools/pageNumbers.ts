// ============================================================
// ADD PAGE NUMBERS — Real processing logic using pdf-lib
// ============================================================

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

export type PageNumberPosition = "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-right" | "top-left";
export type PageNumberFormat = "1" | "Page 1" | "1 / N";

export interface PageNumberOptions {
  position: PageNumberPosition;
  format: PageNumberFormat;
  startFrom: number;      // starting page number (default 1)
  fontSize: number;       // default 12
  color: string;          // hex, default "#000000"
  margin: number;         // margin from edge in points, default 20
}

/**
 * Adds page numbers to each page of a PDF using pdf-lib.
 */
export async function addPageNumbers(
  file: File,
  options: PageNumberOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const bytes = await readFileAsArrayBuffer(file);
    let doc: PDFDocument;

    try {
      doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch {
      return { success: false, files: [], error: "Failed to load PDF." };
    }

    const font = await doc.embedFont(StandardFonts.Helvetica);
    const pages = doc.getPages();
    const totalPages = pages.length;

    if (totalPages === 0) {
      return { success: false, files: [], error: "The PDF has no pages." };
    }

    // Parse color
    const hexToComponents = (hex: string): [number, number, number] => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    };

    const [r, g, b] = hexToComponents(options.color || "#555555");
    const fontColor = rgb(r, g, b);
    const fs = options.fontSize || 12;
    const margin = options.margin || 20;

    for (let i = 0; i < totalPages; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();
      const pageNum = i + options.startFrom;

      // Format text
      let text: string;
      switch (options.format) {
        case "Page 1":
          text = `Page ${pageNum}`;
          break;
        case "1 / N":
          text = `${pageNum} / ${totalPages + options.startFrom - 1}`;
          break;
        case "1":
        default:
          text = String(pageNum);
          break;
      }

      const textWidth = font.widthOfTextAtSize(text, fs);
      const textHeight = font.heightAtSize(fs);

      // Calculate x, y based on position
      let x: number;
      let y: number;

      const isBottom = options.position.startsWith("bottom");
      const isTop = options.position.startsWith("top");
      const isLeft = options.position.endsWith("left");
      const isRight = options.position.endsWith("right");
      const isCenter = options.position.endsWith("center");

      if (isBottom) y = margin;
      else if (isTop) y = height - textHeight - margin;
      else y = margin;

      if (isLeft) x = margin;
      else if (isRight) x = width - textWidth - margin;
      else if (isCenter) x = (width - textWidth) / 2;
      else x = (width - textWidth) / 2;

      page.drawText(text, {
        x,
        y,
        size: fs,
        font,
        color: fontColor,
        opacity: 0.85,
      });
    }

    const outBytes = await doc.save();
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{ name: `${baseName}_numbered.pdf`, blob, size: blob.size, type: "application/pdf" }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return { success: false, files: [], error: `Page numbering failed: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
