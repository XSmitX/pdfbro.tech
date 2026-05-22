"use client";

import { useState, useCallback } from "react";
import { AlertCircle, FileOutput } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { splitPDF } from "@/modules/tools/splitPDF";
import type { ProcessingResult } from "@/lib/types";

export default function ExtractPDFPagesTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState("1,3,5-7");

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF."); return; }
    if (!pages.trim()) { setError("Please enter page numbers or ranges to extract."); return; }
    setIsProcessing(true); setProgress(20); setError(null); setResult(null);
    try {
      const pi = setInterval(() => setProgress(p => Math.min(p + 12, 85)), 300);
      const r = await splitPDF(files[0].file, { mode: "range", ranges: pages });
      clearInterval(pi); setProgress(100);
      if (!r.success) setError(r.error ?? "Extraction failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, pages]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#7c3aed" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="Extract specific pages into a new PDF file." />
            </div>

            <div className="rounded-2xl p-5 space-y-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <label className="text-sm font-semibold block" style={{ color: "var(--text-primary)" }}>Pages to Extract</label>
              <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="e.g. 1,3,5-7,10"
                className="w-full rounded-xl px-3 py-2.5 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Enter page numbers separated by commas. Use hyphens for ranges (e.g. 1-3,5,7-9).</p>
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

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Extracting pages..." color="#7c3aed" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || !files[0]}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#7c3aed" }}>
              <FileOutput className="h-5 w-5" />
              {isProcessing ? "Extracting..." : "Extract Pages"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
