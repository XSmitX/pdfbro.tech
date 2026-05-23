"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  MousePointer2, Type, PenTool, Eraser, Highlighter, Underline, Strikethrough,
  Square, Circle, Minus, MoveUpRight, Image as ImageIcon, Stamp,
  Undo2, Redo2, Trash2, Download, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, Layers, Copy, Clipboard, Bold, Italic,
  AlignLeft, AlignCenter, AlignRight, X, Maximize2,
} from "lucide-react";
import DropZone from "@/components/DropZone";
import ProgressBar from "@/components/ProgressBar";
import ResultPanel from "@/components/ResultPanel";
import { useFileUpload } from "@/hooks/useFileUpload";
import { editPDF, getAnnotationBounds, moveAnnotation } from "@/modules/tools/editPDF";
import type { Annotation } from "@/modules/ui/editPDFTypes";
import { drawAnnotationsToCanvas } from "@/modules/ui/editPDFCanvas";
import type { ProcessingResult } from "@/lib/types";

// ── Types ─────────────────────────────────────────────────────
type ToolMode =
  | "select" | "text" | "freehand" | "eraser"
  | "highlight" | "underline" | "strikethrough"
  | "rectangle" | "ellipse" | "line" | "arrow"
  | "image" | "stamp";

// ── Constants ────────────────────────────────────────────────
const ACCENT = "#3b82f6";
const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const WORKER_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const STAMP_PRESETS = [
  { label: "APPROVED",     color: "#16a34a" },
  { label: "CONFIDENTIAL", color: "#dc2626" },
  { label: "DRAFT",        color: "#f97316" },
  { label: "VOID",         color: "#dc2626" },
  { label: "REVIEWED",     color: "#2563eb" },
  { label: "COPY",         color: "#6b7280" },
  { label: "PAID",         color: "#16a34a" },
  { label: "REJECTED",     color: "#dc2626" },
];

const COLOR_PRESETS = ["#ef4444","#f97316","#eab308","#16a34a","#3b82f6","#8b5cf6","#ec4899","#000000","#ffffff"];
const HIGHLIGHT_COLORS = ["#fef08a","#bbf7d0","#bfdbfe","#fbcfe8","#fed7aa","#e5e7eb"];

// ── PDF.js lazy loader ───────────────────────────────────────
let pdfjsLoaded = false;
let pdfjsLoading: Promise<void> | null = null;
function loadPdfJs(): Promise<void> {
  if (pdfjsLoaded) return Promise.resolve();
  if (pdfjsLoading) return pdfjsLoading;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).pdfjsLib) { pdfjsLoaded = true; return Promise.resolve(); }
  pdfjsLoading = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = PDFJS_CDN; s.crossOrigin = "anonymous";
    s.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lib = (window as any).pdfjsLib;
      if (lib) { lib.GlobalWorkerOptions.workerSrc = WORKER_CDN; pdfjsLoaded = true; res(); }
      else rej(new Error("pdfjsLib not found"));
    };
    s.onerror = () => rej(new Error("Failed to load PDF.js"));
    document.head.appendChild(s);
  });
  return pdfjsLoading;
}

// ── Hit testing ──────────────────────────────────────────────
function hitTestAnnotations(annots: Annotation[], pt: { x: number; y: number }, pageIdx: number): number {
  for (let i = annots.length - 1; i >= 0; i--) {
    const ann = annots[i];
    if (ann.pageIndex !== pageIdx) continue;
    const b = getAnnotationBounds(ann);
    if (!b) continue;
    if (pt.x >= b.x - 0.005 && pt.x <= b.x + b.w + 0.005 &&
        pt.y >= b.y - 0.005 && pt.y <= b.y + b.h + 0.005) return i;
  }
  return -1;
}

// ── Cursor per mode ──────────────────────────────────────────
function getCursor(mode: ToolMode, hovering: boolean): string {
  if (mode === "select") return hovering ? "move" : "default";
  if (mode === "text") return "text";
  if (mode === "eraser") return "cell";
  if (mode === "image" || mode === "stamp") return "copy";
  return "crosshair";
}

// ── Annotation type label ───────────────────────────────────
function annotLabel(ann: Annotation): string {
  switch (ann.type) {
    case "text": return `Text: "${ann.text.slice(0, 18)}${ann.text.length > 18 ? "…" : ""}"`;
    case "stamp": return `Stamp: ${ann.label}`;
    case "freehand": return "Freehand drawing";
    default: return ann.type.charAt(0).toUpperCase() + ann.type.slice(1);
  }
}

// ── Tool button ──────────────────────────────────────────────
function ToolBtn({ active, onClick, icon, label, shortcut }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string; shortcut?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={`${label}${shortcut ? ` (${shortcut})` : ""}`}
      className={`w-11 h-11 flex flex-col items-center justify-center rounded-lg transition-all gap-0.5 group relative
        ${active
          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-700 shadow-sm"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent"}`}
    >
      {icon}
      <span className="text-[8px] font-medium leading-none">{label}</span>
    </button>
  );
}

// ── Divider ──────────────────────────────────────────────────
const Div = () => <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 my-1 mx-auto" />;

// ── Color picker row ─────────────────────────────────────────
function ColorRow({ value, onChange, presets }: { value: string; onChange: (c: string) => void; presets: string[] }) {
  return (
    <div className="flex gap-1.5 flex-wrap items-center">
      {presets.map(c => (
        <button key={c} onClick={() => onChange(c)}
          className={`w-5 h-5 rounded-full transition-transform border-2 ${value === c ? "border-blue-500 scale-110" : "border-gray-200 dark:border-gray-700"}`}
          style={{ backgroundColor: c }} />
      ))}
      <input type="color" value={value} onChange={e => onChange(e.target.value)}
        className="w-5 h-5 rounded cursor-pointer border border-gray-200 dark:border-gray-700" title="Custom color" />
    </div>
  );
}

