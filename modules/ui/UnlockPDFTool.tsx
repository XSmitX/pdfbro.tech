"use client";

import { useState, useCallback } from "react";
import { AlertCircle, LockOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import type { ProcessingResult } from "@/lib/types";
import { stripExtension, getEndpoint } from "@/lib/utils";

export default function UnlockPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF."); return; }
    if (!password) { setError("Please enter the password to unlock the PDF."); return; }
    
    setIsProcessing(true); setProgress(30); setError(null); setResult(null);
    try {
      const pi = setInterval(() => setProgress(p => Math.min(p + 20, 85)), 300);
      
      const formData = new FormData();
      formData.append("file", files[0].file);
      formData.append("password", password);

      const response = await fetch(getEndpoint("36.76.19.101.24.34.123.46.100.78.8.35.71.51.115"), {
        method: "POST",
        body: formData,
      });

      clearInterval(pi);
      setProgress(100);

      if (!response.ok) {
        let errMsg = "Failed to unlock PDF";
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch (e) {}
        throw new Error(errMsg);
      }

      const blob = await response.blob();
      const baseName = stripExtension(files[0].file.name);
      
      setResult({
        success: true,
        files: [{ name: `${baseName}_unlocked.pdf`, blob, size: blob.size, type: "application/pdf" }],
        processingTime: 0,
      });
    } catch (e) { 
      setError(e instanceof Error ? e.message : "Error"); 
    } finally { 
      setIsProcessing(false); 
    }
  }, [files, password]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#059669" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="Supports unlocking fully protected PDFs using our secure backend." />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>PDF Password</label>
              <input
                type="text"
                placeholder="Enter password to unlock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm input-dark"
                disabled={isProcessing || !files[0]}
              />
            </div>

            {/* Info box */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "#34d399" }}>ℹ️ How it works</p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                This tool removes password restrictions from PDFs. You must provide the correct password to unlock the document completely.
              </p>
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

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Unlocking PDF..." color="#059669" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || !files[0]}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#059669" }}>
              <LockOpen className="h-5 w-5" />
              {isProcessing ? "Unlocking..." : "Unlock PDF"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
