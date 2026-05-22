// ============================================================
// SPLIT PDF — Real processing logic using pdf-lib
// ============================================================

import { PDFDocument } from "pdf-lib";
import type { ProcessingResult, SplitPDFOptions } from "@/lib/types";
import { readFileAsArrayBuffer, parsePageRanges, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

/**
 * Splits a PDF into multiple files based on page ranges.
 *
 * Modes:
 *   - "range":   User provides a range string like "1-3,5,7-9"
 *   - "every":   Split every N pages
 *   - "extract": Extract specific individual pages (one PDF per page)
 */
export async function splitPDF(
  file: File,
  options: SplitPDFOptions
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

    const totalPages = srcDoc.getPageCount();
    if (totalPages === 0) {
      return { success: false, files: [], error: "The PDF has no pages." };
    }

    const baseName = stripExtension(file.name);
    const outputFiles: ProcessingResult["files"] = [];

    if (options.mode === "range") {
      // ── Range mode: split into chunks defined by range string ──
      const rangesStr = options.ranges ?? "";
      const pageIndices = parsePageRanges(rangesStr, totalPages);

      if (pageIndices.length === 0) {
        return {
          success: false,
          files: [],
          error: "No valid pages found in the specified range.",
        };
      }

      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
      for (const page of copiedPages) newDoc.addPage(page);

      const outBytes = await newDoc.save();
      const blob = uint8ToBlob(outBytes, "application/pdf");
      outputFiles.push({
        name: `${baseName}_pages_${rangesStr.replace(/,/g, "-")}.pdf`,
        blob,
        size: blob.size,
        type: "application/pdf",
      });
    } else if (options.mode === "every") {
      // ── Every N pages mode ──
      const n = options.everyN ?? 1;
      if (n < 1) {
        return { success: false, files: [], error: "Split size must be at least 1." };
      }

      let chunkIndex = 1;
      for (let startPage = 0; startPage < totalPages; startPage += n) {
        const endPage = Math.min(startPage + n, totalPages);
        const pageIndices = Array.from(
          { length: endPage - startPage },
          (_, i) => startPage + i
        );

        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
        for (const page of copiedPages) newDoc.addPage(page);

        const outBytes = await newDoc.save();
        const blob = uint8ToBlob(outBytes, "application/pdf");
        outputFiles.push({
          name: `${baseName}_part${chunkIndex}.pdf`,
          blob,
          size: blob.size,
          type: "application/pdf",
        });
        chunkIndex++;
      }
    } else if (options.mode === "extract") {
      // ── Extract mode: one PDF per extracted page ──
      const pagesToExtract = options.extractPages ?? Array.from({ length: totalPages }, (_, i) => i);

      for (const pageIdx of pagesToExtract) {
        if (pageIdx < 0 || pageIdx >= totalPages) continue;

        const newDoc = await PDFDocument.create();
        const [copiedPage] = await newDoc.copyPages(srcDoc, [pageIdx]);
        newDoc.addPage(copiedPage);

        const outBytes = await newDoc.save();
        const blob = uint8ToBlob(outBytes, "application/pdf");
        outputFiles.push({
          name: `${baseName}_page${pageIdx + 1}.pdf`,
          blob,
          size: blob.size,
          type: "application/pdf",
        });
      }
    }

    if (outputFiles.length === 0) {
      return { success: false, files: [], error: "No output files were generated." };
    }

    return {
      success: true,
      files: outputFiles,
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Split failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
