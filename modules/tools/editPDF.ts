// ============================================================
// EDIT PDF — Advanced browser-side annotation engine (pdf-lib)
// Supports: text, rectangle, highlight, ellipse, line, arrow,
//           freehand pen, image embedding, stamps,
//           underline, strikethrough
// All coords stored as 0-1 fractions (screen: top-left origin)
// Converted to pdf-lib coords (bottom-left origin) at save time
// ============================================================

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { ProcessingResult } from "@/lib/types";
import { readFileAsArrayBuffer, stripExtension, hexToRgb } from "@/lib/utils";
import { uint8ToBlob } from "@/lib/pdfUtils";

// ── Annotation types ─────────────────────────────────────────

export interface TextAnnotation {
  type: "text";
  pageIndex: number;
  x: number; y: number;
  text: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  fontFamily: "Helvetica" | "Times" | "Courier";
  align: "left" | "center" | "right";
}

export interface RectAnnotation {
  type: "rectangle";
  pageIndex: number;
  x: number; y: number;
  width: number; height: number;
  color: string;
  opacity: number;
  stroke: boolean;
  strokeColor: string;
  strokeWidth: number;
}

export interface HighlightAnnotation {
  type: "highlight";
  pageIndex: number;
  x: number; y: number;
  width: number; height: number;
  color: string;
  opacity: number;
}

export interface EllipseAnnotation {
  type: "ellipse";
  pageIndex: number;
  cx: number; cy: number;
  rx: number; ry: number;
  color: string;
  opacity: number;
  stroke: boolean;
  strokeColor: string;
  strokeWidth: number;
}

export interface LineAnnotation {
  type: "line";
  pageIndex: number;
  x1: number; y1: number;
  x2: number; y2: number;
  color: string;
  strokeWidth: number;
  opacity: number;
  arrow: boolean;
}

export interface FreehandAnnotation {
  type: "freehand";
  pageIndex: number;
  points: Array<{ x: number; y: number }>;
  color: string;
  strokeWidth: number;
  opacity: number;
}

export interface ImageAnnotation {
  type: "image";
  pageIndex: number;
  x: number; y: number;
  width: number; height: number;
  data: Uint8Array;
  format: "png" | "jpg";
  dataUrl: string;
}

export interface StampAnnotation {
  type: "stamp";
  pageIndex: number;
  x: number; y: number;
  width: number; height: number;
  label: string;
  color: string;
}

export interface UnderlineAnnotation {
  type: "underline";
  pageIndex: number;
  x: number; y: number;
  width: number; height: number;
  color: string;
  strokeWidth: number;
}

export interface StrikethroughAnnotation {
  type: "strikethrough";
  pageIndex: number;
  x: number; y: number;
  width: number; height: number;
  color: string;
  strokeWidth: number;
}

export type Annotation =
  | TextAnnotation
  | RectAnnotation
  | HighlightAnnotation
  | EllipseAnnotation
  | LineAnnotation
  | FreehandAnnotation
  | ImageAnnotation
  | StampAnnotation
  | UnderlineAnnotation
  | StrikethroughAnnotation;

export interface EditPDFOptions {
  annotations: Annotation[];
}

// ── Helpers ───────────────────────────────────────────────────

function fx(frac: number, pw: number) { return frac * pw; }
function fy(frac: number, ph: number) { return ph - frac * ph; }

function toRgb(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return rgb(r / 255, g / 255, b / 255);
}

