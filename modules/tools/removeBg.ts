// ============================================================
// REMOVE BACKGROUND — Hybrid: local edge-based + API provider
// ============================================================

import type { ProcessingResult } from "@/lib/types";
import { loadImageFromFile, canvasToBlob, stripExtension } from "@/lib/utils";

export type RemoveBgProvider = "local" | "removebg-api";

export interface RemoveBgOptions {
  provider: RemoveBgProvider;
  apiKey?: string;          // required for "removebg-api"
  tolerance?: number;       // 0–100 for local edge-detect (default 30)
  featherEdges?: boolean;   // soft edge removal (local only)
}

/**
 * Remove Background — Two strategies:
 *
 * 1. "local" — Uses a Canvas-based approach:
 *    - Detects background color from corners
 *    - Applies color-distance threshold to create alpha mask
 *    - Feathers edges for smoother result
 *    Works best for images with uniform backgrounds.
 *
 * 2. "removebg-api" — Calls remove.bg REST API with user's API key.
 *    Handles complex backgrounds, hair, fur, etc.
 *    Free tier: 50 previews/month.
 */
export async function removeBackground(
  file: File,
  options: RemoveBgOptions
): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (options.provider === "removebg-api") {
    return removeBackgroundViaAPI(file, options, startTime);
  }

  return removeBackgroundLocal(file, options, startTime);
}

// ─── Local background removal ────────────────────────────────

async function removeBackgroundLocal(
  file: File,
  options: RemoveBgOptions,
  startTime: number
): Promise<ProcessingResult> {
  try {
    const img = await loadImageFromFile(file);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { success: false, files: [], error: "Canvas not available." };

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    // Sample background color from all 4 corners + center of edges
    const samples: [number, number, number][] = [];
    const samplePoints = [
      0, // top-left
      (w - 1) * 4, // top-right
      (h - 1) * w * 4, // bottom-left
      ((h - 1) * w + w - 1) * 4, // bottom-right
      Math.floor(w / 2) * 4, // top-center
      (Math.floor(h / 2) * w) * 4, // left-center
    ];

    for (const idx of samplePoints) {
      if (idx < data.length - 3) {
        samples.push([data[idx], data[idx + 1], data[idx + 2]]);
      }
    }

    // Average background color
    const bgR = Math.round(samples.reduce((s, c) => s + c[0], 0) / samples.length);
    const bgG = Math.round(samples.reduce((s, c) => s + c[1], 0) / samples.length);
    const bgB = Math.round(samples.reduce((s, c) => s + c[2], 0) / samples.length);

    const tolerance = options.tolerance ?? 30;
    const feather = options.featherEdges ?? true;

    // Apply alpha mask based on color distance
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Euclidean color distance
      const dist = Math.sqrt(
        Math.pow(r - bgR, 2) +
        Math.pow(g - bgG, 2) +
        Math.pow(b - bgB, 2)
      );

      if (dist < tolerance) {
        // Background pixel — make transparent
        data[i + 3] = 0;
      } else if (feather && dist < tolerance * 1.5) {
        // Soft edge — partial transparency
        const alpha = Math.round(((dist - tolerance) / (tolerance * 0.5)) * 255);
        data[i + 3] = Math.min(255, alpha);
      }
      // else: foreground pixel — keep fully opaque
    }

    ctx.putImageData(imageData, 0, 0);

    // Export as PNG (preserves transparency)
    const blob = await canvasToBlob(canvas, "image/png", 1.0);
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{
        name: `${baseName}_nobg.png`,
        blob,
        size: blob.size,
        type: "image/png",
      }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Background removal failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ─── API-based background removal (remove.bg) ────────────────

async function removeBackgroundViaAPI(
  file: File,
  options: RemoveBgOptions,
  startTime: number
): Promise<ProcessingResult> {
  if (!options.apiKey?.trim()) {
    return {
      success: false,
      files: [],
      error: "API key is required for remove.bg. Get a free key at remove.bg.",
    };
  }

  try {
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": options.apiKey },
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = (errData as { errors?: { title?: string }[] })?.errors?.[0]?.title ?? `API error: ${response.status}`;
      return { success: false, files: [], error: msg };
    }

    const blob = await response.blob();
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{
        name: `${baseName}_nobg.png`,
        blob,
        size: blob.size,
        type: "image/png",
      }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `API request failed: ${error instanceof Error ? error.message : "Network error"}`,
    };
  }
}
