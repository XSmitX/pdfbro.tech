"use client";

import { useState, useCallback } from "react";
import { AlertCircle, ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { pngToJpeg } from "@/modules/tools/pngToJpeg";
import type { ProcessingResult } from "@/lib/types";

export default function PNGToJPEGTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(85);
  const [bgColor, setBgColor] = useState("#ffffff");

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
    acceptedTypes: "image/png",
    multiple: true,
    maxFileSize: 20 * 1024 * 1024,
    maxFiles: 20,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) {
      setError("Please upload at least one PNG file.");
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 15, 88));
      }, 200);

      const rawFiles = files.map((f) => f.file);
      const convertResult = await pngToJpeg(rawFiles, { quality, background: bgColor });

      clearInterval(progressInterval);
      setProgress(100);

      if (!convertResult.success) {
        setError(convertResult.error ?? "Conversion failed.");
      } else {
        setResult(convertResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, quality, bgColor]);

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
          <ResultPanel key="result" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#3b82f6" />
        ) : (
          <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <DropZone
                isDragging={isDragging}
                files={files}
                acceptedTypes="image/png"
                multiple
                onRemove={removeFile}
                dropZoneProps={dropZoneProps}
                inputRef={inputRef}
                onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                onReorder={reorderFiles}
                label="Drop PNG files here or click to browse"
                hint="Transparent areas will be filled with the background color."
              />
            </div>

            {/* Options */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-5">
              {/* Quality */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-700">JPEG Quality</p>
                  <span className="text-sm font-semibold text-blue-600">{quality}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              {/* Background color */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Background Color <span className="text-xs font-normal text-slate-400">(for transparency)</span>
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono text-slate-900 focus:border-blue-400 focus:outline-none"
                    maxLength={7}
                  />
                  <button
                    onClick={() => setBgColor("#ffffff")}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    Reset
                  </button>
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
                <ProgressBar progress={progress} label="Converting to JPEG..." color="#3b82f6" />
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeftRight className="h-5 w-5" />
              {isProcessing ? "Converting..." : `Convert ${files.length > 0 ? files.length : ""} PNG${files.length !== 1 ? "s" : ""} to JPEG`}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