// ── Slider ───────────────────────────────────────────────────
function Slider({ label, min, max, value, onChange, format }: {
  label: string; min: number; max: number; value: number;
  onChange: (v: number) => void; format?: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-xs text-gray-400">{format ? format(value) : value}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full h-1.5 rounded accent-blue-500 cursor-pointer" />
    </div>
  );
}

// ── Props section header ─────────────────────────────────────
const SectionHead = ({ label }: { label: string }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-4 mb-2 first:mt-0">{label}</p>
);

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
export default function EditPDFTool() {
  // ── File / PDF state ──────────────────────────────────────
  const [pdfBuf, setPdfBuf]       = useState<Uint8Array | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageImg, setPageImg]     = useState<string | null>(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [result, setResult]       = useState<ProcessingResult | null>(null);
  const [error, setError]         = useState<string | null>(null);

  // ── Annotation + history state ────────────────────────────
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const annotationsRef = useRef<Annotation[]>([]);
  annotationsRef.current = annotations;

  const undoStackRef  = useRef<Annotation[][]>([[]]); // snapshots
  const undoIdxRef    = useRef(0);
  const [historyLen, setHistoryLen] = useState(1); // for re-renders on undo/redo

  const commitHistory = useCallback((newAnnots: Annotation[]) => {
    undoStackRef.current = undoStackRef.current.slice(0, undoIdxRef.current + 1);
    undoStackRef.current.push([...newAnnots]);
    undoIdxRef.current = undoStackRef.current.length - 1;
    setHistoryLen(undoStackRef.current.length);
    setAnnotations(newAnnots);
  }, []);

  const undo = useCallback(() => {
    if (undoIdxRef.current > 0) {
      undoIdxRef.current--;
      const state = undoStackRef.current[undoIdxRef.current];
      setAnnotations([...state]);
      setSelectedIdx(null);
      setHistoryLen(undoStackRef.current.length);
    }
  }, []);

  const redo = useCallback(() => {
    if (undoIdxRef.current < undoStackRef.current.length - 1) {
      undoIdxRef.current++;
      const state = undoStackRef.current[undoIdxRef.current];
      setAnnotations([...state]);
      setSelectedIdx(null);
      setHistoryLen(undoStackRef.current.length);
    }
  }, []);

  const canUndo = undoIdxRef.current > 0;
  const canRedo = undoIdxRef.current < undoStackRef.current.length - 1;
  void historyLen; // referenced for re-render trigger

  // ── Selection / drag state ───────────────────────────────
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [clipboard, setClipboard]     = useState<Annotation | null>(null);
  const [hoverIdx, setHoverIdx]       = useState<number | null>(null);

  const dragRef = useRef<{
    annotIdx: number;
    startPt: { x: number; y: number };
    origAnnot: Annotation;
    moved: boolean;
  } | null>(null);

  // ── Drawing state ────────────────────────────────────────
  const [mode, setMode]             = useState<ToolMode>("select");
  const [isDrawing, setIsDrawing]   = useState(false);
  const [draftPoints, setDraftPoints] = useState<{ x: number; y: number }[]>([]);
  const [dragStart, setDragStart]   = useState<{ x: number; y: number } | null>(null);
  const [currMouse, setCurrMouse]   = useState<{ x: number; y: number } | null>(null);

  // ── Tool properties ──────────────────────────────────────
  const [textInput,    setTextInput]    = useState("");
  const [fontSize,     setFontSize]     = useState(18);
  const [color,        setColor]        = useState("#ef4444");
  const [bold,         setBold]         = useState(false);
  const [italic,       setItalic]       = useState(false);
  const [fontFamily,   setFontFamily]   = useState<"Helvetica" | "Times" | "Courier">("Helvetica");
  const [textAlign,    setTextAlign]    = useState<"left" | "center" | "right">("left");
  const [fillColor,    setFillColor]    = useState("#fef08a");
  const [opacity,      setOpacity]      = useState(0.5);
  const [strokeWidth,  setStrokeWidth]  = useState(3);
  const [hasStroke,    setHasStroke]    = useState(false);
  const [stampLabel,   setStampLabel]   = useState("APPROVED");
  const [stampColor,   setStampColor]   = useState("#16a34a");
  const [zoom,         setZoom]         = useState(1.5);

  // ── Refs ─────────────────────────────────────────────────
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const containerRef   = useRef<HTMLDivElement>(null);
  const imageCacheRef  = useRef<Map<string, HTMLImageElement>>(new Map());

  const { files, isDragging, inputRef, addFiles, removeFile, clearFiles, dropZoneProps, error: uploadError } = useFileUpload({
    acceptedTypes: "application/pdf", multiple: false, maxFileSize: 100 * 1024 * 1024, maxFiles: 1,
  });

  // ── Load PDF ─────────────────────────────────────────────
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
      undoStackRef.current = [[]]; undoIdxRef.current = 0;
      pdf.destroy();
    }).catch(e => setError((e as Error).message));
  }, [files]);

  // ── Render page ──────────────────────────────────────────
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
      } catch (e) {
        if (!cancelled) { setError((e as Error).message); setLoadingPage(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [pdfBuf, currentPage, pageCount, zoom]);

  // ── Draw canvas overlay ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    if (rect.width === 0) return;
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawAnnotationsToCanvas(ctx, annotations, currentPage, rect.width, rect.height, selectedIdx, imageCacheRef.current);

    // Draw draft preview
    if (dragStart && currMouse) {
      const cw = rect.width; const ch = rect.height;
      const w = currMouse.x - dragStart.x; const h = currMouse.y - dragStart.y;
      ctx.save();
      if (mode === "rectangle") {
        ctx.globalAlpha = opacity; ctx.fillStyle = color;
        ctx.fillRect(Math.min(dragStart.x, currMouse.x) * cw, Math.min(dragStart.y, currMouse.y) * ch, Math.abs(w) * cw, Math.abs(h) * ch);
        if (hasStroke) { ctx.globalAlpha = Math.min(1, opacity + 0.3); ctx.strokeStyle = "#000"; ctx.lineWidth = strokeWidth; ctx.strokeRect(Math.min(dragStart.x, currMouse.x) * cw, Math.min(dragStart.y, currMouse.y) * ch, Math.abs(w) * cw, Math.abs(h) * ch); }
      } else if (mode === "highlight" || mode === "underline" || mode === "strikethrough") {
        ctx.globalAlpha = mode === "highlight" ? opacity : 1;
        ctx.fillStyle = mode === "highlight" ? fillColor : "transparent";
        if (mode === "highlight") ctx.fillRect(Math.min(dragStart.x, currMouse.x) * cw, Math.min(dragStart.y, currMouse.y) * ch, Math.abs(w) * cw, Math.abs(h) * ch);
        ctx.strokeStyle = color; ctx.lineWidth = strokeWidth;
        if (mode === "underline") {
          ctx.beginPath(); ctx.moveTo(Math.min(dragStart.x, currMouse.x) * cw, Math.max(dragStart.y, currMouse.y) * ch); ctx.lineTo(Math.max(dragStart.x, currMouse.x) * cw, Math.max(dragStart.y, currMouse.y) * ch); ctx.stroke();
        } else if (mode === "strikethrough") {
          const midY = (dragStart.y + currMouse.y) / 2 * ch;
          ctx.beginPath(); ctx.moveTo(Math.min(dragStart.x, currMouse.x) * cw, midY); ctx.lineTo(Math.max(dragStart.x, currMouse.x) * cw, midY); ctx.stroke();
        }
      } else if (mode === "ellipse") {
        ctx.globalAlpha = opacity; ctx.fillStyle = color;
        ctx.beginPath(); ctx.ellipse(dragStart.x * cw, dragStart.y * ch, Math.abs(w) * cw, Math.abs(h) * ch, 0, 0, Math.PI * 2); ctx.fill();
      } else if (mode === "line" || mode === "arrow") {
        ctx.globalAlpha = opacity; ctx.strokeStyle = color; ctx.lineWidth = strokeWidth; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(dragStart.x * cw, dragStart.y * ch); ctx.lineTo(currMouse.x * cw, currMouse.y * ch); ctx.stroke();
      }
      ctx.restore();
    }
    if (isDrawing && draftPoints.length > 1 && mode === "freehand") {
      const cw = rect.width; const ch = rect.height;
      ctx.save(); ctx.globalAlpha = opacity; ctx.strokeStyle = color; ctx.lineWidth = strokeWidth; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(draftPoints[0].x * cw, draftPoints[0].y * ch);
      for (let i = 1; i < draftPoints.length; i++) ctx.lineTo(draftPoints[i].x * cw, draftPoints[i].y * ch);
      ctx.stroke(); ctx.restore();
    }
  }, [annotations, currentPage, dragStart, currMouse, isDrawing, draftPoints, mode, color, fillColor, opacity, strokeWidth, selectedIdx, pageImg, hasStroke]);

  // ── getFrac helper ───────────────────────────────────────
  const getFrac = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
    };
  }, []);

  // ── Mouse handlers ───────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const pt = getFrac(e);
    if (mode === "select") {
      if (dragRef.current) {
        dragRef.current.moved = true;
        const dx = pt.x - dragRef.current.startPt.x;
        const dy = pt.y - dragRef.current.startPt.y;
        const moved = moveAnnotation(dragRef.current.origAnnot, dx, dy);
        setAnnotations(prev => prev.map((a, i) => i === dragRef.current!.annotIdx ? moved : a));
      } else {
        const h = hitTestAnnotations(annotationsRef.current, pt, currentPage);
        setHoverIdx(h === -1 ? null : h);
      }
      return;
    }
    if (mode === "freehand" && isDrawing) { setDraftPoints(prev => [...prev, pt]); return; }
    if (dragStart) setCurrMouse(pt);
  }, [mode, isDrawing, dragStart, getFrac, currentPage]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const pt = getFrac(e);

    // ── Select mode ──────────────────────────────────────
    if (mode === "select") {
      const hitIdx = hitTestAnnotations(annotationsRef.current, pt, currentPage);
      if (hitIdx !== -1) {
        setSelectedIdx(hitIdx);
        dragRef.current = { annotIdx: hitIdx, startPt: pt, origAnnot: annotationsRef.current[hitIdx], moved: false };
      } else {
        setSelectedIdx(null);
      }
      return;
    }

    // ── Eraser mode ──────────────────────────────────────
    if (mode === "eraser") {
      const hitIdx = hitTestAnnotations(annotationsRef.current, pt, currentPage);
      if (hitIdx !== -1) {
        const newAnnots = annotationsRef.current.filter((_, i) => i !== hitIdx);
        commitHistory(newAnnots);
        if (selectedIdx === hitIdx) setSelectedIdx(null);
      }
      return;
    }

    // ── Text mode ────────────────────────────────────────
    if (mode === "text") {
      if (!textInput.trim()) return;
      const ann = { type: "text" as const, pageIndex: currentPage, x: pt.x, y: pt.y, text: textInput, fontSize, color, bold, italic, fontFamily, align: textAlign };
      commitHistory([...annotationsRef.current, ann]);
      return;
    }

    // ── Image mode ───────────────────────────────────────
    if (mode === "image") {
      const inp = document.createElement("input");
      inp.type = "file"; inp.accept = "image/png,image/jpeg";
      inp.onchange = async (ev) => {
        const file = (ev.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const data = new Uint8Array(await file.arrayBuffer());
        const dataUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          const w = 0.25; const h = (0.25 / ratio) * ((containerRef.current?.getBoundingClientRect().width || 1) / (containerRef.current?.getBoundingClientRect().height || 1));
          const ann = { type: "image" as const, pageIndex: currentPage, x: pt.x, y: pt.y, width: w, height: h, data, format: file.type.includes("png") ? "png" as const : "jpg" as const, dataUrl };
          commitHistory([...annotationsRef.current, ann]);
        };
        img.src = dataUrl;
      };
      inp.click();
      return;
    }

    // ── Stamp mode ───────────────────────────────────────
    if (mode === "stamp") {
      const ann = { type: "stamp" as const, pageIndex: currentPage, x: pt.x - 0.1, y: pt.y - 0.03, width: 0.2, height: 0.06, label: stampLabel, color: stampColor };
      commitHistory([...annotationsRef.current, ann]);
      return;
    }

    // ── Freehand mode ────────────────────────────────────
    if (mode === "freehand") { setIsDrawing(true); setDraftPoints([pt]); return; }

    // ── Shape modes ──────────────────────────────────────
    setDragStart(pt); setCurrMouse(pt);
  }, [mode, currentPage, textInput, fontSize, color, bold, italic, fontFamily, textAlign, stampLabel, stampColor, selectedIdx, commitHistory, getFrac]);

  const handleMouseUp = useCallback(() => {
    // ── Finalize drag in select mode ─────────────────────
    if (dragRef.current) {
      if (dragRef.current.moved) {
        commitHistory([...annotationsRef.current]);
      }
      dragRef.current = null;
      return;
    }

    // ── Finalize freehand ────────────────────────────────
    if (mode === "freehand" && isDrawing) {
      if (draftPoints.length > 2) {
        const ann = { type: "freehand" as const, pageIndex: currentPage, points: draftPoints, color, strokeWidth, opacity };
        commitHistory([...annotationsRef.current, ann]);
      }
      setIsDrawing(false); setDraftPoints([]);
      return;
    }

    // ── Finalize shape ───────────────────────────────────
    if (dragStart && currMouse) {
      const w = Math.abs(currMouse.x - dragStart.x);
      const h = Math.abs(currMouse.y - dragStart.y);
      const x0 = Math.min(dragStart.x, currMouse.x);
      const y0 = Math.min(dragStart.y, currMouse.y);
      const minSize = mode === "line" || mode === "arrow" ? 0.01 : 0.015;

      if (Math.max(w, h) > minSize) {
        let ann: Annotation | null = null;
        if (mode === "rectangle") ann = { type: "rectangle", pageIndex: currentPage, x: x0, y: y0, width: w, height: h, color, opacity, stroke: hasStroke, strokeColor: "#000000", strokeWidth };
        else if (mode === "highlight") ann = { type: "highlight", pageIndex: currentPage, x: x0, y: y0, width: w, height: h, color: fillColor, opacity };
        else if (mode === "underline") ann = { type: "underline", pageIndex: currentPage, x: x0, y: y0, width: w, height: h, color, strokeWidth };
        else if (mode === "strikethrough") ann = { type: "strikethrough", pageIndex: currentPage, x: x0, y: y0, width: w, height: h, color, strokeWidth };
        else if (mode === "ellipse") ann = { type: "ellipse", pageIndex: currentPage, cx: dragStart.x, cy: dragStart.y, rx: w, ry: h, color, opacity, stroke: hasStroke, strokeColor: "#000000", strokeWidth };
        else if (mode === "line" || mode === "arrow") ann = { type: "line", pageIndex: currentPage, x1: dragStart.x, y1: dragStart.y, x2: currMouse.x, y2: currMouse.y, color, strokeWidth, opacity, arrow: mode === "arrow" };
        if (ann) commitHistory([...annotationsRef.current, ann]);
      }
      setDragStart(null); setCurrMouse(null);
    }
  }, [mode, isDrawing, draftPoints, dragStart, currMouse, currentPage, color, fillColor, opacity, strokeWidth, hasStroke, commitHistory]);

  // ── Delete selected ──────────────────────────────────────
  const deleteSelected = useCallback(() => {
    if (selectedIdx === null) return;
    const newAnnots = annotationsRef.current.filter((_, i) => i !== selectedIdx);
    commitHistory(newAnnots);
    setSelectedIdx(null);
  }, [selectedIdx, commitHistory]);

  // ── Update selected annotation ───────────────────────────
  const updateSelected = useCallback((patch: Partial<Annotation>) => {
    if (selectedIdx === null) return;
    const newAnnots = annotationsRef.current.map((a, i) =>
      i === selectedIdx ? { ...a, ...patch } as Annotation : a
    );
    commitHistory(newAnnots);
  }, [selectedIdx, commitHistory]);

  // ── Copy / paste ─────────────────────────────────────────
  const copySelected = useCallback(() => {
    if (selectedIdx === null) return;
    setClipboard({ ...annotationsRef.current[selectedIdx] });
  }, [selectedIdx]);

  const paste = useCallback(() => {
    if (!clipboard) return;
    const offsetAnn = moveAnnotation({ ...clipboard, pageIndex: currentPage }, 0.02, 0.02);
    commitHistory([...annotationsRef.current, offsetAnn]);
  }, [clipboard, currentPage, commitHistory]);

  // ── Keyboard shortcuts ───────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA";
      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.key === "z") { e.preventDefault(); undo(); return; }
      if (ctrl && (e.key === "y" || (e.shiftKey && e.key === "Z"))) { e.preventDefault(); redo(); return; }
      if (ctrl && e.key === "c") { e.preventDefault(); copySelected(); return; }
      if (ctrl && e.key === "v") { e.preventDefault(); paste(); return; }

      if (inInput) return;
      if ((e.key === "Delete" || e.key === "Backspace") && selectedIdx !== null) { e.preventDefault(); deleteSelected(); return; }
      if (e.key === "Escape") { setSelectedIdx(null); return; }

      // Tool shortcuts
      const keyMap: Record<string, ToolMode> = {
        v: "select", t: "text", d: "freehand", e: "eraser",
        h: "highlight", u: "underline", k: "strikethrough",
        r: "rectangle", o: "ellipse", l: "line", a: "arrow",
        i: "image", s: "stamp",
      };
      if (!ctrl && e.key in keyMap) { setMode(keyMap[e.key]); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, copySelected, paste, deleteSelected, selectedIdx]);

  // ── Export ───────────────────────────────────────────────
  const handleExport = async () => {
    if (!files[0]) return;
    setIsProcessing(true); setProgress(20);
    try {
      setProgress(50);
      const res = await editPDF(files[0].file, { annotations });
      setProgress(100);
      if (res.success) setResult(res);
      else setError(res.error || "Export failed");
    } catch (e) { setError((e as Error).message); }
    setIsProcessing(false);
  };

  // ── Zoom helpers ─────────────────────────────────────────
  const zoomIn  = () => setZoom(z => Math.min(4, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom(z => Math.max(0.5, +(z - 0.25).toFixed(2)));
  const zoomFit = () => setZoom(1.5);

  // ── Selected annotation ──────────────────────────────────
  const selAnn = selectedIdx !== null ? annotations[selectedIdx] : null;
  const pageAnnots = annotations.filter(a => a.pageIndex === currentPage);

  // ── Result state ─────────────────────────────────────────
  if (result) return (
    <ResultPanel result={result} onReset={() => { clearFiles(); setAnnotations([]); setResult(null); undoStackRef.current = [[]]; undoIdxRef.current = 0; }} accentColor={ACCENT} />
  );

  // ── Upload state ─────────────────────────────────────────
  if (!files[0] || !pdfBuf) return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "1rem", padding: "1.5rem" }}>
        <DropZone isDragging={isDragging} files={files} acceptedTypes="application/pdf" onRemove={removeFile} dropZoneProps={dropZoneProps} inputRef={inputRef} onInputChange={e => e.target.files && addFiles(e.target.files)} label="Drop a PDF to edit" hint="Advanced PDF editor — annotate, stamp, draw, highlight and more." />
      </div>
      {(error || uploadError) && <div className="text-red-500 text-sm p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>{error || uploadError}</div>}
    </div>
  );

  // ══════════════════════════════════════════════════════════
  // EDITOR UI
  // ══════════════════════════════════════════════════════════
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden shadow-md"
      style={{ height: "calc(100vh - 180px)", minHeight: "640px", border: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-secondary)" }}
    >
      {/* ── TOP BAR ──────────────────────────────────────── */}
      <div className="h-12 shrink-0 flex items-center justify-between px-3 gap-2"
        style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-subtle)" }}>

        {/* File name */}
        <div className="flex items-center gap-2 min-w-0">
          <Layers className="w-4 h-4 shrink-0" style={{ color: "var(--accent-blue)" }} />
          <span className="text-xs font-semibold truncate max-w-[140px]" style={{ color: "var(--text-primary)" }}>
            {files[0].name}
          </span>
          {pageAnnots.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.12)", color: "var(--accent-blue)" }}>
              {pageAnnots.length}
            </span>
          )}
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1 rounded-lg px-1.5 py-0.5" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
          <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
            className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-medium px-1.5" style={{ color: "var(--text-secondary)" }}>
            {currentPage + 1} / {pageCount}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(pageCount - 1, p + 1))} disabled={currentPage === pageCount - 1}
            className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1">
          <button onClick={zoomOut} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><ZoomOut className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} /></button>
          <button onClick={zoomFit} className="text-xs font-semibold px-2 py-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" style={{ color: "var(--text-secondary)", minWidth: 46, textAlign: "center" }}>{Math.round(zoom * 100)}%</button>
          <button onClick={zoomIn} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><ZoomIn className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} /></button>
          <button onClick={() => setZoom(2)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="Fit width"><Maximize2 className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} /></button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold disabled:opacity-30 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: "var(--text-secondary)" }}>
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold disabled:opacity-30 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: "var(--text-secondary)" }}>
            <Redo2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-5 mx-1" style={{ backgroundColor: "var(--border-subtle)" }} />
          {selectedIdx !== null && (
            <>
              <button onClick={copySelected} title="Copy (Ctrl+C)" className="p-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: "var(--text-secondary)" }}><Copy className="w-3.5 h-3.5" /></button>
              <button onClick={deleteSelected} title="Delete (Del)" className="p-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-red-50 dark:hover:bg-red-900/20" style={{ color: "#ef4444" }}><Trash2 className="w-3.5 h-3.5" /></button>
            </>
          )}
          {clipboard && (
            <button onClick={paste} title="Paste (Ctrl+V)" className="p-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: "var(--text-secondary)" }}><Clipboard className="w-3.5 h-3.5" /></button>
          )}
          <div className="w-px h-5 mx-1" style={{ backgroundColor: "var(--border-subtle)" }} />
          <button onClick={handleExport} disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white disabled:opacity-50 transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))", boxShadow: "0 2px 8px rgba(79,142,247,0.3)" }}>
            <Download className="w-3.5 h-3.5" />
            {isProcessing ? "Saving…" : "Export PDF"}
          </button>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT TOOLBAR ─────────────────────────────── */}
        <div className="w-14 shrink-0 flex flex-col items-center py-2 gap-0.5 overflow-y-auto"
          style={{ backgroundColor: "var(--bg-card)", borderRight: "1px solid var(--border-subtle)" }}>
          <ToolBtn active={mode==="select"}        onClick={() => setMode("select")}        icon={<MousePointer2 className="w-4 h-4"/>} label="Select"    shortcut="V" />
          <Div />
          <ToolBtn active={mode==="text"}          onClick={() => setMode("text")}          icon={<Type className="w-4 h-4"/>}         label="Text"      shortcut="T" />
          <ToolBtn active={mode==="freehand"}      onClick={() => setMode("freehand")}      icon={<PenTool className="w-4 h-4"/>}      label="Draw"      shortcut="D" />
          <ToolBtn active={mode==="eraser"}        onClick={() => setMode("eraser")}        icon={<Eraser className="w-4 h-4"/>}       label="Eraser"    shortcut="E" />
          <Div />
          <ToolBtn active={mode==="highlight"}     onClick={() => setMode("highlight")}     icon={<Highlighter className="w-4 h-4"/>}  label="Highlight" shortcut="H" />
          <ToolBtn active={mode==="underline"}     onClick={() => setMode("underline")}     icon={<Underline className="w-4 h-4"/>}    label="Underline" shortcut="U" />
          <ToolBtn active={mode==="strikethrough"} onClick={() => setMode("strikethrough")} icon={<Strikethrough className="w-4 h-4"/>} label="Strike"  shortcut="K" />
          <Div />
          <ToolBtn active={mode==="rectangle"}     onClick={() => setMode("rectangle")}     icon={<Square className="w-4 h-4"/>}       label="Rect"      shortcut="R" />
          <ToolBtn active={mode==="ellipse"}       onClick={() => setMode("ellipse")}       icon={<Circle className="w-4 h-4"/>}       label="Ellipse"   shortcut="O" />
          <ToolBtn active={mode==="line"}          onClick={() => setMode("line")}          icon={<Minus className="w-4 h-4"/>}        label="Line"      shortcut="L" />
          <ToolBtn active={mode==="arrow"}         onClick={() => setMode("arrow")}         icon={<MoveUpRight className="w-4 h-4"/>}  label="Arrow"     shortcut="A" />
          <Div />
          <ToolBtn active={mode==="image"}         onClick={() => setMode("image")}         icon={<ImageIcon className="w-4 h-4"/>}    label="Image"     shortcut="I" />
          <ToolBtn active={mode==="stamp"}         onClick={() => setMode("stamp")}         icon={<Stamp className="w-4 h-4"/>}        label="Stamp"     shortcut="S" />
        </div>

        {/* ── CANVAS AREA ──────────────────────────────── */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-6 relative"
          style={{ backgroundColor: "#1a1a24" }}>
          {isProcessing && (
            <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
              <ProgressBar progress={progress} label="Exporting PDF…" color={ACCENT} />
            </div>
          )}
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-red-600"
              style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
              {error}
              <button onClick={() => setError(null)}><X className="w-3.5 h-3.5" /></button>
            </div>
          )}
          <div ref={containerRef} className="relative" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)", marginTop: 8 }}>
            {loadingPage && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/30">
                <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              </div>
            )}
            {pageImg && (
              <img src={pageImg} alt={`Page ${currentPage + 1}`} className="block pointer-events-none select-none"
                style={{ display: "block", maxWidth: "none" }} />
            )}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ cursor: getCursor(mode, hoverIdx !== null) }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
        </div>

        {/* ── RIGHT PANEL ──────────────────────────────── */}
        <div className="w-60 shrink-0 overflow-y-auto p-4"
          style={{ backgroundColor: "var(--bg-card)", borderLeft: "1px solid var(--border-subtle)" }}>

          {/* ── Selected annotation properties ── */}
          {selAnn ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Selection</p>
                <button onClick={() => setSelectedIdx(null)} className="p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-3 h-3" style={{ color: "var(--text-muted)" }} /></button>
              </div>
              <p className="text-xs mb-3 rounded-lg px-2 py-1.5" style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                {annotLabel(selAnn)}
              </p>

              {/* Text annotation editing */}
              {selAnn.type === "text" && (
                <>
                  <SectionHead label="Text" />
                  <textarea
                    value={selAnn.text}
                    onChange={e => updateSelected({ text: e.target.value })}
                    rows={3}
                    className="w-full text-xs p-2 rounded-lg resize-none outline-none mb-3"
                    style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
                  />
                  <SectionHead label="Font" />
                  <select value={selAnn.fontFamily} onChange={e => updateSelected({ fontFamily: e.target.value as "Helvetica"|"Times"|"Courier" })}
                    className="w-full text-xs p-1.5 rounded-lg mb-2 outline-none"
                    style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}>
                    <option value="Helvetica">Helvetica (Sans)</option>
                    <option value="Times">Times (Serif)</option>
                    <option value="Courier">Courier (Mono)</option>
                  </select>
                  <div className="flex gap-2 mb-3">
                    <button onClick={() => updateSelected({ bold: !selAnn.bold })}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${selAnn.bold ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700" : "border-gray-200 dark:border-gray-700"}`}
                      style={!selAnn.bold ? { color: "var(--text-secondary)" } : {}}>
                      <Bold className="w-3.5 h-3.5 mx-auto" />
                    </button>
                    <button onClick={() => updateSelected({ italic: !selAnn.italic })}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${selAnn.italic ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700" : "border-gray-200 dark:border-gray-700"}`}
                      style={!selAnn.italic ? { color: "var(--text-secondary)" } : {}}>
                      <Italic className="w-3.5 h-3.5 mx-auto" />
                    </button>
                    {(["left","center","right"] as const).map(a => (
                      <button key={a} onClick={() => updateSelected({ align: a })}
                        className={`flex-1 py-1.5 rounded-lg border transition-colors ${selAnn.align === a ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700" : "border-gray-200 dark:border-gray-700"}`}
                        style={selAnn.align !== a ? { color: "var(--text-secondary)" } : {}}>
                        {a === "left" ? <AlignLeft className="w-3 h-3 mx-auto" /> : a === "center" ? <AlignCenter className="w-3 h-3 mx-auto" /> : <AlignRight className="w-3 h-3 mx-auto" />}
                      </button>
                    ))}
                  </div>
                  <Slider label="Size" min={8} max={96} value={selAnn.fontSize} onChange={v => updateSelected({ fontSize: v })} format={v => `${v}pt`} />
                  <SectionHead label="Color" />
                  <ColorRow value={selAnn.color} onChange={c => updateSelected({ color: c })} presets={COLOR_PRESETS} />
                </>
              )}

              {/* Rectangle / highlight / underline / strikethrough editing */}
              {(selAnn.type === "rectangle" || selAnn.type === "highlight" || selAnn.type === "underline" || selAnn.type === "strikethrough") && (
                <>
                  <SectionHead label="Color" />
                  <ColorRow value={selAnn.color} onChange={c => updateSelected({ color: c })} presets={selAnn.type === "highlight" ? HIGHLIGHT_COLORS : COLOR_PRESETS} />
                  {(selAnn.type === "rectangle" || selAnn.type === "highlight") && (
                    <>
                      <SectionHead label="Opacity" />
                      <Slider label="" min={5} max={100} value={Math.round(selAnn.opacity * 100)} onChange={v => updateSelected({ opacity: v / 100 })} format={v => `${v}%`} />
                    </>
                  )}
                  {(selAnn.type === "underline" || selAnn.type === "strikethrough") && (
                    <>
                      <SectionHead label="Thickness" />
                      <Slider label="" min={1} max={10} value={selAnn.strokeWidth} onChange={v => updateSelected({ strokeWidth: v })} format={v => `${v}px`} />
                    </>
                  )}
                </>
              )}

              {/* Ellipse editing */}
              {selAnn.type === "ellipse" && (
                <>
                  <SectionHead label="Color" />
                  <ColorRow value={selAnn.color} onChange={c => updateSelected({ color: c })} presets={COLOR_PRESETS} />
                  <SectionHead label="Opacity" />
                  <Slider label="" min={5} max={100} value={Math.round(selAnn.opacity * 100)} onChange={v => updateSelected({ opacity: v / 100 })} format={v => `${v}%`} />
                </>
              )}

              {/* Line / arrow editing */}
              {selAnn.type === "line" && (
                <>
                  <SectionHead label="Color" />
                  <ColorRow value={selAnn.color} onChange={c => updateSelected({ color: c })} presets={COLOR_PRESETS} />
                  <SectionHead label="Thickness" />
                  <Slider label="" min={1} max={20} value={selAnn.strokeWidth} onChange={v => updateSelected({ strokeWidth: v })} format={v => `${v}px`} />
                  <SectionHead label="Style" />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selAnn.arrow} onChange={e => updateSelected({ arrow: e.target.checked })} className="rounded accent-blue-500" />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Arrowhead</span>
                  </label>
                </>
              )}

              {/* Freehand editing */}
              {selAnn.type === "freehand" && (
                <>
                  <SectionHead label="Color" />
                  <ColorRow value={selAnn.color} onChange={c => updateSelected({ color: c })} presets={COLOR_PRESETS} />
                  <SectionHead label="Thickness" />
                  <Slider label="" min={1} max={20} value={selAnn.strokeWidth} onChange={v => updateSelected({ strokeWidth: v })} format={v => `${v}px`} />
                </>
              )}

              {/* Stamp editing */}
              {selAnn.type === "stamp" && (
                <>
                  <SectionHead label="Label" />
                  <div className="grid grid-cols-2 gap-1 mb-3">
                    {STAMP_PRESETS.map(s => (
                      <button key={s.label} onClick={() => updateSelected({ label: s.label, color: s.color })}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${selAnn.label === s.label ? "border-blue-400" : "border-gray-200 dark:border-gray-700"}`}
                        style={{ color: s.color, borderColor: selAnn.label === s.label ? s.color : undefined }}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <SectionHead label="Color" />
                  <ColorRow value={selAnn.color} onChange={c => updateSelected({ color: c })} presets={COLOR_PRESETS} />
                </>
              )}

              {/* Delete button */}
              <button onClick={deleteSelected}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                style={{ color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                <Trash2 className="w-3.5 h-3.5" /> Delete annotation
              </button>
            </div>

          ) : (
            /* ── Tool properties (no selection) ─── */
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </p>

              {/* Text tool */}
              {mode === "text" && (
                <div className="space-y-3">
                  <div>
                    <SectionHead label="Content" />
                    <textarea value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Type text…" rows={3}
                      className="w-full text-xs p-2 rounded-lg resize-none outline-none"
                      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }} />
                    <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>Click on PDF to place</p>
                  </div>
                  <SectionHead label="Font" />
                  <select value={fontFamily} onChange={e => setFontFamily(e.target.value as "Helvetica"|"Times"|"Courier")}
                    className="w-full text-xs p-1.5 rounded-lg outline-none"
                    style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}>
                    <option value="Helvetica">Helvetica (Sans)</option>
                    <option value="Times">Times (Serif)</option>
                    <option value="Courier">Courier (Mono)</option>
                  </select>
                  <div className="flex gap-1">
                    <button onClick={() => setBold(b => !b)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-colors ${bold ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700" : "border-gray-200 dark:border-gray-700"}`}
                      style={!bold ? { color: "var(--text-secondary)" } : {}}>
                      <Bold className="w-3.5 h-3.5 mx-auto" />
                    </button>
                    <button onClick={() => setItalic(i => !i)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-colors ${italic ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700" : "border-gray-200 dark:border-gray-700"}`}
                      style={!italic ? { color: "var(--text-secondary)" } : {}}>
                      <Italic className="w-3.5 h-3.5 mx-auto" />
                    </button>
                    {(["left","center","right"] as const).map(a => (
                      <button key={a} onClick={() => setTextAlign(a)}
                        className={`flex-1 py-1.5 rounded-lg border transition-colors ${textAlign === a ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700" : "border-gray-200 dark:border-gray-700"}`}
                        style={textAlign !== a ? { color: "var(--text-secondary)" } : {}}>
                        {a === "left" ? <AlignLeft className="w-3 h-3 mx-auto" /> : a === "center" ? <AlignCenter className="w-3 h-3 mx-auto" /> : <AlignRight className="w-3 h-3 mx-auto" />}
                      </button>
                    ))}
                  </div>
                  <Slider label="Size" min={8} max={96} value={fontSize} onChange={setFontSize} format={v => `${v}pt`} />
                  <SectionHead label="Color" />
                  <ColorRow value={color} onChange={setColor} presets={COLOR_PRESETS} />
                </div>
              )}

              {/* Highlight tool */}
              {mode === "highlight" && (
                <div className="space-y-3">
                  <SectionHead label="Color" />
                  <ColorRow value={fillColor} onChange={setFillColor} presets={HIGHLIGHT_COLORS} />
                  <Slider label="Intensity" min={10} max={80} value={Math.round(opacity * 100)} onChange={v => setOpacity(v / 100)} format={v => `${v}%`} />
                </div>
              )}

              {/* Underline / Strikethrough */}
              {(mode === "underline" || mode === "strikethrough") && (
                <div className="space-y-3">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Drag across text to mark it.</p>
                  <SectionHead label="Color" />
                  <ColorRow value={color} onChange={setColor} presets={COLOR_PRESETS} />
                  <Slider label="Thickness" min={1} max={10} value={strokeWidth} onChange={setStrokeWidth} format={v => `${v}px`} />
                </div>
              )}

              {/* Rectangle / Ellipse */}
              {(mode === "rectangle" || mode === "ellipse") && (
                <div className="space-y-3">
                  <SectionHead label="Color" />
                  <ColorRow value={color} onChange={setColor} presets={COLOR_PRESETS} />
                  <Slider label="Opacity" min={5} max={100} value={Math.round(opacity * 100)} onChange={v => setOpacity(v / 100)} format={v => `${v}%`} />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={hasStroke} onChange={e => setHasStroke(e.target.checked)} className="rounded accent-blue-500" />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Stroke border</span>
                  </label>
                  {hasStroke && <Slider label="Border width" min={1} max={10} value={strokeWidth} onChange={setStrokeWidth} format={v => `${v}px`} />}
                </div>
              )}

              {/* Freehand / Draw */}
              {mode === "freehand" && (
                <div className="space-y-3">
                  <SectionHead label="Color" />
                  <ColorRow value={color} onChange={setColor} presets={COLOR_PRESETS} />
                  <Slider label="Thickness" min={1} max={24} value={strokeWidth} onChange={setStrokeWidth} format={v => `${v}px`} />
                  <Slider label="Opacity" min={10} max={100} value={Math.round(opacity * 100)} onChange={v => setOpacity(v / 100)} format={v => `${v}%`} />
                </div>
              )}

              {/* Line / Arrow */}
              {(mode === "line" || mode === "arrow") && (
                <div className="space-y-3">
                  <SectionHead label="Color" />
                  <ColorRow value={color} onChange={setColor} presets={COLOR_PRESETS} />
                  <Slider label="Thickness" min={1} max={20} value={strokeWidth} onChange={setStrokeWidth} format={v => `${v}px`} />
                  <Slider label="Opacity" min={10} max={100} value={Math.round(opacity * 100)} onChange={v => setOpacity(v / 100)} format={v => `${v}%`} />
                </div>
              )}

              {/* Stamp tool */}
              {mode === "stamp" && (
                <div className="space-y-3">
                  <SectionHead label="Stamp Type" />
                  <div className="grid grid-cols-2 gap-1">
                    {STAMP_PRESETS.map(s => (
                      <button key={s.label} onClick={() => { setStampLabel(s.label); setStampColor(s.color); }}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${stampLabel === s.label ? "border-opacity-100" : "border-gray-200 dark:border-gray-700 opacity-60"}`}
                        style={{ color: s.color, borderColor: stampLabel === s.label ? s.color : undefined, backgroundColor: stampLabel === s.label ? `${s.color}10` : undefined }}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <SectionHead label="Color" />
                  <ColorRow value={stampColor} onChange={setStampColor} presets={COLOR_PRESETS} />
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Click on PDF to place stamp.</p>
                </div>
              )}

              {/* Select / Eraser / Image */}
              {mode === "select" && (
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Click an annotation to select it. Drag to move. Press Delete to remove.</p>
                  <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>Shortcuts</p>
                    {[["Ctrl+Z", "Undo"], ["Ctrl+Y", "Redo"], ["Ctrl+C", "Copy"], ["Ctrl+V", "Paste"], ["Delete", "Remove"], ["Esc", "Deselect"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[10px] py-0.5">
                        <code className="font-mono" style={{ color: "var(--accent-blue)" }}>{k}</code>
                        <span style={{ color: "var(--text-muted)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {mode === "eraser" && <p className="text-xs" style={{ color: "var(--text-muted)" }}>Click any annotation to remove it.</p>}
              {mode === "image" && <p className="text-xs" style={{ color: "var(--text-muted)" }}>Click on PDF to insert an image (JPG or PNG).</p>}
            </div>
          )}

          {/* ── Annotations on this page ─── */}
          {pageAnnots.length > 0 && (
            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                Page {currentPage + 1} layers ({pageAnnots.length})
              </p>
              <div className="space-y-1">
                {annotations.map((ann, i) => {
                  if (ann.pageIndex !== currentPage) return null;
                  const isSelected = selectedIdx === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedIdx(isSelected ? null : i)}
                      className={`w-full text-left text-[10px] px-2 py-1.5 rounded-lg transition-colors truncate block ${isSelected ? "text-blue-600 dark:text-blue-400" : ""}`}
                      style={{
                        backgroundColor: isSelected ? "rgba(59,130,246,0.08)" : "var(--bg-secondary)",
                        border: `1px solid ${isSelected ? "rgba(59,130,246,0.3)" : "var(--border-subtle)"}`,
                        color: isSelected ? "var(--accent-blue)" : "var(--text-secondary)",
                      }}
                    >
                      {annotLabel(ann)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── STATUS BAR ───────────────────────────────────── */}
      <div className="h-7 shrink-0 flex items-center justify-between px-4 text-[10px]"
        style={{ backgroundColor: "var(--bg-card)", borderTop: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}>
        <span>{annotations.length} annotation{annotations.length !== 1 ? "s" : ""} total · {pageAnnots.length} on page {currentPage + 1}</span>
        <span className="flex items-center gap-3">
          {selectedIdx !== null && <span style={{ color: "var(--accent-blue)" }}>Selected: {annotLabel(annotations[selectedIdx])}</span>}
          <span>Zoom: {Math.round(zoom * 100)}%</span>
        </span>
      </div>
    </div>
  );
}
