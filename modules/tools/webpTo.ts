import type { ProcessingResult } from "@/lib/types";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/utils";

type WebPTarget = "jpeg" | "png";

export async function webpTo(files: File[], target: WebPTarget, quality = 0.9): Promise<ProcessingResult> {
    const startTime = Date.now();

    if (files.length === 0) {
        return { success: false, files: [], error: "No WebP files provided." };
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

            if (target === "jpeg") {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            const mime = target === "jpeg" ? "image/jpeg" : "image/png";
            const blob = await canvasToBlob(canvas, mime, target === "jpeg" ? quality : undefined);
            const ext = target === "jpeg" ? "jpg" : "png";

            outputFiles.push({
                name: `${stripExtension(file.name)}.${ext}`,
                blob,
                size: blob.size,
                type: mime,
            });
        } catch {
            continue;
        }
    }

    if (outputFiles.length === 0) {
        return { success: false, files: [], error: "Failed to convert any WebP files." };
    }

    return {
        success: true,
        files: outputFiles,
        processingTime: Date.now() - startTime,
    };
}
