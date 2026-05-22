// ============================================================
// Shared on-demand PDF.js loader — prevents duplicate script
// injection, memory leaks, and race conditions across all
// tools that need pdfjs (compressPDF, ocrPdf, pdfToImage,
// PDFToTextTool).
// ============================================================

const PDFJS_VERSION = "3.11.174";
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
const PDFJS_WORKER_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

let loadPromise: Promise<typeof window.pdfjsLib> | null = null;

// Extend Window interface for pdfjsLib
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfjsLib: any;
  }
}

/**
 * Loads PDF.js from CDN exactly once and returns the pdfjsLib object.
 * Subsequent calls return the cached promise — no duplicate scripts.
 */
export function loadPdfjs(): Promise<typeof window.pdfjsLib> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("PDF.js requires a browser environment"));
  }

  // Already loaded
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
    return Promise.resolve(window.pdfjsLib);
  }

  // Loading in progress — return same promise
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<typeof window.pdfjsLib>((resolve, reject) => {
    // Check if script already in DOM (e.g. from SSR or previous load)
    const existing = document.querySelector(`script[src="${PDFJS_CDN}"]`);
    if (existing) {
      // Wait for it to finish loading
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
        resolve(window.pdfjsLib);
        return;
      }
      existing.addEventListener("load", () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
        resolve(window.pdfjsLib);
      });
      existing.addEventListener("error", () =>
        reject(new Error("PDF.js script failed to load"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = PDFJS_CDN;
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN;
        resolve(window.pdfjsLib);
      } else {
        reject(new Error("PDF.js loaded but pdfjsLib not found on window"));
      }
    };

    script.onerror = () => {
      loadPromise = null; // Allow retry on next call
      reject(new Error("Failed to load PDF.js from CDN. Check your network connection."));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}
