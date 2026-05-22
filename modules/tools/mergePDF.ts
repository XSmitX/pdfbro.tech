// ============================================================
// MERGE PDF — Real processing logic using pdf-lib
// ============================================================

import { PDFDocument } from "pdf-lib";
import type { ProcessingResult, MergePDFOptions } from "@/lib/types";
import { readFileAsArrayBuffer } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

/**
 * Merges multiple PDF files into a single PDF.
 * Uses pdf-lib to load each document, copy all pages in order,
 * and return a new merged PDF as a Blob.
 */
export async function mergePDFs(
  files: File[],
  options: MergePDFOptions = {}
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (files.length < 2) {
    return {
      success: false,
      files: [],
      error: "Please upload at least 2 PDF files to merge.",
    };
  }

  try {
    // Create a new empty PDF document
    const mergedDoc = await PDFDocument.create();

    // Determine the order in which to merge files
    const order = options.order ?? files.map((_, i) => i);

    for (const fileIndex of order) {
      const file = files[fileIndex];
      if (!file) continue;

      // Read file bytes
      const bytes = await readFileAsArrayBuffer(file);

      // Load the source PDF
      let srcDoc: PDFDocument;
      try {
        srcDoc = await PDFDocument.load(bytes, {
          // Ignore encryption errors for now; will fail gracefully
          ignoreEncryption: true,
        });
      } catch {
        return {
          success: false,
          files: [],
          error: `Failed to read "${file.name}". Make sure it is a valid, non-password-protected PDF.`,
        };
      }

      // Copy ALL pages from source into merged document
      const pageCount = srcDoc.getPageCount();
      const pageIndices = Array.from({ length: pageCount }, (_, i) => i);
      const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);

      for (const page of copiedPages) {
        mergedDoc.addPage(page);
      }
    }

    // Serialize the merged PDF
    const mergedBytes = await mergedDoc.save();
    const blob = uint8ToBlob(mergedBytes, "application/pdf");

    return {
      success: true,
      files: [
        {
          name: "merged.pdf",
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
      error: `Merge failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
