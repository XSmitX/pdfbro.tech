"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  AlertCircle, Type, Square, Highlighter, Circle, Minus, MoveUpRight,
  MousePointer2, PenTool, Image as ImageIcon, Trash2, Download, Undo2,
  ChevronLeft, ChevronRight, Settings2, Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { editPDF } from "@/modules/tools/editPDF";
import type { Annotation } from "@/modules/ui/editPDFTypes";
import { drawAnnotationsToCanvas } from "@/modules/ui/editPDFCanvas";
import type { ProcessingResult } from "@/lib/types";

type ToolMode = "select" | "text" | "highlight" | "rectangle" | "ellipse" | "line" | "arrow" | "freehand" | "image";

const ACCENT = "#3b82f6"; // A more professional blue
const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const WORKER_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let pdfjsLoaded = false;
let pdfjsLoading: Promise<void> | null = null;

function loadPdfJs(): Promise<void> {
  if (pdfjsLoaded) return Promise.resolve();
  if (pdfjsLoading) return pdfjsLoading;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).pdfjsLib) { pdfjsLoaded = true; return Promise.resolve(); }

  pdfjsLoading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = PDFJS_CDN;
    s.crossOrigin = "anonymous";
    s.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lib = (window as any).pdfjsLib;
      if (lib) { lib.GlobalWorkerOptions.workerSrc = WORKER_CDN; pdfjsLoaded = true; resolve(); }
      else reject(new Error("pdfjsLib not found after script load"));
    };
    s.onerror = () => reject(new Error("Failed to load PDF.js from CDN"));
    document.head.appendChild(s);
  });
  return pdfjsLoading;
}

