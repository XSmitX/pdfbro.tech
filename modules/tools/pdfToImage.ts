import type { ProcessingResult, PDFToImageOptions } from "@/lib/types";
import { stripExtension } from "@/lib/utils";
import JSZip from "jszip";
import { loadPdfjs } from "@/lib/pdfjsLoader";

export async function pdfToImages(
  file: File,
  options: PDFToImageOptions,
  onProgress?: (current: number, total: number) => void
): Promise<ProcessingResult> {
  const startTime = Date.now();
  const baseName = stripExtension(file.name);
  const ext = options.format === "jpeg" ? "jpg" : "png";
  const mimeType = options.format === "jpeg" ? "image/jpeg" : "image/png";

  try {
    const pdfjsLib = await loadPdfjs();

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdfDoc = await loadingTask.promise;
    const totalPages = pdfDoc.numPages;
    const outputFiles: ProcessingResult["files"] = [];

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: options.scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        page.cleanup();
        continue;
      }

      if (options.format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // pdfjs 3.x API: canvasContext + viewport (no canvas param)
      await page.render({ canvasContext: ctx, viewport }).promise;

      const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, mimeType, options.quality);
      });

      if (imageBlob) {
        outputFiles.push({
          name: baseName + "_page" + pageNum + "." + ext,
          blob: imageBlob,
          size: imageBlob.size,
          type: mimeType,
        });
      }

      if (onProgress) onProgress(pageNum, totalPages);
      page.cleanup();
    }

    pdfDoc.destroy();

    if (outputFiles.length === 0) {
      return { success: false, files: [], error: "No pages could be converted." };
    }

    if (outputFiles.length === 1) {
      return { success: true, files: outputFiles, processingTime: Date.now() - startTime };
    }

    const zip = new JSZip();
    for (let i = 0; i < outputFiles.length; i++) {
      zip.file(outputFiles[i].name, outputFiles[i].blob);
    }

    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    return {
      success: true,
      files: [{
        name: baseName + "_images.zip",
        blob: zipBlob,
        size: zipBlob.size,
        type: "application/zip",
      }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      files: [],
      error: "PDF to Image failed: " + msg,
    };
  }
}

export { pdfToImages as createPdfPageRenderer };
