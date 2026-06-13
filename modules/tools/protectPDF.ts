import { PDFDocument } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

export interface ProtectPDFOptions {
  userPassword: string;
  ownerPassword?: string;
}

export async function protectPDF(
  file: File,
  options: ProtectPDFOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();
  const userPassword = options.userPassword;

  if (!userPassword || userPassword.trim().length === 0) {
    return { success: false, files: [], error: "Please enter a password to protect the PDF." };
  }

  if (userPassword.length > 256) {
    return { success: false, files: [], error: "Password must be 256 characters or fewer." };
  }

  if (userPassword.includes("\0")) {
    return { success: false, files: [], error: "Password contains an invalid character." };
  }

  try {
    const bytes = await readFileAsArrayBuffer(file);

    const doc = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const ownerPassword = options.ownerPassword?.trim() || userPassword;

    (doc as any).encrypt({
      userPassword,
      ownerPassword,
      standardSecurityHandlerRevision: 6,
    });

    const outBytes = await doc.save({ useObjectStreams: false });
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [
        {
          name: `${baseName}_protected.pdf`,
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
      error: `Failed to protect PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
