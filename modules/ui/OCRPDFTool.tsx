"use client";

import { useState, useCallback } from "react";
import { AlertCircle, ScanText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { ocrPdf } from "@/modules/tools/ocrPdf";
import type { ProcessingResult } from "@/lib/types";

export default function OCRPDFTool() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<ProcessingResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
        acceptedTypes: "application/pdf",
        multiple: false,
        maxFileSize: 100 * 1024 * 1024,
        maxFiles: 1,
    });

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);

    const handleProcess = useCallback(async () => {
        if (!files[0]) {
            setError("Please upload a PDF.");
            return;
        }

        setIsProcessing(true);
        setProgress(10);
        setError(null);
        setResult(null);

        try {
            const res = await ocrPdf(files[0].file, (current, total) => {
                const pct = 10 + Math.round((current / total) * 85);
                setProgress(Math.min(95, pct));
            });

            setProgress(100);
            if (res.success) setResult(res);
            else setError(res.error ?? "OCR failed.");
        } catch (e) {
            setError(e instanceof Error ? e.message : "OCR failed.");
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

    return (
        <div className="space-y-4">
            <AnimatePresence mode="wait">
                {result ? (
                    <ResultPanel key="result" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#0ea5e9" />
                ) : (
                    <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
                            <DropZone
                                isDragging={isDragging}
                                files={files}
                                acceptedTypes="application/pdf"
                                onRemove={removeFile}
                                dropZoneProps={dropZoneProps}
                                inputRef={inputRef}
                                onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                                label="Drop a scanned PDF here"
                                hint="Extract text from scanned or image-based PDFs into a .txt file."
                            />
                        </div>

                        <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}>
                            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                This OCR tool extracts any embedded/selectable text and produces a text report. If your PDF is fully scanned and has no embedded text layer,
                                it will still return per-page status so you can identify pages needing advanced OCR.
                            </p>
                        </div>

                        <AnimatePresence>
                            {(error || uploadError) && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                                    <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isProcessing && (
                            <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                                <ProgressBar progress={progress} label="Running OCR / text extraction..." color="#0ea5e9" />
                            </div>
                        )}

                        <button onClick={handleProcess} disabled={isProcessing || !files[0]} className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: "#0ea5e9" }}>
                            <ScanText className="h-5 w-5" />
                            {isProcessing ? "Processing..." : "Run OCR"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
