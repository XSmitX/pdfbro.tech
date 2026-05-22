"use client";

import { useState, useCallback } from "react";
import { AlertCircle, Eraser } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { removeBackground, type RemoveBgProvider } from "@/modules/tools/removeBg";
import type { ProcessingResult } from "@/lib/types";

export default function RemoveBgTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [provider, setProvider] = useState<RemoveBgProvider>("local");
  const [apiKey, setApiKey] = useState("");
  const [tolerance, setTolerance] = useState(35);
  const [feather, setFeather] = useState(true);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "image/*", multiple: false, maxFileSize: 20 * 1024 * 1024, maxFiles: 1,
  });

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload an image."); return; }
    if (provider === "removebg-api" && !apiKey.trim()) { setError("Please enter your remove.bg API key."); return; }
    setIsProcessing(true); setProgress(10); setError(null); setResult(null);
    try {
      const pi = setInterval(() => setProgress(p => Math.min(p + (provider === "local" ? 12 : 5), 85)), 300);
      const r = await removeBackground(files[0].file, { provider, apiKey: provider === "removebg-api" ? apiKey : undefined, tolerance, featherEdges: feather });
      clearInterval(pi); setProgress(100);
      if (!r.success) setError(r.error ?? "Background removal failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, provider, apiKey, tolerance, feather]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#be185d" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="image/*" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop an image here" hint="Supports JPG, PNG, WEBP. Output will be PNG with transparency." />
            </div>

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              {/* Provider */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Processing Method</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setProvider("local")} className="rounded-xl border p-3 text-left transition-all"
                    style={provider === "local" ? { borderColor: "#be185d", backgroundColor: "rgba(190,24,93,0.1)" } : { borderColor: "var(--border)" }}>
                    <p className="text-sm font-semibold" style={{ color: provider === "local" ? "#be185d" : "var(--text-primary)" }}>🖥️ Local (Free)</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Color threshold. Best for solid backgrounds.</p>
                  </button>
                  <button onClick={() => setProvider("removebg-api")} className="rounded-xl border p-3 text-left transition-all"
                    style={provider === "removebg-api" ? { borderColor: "#be185d", backgroundColor: "rgba(190,24,93,0.1)" } : { borderColor: "var(--border)" }}>
                    <p className="text-sm font-semibold" style={{ color: provider === "removebg-api" ? "#be185d" : "var(--text-primary)" }}>☁️ remove.bg API</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>AI-powered. Complex backgrounds, hair, fur.</p>
                  </button>
                </div>
              </div>

              {/* Local options */}
              {provider === "local" && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Tolerance</span>
                      <span className="text-xs font-bold" style={{ color: "#be185d" }}>{tolerance}</span>
                    </div>
                    <input type="range" min={5} max={100} value={tolerance} onChange={e => setTolerance(+e.target.value)} className="w-full" style={{ accentColor: "#be185d" }} />
                    <div className="flex justify-between text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                      <span>Strict (uniform bg)</span>
                      <span>Loose (complex bg)</span>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={feather} onChange={e => setFeather(e.target.checked)} style={{ accentColor: "#be185d" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Feather edges (smoother result)</span>
                  </label>
                </div>
              )}

              {/* API options */}
              {provider === "removebg-api" && (
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                    remove.bg API Key
                    <a href="https://www.remove.bg/api" target="_blank" rel="noopener noreferrer" className="ml-2 underline" style={{ color: "#be185d" }}>Get free key →</a>
                  </label>
                  <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="Enter your API key"
                    className="w-full rounded-xl px-3 py-2.5 text-sm" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                  <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>Free tier: 50 API calls/month. Your key is never stored.</p>
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

            {isProcessing && (
              <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <ProgressBar progress={progress} label={provider === "local" ? "Removing background..." : "Processing via API..."} color="#be185d" />
              </div>
            )}

            <button onClick={handleProcess} disabled={isProcessing || !files[0]}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#be185d" }}>
              <Eraser className="h-5 w-5" />
              {isProcessing ? "Removing..." : "Remove Background"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
