"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { splitPDF } from "@/modules/tools/splitPDF";
import type { ProcessingResult, SplitPDFOptions } from "@/lib/types";
import { cn } from "@/lib/utils";

type SplitMode = "range" | "every" | "extract";

export default function SplitPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<SplitMode>("range");
  const [rangeInput, setRangeInput] = useState("1-3");
  const [everyN, setEveryN] = useState(1);

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

    setIsProcessing(true);
    setProgress(15);
    setError(null);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 85));
      }, 300);

      const options: SplitPDFOptions =
        mode === "range"
          ? { mode: "range", ranges: rangeInput }
          : mode === "every"
          ? { mode: "every", everyN }
          : { mode: "extract" };

      const splitResult = await splitPDF(files[0].file, options);

      clearInterval(progressInterval);
      setProgress(100);

      if (!splitResult.success) {
        setError(splitResult.error ?? "Split failed.");
      } else {
        setResult(splitResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error during split.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, mode, rangeInput, everyN]);

  const handleReset = () => {
    clearFiles();
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const MODES: { id: SplitMode; label: string; desc: string }[] = [
    { id: "range", label: "By Range", desc: "Extract specific pages, e.g. 1-3,5,7-9" },
    { id: "every", label: "Every N Pages", desc: "Split into equal chunks" },
    { id: "extract", label: "Extract All", desc: "One PDF per page" },
  ];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPanel
            key="result"
            result={result}
            onReset={handleReset}
            accentColor="#f97316"
          />
        ) : (
          <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {/* Drop Zone */}
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
                hint="Upload one PDF to split into multiple files."
              />
            </div>

            {/* Split mode selector */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-700 mb-3">Split Mode</p>
              <div className="grid grid-cols-3 gap-2">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-colors",
                      mode === m.id
                        ? "border-orange-400 bg-orange-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <p className={cn("text-sm font-semibold", mode === m.id ? "text-orange-700" : "text-slate-700")}>
                      {m.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{m.desc}</p>
                  </button>
                ))}
              </div>

              {/* Mode-specific options */}
              <div className="mt-4">
                {mode === "range" && (
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                      Page Ranges
                    </label>
                    <input
                      type="text"
                      value={rangeInput}
                      onChange={(e) => setRangeInput(e.target.value)}
                      placeholder="e.g. 1-3,5,7-9"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Enter page numbers separated by commas. Use hyphens for ranges.
                    </p>
                  </div>
                )}

                {mode === "every" && (
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                      Pages Per Chunk
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={everyN}
                        onChange={(e) => setEveryN(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-orange-400 focus:outline-none"
                      />
                      <span className="text-sm text-slate-500">pages per output file</span>
                    </div>
                  </div>
                )}

                {mode === "extract" && (
                  <p className="text-sm text-slate-500">
                    Each page will be extracted into a separate PDF file.
                  </p>
                )}
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            {isProcessing && (
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <ProgressBar progress={progress} label="Splitting PDF..." color="#f97316" />
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Scissors className="h-5 w-5" />
              {isProcessing ? "Splitting..." : "Split PDF"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
