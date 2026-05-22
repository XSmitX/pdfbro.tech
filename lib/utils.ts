// ============================================================
// UTILITY FUNCTIONS — pdfbro.tech
// ============================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind CSS classes safely */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Secure Endpoint Decoder */
export function getEndpoint(encoded: string): string {
  const k = [11, 45, 99, 12, 55, 87, 21, 66];
  const parts = encoded.split('.').filter(Boolean);
  let res = "";
  for(let i=0; i<parts.length; i++) {
      res += String.fromCharCode(parseInt(parts[i], 10) ^ k[i % k.length]);
  }
  return res;
}

/** Format bytes to human-readable string */

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/** Generate a unique ID */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

/** Download a Blob as a file */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Download multiple blobs as separate files */
export function downloadBlobs(
  files: Array<{ blob: Blob; name: string }>
): void {
  files.forEach(({ blob, name }, index) => {
    setTimeout(() => downloadBlob(blob, name), index * 200);
  });
}

/** Parse page range string like "1-3,5,7-9" into sorted array of 0-based indices */
export function parsePageRanges(
  rangeStr: string,
  totalPages: number
): number[] {
  const pages = new Set<number>();
  const parts = rangeStr.split(",").map((s) => s.trim());

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = parseInt(startStr.trim(), 10);
      const end = parseInt(endStr.trim(), 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) {
            pages.add(i - 1); // convert to 0-based
          }
        }
      }
    } else {
      const page = parseInt(part, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        pages.add(page - 1);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

/** Validate page range string */
export function isValidPageRange(rangeStr: string, totalPages: number): boolean {
  if (!rangeStr.trim()) return false;
  const pages = parsePageRanges(rangeStr, totalPages);
  return pages.length > 0;
}

/** Read file as ArrayBuffer */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
}

/** Read file as Data URL */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/** Load image from File, returns HTMLImageElement */
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

/** Convert canvas to Blob */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas export failed"));
      },
      type,
      quality
    );
  });
}

/** Get file extension from MIME type */
export function mimeToExtension(mime: string): string {
  const map: Record<string, string> = {
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
  };
  return map[mime] ?? "bin";
}

/** Strip file extension from name */
export function stripExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  return lastDot > 0 ? filename.slice(0, lastDot) : filename;
}

/** Calculate size reduction percentage */
export function sizeReduction(original: number, compressed: number): number {
  if (original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Sleep utility */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Convert hex color to RGB array */
export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [255, 255, 255];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

/** Check if browser supports Web Workers */
export function supportsWebWorkers(): boolean {
  return typeof Worker !== "undefined";
}

/** Free usage tracking (localStorage-based) */
export const usageTracker = {
  getCount(toolSlug: string): number {
    if (typeof window === "undefined") return 0;
    const key = `pdfbro_usage_${toolSlug}_${getDateKey()}`;
    return parseInt(localStorage.getItem(key) ?? "0", 10);
  },
  increment(toolSlug: string): void {
    if (typeof window === "undefined") return;
    const key = `pdfbro_usage_${toolSlug}_${getDateKey()}`;
    const current = parseInt(localStorage.getItem(key) ?? "0", 10);
    localStorage.setItem(key, String(current + 1));
  },
  hasReachedLimit(toolSlug: string, limit: number): boolean {
    return this.getCount(toolSlug) >= limit;
  },
};

function getDateKey(): string {
  return new Date().toISOString().split("T")[0];
}
