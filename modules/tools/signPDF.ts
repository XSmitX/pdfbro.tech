import { PDFDocument } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

export interface SignPDFOptions {
    pageIndex: number;
    placement: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";
    widthRatio: number;
    marginRatio: number;
}

export async function signPDF(file: File, signaturePng: Blob, options: SignPDFOptions): Promise<ProcessingResult> {
    const startTime = Date.now();

    try {
        const bytes = await readFileAsArrayBuffer(file);
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = doc.getPages();
        const page = pages[Math.max(0, Math.min(options.pageIndex, pages.length - 1))];

        if (!page) {
            return { success: false, files: [], error: "Invalid page selection." };
        }

        const pngBytes = new Uint8Array(await signaturePng.arrayBuffer());
        const embedded = await doc.embedPng(pngBytes);

        const { width: pw, height: ph } = page.getSize();
        const sigW = Math.max(40, Math.min(pw * 0.8, pw * options.widthRatio));
        const sigH = (embedded.height / embedded.width) * sigW;
        const margin = Math.max(6, pw * options.marginRatio);

        let x = margin;
        let y = margin;

        switch (options.placement) {
            case "bottom-right":
                x = pw - sigW - margin;
                y = margin;
                break;
            case "bottom-left":
                x = margin;
                y = margin;
                break;
            case "top-right":
                x = pw - sigW - margin;
                y = ph - sigH - margin;
                break;
            case "top-left":
                x = margin;
                y = ph - sigH - margin;
                break;
            case "center":
                x = (pw - sigW) / 2;
                y = (ph - sigH) / 2;
                break;
        }

        page.drawImage(embedded, { x, y, width: sigW, height: sigH });

        const outBytes = await doc.save();
        const blob = uint8ToBlob(outBytes, "application/pdf");
        const baseName = stripExtension(file.name);

        return {
            success: true,
            files: [{ name: `${baseName}_signed.pdf`, blob, size: blob.size, type: "application/pdf" }],
            processingTime: Date.now() - startTime,
        };
    } catch (error) {
        return {
            success: false,
            files: [],
            error: `Sign PDF failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
    }
}
