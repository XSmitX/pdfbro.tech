"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { compressImages } from "@/modules/tools/compressImage";
import type { ProcessingResult } from "@/lib/types";

export default function CompressImageTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [maxDimension, setMaxDimension] = useState(1920);

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
    maxFileSize: 30 * 1024 * 1024,
    maxFiles: 20,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setIsProcessing(true);
    setProgress(5);
    setError(null);
    setResult(null);

    try {
      const rawFiles = files.map((f) => f.file);
      const compressResult = await compressImages(
        rawFiles,
        {
          maxSizeMB,
          maxWidthOrHeight: maxDimension,
          quality,
          useWebWorker: true,
        },
        (fileIdx, fileProgress) => {
          const overall = ((fileIdx / rawFiles.length) * 100) + (fileProgress / rawFiles.length);
          setProgress(Math.min(Math.round(overall), 95));
        }
      );

      setProgress(100);

      if (!compressResult.success) {
        setError(compressResult.error ?? "Compression failed.");
      } else {
        setResult(compressResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, quality, maxSizeMB, maxDimension]);

  const handleReset = () => {
    clearFiles();
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPanel key="result" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#8b5cf6" />
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
                hint="Supports JPG, PNG, WEBP. Batch compress up to 20 images."
              />
            </div>

            {/* Options */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-5">
              {/* Quality */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-700">Quality</p>
                  <span className="text-sm font-semibold text-violet-600">{Math.round(quality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={Math.round(quality * 100)}
                  onChange={(e) => setQuality(parseInt(e.target.value) / 100)}
                  className="w-full accent-violet-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              {/* Max size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-700">Max File Size</p>
                  <span className="text-sm font-semibold text-violet-600">{maxSizeMB} MB</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={maxSizeMB}
                  onChange={(e) => setMaxSizeMB(parseFloat(e.target.value))}
                  className="w-full accent-violet-500"
                />
              </div>

              {/* Max dimension */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-700">Max Dimension</p>
                  <span className="text-sm font-semibold text-violet-600">{maxDimension}px</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[640, 1080, 1280, 1920, 2560, 4096].map((dim) => (
                    <button
                      key={dim}
                      onClick={() => setMaxDimension(dim)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        maxDimension === dim
                          ? "border-violet-400 bg-violet-50 text-violet-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {dim}px
                    </button>
                  ))}
                </div>
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
                <ProgressBar progress={progress} label="Compressing images..." color="#8b5cf6" />
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minimize2 className="h-5 w-5" />
              {isProcessing ? "Compressing..." : `Compress ${files.length > 0 ? files.length : ""} Image${files.length !== 1 ? "s" : ""}`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
