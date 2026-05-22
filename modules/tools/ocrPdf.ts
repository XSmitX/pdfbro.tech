import type { ProcessingResult } from "@/lib/types";
import { stripExtension } from "@/lib/utils";
import { loadPdfjs } from "@/lib/pdfjsLoader";

export async function ocrPdf(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const pdfjs = await loadPdfjs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

    const pages: string[] = [];
    let hasText = false;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .map((item: { str?: string }) => (item?.str ?? "").trim())
        .filter(Boolean)
        .join(" ");

      if (text.length > 0) hasText = true;
      pages.push(`--- Page ${i} ---\n${text || "[No extractable text found on this page]"}`);
      if (onProgress) onProgress(i, pdf.numPages);
      page.cleanup();
    }

    await pdf.destroy();

    const note = hasText
      ? "Text extraction completed."
      : "This appears to be a scanned/image-only PDF. No embedded text was found.";

    const outputText = `${note}\n\n${pages.join("\n\n")}`;
    const txtBlob = new Blob([outputText], { type: "text/plain" });

    return {
      success: true,
      files: [
        {
          name: `${stripExtension(file.name)}_ocr.txt`,
          blob: txtBlob,
          size: txtBlob.size,
          type: "text/plain",
        },
      ],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `OCR failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