export default function EditPDFTool() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [pdfBuf, setPdfBuf] = useState<Uint8Array | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageImg, setPageImg] = useState<string | null>(null);
  const [loadingPage, setLoadingPage] = useState(false);

  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Editor State
  const [mode, setMode] = useState<ToolMode>("select");
  const [zoom, setZoom] = useState(1.5); // base scale
  
  // Tool Properties
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(18);
  const [color, setColor] = useState("#ef4444"); // Red for emphasis
  const [bold, setBold] = useState(false);
  const [fillColor, setFillColor] = useState("#fef08a"); // Yellow for highlight
  const [opacity, setOpacity] = useState(0.5);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [hasStroke, setHasStroke] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [draftPoints, setDraftPoints] = useState<{x: number, y: number}[]>([]);
  const [dragStart, setDragStart] = useState<{x: number, y: number} | null>(null);
  const [currMouse, setCurrMouse] = useState<{x: number, y: number} | null>(null);

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  useEffect(() => {
    if (!files[0]) { setPdfBuf(null); setPageCount(0); setAnnotations([]); setPageImg(null); return; }
    files[0].file.arrayBuffer().then(async (buf) => {
      const bytes = new Uint8Array(buf);
      setPdfBuf(bytes);
      await loadPdfJs();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdf = await (window as any).pdfjsLib.getDocument({ data: bytes.slice() }).promise;
      setPageCount(pdf.numPages);
      setCurrentPage(0);
      pdf.destroy();
    }).catch(e => setError(e.message));
  }, [files]);

  useEffect(() => {
    if (!pdfBuf || pageCount === 0) return;
    setLoadingPage(true); setPageImg(null);
    let cancelled = false;
    (async () => {
      try {
        await loadPdfJs();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pdf = await (window as any).pdfjsLib.getDocument({ data: pdfBuf.slice() }).promise;
        const page = await pdf.getPage(currentPage + 1);
        const viewport = page.getViewport({ scale: zoom });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width; canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        const dataUrl = canvas.toDataURL("image/png");
        page.cleanup(); pdf.destroy();
        if (!cancelled) { setPageImg(dataUrl); setLoadingPage(false); }
      } catch (e: any) {
        if (!cancelled) { setError(e.message); setLoadingPage(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [pdfBuf, currentPage, pageCount, zoom]);

  useEffect(() => {
    if (!overlayRef.current || !containerRef.current) return;
    const canvas = overlayRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawAnnotationsToCanvas(ctx, annotations, currentPage, canvas.width, canvas.height, selectedIdx, imageCacheRef.current);
    
    // Draw draft
    if (dragStart && currMouse) {
      ctx.save();
      const w = currMouse.x - dragStart.x;
      const h = currMouse.y - dragStart.y;
      const cw = canvas.width; const ch = canvas.height;
      if (mode === "rectangle" || mode === "highlight") {
        ctx.globalAlpha = opacity; ctx.fillStyle = mode === "highlight" ? fillColor : color;
        ctx.fillRect(Math.min(dragStart.x, currMouse.x)*cw, Math.min(dragStart.y, currMouse.y)*ch, Math.abs(w)*cw, Math.abs(h)*ch);
      } else if (mode === "ellipse") {
        ctx.globalAlpha = opacity; ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(dragStart.x*cw, dragStart.y*ch, Math.abs(w)*cw, Math.abs(h)*ch, 0, 0, Math.PI*2);
        ctx.fill();
      } else if (mode === "line" || mode === "arrow") {
        ctx.globalAlpha = opacity; ctx.strokeStyle = color; ctx.lineWidth = strokeWidth;
        ctx.beginPath(); ctx.moveTo(dragStart.x*cw, dragStart.y*ch); ctx.lineTo(currMouse.x*cw, currMouse.y*ch); ctx.stroke();
      }
      ctx.restore();
    }
    if (isDrawing && draftPoints.length > 1 && mode === "freehand") {
      ctx.save();
      ctx.globalAlpha = opacity; ctx.strokeStyle = color; ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(draftPoints[0].x*canvas.width, draftPoints[0].y*canvas.height);
      for (let i = 1; i < draftPoints.length; i++) ctx.lineTo(draftPoints[i].x*canvas.width, draftPoints[i].y*canvas.height);
      ctx.stroke();
      ctx.restore();
    }
  }, [annotations, currentPage, dragStart, currMouse, isDrawing, draftPoints, mode, color, fillColor, opacity, strokeWidth, selectedIdx, pageImg]);

  const getFrac = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    return { x: Math.max(0, Math.min(1, (e.clientX - rect.left)/rect.width)), y: Math.max(0, Math.min(1, (e.clientY - rect.top)/rect.height)) };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const pt = getFrac(e);
    if (mode === "select") {
      // Basic hit testing logic could go here; for now we deselect
      setSelectedIdx(null);
      return;
    }
    if (mode === "text") {
      if (!textInput.trim()) return;
      setAnnotations(prev => [...prev, { type: "text", pageIndex: currentPage, x: pt.x, y: pt.y, text: textInput, fontSize, color, bold }]);
      return;
    }
    if (mode === "image") {
      const input = document.createElement("input");
      input.type = "file"; input.accept = "image/png, image/jpeg";
      input.onchange = async (ev) => {
        const file = (ev.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const data = new Uint8Array(await file.arrayBuffer());
        const dataUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          const w = 0.2; const h = (0.2 / ratio) * (containerRef.current?.getBoundingClientRect().width || 1) / (containerRef.current?.getBoundingClientRect().height || 1);
          setAnnotations(prev => [...prev, { type: "image", pageIndex: currentPage, x: pt.x, y: pt.y, width: w, height: h, data, format: file.type.includes("png")?"png":"jpg", dataUrl }]);
        };
        img.src = dataUrl;
      };
      input.click();
      return;
    }
    if (mode === "freehand") {
      setIsDrawing(true); setDraftPoints([pt]);
    } else {
      setDragStart(pt); setCurrMouse(pt);
    }
  }, [mode, textInput, currentPage, fontSize, color, bold, getFrac]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (mode === "freehand" && isDrawing) { setDraftPoints(prev => [...prev, getFrac(e)]); }
    else if (dragStart) { setCurrMouse(getFrac(e)); }
  }, [mode, isDrawing, dragStart, getFrac]);

  const handleMouseUp = useCallback(() => {
    if (mode === "freehand" && isDrawing) {
      if (draftPoints.length > 1) {
        setAnnotations(prev => [...prev, { type: "freehand", pageIndex: currentPage, points: draftPoints, color, strokeWidth, opacity }]);
      }
      setIsDrawing(false); setDraftPoints([]);
    } else if (dragStart && currMouse) {
      const w = currMouse.x - dragStart.x; const h = currMouse.y - dragStart.y;
      const aw = Math.abs(w); const ah = Math.abs(h);
      if (aw > 0.01 && ah > 0.01 || (mode === "line" || mode === "arrow") && Math.max(aw, ah) > 0.01) {
        if (mode === "rectangle") setAnnotations(p => [...p, { type: "rectangle", pageIndex: currentPage, x: Math.min(dragStart.x, currMouse.x), y: Math.min(dragStart.y, currMouse.y), width: aw, height: ah, color, opacity, stroke: hasStroke, strokeColor: "#000", strokeWidth }]);
        else if (mode === "highlight") setAnnotations(p => [...p, { type: "highlight", pageIndex: currentPage, x: Math.min(dragStart.x, currMouse.x), y: Math.min(dragStart.y, currMouse.y), width: aw, height: ah, color: fillColor, opacity }]);
        else if (mode === "ellipse") setAnnotations(p => [...p, { type: "ellipse", pageIndex: currentPage, cx: dragStart.x, cy: dragStart.y, rx: aw, ry: ah, color, opacity, stroke: hasStroke, strokeColor: "#000", strokeWidth }]);
        else if (mode === "line" || mode === "arrow") setAnnotations(p => [...p, { type: "line", pageIndex: currentPage, x1: dragStart.x, y1: dragStart.y, x2: currMouse.x, y2: currMouse.y, color, strokeWidth, opacity, arrow: mode === "arrow" }]);
      }
      setDragStart(null); setCurrMouse(null);
    }
  }, [mode, isDrawing, draftPoints, dragStart, currMouse, currentPage, color, strokeWidth, opacity, hasStroke, fillColor]);

  const handleSave = async () => {
    if (!files[0]) return;
    setIsProcessing(true); setProgress(10);
    try {
      const res = await editPDF(files[0].file, { annotations });
      setProgress(100);
      if (res.success) setResult(res);
      else setError(res.error || "Save failed");
    } catch (e: any) { setError(e.message); }
    setIsProcessing(false);
  };

  if (result) return <ResultPanel result={result} onReset={() => { clearFiles(); setAnnotations([]); setResult(null); }} accentColor={ACCENT} />;

  if (!files[0] || !pdfBuf) return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
        <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={(e) => e.target.files && addFiles(e.target.files)} label="Drop a PDF to edit" hint="Professional, 100% browser-based PDF editing studio." />
      </div>
      <AnimatePresence>{(error || uploadError) && <div className="text-red-500 text-sm p-3 bg-red-50 rounded-xl">{error || uploadError}</div>}</AnimatePresence>
    </div>
  );

  const ToolButton = ({ m, icon, label }: { m: ToolMode, icon: React.ReactNode, label: string }) => (
    <button onClick={() => setMode(m)} className={`w-12 h-12 flex flex-col items-center justify-center rounded-xl transition-all ${mode === m ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'}`}>
      {icon}
      <span className="text-[9px] mt-1 font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#0f0f13] shadow-sm" style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}>
      
      {/* ── Top Action Bar ── */}
      <div className="h-14 bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-sm truncate max-w-[200px] text-gray-800 dark:text-gray-200">{files[0].name}</span>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button onClick={() => setCurrentPage(p=>Math.max(0, p-1))} disabled={currentPage===0} className="p-1 rounded hover:bg-white dark:hover:bg-gray-700 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs font-medium px-2 text-gray-600 dark:text-gray-300">{currentPage + 1} / {pageCount}</span>
          <button onClick={() => setCurrentPage(p=>Math.min(pageCount-1, p+1))} disabled={currentPage===pageCount-1} className="p-1 rounded hover:bg-white dark:hover:bg-gray-700 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setAnnotations(p => p.slice(0,-1))} disabled={!annotations.length} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-40"><Undo2 className="w-3.5 h-3.5"/> Undo</button>
          <button onClick={() => setAnnotations([])} disabled={!annotations.length} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"><Trash2 className="w-3.5 h-3.5"/> Clear</button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          <button onClick={handleSave} disabled={isProcessing} className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-50">
            <Download className="w-3.5 h-3.5"/> {isProcessing ? "Saving..." : "Export"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ── Left Tools Sidebar ── */}
        <div className="w-16 bg-white dark:bg-[#18181b] border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-4 gap-2 shrink-0 z-10 overflow-y-auto">
          <ToolButton m="select" icon={<MousePointer2 className="w-5 h-5" />} label="Select" />
          <div className="w-8 h-px bg-gray-100 dark:bg-gray-800 my-1" />
          <ToolButton m="text" icon={<Type className="w-5 h-5" />} label="Text" />
          <ToolButton m="freehand" icon={<PenTool className="w-5 h-5" />} label="Draw" />
          <ToolButton m="highlight" icon={<Highlighter className="w-5 h-5" />} label="Highlight" />
          <div className="w-8 h-px bg-gray-100 dark:bg-gray-800 my-1" />
          <ToolButton m="rectangle" icon={<Square className="w-5 h-5" />} label="Rect" />
          <ToolButton m="ellipse" icon={<Circle className="w-5 h-5" />} label="Ellipse" />
          <ToolButton m="line" icon={<Minus className="w-5 h-5" />} label="Line" />
          <ToolButton m="arrow" icon={<MoveUpRight className="w-5 h-5" />} label="Arrow" />
          <div className="w-8 h-px bg-gray-100 dark:bg-gray-800 my-1" />
          <ToolButton m="image" icon={<ImageIcon className="w-5 h-5" />} label="Image" />
        </div>

        {/* ── Main Workspace ── */}
        <div className="flex-1 overflow-auto flex justify-center items-start p-8 relative bg-gray-200 dark:bg-black/60">
          {isProcessing && <div className="absolute inset-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center fixed"><ProgressBar progress={progress} label="Saving PDF..." color={ACCENT} /></div>}
          
          <div className="relative transition-all duration-200 ease-out my-4" style={{ transform: `scale(${zoom / 1.5})`, transformOrigin: 'top center' }}>
            <div 
              className="relative w-full h-full bg-white dark:bg-gray-950" 
              ref={containerRef} 
              onMouseDown={handleMouseDown} 
              onMouseMove={handleMouseMove} 
              onMouseUp={handleMouseUp} 
              onMouseLeave={handleMouseUp}
              style={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {loadingPage && <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-10"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>}
              {pageImg && <img src={pageImg} alt={`Page ${currentPage+1}`} className="block pointer-events-none w-auto max-w-none" style={{ minHeight: 600 }} />}
              <canvas ref={overlayRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ cursor: mode === "select" ? "default" : "crosshair" }} />
            </div>
          </div>
        </div>

        {/* ── Right Properties Sidebar ── */}
        <div className="w-64 bg-white dark:bg-[#18181b] border-l border-gray-200 dark:border-gray-800 p-5 shrink-0 z-10 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-200">
            <Settings2 className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Properties</h3>
          </div>

          {mode === "select" && (
            <p className="text-xs text-gray-500">Select an annotation on the canvas to view or edit its properties.</p>
          )}

          {mode === "text" && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Text Content</label>
                <textarea value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Type here..." rows={3} className="w-full text-sm p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 resize-none outline-none focus:border-blue-500" />
                <p className="text-[10px] text-gray-400 mt-1">Click on the document to place this text.</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Font Size ({fontSize}pt)</label>
                <input type="range" min={8} max={120} value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full accent-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#000000", "#ffffff"].map(c => (
                    <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500 scale-110' : 'border-transparent shadow-sm'}`} style={{ backgroundColor: c }} />
                  ))}
                  <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-6 h-6 rounded-full overflow-hidden cursor-pointer" />
                </div>
              </div>
              <div>
                <button onClick={() => setBold(b => !b)} className={`w-full py-2 rounded-lg text-sm font-bold border transition-colors ${bold ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' : 'bg-white text-gray-600 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'}`}>
                  Bold Text
                </button>
              </div>
            </div>
          )}

          {(mode === "rectangle" || mode === "ellipse" || mode === "line" || mode === "arrow" || mode === "freehand") && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#000000"].map(c => (
                    <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-blue-500 scale-110' : 'border-transparent shadow-sm'}`} style={{ backgroundColor: c }} />
                  ))}
                  <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-6 h-6 rounded-full cursor-pointer" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Opacity ({Math.round(opacity * 100)}%)</label>
                <input type="range" min={5} max={100} value={Math.round(opacity * 100)} onChange={e => setOpacity(+e.target.value / 100)} className="w-full accent-blue-500" />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Thickness ({strokeWidth}px)</label>
                <input type="range" min={1} max={20} value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)} className="w-full accent-blue-500" />
              </div>

              {(mode === "rectangle" || mode === "ellipse") && (
                <label className="flex items-center gap-2 cursor-pointer mt-4">
                  <input type="checkbox" checked={hasStroke} onChange={e => setHasStroke(e.target.checked)} className="rounded text-blue-500 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Stroke Border</span>
                </label>
              )}
            </div>
          )}

          {mode === "highlight" && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Highlight Color</label>
                <div className="flex gap-2 flex-wrap">
                  {["#fef08a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#e5e7eb"].map(c => (
                    <button key={c} onClick={() => setFillColor(c)} className={`w-6 h-6 rounded border-2 ${fillColor === c ? 'border-blue-500 scale-110' : 'border-gray-200'}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Intensity ({Math.round(opacity * 100)}%)</label>
                <input type="range" min={10} max={80} value={Math.round(opacity * 100)} onChange={e => setOpacity(+e.target.value / 100)} className="w-full accent-blue-500" />
              </div>
            </div>
          )}

          {mode === "image" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500">Click anywhere on the PDF page to browse and insert an image.</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                <ImageIcon className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Supported: JPG, PNG</span>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-xs font-semibold text-gray-500 mb-3">View Options</h4>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-1 w-full">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-1.5 rounded hover:bg-white dark:hover:bg-gray-700 flex-1 flex justify-center"><Minus className="w-3.5 h-3.5" /></button>
              <span className="text-xs font-bold px-2 w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-1.5 rounded hover:bg-white dark:hover:bg-gray-700 flex-1 flex justify-center"><span className="text-xs font-bold leading-none">+</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
