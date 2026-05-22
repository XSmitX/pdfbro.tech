"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FilePlus2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { mergePDFs } from "@/modules/tools/mergePDF";
import type { ProcessingResult } from "@/lib/types";

export default function MergePDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    acceptedTypes: "application/pdf",
    multiple: true,
    maxFileSize: 100 * 1024 * 1024,
    maxFiles: 20,
  });

  const handleProcess = useCallback(async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 8, 85));
      }, 300);

      const rawFiles = files.map((f) => f.file);
      const mergeResult = await mergePDFs(rawFiles);

      clearInterval(progressInterval);
      setProgress(100);

      if (!mergeResult.success) {
        setError(mergeResult.error ?? "Merge failed.");
      } else {
        setResult(mergeResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error during merge.");
    } finally {
      setIsProcessing(false);
    }
  }, [files]);

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
          <ResultPanel
            key="result"
            result={result}
            originalSize={totalSize}
            onReset={handleReset}
            accentColor="#ef4444"
          />
        ) : (
          <motion.div
            key="tool"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Drop Zone */}
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone
                isDragging={isDragging}
                files={files}
                acceptedTypes="application/pdf"
                multiple
                onRemove={removeFile}
                dropZoneProps={dropZoneProps}
                inputRef={inputRef}
                onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                onReorder={reorderFiles}
                label="Drop PDF files here or click to browse"
                hint="Upload multiple PDFs to merge them in order. Drag to reorder."
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2 rounded-xl px-4 py-3"
                  style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                  <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            {isProcessing && (
              <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <ProgressBar progress={progress} label="Merging PDFs..." color="#f87171" />
              </div>
            )}

            {/* Process button */}
            <button
              onClick={handleProcess}
              disabled={isProcessing || files.length < 2}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#ef4444" }}
            >
              <FilePlus2 className="h-5 w-5" />
              {isProcessing ? "Merging..." : `Merge ${files.length > 0 ? files.length : ""} PDFs`}
            </button>

            {files.length < 2 && (
              <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
                Add at least 2 PDF files to enable merging
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
