import { PDFDocument } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

export async function unlockPDF(file: File): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const bytes = await readFileAsArrayBuffer(file);

    let doc: PDFDocument;

    try {
      doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch (loadErr) {
      const msg = loadErr instanceof Error ? loadErr.message : "";
      if (
        msg.toLowerCase().includes("incorrect password") ||
        msg.toLowerCase().includes("invalid password")
      ) {
        return {
          success: false,
          files: [],
          error: "The password you entered is incorrect. Please try again.",
        };
      }
      if (
        msg.toLowerCase().includes("encrypt") ||
        msg.toLowerCase().includes("password") ||
        msg.toLowerCase().includes("encrypted")
      ) {
        return {
          success: false,
          files: [],
          error:
            "This PDF requires a password to open. Enter the password to unlock it, or use a desktop tool like Adobe Acrobat or QPDF for user-password-protected PDFs that cannot be decrypted in the browser.",
        };
      }
      return {
        success: false,
        files: [],
        error: `Failed to load PDF: ${msg || "Unknown error"}`,
      };
    }

    if (doc.isEncrypted) {
      return {
        success: false,
        files: [],
        error:
          "This PDF is encrypted with a password. Enter the document password to unlock it. For PDFs protected with a user password (requiring a password to open), browser-based decryption may not work — use a desktop tool instead.",
      };
    }

    const outBytes = await doc.save({ useObjectStreams: false });
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [
        {
          name: `${baseName}_unlocked.pdf`,
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
      error: `Failed to unlock PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
