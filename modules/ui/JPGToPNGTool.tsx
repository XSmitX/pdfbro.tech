"use client";

import { useState, useCallback } from "react";
import { AlertCircle, ArrowLeftRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { jpgToPng } from "@/modules/tools/jpgToPng";
import type { ProcessingResult } from "@/lib/types";

export default function JPGToPNGTool() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<ProcessingResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { files, isDragging, inputRef, addFiles, removeFile, reorderFiles, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
        acceptedTypes: ".jpg,.jpeg,image/jpeg,image/jpg",
        multiple: true,
        maxFileSize: 20 * 1024 * 1024,
        maxFiles: 20,
    });

    const handleProcess = useCallback(async () => {
        if (files.length === 0) {
            setError("Please upload at least one JPG/JPEG file.");
            return;
        }

        setIsProcessing(true);
        setProgress(10);
        setError(null);
        setResult(null);

        try {
            const progressInterval = setInterval(() => {
                setProgress((p) => Math.min(p + 15, 88));
            }, 200);

            const convertResult = await jpgToPng(files.map((f) => f.file));

            clearInterval(progressInterval);
            setProgress(100);

            if (!convertResult.success) setError(convertResult.error ?? "Conversion failed.");
            else setResult(convertResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error.");
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
                    <ResultPanel key="result" result={result} originalSize={totalSize} onReset={handleReset} accentColor="#22c55e" />
                ) : (
                    <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <DropZone
                                isDragging={isDragging}
                                files={files}
                                acceptedTypes=".jpg,.jpeg,image/jpeg,image/jpg"
                                multiple
                                onRemove={removeFile}
                                dropZoneProps={dropZoneProps}
                                inputRef={inputRef}
                                onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                                onReorder={reorderFiles}
                                label="Drop JPG/JPEG files here"
                                hint="Convert JPG/JPEG images to PNG format."
                            />
                        </div>

                        <AnimatePresence>
                            {(error || uploadError) && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700">{error || uploadError}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isProcessing && (
                            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                <ProgressBar progress={progress} label="Converting to PNG..." color="#22c55e" />
                            </div>
                        )}

                        <button
                            onClick={handleProcess}
                            disabled={isProcessing || files.length === 0}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowLeftRight className="h-5 w-5" />
                            {isProcessing ? "Converting..." : `Convert ${files.length > 0 ? files.length : ""} JPG${files.length !== 1 ? "s" : ""} to PNG`}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
