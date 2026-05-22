// ============================================================
// PROTECT PDF — Add password protection using server-side API
// ============================================================

import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

export interface ProtectPDFOptions {
  userPassword: string;   // required to open the PDF
  ownerPassword?: string; // admin password (defaults to userPassword if empty)
}

/**
 * Adds password protection to a PDF using server-side Python/PyMuPDF processing.
 *
 * The browser-based pdf-lib library does not support encryption in v1.17.1.
 * This function calls the /api/protect/pdf endpoint which uses PyMuPDF on the server.
 */
export async function protectPDF(
  file: File,
  options: ProtectPDFOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (!options.userPassword.trim()) {
    return { success: false, files: [], error: "Please enter a password." };
  }

  try {
    // Get file bytes for the form data
    const bytes = await readFileAsArrayBuffer(file);
    const formData = new FormData();
    formData.append("file", new Blob([bytes], { type: "application/pdf" }), file.name);
    formData.append("userPassword", options.userPassword);

    if (options.ownerPassword?.trim()) {
      formData.append("ownerPassword", options.ownerPassword);
    }

    // Call the server API
    const response = await fetch("/api/protect/pdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `Server error: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    // Get the protected PDF bytes
    const pdfBytes = await response.arrayBuffer();

    const blob = uint8ToBlob(new Uint8Array(pdfBytes), "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{ name: `${baseName}_protected.pdf`, blob, size: blob.size, type: "application/pdf" }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Password protection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}