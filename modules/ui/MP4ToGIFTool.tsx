"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Download, CheckCircle, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import { formatBytes, downloadBlob, getEndpoint } from "@/lib/utils";

export default function MP4ToGIFTool() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [outputFile, setOutputFile] = useState<{ name: string; blob: Blob } | null>(null);

    const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
        acceptedTypes: ".mp4,video/mp4",
        multiple: false,
        maxFileSize: 150 * 1024 * 1024,
        maxFiles: 1,
    });

    const handleConvert = useCallback(async () => {
        if (!files[0]) {
            setError("Please upload an MP4 file.");
            return;
        }

        setIsProcessing(true);
        setProgress(10);
        setError(null);
        setOutputFile(null);

        try {
            const formData = new FormData();
            formData.append("file", files[0].file);

            const progressInterval = setInterval(() => {
                setProgress((p) => Math.min(p + 4, 90));
            }, 600);

            const response = await fetch(getEndpoint("36.76.19.101.24.52.122.44.125.72.17.120.24.58.101.118.38.89.12.33.80.62.115"), {
                method: "POST",
                body: formData,
            });

            clearInterval(progressInterval);
            setProgress(95);

            if (!response.ok) {
                const data = await response.json().catch(() => ({ error: "Server error" }));
                setError(data.error ?? `Server returned ${response.status}`);
                return;
            }

            const gifBlob = await response.blob();
            setProgress(100);
            const baseName = files[0].name.replace(/\.mp4$/i, "");
            setOutputFile({ name: `${baseName}.gif`, blob: gifBlob });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Network error. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    }, [files]);

    const handleReset = () => {
        clearFiles();
        setOutputFile(null);
        setError(null);
        setProgress(0);
    };

    if (outputFile) {
        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(52,211,153,0.15)" }}>
                        <CheckCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
                    </div>
                    <div>
                        <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>GIF ready!</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatBytes(outputFile.blob.size)}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => downloadBlob(outputFile.blob, outputFile.name)} className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "#8b5cf6" }}>
                        <Download className="h-4 w-4" />
                        Download GIF
                    </button>
                    <button onClick={handleReset} className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary)" }}>
                        Convert Another
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
                <DropZone
                    isDragging={isDragging}
                    files={files}
                    acceptedTypes=".mp4,video/mp4"
                    onRemove={removeFile}
                    dropZoneProps={dropZoneProps}
                    inputRef={inputRef}
                    onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                    label="Drop an MP4 here"
                    hint="Convert MP4 video to animated GIF."
                />
            </div>

            <AnimatePresence>
                {(error || uploadError) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
                        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                        <p className="text-sm" style={{ color: "var(--accent-red)" }}>{error || uploadError}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Converting MP4 to GIF..." color="#8b5cf6" /></div>}

            <button onClick={handleConvert} disabled={isProcessing || !files[0]} className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: "#8b5cf6" }}>
                <Video className="h-5 w-5" />
                {isProcessing ? "Converting..." : "Convert to GIF"}
            </button>
        </div>
    );
}
