// ============================================================
// COMPRESS PDF — Real processing logic using pdf-lib
// ============================================================

import { PDFDocument } from "pdf-lib";
import type { ProcessingResult, CompressPDFOptions } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

/**
 * Compresses a PDF using browser-safe techniques:
 *
 * 1. Re-serializes through pdf-lib with object stream compression.
 *    useObjectStreams packs the cross-reference table and many indirect objects
 *    into zlib-compressed streams — meaningful savings especially for text PDFs.
 *
 * 2. Strips all metadata (author, title, keywords, producer) for added savings.
 *
 * 3. "low" quality triggers page rasterization via Canvas + JPEG re-embedding,
 *    producing the most aggressive size reduction (at cost of visual fidelity).
 *    This path is invoked when the caller provides a renderPageToJpeg function
 *    (supplied by the UI layer which has DOM access and can use pdf.js).
 *
 * @param file     - The input PDF File
 * @param options  - Compression quality level
 * @param renderFn - Optional async function that renders each page to a JPEG Blob.
 *                   Signature: (pageIndex: number, scale: number) => Promise<Blob | null>
 *                   Provided by the UI tool component when aggressive compression is needed.
 */
export async function compressPDF(
  file: File,
  options: CompressPDFOptions = { quality: "medium" },
  renderFn?: (pageIndex: number, scale: number) => Promise<Blob | null>
): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const bytes = await readFileAsArrayBuffer(file);

    let srcDoc: PDFDocument;
    try {
      srcDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch {
      return {
        success: false,
        files: [],
        error: "Failed to load PDF. Make sure it is a valid, non-password-protected file.",
      };
    }

    const baseName = stripExtension(file.name);
    const totalPages = srcDoc.getPageCount();

    // ── Path A: Canvas rasterization (all quality levels with renderFn available) ──
    if (renderFn) {
      // Determine scale and JPEG quality based on quality setting
      let scale: number;
      let jpegQual: number;

      switch (options.quality) {
        case "low":
          scale = 1.0;
          jpegQual = 0.45; // Most aggressive compression, lowest quality
          break;
        case "medium":
          scale = 1.5;
          jpegQual = 0.65; // Balanced compression and quality
          break;
        case "high":
        default:
          scale = 2.0;
          jpegQual = 0.85; // Best quality, minimal compression
          break;
      }

      const newDoc = await PDFDocument.create();
      let allFailed = true;
      let processedCount = 0;

      for (let i = 0; i < totalPages; i++) {
        const jpegBlob = await renderFn(i, scale);
        if (!jpegBlob) continue;

        try {
          const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
          const jpegImage = await newDoc.embedJpg(jpegBytes);

          // Preserve original page dimensions
          const srcPage = srcDoc.getPage(i);
          const { width, height } = srcPage.getSize();

          const newPage = newDoc.addPage([width, height]);
          newPage.drawImage(jpegImage, { x: 0, y: 0, width, height });
          allFailed = false;
          processedCount++;
        } catch (embedError) {
          // Skip this page if embedding fails
          continue;
        }
      }

      if (!allFailed && processedCount > 0) {
        const outBytes = await newDoc.save({ useObjectStreams: true });
        const blob = uint8ToBlob(outBytes, "application/pdf");
        return {
          success: true,
          files: [{ name: `${baseName}_compressed.pdf`, blob, size: blob.size, type: "application/pdf" }],
          processingTime: Date.now() - startTime,
        };
      }
    }

    // ── Path B: Metadata strip + object stream compression (fallback) ──
    // Always apply metadata stripping regardless of quality level
    srcDoc.setTitle("");
    srcDoc.setAuthor("");
    srcDoc.setSubject("");
    srcDoc.setKeywords([]);
    srcDoc.setProducer("pdfbro.tech");
    srcDoc.setCreator("pdfbro.tech");

    // Apply aggressive compression settings for Path B
    // Note: pdf-lib doesn't have a "compression" option, but useObjectStreams provides
    // the main compression benefit. For truly aggressive compression, rasterization
    // (Path A) is needed which converts pages to compressed JPEGs.
    const compressedBytes = await srcDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 100,
    });

    const blob = uint8ToBlob(compressedBytes, "application/pdf");

    return {
      success: true,
      files: [
        {
          name: `${baseName}_compressed.pdf`,
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
      error: `Compression failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
