"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FileImage } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { pdfToImages } from "@/modules/tools/pdfToImage";
import type { ProcessingResult, PDFToImageOptions } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function PDFToImageTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [scale, setScale] = useState(2.0);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf",
    multiple: false,
    maxFileSize: 50 * 1024 * 1024,
    maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) { setError("Please upload a PDF file."); return; }

    setIsProcessing(true);
    setProgress(5);
    setError(null);
    setResult(null);

    try {
      const options: PDFToImageOptions = {
        format,
        quality: format === "jpeg" ? 0.92 : 1.0,
        scale,
      };

      const convertResult = await pdfToImages(
        files[0].file,
        options,
        (current, total) => {
          setProgress(Math.round((current / total) * 90) + 5);
        }
      );

      setProgress(100);
      if (!convertResult.success) setError(convertResult.error ?? "Conversion failed.");
      else setResult(convertResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, format, scale]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  const SCALES = [
    { value: 1.0, label: "72 DPI", quality: "Low" },
    { value: 1.5, label: "108 DPI", quality: "Medium" },
    { value: 2.0, label: "144 DPI", quality: "High" },
    { value: 3.0, label: "216 DPI", quality: "Ultra" },
  ];

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPanel key="result" result={result} onReset={handleReset} accentColor="#06b6d4" />
        ) : (
          <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="Each page will be converted to an image. Multiple pages → ZIP." />
            </div>

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Output Format</p>
                <div className="flex gap-2">
                  {(["png", "jpeg"] as const).map((f) => (
                    <button key={f} onClick={() => setFormat(f)} className="flex-1 rounded-xl border py-2 text-sm font-medium transition-all"
                      style={format === f ? { borderColor: "var(--accent-cyan)", backgroundColor: "rgba(34,211,238,0.1)", color: "var(--accent-cyan)" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {f === "png" ? "PNG (lossless)" : "JPEG (smaller)"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Quality / DPI</p>
                <div className="grid grid-cols-4 gap-2">
                  {SCALES.map((s) => (
                    <button key={s.value} onClick={() => setScale(s.value)} className="rounded-xl border py-2 text-center transition-all"
                      style={scale === s.value ? { borderColor: "var(--accent-cyan)", backgroundColor: "rgba(34,211,238,0.1)" } : { borderColor: "var(--border)" }}>
                      <p className="text-xs font-semibold" style={{ color: scale === s.value ? "var(--accent-cyan)" : "var(--text-primary)" }}>{s.quality}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3"
                  style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                  <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isProcessing && (
              <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <ProgressBar progress={progress} label="Converting pages to images..." color="#22d3ee" />
              </div>
            )}

            <button onClick={handleProcess} disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#06b6d4" }}>
              <FileImage className="h-5 w-5" />
              {isProcessing ? "Converting..." : "Convert PDF to Images"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
