"use client";

import { useState, useCallback } from "react";
import { AlertCircle, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { imagesToPDF } from "@/modules/tools/imageToPDF";
import type { ProcessingResult, ImageToPDFOptions } from "@/lib/types";
import { cn } from "@/lib/utils";

type PageSize = ImageToPDFOptions["pageSize"];

export default function ImageToPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [margin, setMargin] = useState(20);

  const {
    files,
    isDragging,
    inputRef,
    addFiles,
    removeFile,
    reorderFiles,
    clearFiles,
    dropZoneProps,
    error: uploadError,
  } = useFileUpload({
    acceptedTypes: "image/*",
    multiple: true,
    maxFileSize: 50 * 1024 * 1024,
    maxFiles: 30,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 12, 85));
      }, 250);

      const rawFiles = files.map((f) => f.file);
      const pdfResult = await imagesToPDF(rawFiles, { pageSize, margin });

      clearInterval(progressInterval);
      setProgress(100);

      if (!pdfResult.success) {
        setError(pdfResult.error ?? "Conversion failed.");
      } else {
        setResult(pdfResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, pageSize, margin]);

  const handleReset = () => {
    clearFiles();
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const PAGE_SIZES: { id: PageSize; label: string }[] = [
    { id: "A4", label: "A4" },
    { id: "Letter", label: "Letter" },
    { id: "fit", label: "Fit to Image" },
  ];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPanel key="result" result={result} onReset={handleReset} accentColor="#22c55e" />
        ) : (
          <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <DropZone
                isDragging={isDragging}
                files={files}
                acceptedTypes="image/*"
                multiple
                onRemove={removeFile}
                dropZoneProps={dropZoneProps}
                inputRef={inputRef}
                onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                onReorder={reorderFiles}
                label="Drop images here or click to browse"
                hint="Supports JPG, PNG, WEBP, GIF. Each image becomes a page."
              />
            </div>

            {/* Options */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Page Size</p>
                <div className="flex gap-2">
                  {PAGE_SIZES.map((ps) => (
                    <button
                      key={ps.id}
                      onClick={() => setPageSize(ps.id)}
                      className={cn(
                        "flex-1 rounded-lg border py-2 text-sm font-medium transition-colors",
                        pageSize === ps.id
                          ? "border-green-400 bg-green-50 text-green-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {ps.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-700">Margin</p>
                  <span className="text-xs text-slate-500">{margin}pt</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value))}
                  className="w-full accent-green-500"
                />
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
                <ProgressBar progress={progress} label="Converting to PDF..." color="#22c55e" />
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ImageIcon className="h-5 w-5" />
              {isProcessing ? "Converting..." : `Convert ${files.length > 0 ? files.length : ""} Image${files.length !== 1 ? "s" : ""} to PDF`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
