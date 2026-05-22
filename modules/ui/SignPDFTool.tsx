"use client";

import { useMemo, useState, useCallback } from "react";
import { AlertCircle, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { signPDF } from "@/modules/tools/signPDF";
import type { ProcessingResult } from "@/lib/types";

type Placement = "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";

function signatureCanvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to capture signature"));
        }, "image/png");
    });
}

export default function SignPDFTool() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<ProcessingResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [placement, setPlacement] = useState<Placement>("bottom-right");
    const [pageIndex, setPageIndex] = useState(0);
    const [lineWidth, setLineWidth] = useState(2);

    const signatureCanvasId = "sign-pdf-canvas";

    const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
        acceptedTypes: "application/pdf",
        multiple: false,
        maxFileSize: 100 * 1024 * 1024,
        maxFiles: 1,
    });

    const totalSize = useMemo(() => files.reduce((sum, f) => sum + f.size, 0), [files]);

    const initDrawing = useCallback(() => {
        const canvas = document.getElementById(signatureCanvasId) as HTMLCanvasElement | null;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#111827";
        ctx.lineWidth = lineWidth;

        let drawing = false;
        const getPoint = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const point = "touches" in e ? e.touches[0] : e;
            return { x: point.clientX - rect.left, y: point.clientY - rect.top };
        };

        const start = (e: MouseEvent | TouchEvent) => {
            drawing = true;
            const p = getPoint(e);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
        };
        const move = (e: MouseEvent | TouchEvent) => {
            if (!drawing) return;
            e.preventDefault();
            const p = getPoint(e);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        };
        const end = () => {
            drawing = false;
        };

        canvas.onmousedown = (e) => start(e);
        canvas.onmousemove = (e) => move(e);
        canvas.onmouseup = end;
        canvas.onmouseleave = end;
        canvas.ontouchstart = (e) => start(e);
        canvas.ontouchmove = (e) => move(e);
        canvas.ontouchend = end;
    }, [lineWidth]);

    const clearSignature = () => {
        const canvas = document.getElementById(signatureCanvasId) as HTMLCanvasElement | null;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleSign = useCallback(async () => {
        if (!files[0]) {
            setError("Please upload a PDF file.");
            return;
        }

        const canvas = document.getElementById(signatureCanvasId) as HTMLCanvasElement | null;
        if (!canvas) {
            setError("Signature canvas unavailable.");
            return;
        }

        setIsProcessing(true);
        setProgress(15);
        setError(null);
        setResult(null);

        try {
            const signatureBlob = await signatureCanvasToPng(canvas);
            setProgress(40);

            const res = await signPDF(files[0].file, signatureBlob, {
                pageIndex,
                placement,
                widthRatio: 0.22,
                marginRatio: 0.04,
            });

            setProgress(100);
            if (res.success) setResult(res);
            else setError(res.error ?? "Failed to sign PDF.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Signing failed.");
        } finally {
            setIsProcessing(false);
        }
    }, [files, pageIndex, placement]);

    const handleReset = () => {
        clearFiles();
        clearSignature();
        setResult(null);
        setError(null);
        setProgress(0);
        setPageIndex(0);
    };

    return (
        <div className="space-y-4">
            <AnimatePresence mode="wait">
                {result ? (
                    <ResultPanel key="result" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#2563eb" />
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
                                label="Drop a PDF here"
                                hint="Add your handwritten signature to any page of this PDF."
                            />
                        </div>

                        <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Draw Signature</p>
                                <button onClick={clearSignature} className="text-xs px-2 py-1 rounded border" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>Clear</button>
                            </div>

                            <canvas
                                id={signatureCanvasId}
                                width={700}
                                height={180}
                                className="w-full rounded-xl"
                                style={{ backgroundColor: "#ffffff", border: "1px dashed var(--border)" }}
                                ref={(node) => {
                                    if (node) setTimeout(initDrawing, 0);
                                }}
                            />

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Page (0-based)</label>
                                    <input type="number" min={0} value={pageIndex} onChange={(e) => setPageIndex(Math.max(0, Number(e.target.value || 0)))} className="w-full rounded-lg px-2 py-1.5 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                                </div>
                                <div>
                                    <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Placement</label>
                                    <select value={placement} onChange={(e) => setPlacement(e.target.value as Placement)} className="w-full rounded-lg px-2 py-1.5 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                                        <option value="bottom-right">Bottom Right</option>
                                        <option value="bottom-left">Bottom Left</option>
                                        <option value="top-right">Top Right</option>
                                        <option value="top-left">Top Left</option>
                                        <option value="center">Center</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs mb-1" style={{ color: "var(--text-muted)" }}>Pen Width ({lineWidth}px)</label>
                                    <input type="range" min={1} max={6} value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} className="w-full" />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {(error || uploadError) && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                                    <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Applying signature..." color="#2563eb" /></div>}

                        <button onClick={handleSign} disabled={isProcessing || !files[0]} className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: "#2563eb" }}>
                            <PenLine className="h-5 w-5" />
                            {isProcessing ? "Signing..." : "Sign PDF"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
