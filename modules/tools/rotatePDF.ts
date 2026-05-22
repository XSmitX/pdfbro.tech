// ============================================================
// ROTATE PDF — Real processing logic using pdf-lib
// ============================================================

import { PDFDocument, degrees } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension, parsePageRanges } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

export type RotationAngle = 90 | 180 | 270;

export interface RotatePDFOptions {
  angle: RotationAngle;
  target: "all" | "range";
  ranges?: string; // e.g. "1-3,5" — used when target === "range"
}

/**
 * Rotates PDF pages using pdf-lib.
 * Each page's current rotation is read and the new angle added cumulatively.
 */
export async function rotatePDF(
  file: File,
  options: RotatePDFOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const bytes = await readFileAsArrayBuffer(file);
    let doc: PDFDocument;

    try {
      doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch {
      return { success: false, files: [], error: "Failed to load PDF. Make sure it is a valid, non-password-protected file." };
    }

    const totalPages = doc.getPageCount();
    if (totalPages === 0) {
      return { success: false, files: [], error: "The PDF has no pages." };
    }

    // Determine which pages to rotate
    let pageIndices: number[];
    if (options.target === "all") {
      pageIndices = Array.from({ length: totalPages }, (_, i) => i);
    } else {
      pageIndices = parsePageRanges(options.ranges ?? "", totalPages);
      if (pageIndices.length === 0) {
        return { success: false, files: [], error: "No valid page range specified." };
      }
    }

    // Apply rotation
    for (const idx of pageIndices) {
      const page = doc.getPage(idx);
      const currentRotation = page.getRotation().angle;
      const newRotation = (currentRotation + options.angle) % 360;
      page.setRotation(degrees(newRotation));
    }

    const outBytes = await doc.save();
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{ name: `${baseName}_rotated.pdf`, blob, size: blob.size, type: "application/pdf" }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return { success: false, files: [], error: `Rotation failed: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}
