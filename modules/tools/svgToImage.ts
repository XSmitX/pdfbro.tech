import type { ProcessingResult } from "@/lib/types";
import { canvasToBlob, stripExtension } from "@/lib/utils";

type SvgTarget = "png" | "jpeg";

async function loadSvgImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const svgText = String(reader.result ?? "");
            const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error("Failed to load SVG image"));
            };
            img.src = url;
        };
        reader.onerror = () => reject(new Error("Failed to read SVG file"));
        reader.readAsText(file);
    });
}

export async function svgToImage(files: File[], target: SvgTarget, quality = 0.92): Promise<ProcessingResult> {
    const startTime = Date.now();

    if (files.length === 0) {
        return { success: false, files: [], error: "No SVG files provided." };
    }

    const outputFiles: ProcessingResult["files"] = [];

    for (const file of files) {
        try {
            const img = await loadSvgImage(file);
            const width = img.naturalWidth || 1024;
            const height = img.naturalHeight || 1024;

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (!ctx) continue;

            if (target === "jpeg") {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, width, height);
            }

            ctx.drawImage(img, 0, 0, width, height);

            const mime = target === "png" ? "image/png" : "image/jpeg";
            const blob = await canvasToBlob(canvas, mime, target === "jpeg" ? quality : undefined);
            const ext = target === "png" ? "png" : "jpg";

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
        return { success: false, files: [], error: "Failed to convert any SVG files." };
    }

    return {
        success: true,
        files: outputFiles,
        processingTime: Date.now() - startTime,
    };
}
