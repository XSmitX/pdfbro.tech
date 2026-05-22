import type { ProcessingResult } from "@/lib/types";
import { stripExtension } from "@/lib/utils";

/**
 * Reads a DOCX file and converts it to HTML for editing.
 */
export async function convertWordToHtml(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/convert/word-to-html", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to convert Word document");
  }

  const data = await res.json();
  return data.html;
}

/**
 * Converts edited HTML back to a DOCX file using html-docx-js.
 */
export async function convertHtmlToWord(html: string, originalFileName: string): Promise<ProcessingResult> {
  const startTime = Date.now();
  
  try {
    // Dynamically import html-docx-js to avoid server-side issues
     
    const htmlDocx = require("html-docx-js/dist/html-docx");
    
    // We wrap the HTML in a basic template to ensure it renders correctly
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title></head><body>${html}</body></html>`;
    
    const blob = htmlDocx.asBlob(fullHtml);
    const baseName = stripExtension(originalFileName);

    return {
      success: true,
      files: [
        {
          name: `${baseName}_edited.docx`,
          blob,
          size: blob.size,
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      ],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Failed to save Word document: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
