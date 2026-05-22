// ============================================================
// PASSPORT PHOTO GENERATOR — Real processing logic using Canvas API
// ============================================================

import type { ProcessingResult, PassportPhotoOptions } from "@/lib/types";
import { loadImageFromFile, canvasToBlob } from "@/lib/utils";

// ── Standard passport photo sizes (in pixels at 300 DPI) ──
// Formula: mm * (300 / 25.4) = pixels at 300 DPI
const PASSPORT_SIZES: Record<
  PassportPhotoOptions["size"],
  { widthMM: number; heightMM: number; widthPx: number; heightPx: number; label: string }
> = {
  "2x2": {
    widthMM: 50.8,
    heightMM: 50.8,
    widthPx: 600,
    heightPx: 600,
    label: "US 2×2 inch (600×600px @ 300dpi)",
  },
  "35x45": {
    widthMM: 35,
    heightMM: 45,
    widthPx: 413,
    heightPx: 531,
    label: "EU/UK 35×45mm (413×531px @ 300dpi)",
  },
  "51x51": {
    widthMM: 51,
    heightMM: 51,
    widthPx: 600,
    heightPx: 600,
    label: "Indian 51×51mm (600×600px @ 300dpi)",
  },
};

// ── Layout configurations ──
interface LayoutConfig {
  cols: number;
  rows: number;
  gapPx: number;
  borderPx: number;
}

const LAYOUTS: Record<PassportPhotoOptions["layout"], LayoutConfig> = {
  single: { cols: 1, rows: 1, gapPx: 0, borderPx: 20 },
  "4x1": { cols: 4, rows: 1, gapPx: 8, borderPx: 20 },
  "2x2grid": { cols: 2, rows: 2, gapPx: 8, borderPx: 20 },
};

/**
 * Generates a passport photo at the correct size and layout.
 *
 * Steps:
 * 1. Load the uploaded image
 * 2. Crop to passport aspect ratio (center crop, preserving faces generally)
 * 3. Resize to target passport dimensions
 * 4. Apply white/specified background
 * 5. Arrange copies in the requested layout (single, 4-up strip, 2×2 grid)
 * 6. Export as high-quality JPEG
 */
export async function generatePassportPhoto(
  file: File,
  options: PassportPhotoOptions = {
    size: "2x2",
    backgroundColor: "#ffffff",
    layout: "2x2grid",
  }
): Promise<ProcessingResult> {
  const startTime = Date.now();

  try {
    const sizeConfig = PASSPORT_SIZES[options.size];
    const layoutConfig = LAYOUTS[options.layout];

    // ── Step 1: Load image ──
    const img = await loadImageFromFile(file);
    const { naturalWidth: sw, naturalHeight: sh } = img;

    // ── Step 2: Center-crop to target aspect ratio ──
    const targetRatio = sizeConfig.widthPx / sizeConfig.heightPx;
    const srcRatio = sw / sh;

    let cropX = 0, cropY = 0, cropW = sw, cropH = sh;

    if (srcRatio > targetRatio) {
      // Source is wider — crop sides
      cropW = sh * targetRatio;
      cropX = (sw - cropW) / 2;
    } else if (srcRatio < targetRatio) {
      // Source is taller — crop top/bottom (bias toward top for faces)
      cropH = sw / targetRatio;
      cropY = Math.max(0, (sh - cropH) * 0.2); // 20% from top = include more head
    }

    // ── Step 3: Create the single passport photo canvas ──
    const photoCanvas = document.createElement("canvas");
    photoCanvas.width = sizeConfig.widthPx;
    photoCanvas.height = sizeConfig.heightPx;
    const photoCtx = photoCanvas.getContext("2d");
    if (!photoCtx) {
      return { success: false, files: [], error: "Canvas not available." };
    }

    // Fill background
    photoCtx.fillStyle = options.backgroundColor;
    photoCtx.fillRect(0, 0, sizeConfig.widthPx, sizeConfig.heightPx);

    // Draw cropped + scaled image
    photoCtx.drawImage(
      img,
      cropX, cropY, cropW, cropH,
      0, 0, sizeConfig.widthPx, sizeConfig.heightPx
    );

    // ── Step 4: Create the layout canvas ──
    const { cols, rows, gapPx, borderPx } = layoutConfig;
    const layoutW = borderPx * 2 + cols * sizeConfig.widthPx + (cols - 1) * gapPx;
    const layoutH = borderPx * 2 + rows * sizeConfig.heightPx + (rows - 1) * gapPx;

    const layoutCanvas = document.createElement("canvas");
    layoutCanvas.width = layoutW;
    layoutCanvas.height = layoutH;
    const layoutCtx = layoutCanvas.getContext("2d");
    if (!layoutCtx) {
      return { success: false, files: [], error: "Layout canvas not available." };
    }

    // White sheet background
    layoutCtx.fillStyle = "#ffffff";
    layoutCtx.fillRect(0, 0, layoutW, layoutH);

    // Place photo copies in grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = borderPx + col * (sizeConfig.widthPx + gapPx);
        const y = borderPx + row * (sizeConfig.heightPx + gapPx);
        layoutCtx.drawImage(photoCanvas, x, y);

        // Thin border around each photo
        layoutCtx.strokeStyle = "rgba(0,0,0,0.15)";
        layoutCtx.lineWidth = 1;
        layoutCtx.strokeRect(x, y, sizeConfig.widthPx, sizeConfig.heightPx);
      }
    }

    // ── Step 5: Export ──
    // Single photo export
    const singleBlob = await canvasToBlob(photoCanvas, "image/jpeg", 0.95);
    // Layout export
    const layoutBlob = await canvasToBlob(layoutCanvas, "image/jpeg", 0.95);

    const outputFiles: ProcessingResult["files"] = [];

    if (options.layout === "single") {
      outputFiles.push({
        name: `passport_photo_${options.size}.jpg`,
        blob: singleBlob,
        size: singleBlob.size,
        type: "image/jpeg",
      });
    } else {
      outputFiles.push(
        {
          name: `passport_photo_${options.size}.jpg`,
          blob: singleBlob,
          size: singleBlob.size,
          type: "image/jpeg",
        },
        {
          name: `passport_photo_${options.layout}_layout.jpg`,
          blob: layoutBlob,
          size: layoutBlob.size,
          type: "image/jpeg",
        }
      );
    }

    return {
      success: true,
      files: outputFiles,
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      files: [],
      error: `Passport photo generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export { PASSPORT_SIZES };
