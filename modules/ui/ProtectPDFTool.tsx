"use client";

import { useState, useCallback } from "react";
import { AlertCircle, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { protectPDF } from "@/modules/tools/protectPDF";
import type { ProcessingResult } from "@/lib/types";

export default function ProtectPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userPw, setUserPw] = useState("");
  const [ownerPw, setOwnerPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload a PDF."); return; }
    if (!userPw.trim()) { setError("Please enter a password."); return; }
    setIsProcessing(true); setProgress(30); setError(null); setResult(null);
    try {
      const pi = setInterval(() => setProgress(p => Math.min(p + 15, 85)), 300);
      const r = await protectPDF(files[0].file, { userPassword: userPw, ownerPassword: ownerPw || undefined });
      clearInterval(pi); setProgress(100);
      if (!r.success) setError(r.error ?? "Protection failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, userPw, ownerPw]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); setUserPw(""); setOwnerPw(""); };

  const pwType = showPw ? "text" : "password";

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#dc2626" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF here" hint="A password will be required to open the protected PDF." />
            </div>

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>User Password <span style={{ color: "var(--accent-red)" }}>*</span></label>
                <div className="relative">
                  <input type={pwType} value={userPw} onChange={(e) => setUserPw(e.target.value)} placeholder="Enter password to open PDF"
                    className="w-full rounded-xl px-3 py-2.5 pr-10 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                  <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>Owner Password <span style={{ color: "var(--text-muted)" }}>(optional — for print/copy restrictions)</span></label>
                <input type={pwType} value={ownerPw} onChange={(e) => setOwnerPw(e.target.value)} placeholder="Leave empty to use same password"
                  className="w-full rounded-xl px-3 py-2.5 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
              </div>
              {userPw && (
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>Strength:</span>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-1.5 w-8 rounded-full" style={{ backgroundColor: i < Math.min(userPw.length / 3, 4) ? "#34d399" : "var(--border)" }} />
                  ))}
                </div>
              )}
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

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Protecting PDF..." color="#dc2626" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || !files[0] || !userPw}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#dc2626" }}>
              <ShieldCheck className="h-5 w-5" />
              {isProcessing ? "Protecting..." : "Protect PDF"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
