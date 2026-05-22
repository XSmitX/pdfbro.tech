"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AlertCircle, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { compressPDF } from "@/modules/tools/compressPDF";
import { readFileAsArrayBuffer } from "@/lib/utils";
import type { ProcessingResult, CompressPDFOptions } from "@/lib/types";
import { cn } from "@/lib/utils";

type Quality = CompressPDFOptions["quality"];

const QUALITY_OPTIONS: { id: Quality; label: string; desc: string; reduction: string }[] = [
  { id: "low", label: "Maximum Compression", desc: "Smaller file, lower quality", reduction: "~60-80% smaller" },
  { id: "medium", label: "Balanced", desc: "Good quality, reduced size", reduction: "~30-50% smaller" },
  { id: "high", label: "Best Quality", desc: "Minimal compression, preserves quality", reduction: "~5-20% smaller" },
];

// Load pdfjs from CDN (bypasses webpack completely)
let scriptLoaded = false;
let scriptLoading: Promise<void> | null = null;

function loadPdfjsScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve, reject) => {
    // Check if already loaded (e.g. from a previous call)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).pdfjsLib) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    // Use the legacy build which has no import.meta.url issues
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib) {
        // Set worker for pdfjs 3.x (stable, widely CDN-available)
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        scriptLoaded = true;
        resolve();
      } else {
        reject(new Error("pdfjsLib not found after script load"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js from CDN"));
    document.head.appendChild(script);
  });

  return scriptLoading;
}

export default function CompressPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [quality, setQuality] = useState<Quality>("medium");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocRef = useRef<any>(null);
  const isMountedRef = useRef(false);

  const {
    files,
    isDragging,
    inputRef,
    addFiles,
    removeFile,
    clearFiles,
    dropZoneProps,
    error: uploadError,
  } = useFileUpload({
    acceptedTypes: "application/pdf",
    multiple: false,
    maxFileSize: 100 * 1024 * 1024,
    maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) {
      setError("Please upload a PDF file.");
      return;
    }

    // Ensure pdf.js is loaded before processing
    if (!scriptLoaded) {
      setPdfLoading(true);
      try {
        await loadPdfjsScript();
        console.log("PDF.js loaded before processing");
      } catch (err) {
        setError("Failed to load PDF.js. Please check your internet connection.");
        setPdfLoading(false);
        return;
      }
      setPdfLoading(false);
    }

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 5, 80));
      }, 400);

      // Create a pdf.js render function for canvas-based compression
      // We load the PDF bytes and provide a renderFn for page-to-JPEG conversion
      const pdfBytes = await readFileAsArrayBuffer(files[0].file);

      // Try to use pdf.js from window (CDN) for rasterization
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfjsLib = typeof window !== "undefined" ? (window as any)["pdfjsLib"] : null;

      let renderFn: ((pageIndex: number, scale: number) => Promise<Blob | null>) | undefined;

      if (pdfjsLib) {
        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

          const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfBytes) });
          const pdfDoc = await loadingTask.promise;
          pdfDocRef.current = pdfDoc;

          renderFn = async (pageIndex: number, scale: number): Promise<Blob | null> => {
            try {
              const page = await pdfDoc.getPage(pageIndex + 1);
              const viewport = page.getViewport({ scale });
              const canvas = document.createElement("canvas");
              canvas.width = Math.round(viewport.width);
              canvas.height = Math.round(viewport.height);
              const ctx = canvas.getContext("2d");
              if (!ctx) return null;
              await page.render({ canvasContext: ctx, viewport }).promise;
              const jpegQual = quality === "low" ? 0.45 : quality === "medium" ? 0.65 : 0.85;
              return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", jpegQual));
            } catch {
              return null;
            }
          };
        } catch {
          renderFn = undefined;
        }
      }

      const compressResult = await compressPDF(
        files[0].file,
        { quality },
        renderFn
      );

      clearInterval(progressInterval);
      setProgress(100);

      if (!compressResult.success) {
        setError(compressResult.error ?? "Compression failed.");
      } else {
        setResult(compressResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error during compression.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, quality]);

  // Load pdf.js when component mounts
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      setPdfLoading(true);
      loadPdfjsScript()
        .then(() => {
          setPdfLoading(false);
          console.log("PDF.js loaded successfully");
        })
        .catch((err) => {
          setPdfLoading(false);
          console.error("Failed to load PDF.js:", err);
        });
    }
  }, []);

  const handleReset = () => {
    clearFiles();
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const originalSize = files[0]?.size ?? 0;

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPanel
            key="result"
            result={result}
            originalSize={originalSize}
            onReset={handleReset}
            accentColor="#eab308"
          />
        ) : (
          <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <DropZone
                isDragging={isDragging}
                files={files}
                acceptedTypes="application/pdf"
                onRemove={removeFile}
                dropZoneProps={dropZoneProps}
                inputRef={inputRef}
                onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                label="Drop a PDF here or click to browse"
                hint="Upload a PDF to compress and reduce its file size."
              />
            </div>

            {/* Quality selector */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3">Compression Level</p>
              <div className="space-y-2">
                {QUALITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setQuality(opt.id)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-xl border p-3.5 text-left transition-colors",
                      quality === opt.id
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div>
                      <p className={cn("text-sm font-semibold", quality === opt.id ? "text-yellow-800" : "text-slate-700")}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </div>
                    <span className={cn("text-xs font-semibold rounded-full px-2 py-1",
                      quality === opt.id ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-500"
                    )}>
                      {opt.reduction}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isProcessing && (
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <ProgressBar progress={progress} label="Compressing PDF..." color="#eab308" />
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <PackageOpen className="h-5 w-5" />
              {isProcessing ? "Compressing..." : "Compress PDF"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