function buildFreehandPath(points: Array<{ x: number; y: number }>, pw: number, ph: number): string {
  if (points.length < 2) return "";
  const toX = (p: { x: number }) => (p.x * pw).toFixed(3);
  const toY = (p: { y: number }) => (ph - p.y * ph).toFixed(3);
  let d = `M ${toX(points[0])} ${toY(points[0])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const mx = ((points[i].x + points[i + 1].x) / 2 * pw).toFixed(3);
    const my = (ph - (points[i].y + points[i + 1].y) / 2 * ph).toFixed(3);
    d += ` Q ${toX(points[i])} ${toY(points[i])} ${mx} ${my}`;
  }
  const last = points[points.length - 1];
  d += ` L ${toX(last)} ${toY(last)}`;
  return d;
}

function getStandardFont(family: string, bold: boolean, italic: boolean) {
  if (family === "Times") {
    if (bold && italic) return StandardFonts.TimesRomanBoldItalic;
    if (bold) return StandardFonts.TimesRomanBold;
    if (italic) return StandardFonts.TimesRomanItalic;
    return StandardFonts.TimesRoman;
  }
  if (family === "Courier") {
    if (bold && italic) return StandardFonts.CourierBoldOblique;
    if (bold) return StandardFonts.CourierBold;
    if (italic) return StandardFonts.CourierOblique;
    return StandardFonts.Courier;
  }
  // Helvetica
  if (bold && italic) return StandardFonts.HelveticaBoldOblique;
  if (bold) return StandardFonts.HelveticaBold;
  if (italic) return StandardFonts.HelveticaOblique;
  return StandardFonts.Helvetica;
}

// ── Main processing function ──────────────────────────────────

export async function editPDF(file: File, options: EditPDFOptions): Promise<ProcessingResult> {
  const startTime = Date.now();

  if (!options.annotations.length) {
    return { success: false, files: [], error: "Add at least one annotation before saving." };
  }

  try {
    const bytes = await readFileAsArrayBuffer(file);
    let doc: PDFDocument;
    try {
      doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch {
      return { success: false, files: [], error: "Failed to load PDF. It may be corrupted or encrypted." };
    }

    const pages = doc.getPages();

    // Embed all font variants we might need
    const fonts: Partial<Record<string, Awaited<ReturnType<PDFDocument["embedFont"]>>>> = {};
    const fontKeys = new Set<string>();
    for (const ann of options.annotations) {
      if (ann.type === "text") {
        fontKeys.add(getStandardFont(ann.fontFamily, ann.bold, ann.italic));
      }
    }
    // Always embed at least Helvetica and HelveticaBold
    fontKeys.add(StandardFonts.Helvetica);
    fontKeys.add(StandardFonts.HelveticaBold);
    for (const key of fontKeys) {
      fonts[key] = await doc.embedFont(key as StandardFonts);
    }

    for (const ann of options.annotations) {
      const page = pages[ann.pageIndex];
      if (!page) continue;
      const { width: pw, height: ph } = page.getSize();

      switch (ann.type) {
        case "text": {
          const fontKey = getStandardFont(ann.fontFamily, ann.bold, ann.italic);
          const font = fonts[fontKey] ?? fonts[StandardFonts.Helvetica]!;
          const lines = ann.text.split("\n");
          const lineHeight = ann.fontSize * 1.25;
          let offsetY = 0;
          for (const line of lines) {
            if (!line) { offsetY += lineHeight; continue; }
            let pdfX = fx(ann.x, pw);
            if (ann.align === "center") {
              const w = font.widthOfTextAtSize(line, ann.fontSize);
              pdfX = fx(ann.x, pw) - w / 2;
            } else if (ann.align === "right") {
              const w = font.widthOfTextAtSize(line, ann.fontSize);
              pdfX = fx(ann.x, pw) - w;
            }
            const pdfY = fy(ann.y, ph) - ann.fontSize - offsetY;
            page.drawText(line, {
              x: Math.max(0, pdfX),
              y: Math.max(0, pdfY),
              size: ann.fontSize,
              font,
              color: toRgb(ann.color),
            });
            offsetY += lineHeight;
          }
          break;
        }

        case "rectangle": {
          const [sr, sg, sb] = hexToRgb(ann.strokeColor);
          page.drawRectangle({
            x: fx(ann.x, pw),
            y: fy(ann.y + ann.height, ph),
            width: ann.width * pw,
            height: ann.height * ph,
            color: toRgb(ann.color),
            opacity: ann.opacity,
            ...(ann.stroke ? {
              borderColor: rgb(sr / 255, sg / 255, sb / 255),
              borderWidth: ann.strokeWidth,
              borderOpacity: Math.min(1, ann.opacity + 0.3),
            } : {}),
          });
          break;
        }

        case "highlight": {
          page.drawRectangle({
            x: fx(ann.x, pw),
            y: fy(ann.y + ann.height, ph),
            width: ann.width * pw,
            height: ann.height * ph,
            color: toRgb(ann.color),
            opacity: ann.opacity,
          });
          break;
        }

        case "ellipse": {
          const [sr, sg, sb] = hexToRgb(ann.strokeColor);
          page.drawEllipse({
            x: fx(ann.cx, pw),
            y: fy(ann.cy, ph),
            xScale: ann.rx * pw,
            yScale: ann.ry * ph,
            color: toRgb(ann.color),
            opacity: ann.opacity,
            ...(ann.stroke ? {
              borderColor: rgb(sr / 255, sg / 255, sb / 255),
              borderWidth: ann.strokeWidth,
              borderOpacity: Math.min(1, ann.opacity + 0.3),
            } : {}),
          });
          break;
        }

        case "line": {
          const x1 = fx(ann.x1, pw); const y1 = fy(ann.y1, ph);
          const x2 = fx(ann.x2, pw); const y2 = fy(ann.y2, ph);
          page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: ann.strokeWidth, color: toRgb(ann.color), opacity: ann.opacity });
          if (ann.arrow) {
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const al = ann.strokeWidth * 8;
            const aa = Math.PI / 6;
            const p1 = { x: x2 - al * Math.cos(angle - aa), y: y2 - al * Math.sin(angle - aa) };
            const p2 = { x: x2 - al * Math.cos(angle + aa), y: y2 - al * Math.sin(angle + aa) };
            page.drawSvgPath(`M ${x2.toFixed(2)} ${y2.toFixed(2)} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`, { color: toRgb(ann.color), opacity: ann.opacity });
          }
          break;
        }

        case "freehand": {
          if (ann.points.length < 2) break;
          const pathStr = buildFreehandPath(ann.points, pw, ph);
          page.drawSvgPath(pathStr, { borderColor: toRgb(ann.color), borderWidth: ann.strokeWidth, borderOpacity: ann.opacity, color: undefined });
          break;
        }

        case "image": {
          try {
            const embedded = ann.format === "png" ? await doc.embedPng(ann.data) : await doc.embedJpg(ann.data);
            page.drawImage(embedded, { x: fx(ann.x, pw), y: fy(ann.y + ann.height, ph), width: ann.width * pw, height: ann.height * ph });
          } catch { /* skip */ }
          break;
        }

        case "stamp": {
          const stamph = fonts[StandardFonts.HelveticaBold]!;
          const cx = ann.x * pw;
          const cy = ph - ann.y * ph;
          const w = ann.width * pw;
          const h = ann.height * ph;
          const textW = stamph.widthOfTextAtSize(ann.label, 20);
          const textX = cx + (w - textW) / 2;
          const textY = cy - h / 2 - 10;
          page.drawRectangle({ x: cx, y: cy - h, width: w, height: h, borderColor: toRgb(ann.color), borderWidth: 3, opacity: 0 });
          page.drawText(ann.label, { x: Math.max(0, textX), y: Math.max(0, textY), size: 20, font: stamph, color: toRgb(ann.color), opacity: 0.85 });
          break;
        }

        case "underline": {
          const lineY = fy(ann.y + ann.height, ph);
          page.drawLine({ start: { x: fx(ann.x, pw), y: lineY }, end: { x: fx(ann.x + ann.width, pw), y: lineY }, thickness: ann.strokeWidth, color: toRgb(ann.color) });
          break;
        }

        case "strikethrough": {
          const lineY = fy(ann.y + ann.height / 2, ph);
          page.drawLine({ start: { x: fx(ann.x, pw), y: lineY }, end: { x: fx(ann.x + ann.width, pw), y: lineY }, thickness: ann.strokeWidth, color: toRgb(ann.color) });
          break;
        }
      }
    }

    const outBytes = await doc.save();
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);
    return { success: true, files: [{ name: `${baseName}_edited.pdf`, blob, size: blob.size, type: "application/pdf" }], processingTime: Date.now() - startTime };
  } catch (error) {
    return { success: false, files: [], error: `Edit failed: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

// ── Bounding box helper (fraction coords) ────────────────────

export function getAnnotationBounds(ann: Annotation): { x: number; y: number; w: number; h: number } | null {
  switch (ann.type) {
    case "text":       return { x: ann.x - 0.01, y: ann.y - 0.01, w: 0.25, h: 0.06 };
    case "rectangle":
    case "highlight":
    case "underline":
    case "strikethrough": return { x: ann.x, y: ann.y, w: ann.width, h: ann.height };
    case "stamp":      return { x: ann.x, y: ann.y, w: ann.width, h: ann.height };
    case "ellipse":    return { x: ann.cx - ann.rx, y: ann.cy - ann.ry, w: ann.rx * 2, h: ann.ry * 2 };
    case "line": {
      const lx = Math.min(ann.x1, ann.x2); const ly = Math.min(ann.y1, ann.y2);
      return { x: lx - 0.01, y: ly - 0.01, w: Math.abs(ann.x2 - ann.x1) + 0.02, h: Math.abs(ann.y2 - ann.y1) + 0.02 };
    }
    case "freehand": {
      if (!ann.points.length) return null;
      const xs = ann.points.map(p => p.x); const ys = ann.points.map(p => p.y);
      const minX = Math.min(...xs); const minY = Math.min(...ys);
      return { x: minX - 0.01, y: minY - 0.01, w: Math.max(...xs) - minX + 0.02, h: Math.max(...ys) - minY + 0.02 };
    }
    case "image": return { x: ann.x, y: ann.y, w: ann.width, h: ann.height };
    default: return null;
  }
}

// ── Move annotation by delta (fractions) ─────────────────────

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

export function moveAnnotation(ann: Annotation, dx: number, dy: number): Annotation {
  switch (ann.type) {
    case "text":
    case "stamp":
      return { ...ann, x: clamp01(ann.x + dx), y: clamp01(ann.y + dy) };
    case "rectangle":
    case "highlight":
    case "underline":
    case "strikethrough":
      return { ...ann, x: clamp01(ann.x + dx), y: clamp01(ann.y + dy) };
    case "ellipse":
      return { ...ann, cx: clamp01(ann.cx + dx), cy: clamp01(ann.cy + dy) };
    case "line":
      return { ...ann, x1: clamp01(ann.x1 + dx), y1: clamp01(ann.y1 + dy), x2: clamp01(ann.x2 + dx), y2: clamp01(ann.y2 + dy) };
    case "freehand":
      return { ...ann, points: ann.points.map(p => ({ x: clamp01(p.x + dx), y: clamp01(p.y + dy) })) };
    case "image":
      return { ...ann, x: clamp01(ann.x + dx), y: clamp01(ann.y + dy) };
    default:
      return ann;
  }
}
