"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AlertCircle, Crop, Move } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { cropImage, calculateAspectRatioCrop, type CropRegion } from "@/modules/tools/cropImage";
import type { ProcessingResult } from "@/lib/types";

type AspectPreset = "free" | "1:1" | "4:3" | "16:9" | "3:4" | "9:16";

const ASPECT_RATIOS: Record<AspectPreset, [number, number] | null> = {
  "free": null, "1:1": [1, 1], "4:3": [4, 3], "16:9": [16, 9], "3:4": [3, 4], "9:16": [9, 16],
};

// Interactive crop selection state
interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  mode: "draw" | "move";
  moveOffsetX: number;
  moveOffsetY: number;
}

// ─── InteractiveCropCanvas ───────────────────────────────────
function InteractiveCropCanvas({
  previewUrl,
  imgNaturalSize,
  cropRegion,
  setCropRegion,
  aspectPreset,
}: {
  previewUrl: string;
  imgNaturalSize: { w: number; h: number };
  cropRegion: CropRegion | null;
  setCropRegion: (r: CropRegion) => void;
  aspectPreset: AspectPreset;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // rect in display coords
  const dragRef = useRef({ active: false, mode: "draw" as "draw"|"move", sx: 0, sy: 0, ox: 0, oy: 0 });
  const [displayRect, setDisplayRect] = useState<{ left: number; top: number; w: number; h: number } | null>(null);

  // Convert natural-pixel crop → display-pixel rect
  const toDisplay = useCallback((region: CropRegion) => {
    const img = imgRef.current;
    if (!img || !img.clientWidth) return null;
    const scaleX = img.clientWidth / imgNaturalSize.w;
    const scaleY = img.clientHeight / imgNaturalSize.h;
    const scale = Math.min(scaleX, scaleY);
    const ox = (img.clientWidth - imgNaturalSize.w * scale) / 2;
    const oy = (img.clientHeight - imgNaturalSize.h * scale) / 2;
    return {
      left: ox + region.x * scale,
      top: oy + region.y * scale,
      w: region.width * scale,
      h: region.height * scale,
      ox, oy, scale,
    };
  }, [imgNaturalSize]);

  // Convert display-pixel rect → natural-pixel crop
  const toNatural = useCallback((left: number, top: number, w: number, h: number, ox: number, oy: number, scale: number): CropRegion => {
    const x = Math.max(0, Math.round((left - ox) / scale));
    const y = Math.max(0, Math.round((top - oy) / scale));
    const width = Math.max(1, Math.min(Math.round(w / scale), imgNaturalSize.w - x));
    const height = Math.max(1, Math.min(Math.round(h / scale), imgNaturalSize.h - y));
    return { x, y, width, height };
  }, [imgNaturalSize]);

  // Update display rect when crop changes
  useEffect(() => {
    if (!cropRegion) return;
    const d = toDisplay(cropRegion);
    if (d) setDisplayRect({ left: d.left, top: d.top, w: d.w, h: d.h });
  }, [cropRegion, toDisplay]);

  // Get mouse position relative to container
  const getPos = (e: React.MouseEvent | MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const isInsideSelection = (px: number, py: number) => {
    if (!displayRect) return false;
    return px >= displayRect.left && px <= displayRect.left + displayRect.w &&
           py >= displayRect.top && py <= displayRect.top + displayRect.h;
  };

  const getDisplayBounds = () => {
    const img = imgRef.current;
    if (!img) return { minL: 0, minT: 0, maxL: 400, maxT: 300, ox: 0, oy: 0, scale: 1 };
    const scaleX = img.clientWidth / imgNaturalSize.w;
    const scaleY = img.clientHeight / imgNaturalSize.h;
    const scale = Math.min(scaleX, scaleY);
    const ox = (img.clientWidth - imgNaturalSize.w * scale) / 2;
    const oy = (img.clientHeight - imgNaturalSize.h * scale) / 2;
    return { minL: ox, minT: oy, maxL: ox + imgNaturalSize.w * scale, maxT: oy + imgNaturalSize.h * scale, ox, oy, scale };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const pos = getPos(e);
    const inside = isInsideSelection(pos.x, pos.y);
    dragRef.current.active = true;
    dragRef.current.mode = inside ? "move" : "draw";
    dragRef.current.sx = pos.x;
    dragRef.current.sy = pos.y;
    if (inside && displayRect) {
      dragRef.current.ox = pos.x - displayRect.left;
      dragRef.current.oy = pos.y - displayRect.top;
    }
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    const pos = getPos(e);
    const { ox: imgOx, oy: imgOy, scale, minL, minT, maxL, maxT } = getDisplayBounds();
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    if (dragRef.current.mode === "draw") {
      const sx = dragRef.current.sx, sy = dragRef.current.sy;
      let left = Math.min(sx, pos.x), top = Math.min(sy, pos.y);
      let w = Math.abs(pos.x - sx), h = Math.abs(pos.y - sy);
      // Clamp to image bounds
      left = clamp(left, minL, maxL);
      top = clamp(top, minT, maxT);
      w = clamp(w, 1, maxL - left);
      h = clamp(h, 1, maxT - top);
      // Lock aspect if preset selected
      if (aspectPreset !== "free") {
        const ratio = ASPECT_RATIOS[aspectPreset];
        if (ratio) {
          const ar = ratio[0] / ratio[1];
          h = w / ar;
          if (top + h > maxT) { h = maxT - top; w = h * ar; }
        }
      }
      setDisplayRect({ left, top, w, h });
    } else {
      // Move mode
      if (!displayRect) return;
      let newLeft = pos.x - dragRef.current.ox;
      let newTop = pos.y - dragRef.current.oy;
      newLeft = clamp(newLeft, minL, maxL - displayRect.w);
      newTop = clamp(newTop, minT, maxT - displayRect.h);
      setDisplayRect({ ...displayRect, left: newLeft, top: newTop });
    }
  };

  const onMouseUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (!displayRect) return;
    const { ox, oy, scale } = getDisplayBounds();
    const region = toNatural(displayRect.left, displayRect.top, displayRect.w, displayRect.h, ox, oy, scale);
    setCropRegion(region);
  };

  const inside = displayRect ? true : false;
  const cursor = dragRef.current.active && dragRef.current.mode === "move" ? "grabbing" : inside ? "grab" : "crosshair";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
      <div
        ref={containerRef}
        className="relative select-none"
        style={{ cursor, userSelect: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={previewUrl}
          alt="Crop preview"
          draggable={false}
          className="w-full object-contain block"
          style={{ maxHeight: "360px", pointerEvents: "none", userSelect: "none" }}
        />
        {/* Dark overlay outside selection */}
        {displayRect && (
          <div className="absolute inset-0 pointer-events-none" style={{ userSelect: "none" }}>
            {/* top */}
            <div className="absolute" style={{ top: 0, left: 0, right: 0, height: displayRect.top, backgroundColor: "rgba(0,0,0,0.45)" }} />
            {/* bottom */}
            <div className="absolute" style={{ top: displayRect.top + displayRect.h, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" }} />
            {/* left */}
            <div className="absolute" style={{ top: displayRect.top, left: 0, width: displayRect.left, height: displayRect.h, backgroundColor: "rgba(0,0,0,0.45)" }} />
            {/* right */}
            <div className="absolute" style={{ top: displayRect.top, left: displayRect.left + displayRect.w, right: 0, height: displayRect.h, backgroundColor: "rgba(0,0,0,0.45)" }} />
            {/* Crop border + corner handles */}
            <div className="absolute" style={{ top: displayRect.top, left: displayRect.left, width: displayRect.w, height: displayRect.h, border: "2px solid #65a30d", boxSizing: "border-box" }}>
              {/* Rule-of-thirds grid */}
              <div style={{ position: "absolute", top: "33.33%", left: 0, right: 0, height: 1, backgroundColor: "rgba(101,163,13,0.5)" }} />
              <div style={{ position: "absolute", top: "66.66%", left: 0, right: 0, height: 1, backgroundColor: "rgba(101,163,13,0.5)" }} />
              <div style={{ position: "absolute", left: "33.33%", top: 0, bottom: 0, width: 1, backgroundColor: "rgba(101,163,13,0.5)" }} />
              <div style={{ position: "absolute", left: "66.66%", top: 0, bottom: 0, width: 1, backgroundColor: "rgba(101,163,13,0.5)" }} />
              {/* Corner handles */}
              {[["0%","0%"],["100%","0%"],["0%","100%"],["100%","100%"]].map(([l, t], i) => (
                <div key={i} style={{ position: "absolute", left: l, top: t, width: 10, height: 10, backgroundColor: "#65a30d", border: "2px solid #fff", borderRadius: 2, transform: "translate(-50%,-50%)", boxSizing: "border-box" }} />
              ))}
              {/* Dimension label */}
              <div style={{ position: "absolute", bottom: 4, right: 4, fontSize: 10, fontWeight: 600, color: "#fff", backgroundColor: "rgba(0,0,0,0.6)", padding: "1px 5px", borderRadius: 3 }}>
                {cropRegion ? `${cropRegion.width}×${cropRegion.height}` : ""}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-2 flex items-center gap-2 text-xs" style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
        <Move className="h-3 w-3" />
        {aspectPreset === "free" ? "Drag to draw a crop selection. Drag inside to move it." : `${aspectPreset} aspect ratio locked. Drag to resize.`}
        {cropRegion && <span className="ml-auto" style={{ color: "var(--text-secondary)" }}>{cropRegion.width}×{cropRegion.height}px</span>}
      </div>
    </div>
  );
}

export default function CropImageTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png">("jpeg");
  const [aspectPreset, setAspectPreset] = useState<AspectPreset>("free");
  const [cropRegion, setCropRegion] = useState<CropRegion | null>(null);
  const [imgNaturalSize, setImgNaturalSize] = useState({ w: 0, h: 0 });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "image/*", multiple: false, maxFileSize: 30 * 1024 * 1024, maxFiles: 1,
  });

  // Load image and set preview URL
  useEffect(() => {
    if (!files[0]) { setCropRegion(null); setPreviewUrl(null); setImgNaturalSize({ w: 0, h: 0 }); return; }
    const url = URL.createObjectURL(files[0].file);
    setPreviewUrl(url);
    const img = new Image();
    img.onload = () => {
      setImgNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      // Default: full image crop
      setCropRegion({ x: 0, y: 0, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [files]);

  // When aspect preset changes (non-free), recalculate crop region centered
  useEffect(() => {
    if (!imgNaturalSize.w || aspectPreset === "free") return;
    const ratio = ASPECT_RATIOS[aspectPreset];
    if (ratio) {
      const region = calculateAspectRatioCrop(imgNaturalSize.w, imgNaturalSize.h, ratio[0], ratio[1]);
      setCropRegion(region);
    }
  }, [aspectPreset, imgNaturalSize]);

  const handleProcess = useCallback(async () => {
    if (!files[0]) { setError("Please upload an image."); return; }
    if (!cropRegion) { setError("Please select a crop region."); return; }
    setIsProcessing(true); setProgress(30); setError(null); setResult(null);
    try {
      const pi = setInterval(() => setProgress(p => Math.min(p + 25, 85)), 200);
      const r = await cropImage(files[0].file, { crop: cropRegion, outputFormat, quality: 0.92 });
      clearInterval(pi); setProgress(100);
      if (!r.success) setError(r.error ?? "Crop failed.");
      else setResult(r);
    } catch (e) { setError(e instanceof Error ? e.message : "Error"); } finally { setIsProcessing(false); }
  }, [files, cropRegion, outputFormat]);

  const handleReset = () => { clearFiles(); setResult(null); setError(null); setProgress(0); setCropRegion(null); };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {result ? <ResultPanel key="r" result={result} onReset={handleReset} accentColor="#65a30d" /> : (
          <motion.div key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
              <DropZone isDragging={isDragging} files={files} acceptedTypes="image/*" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop an image here" hint="Upload an image to crop it to a specific ratio or dimensions." />
            </div>

            {/* Interactive crop canvas */}
            {previewUrl && imgNaturalSize.w > 0 && (
              <InteractiveCropCanvas
                previewUrl={previewUrl}
                imgNaturalSize={imgNaturalSize}
                cropRegion={cropRegion}
                setCropRegion={setCropRegion}
                aspectPreset={aspectPreset}
              />
            )}

            <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              {/* Aspect ratio */}
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Aspect Ratio</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(ASPECT_RATIOS) as AspectPreset[]).map(p => (
                    <button key={p} onClick={() => setAspectPreset(p)} className="rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all"
                      style={aspectPreset === p ? { borderColor: "#65a30d", backgroundColor: "rgba(101,163,13,0.1)", color: "#65a30d" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual crop inputs */}
              {cropRegion && (
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Fine-tune crop region (pixels)</p>
                  <div className="grid grid-cols-4 gap-2">
                    {(["x", "y", "width", "height"] as (keyof CropRegion)[]).map(field => (
                      <div key={field}>
                        <label className="text-[10px] uppercase tracking-wide block mb-1" style={{ color: "var(--text-muted)" }}>{field}</label>
                        <input type="number" value={cropRegion[field]} onChange={e => setCropRegion(prev => prev ? { ...prev, [field]: Math.max(0, +e.target.value) } : prev)}
                          className="w-full rounded-lg px-2 py-1.5 text-xs" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {(["jpeg", "png"] as const).map(f => (
                  <button key={f} onClick={() => setOutputFormat(f)} className="flex-1 rounded-xl border py-2 text-xs font-semibold uppercase transition-all"
                    style={outputFormat === f ? { borderColor: "#65a30d", backgroundColor: "rgba(101,163,13,0.1)", color: "#65a30d" } : { borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                    {f === "jpeg" ? "JPEG" : "PNG (transparent)"}
                  </button>
                ))}
              </div>
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

            {isProcessing && <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}><ProgressBar progress={progress} label="Cropping image..." color="#65a30d" /></div>}

            <button onClick={handleProcess} disabled={isProcessing || !files[0] || !cropRegion}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ backgroundColor: "#65a30d" }}>
              <Crop className="h-5 w-5" />
              {isProcessing ? "Cropping..." : "Crop Image"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
