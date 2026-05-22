"use client";

import { useState, useCallback } from "react";
import { AlertCircle, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { PDFDocument } from "pdf-lib";
import { readFileAsArrayBuffer } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";
import type { ProcessingResult } from "@/lib/types";

export default function ReorderPDFPagesTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]); // 0-indexed
  const [totalPages, setTotalPages] = useState(0);
  const [loadingPages, setLoadingPages] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  const loadPages = useCallback(async () => {
    if (!files[0]) return;
    setLoadingPages(true); setError(null); setPageOrder([]); setResult(null);
    try {
      const bytes = await readFileAsArrayBuffer(files[0].file);
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const n = doc.getPageCount();
      setTotalPages(n);
      setPageOrder(Array.from({ length: n }, (_, i) => i));
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to load PDF."); }
    finally { setLoadingPages(false); }
  }, [files]);

  const handleProcess = useCallback(async () => {
    if (!files[0] || pageOrder.length === 0) return;
    setIsProcessing(true); setProgress(20); setError(null); setResult(null);
    try {
      const bytes = await readFileAsArrayBuffer(files[0].file);
      const srcDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(srcDoc, pageOrder);
      for (const page of copiedPages) newDoc.addPage(page);
      setProgress(80);
      const outBytes = await newDoc.save();
      const blob = uint8ToBlob(outBytes, "application/pdf");
      setProgress(100);
      setResult({ success: true, files: [{ name: "reordered.pdf", blob, size: blob.size, type: "application/pdf" }], processingTime: Date.now() });
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, pageOrder]);

  const handleReset = () => { clearFiles(); setPageOrder([]); setResult(null); setError(null); setProgress(0); setTotalPages(0); };

  // Drag-reorder logic
  const handleDragOver = (e: React.DragEvent, toIdx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === toIdx) return;
    const newOrder = [...pageOrder];
    const [moved] = newOrder.splice(dragIdx, 1);
    newOrder.splice(toIdx, 0, moved);
    setPageOrder(newOrder);
    setDragIdx(toIdx);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#0891b2" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef}
                onInputChange={(e) => { if (e.target.files) { addFiles(e.target.files); setTimeout(loadPages, 100); }}}
                label="Drop a PDF here" hint="Pages will be listed below for drag-and-drop reordering." />
            </div>

            {files[0] && pageOrder.length === 0 && !loadingPages && (
              <button onClick={loadPages} className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all"
                style={{ backgroundColor: "#0891b2" }}>
                Load Pages
              </button>
            )}

            {loadingPages && <div className="text-center text-sm py-4" style={{ color: "var(--text-muted)" }}>Loading pages...</div>}

            {pageOrder.length > 0 && (
              <div className="rounded-2xl p-5 space-y-2" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                  Pages ({totalPages}) — Drag to reorder
                </p>
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {pageOrder.map((origIdx, displayIdx) => (
                    <div key={origIdx}
                      draggable
                      onDragStart={() => setDragIdx(displayIdx)}
                      onDragOver={(e) => handleDragOver(e, displayIdx)}
                      onDragEnd={() => setDragIdx(null)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-grab active:cursor-grabbing transition-colors"
                      style={{
                        backgroundColor: dragIdx === displayIdx ? "rgba(8,145,178,0.1)" : "var(--bg-secondary)",
                        border: dragIdx === displayIdx ? "1px solid rgba(8,145,178,0.3)" : "1px solid var(--border-subtle)",
                      }}>
                      <GripVertical className="h-4 w-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold rounded-lg px-2 py-0.5" style={{ backgroundColor: "rgba(8,145,178,0.15)", color: "#0891b2" }}>
                          {displayIdx + 1}
                        </span>
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          Page {origIdx + 1} (original)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setPageOrder(Array.from({ length: totalPages }, (_, i) => i))}
                  className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                  Reset order
                </button>
              </div>
            )}

            <AnimatePresence>
              {(error || uploadError) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3"
                  style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                  <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Reordering pages..." color="#0891b2" /></div>}

            {pageOrder.length > 0 && (
              <button onClick={handleProcess} disabled={isProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                style={{ backgroundColor: "#0891b2" }}>
                <GripVertical className="h-5 w-5" />
                {isProcessing ? "Saving..." : "Save Reordered PDF"}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
