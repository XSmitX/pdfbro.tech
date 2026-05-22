// ============================================================
// EDIT PDF — Advanced browser-side annotation engine (pdf-lib)
// Supports: text, rectangle, highlight, ellipse, line, arrow,
//           freehand pen, image embedding
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
  x: number; y: number;       // top-left, fraction
  text: string;
  fontSize: number;            // pts
  color: string;               // hex
  bold: boolean;
}

export interface RectAnnotation {
  type: "rectangle";
  pageIndex: number;
  x: number; y: number;       // top-left, fraction
  width: number; height: number;
  color: string;
  opacity: number;
  stroke: boolean;
  strokeColor: string;
  strokeWidth: number;         // pts
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
  cx: number; cy: number;     // center, fraction
  rx: number; ry: number;     // radii, fraction
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
  points: Array<{ x: number; y: number }>;  // fractions
  color: string;
  strokeWidth: number;         // pts
  opacity: number;
}

export interface ImageAnnotation {
  type: "image";
  pageIndex: number;
  x: number; y: number;
  width: number; height: number;
  data: Uint8Array;
  format: "png" | "jpg";
  dataUrl: string;             // for canvas preview only
}

export type Annotation =
  | TextAnnotation
  | RectAnnotation
  | HighlightAnnotation
  | EllipseAnnotation
  | LineAnnotation
  | FreehandAnnotation
  | ImageAnnotation;

export interface EditPDFOptions {
  annotations: Annotation[];
}

// ── Helpers ───────────────────────────────────────────────────

/** Convert fraction coords to pdf-lib absolute coords (bottom-up y) */
function fx(frac: number, pw: number) { return frac * pw; }
function fy(frac: number, ph: number) { return ph - frac * ph; } // flip y

function toRgb(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return rgb(r / 255, g / 255, b / 255);
}

/** Build SVG path string from freehand points in pdf-lib coords */
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

// ── Main processing function ──────────────────────────────────

export async function editPDF(
  file: File,
  options: EditPDFOptions
): Promise<ProcessingResult> {
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
    const helvetica = await doc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);

    for (const ann of options.annotations) {
      const page = pages[ann.pageIndex];
      if (!page) continue;
      const { width: pw, height: ph } = page.getSize();

      switch (ann.type) {
        case "text": {
          const pdfX = fx(ann.x, pw);
          const pdfY = fy(ann.y, ph) - ann.fontSize;
          page.drawText(ann.text, {
            x: Math.max(0, pdfX),
            y: Math.max(0, pdfY),
            size: ann.fontSize,
            font: ann.bold ? helveticaBold : helvetica,
            color: toRgb(ann.color),
          });
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
          page.drawLine({
            start: { x: x1, y: y1 },
            end: { x: x2, y: y2 },
            thickness: ann.strokeWidth,
            color: toRgb(ann.color),
            opacity: ann.opacity,
          });
          if (ann.arrow) {
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const al = ann.strokeWidth * 8;
            const aa = Math.PI / 6;
            const p1 = { x: x2 - al * Math.cos(angle - aa), y: y2 - al * Math.sin(angle - aa) };
            const p2 = { x: x2 - al * Math.cos(angle + aa), y: y2 - al * Math.sin(angle + aa) };
            const arrowPath = `M ${x2.toFixed(2)} ${y2.toFixed(2)} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
            page.drawSvgPath(arrowPath, { color: toRgb(ann.color), opacity: ann.opacity });
          }
          break;
        }

        case "freehand": {
          if (ann.points.length < 2) break;
          const pathStr = buildFreehandPath(ann.points, pw, ph);
          page.drawSvgPath(pathStr, {
            borderColor: toRgb(ann.color),
            borderWidth: ann.strokeWidth,
            borderOpacity: ann.opacity,
            color: undefined,
          });
          break;
        }

        case "image": {
          try {
            const imgX = fx(ann.x, pw);
            const imgYBottom = fy(ann.y + ann.height, ph);
            const imgW = ann.width * pw;
            const imgH = ann.height * ph;
            const embedded = ann.format === "png"
              ? await doc.embedPng(ann.data)
              : await doc.embedJpg(ann.data);
            page.drawImage(embedded, { x: imgX, y: imgYBottom, width: imgW, height: imgH });
          } catch {
            // Skip unsupported image format
          }
          break;
        }
      }
    }

    const outBytes = await doc.save();
    const blob = uint8ToBlob(outBytes, "application/pdf");
    const baseName = stripExtension(file.name);

    return {
      success: true,
      files: [{ name: `${baseName}_edited.pdf`, blob, size: blob.size, type: "application/pdf" }],
      processingTime: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false, files: [],
      error: `Edit failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ── Bounding box helper (for select tool hit testing) ────────

export function getAnnotationBounds(ann: Annotation): { x: number; y: number; w: number; h: number } | null {
  switch (ann.type) {
    case "text":       return { x: ann.x, y: ann.y, w: 0.2, h: 0.04 };
    case "rectangle":
    case "highlight":  return { x: ann.x, y: ann.y, w: ann.width, h: ann.height };
    case "ellipse":    return { x: ann.cx - ann.rx, y: ann.cy - ann.ry, w: ann.rx * 2, h: ann.ry * 2 };
    case "line": {
      const lx = Math.min(ann.x1, ann.x2); const ly = Math.min(ann.y1, ann.y2);
      return { x: lx, y: ly, w: Math.abs(ann.x2 - ann.x1) + 0.02, h: Math.abs(ann.y2 - ann.y1) + 0.02 };
    }
    case "freehand": {
      if (!ann.points.length) return null;
      const xs = ann.points.map(p => p.x); const ys = ann.points.map(p => p.y);
      const minX = Math.min(...xs); const minY = Math.min(...ys);
      return { x: minX, y: minY, w: Math.max(...xs) - minX + 0.02, h: Math.max(...ys) - minY + 0.02 };
    }
    case "image":      return { x: ann.x, y: ann.y, w: ann.width, h: ann.height };
    default:           return null;
  }
}
