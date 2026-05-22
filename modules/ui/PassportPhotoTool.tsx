"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { generatePassportPhoto, PASSPORT_SIZES } from "@/modules/tools/passportPhoto";
import type { ProcessingResult, PassportPhotoOptions } from "@/lib/types";
import { cn } from "@/lib/utils";

type PhotoSize = PassportPhotoOptions["size"];
type Layout = PassportPhotoOptions["layout"];

const LAYOUTS: { id: Layout; label: string; desc: string }[] = [
  { id: "single", label: "Single", desc: "One photo" },
  { id: "2x2grid", label: "2×2 Grid", desc: "4 photos on one sheet" },
  { id: "4x1", label: "4×1 Strip", desc: "4 photos in a row" },
];

export default function PassportPhotoTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [photoSize, setPhotoSize] = useState<PhotoSize>("2x2");
  const [layout, setLayout] = useState<Layout>("2x2grid");
  const [bgColor, setBgColor] = useState("#ffffff");

  const {
    files,
    isDragging,
    inputRef,
    addFiles,
    removeFile,
    clearFiles,
    dropZoneProps,
    error: uploadError,
  } = useFileUpload({
    acceptedTypes: "image/*",
    multiple: false,
    maxFileSize: 20 * 1024 * 1024,
    maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (files.length === 0) {
      setError("Please upload a photo.");
      return;
    }

    setIsProcessing(true);
    setProgress(20);
    setError(null);
    setResult(null);

    try {
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 20, 85));
      }, 200);

      const photoResult = await generatePassportPhoto(files[0].file, {
        size: photoSize,
        backgroundColor: bgColor,
        layout,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!photoResult.success) {
        setError(photoResult.error ?? "Photo generation failed.");
      } else {
        setResult(photoResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, photoSize, layout, bgColor]);

  const handleReset = () => {
    clearFiles();
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const SIZES = Object.entries(PASSPORT_SIZES).map(([id, config]) => ({
    id: id as PhotoSize,
    label: id === "2x2" ? "US 2×2 inch" : id === "35x45" ? "EU 35×45mm" : "India 51×51mm",
    desc: config.label,
  }));

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPanel key="result" result={result} onReset={handleReset} accentColor="#ec4899" />
        ) : (
          <motion.div key="tool" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <DropZone
                isDragging={isDragging}
                files={files}
                acceptedTypes="image/*"
                onRemove={removeFile}
                dropZoneProps={dropZoneProps}
                inputRef={inputRef}
                onInputChange={(e) => e.target.files && addFiles(e.target.files)}
                label="Drop your photo here or click to browse"
                hint="Use a clear, front-facing photo with good lighting."
              />
            </div>

            {/* Options */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-5">
              {/* Size */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Photo Size</p>
                <div className="space-y-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPhotoSize(s.id)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-xl border p-3 text-left transition-colors",
                        photoSize === s.id
                          ? "border-pink-400 bg-pink-50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <div>
                        <p className={cn("text-sm font-semibold", photoSize === s.id ? "text-pink-700" : "text-slate-700")}>
                          {s.label}
                        </p>
                        <p className="text-xs text-slate-500">{s.desc}</p>
                      </div>
                      {photoSize === s.id && (
                        <div className="h-4 w-4 rounded-full border-4 border-pink-500 bg-white flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Layout</p>
                <div className="grid grid-cols-3 gap-2">
                  {LAYOUTS.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLayout(l.id)}
                      className={cn(
                        "rounded-xl border p-3 text-center transition-colors",
                        layout === l.id
                          ? "border-pink-400 bg-pink-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <p className={cn("text-sm font-semibold", layout === l.id ? "text-pink-700" : "text-slate-700")}>
                        {l.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Background Color</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 p-0.5"
                  />
                  <div className="flex gap-2">
                    {["#ffffff", "#f0f0f0", "#d4e6f5"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setBgColor(c)}
                        className={cn(
                          "h-8 w-8 rounded-lg border-2 transition-colors",
                          bgColor === c ? "border-pink-400" : "border-slate-200 hover:border-slate-300"
                        )}
                        style={{ backgroundColor: c }}
                        title={c === "#ffffff" ? "White" : c === "#f0f0f0" ? "Light Gray" : "Light Blue"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">
                    {bgColor === "#ffffff" ? "White" : bgColor === "#f0f0f0" ? "Light Gray" : bgColor === "#d4e6f5" ? "Light Blue" : "Custom"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
              <p className="text-xs font-semibold text-amber-800 mb-1">📸 Photo Tips</p>
              <ul className="text-xs text-amber-700 space-y-0.5">
                <li>• Use a clear, front-facing photo with eyes open</li>
                <li>• Avoid glasses, hats, or obstructions</li>
                <li>• Ensure good, even lighting</li>
                <li>• Neutral facial expression recommended</li>
              </ul>
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
                <ProgressBar progress={progress} label="Generating passport photo..." color="#ec4899" />
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isProcessing || files.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Camera className="h-5 w-5" />
              {isProcessing ? "Generating..." : "Generate Passport Photo"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
