// ============================================================
// IMAGE TO PDF — Real processing logic using pdf-lib
// ============================================================

import { PDFDocument, PageSizes } from "pdf-lib";
import type { ProcessingResult, ImageToPDFOptions } from "@/lib/types";
import { loadImageFromFile, canvasToBlob } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

/**
 * Converts one or more images (JPEG, PNG, WEBP, BMP, GIF) to a PDF.
 * Each image becomes a separate page. Aspect ratio is preserved.
 *
 * Strategy:
 * - For JPEG: embed directly via pdf-lib embedJpg
 * - For PNG: embed directly via pdf-lib embedPng
 * - For other formats (WEBP, BMP, GIF): convert to PNG via canvas first
 */
export async function imagesToPDF(
  files: File[],
  options: ImageToPDFOptions = { pageSize: "A4", margin: 20 }
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (files.length === 0) {
    return { success: false, files: [], error: "No images provided." };
  }

  try {
    const doc = await PDFDocument.create();
    const margin = options.margin;

    for (const file of files) {
      // Determine target page dimensions
      let pageWidth: number;
      let pageHeight: number;

      if (options.pageSize === "A4") {
        [pageWidth, pageHeight] = PageSizes.A4;
      } else if (options.pageSize === "Letter") {
        [pageWidth, pageHeight] = PageSizes.Letter;
      } else {
        // "fit" — will be set after loading image
        pageWidth = 0;
        pageHeight = 0;
      }

      // Get image bytes + embed
      const fileType = file.type;
      let embeddedImage;

      if (fileType === "image/jpeg" || fileType === "image/jpg") {
        const bytes = await file.arrayBuffer();
        embeddedImage = await doc.embedJpg(new Uint8Array(bytes));
      } else if (fileType === "image/png") {
        const bytes = await file.arrayBuffer();
        embeddedImage = await doc.embedPng(new Uint8Array(bytes));
      } else {
        // WEBP / BMP / GIF / TIFF — convert to PNG via Canvas
        const img = await loadImageFromFile(file);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(img, 0, 0);
        const pngBlob = await canvasToBlob(canvas, "image/png");
        const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
        embeddedImage = await doc.embedPng(pngBytes);
      }

      const imgDims = embeddedImage.size();

      if (options.pageSize === "fit") {
        pageWidth = imgDims.width + margin * 2;
        pageHeight = imgDims.height + margin * 2;
      }

      // Calculate scaled dimensions to fit within page with margin
      const availW = pageWidth - margin * 2;
      const availH = pageHeight - margin * 2;
      const scale = Math.min(availW / imgDims.width, availH / imgDims.height, 1);
      const drawW = imgDims.width * scale;
      const drawH = imgDims.height * scale;

      // Center image on page
      const x = (pageWidth - drawW) / 2;
      const y = (pageHeight - drawH) / 2;

      const page = doc.addPage([pageWidth, pageHeight]);
      page.drawImage(embeddedImage, { x, y, width: drawW, height: drawH });
    }

    const outBytes = await doc.save();
    const blob = uint8ToBlob(outBytes, "application/pdf");

    return {
      success: true,
      files: [
        {
          name: "images.pdf",
          blob,
          size: blob.size,
          type: "application/pdf",
        },
      ],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Image to PDF failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
