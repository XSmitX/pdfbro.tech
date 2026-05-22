import type { ProcessingResult } from "@/lib/types";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/utils";

export async function jpgToPng(files: File[]): Promise<ProcessingResult> {
    const startTime = Date.now();

    if (files.length === 0) {
        return { success: false, files: [], error: "No JPG files provided." };
    }

    const outputFiles: ProcessingResult["files"] = [];

    for (const file of files) {
        try {
            const img = await loadImageFromFile(file);
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) continue;

            ctx.drawImage(img, 0, 0);
            const pngBlob = await canvasToBlob(canvas, "image/png");

            outputFiles.push({
                name: `${stripExtension(file.name)}.png`,
                blob: pngBlob,
                size: pngBlob.size,
                type: "image/png",
            });
        } catch {
            continue;
        }
    }

    if (outputFiles.length === 0) {
        return { success: false, files: [], error: "Failed to convert any JPG files." };
    }

    return {
        success: true,
        files: outputFiles,
        processingTime: Date.now() - startTime,
    };
}
