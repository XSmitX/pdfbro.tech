// ============================================================
// UNLOCK PDF — Remove password protection using pdf-lib
// ============================================================

import { PDFDocument } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

/**
 * Attempts to remove PDF password protection.
 *
 * pdf-lib v1.17 supports `ignoreEncryption: true` which bypasses
 * encryption flags and allows re-saving a clean copy.
 *
 * Note: This works for PDFs where the password is not required to
 * read the file (owner-password-only encryption). For user-password
 * encryption where the PDF truly can't be opened, the browser itself
 * would reject the file (can't display it), so we detect that case
 * and show a clear error.
 */
export async function unlockPDF(file: File): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const bytes = await readFileAsArrayBuffer(file);

    let doc: PDFDocument;

    try {
      doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch (loadErr) {
      const msg = loadErr instanceof Error ? loadErr.message : "";
      if (msg.toLowerCase().includes("encrypt") || msg.toLowerCase().includes("password")) {
        return {
          success: false,
          files: [],
          error:
            "This PDF requires a password to open. Unfortunately, browser-based tools cannot decrypt user-password-protected PDFs. Please use a desktop tool like Adobe Acrobat or QPDF.",
        };
      }
      return {
        success: false,
        files: [],
        error: `Failed to load PDF: ${msg || "Unknown error"}`,
      };
    }

    // Re-save without encryption flags
    const outBytes = await doc.save({
      useObjectStreams: false, // plain cross-ref for maximum compatibility
    });
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{ name: `${baseName}_unlocked.pdf`, blob, size: blob.size, type: "application/pdf" }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Failed to unlock PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
