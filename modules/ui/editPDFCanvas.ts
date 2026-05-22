// ── Canvas rendering helpers for Edit PDF tool ───────────────
// Draws all annotation types onto a 2D canvas context.
// Coordinates stored as 0-1 fractions; canvas dims passed at call time.

import type { Annotation, FreehandAnnotation } from "./editPDFTypes";

export function hexToCanvasColor(hex: string): string { return hex; }

function smoothPath(ctx: CanvasRenderingContext2D, pts: FreehandAnnotation["points"], cw: number, ch: number) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x * cw, pts[0].y * ch);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2 * cw;
    const my = (pts[i].y + pts[i + 1].y) / 2 * ch;
    ctx.quadraticCurveTo(pts[i].x * cw, pts[i].y * ch, mx, my);
  }
  const l = pts[pts.length - 1];
  ctx.lineTo(l.x * cw, l.y * ch);
  ctx.stroke();
}

export function drawArrowhead(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  size: number, color: string, opacity: number
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const al = size * 5;
  const aa = Math.PI / 6;
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - al * Math.cos(angle - aa), y2 - al * Math.sin(angle - aa));
  ctx.lineTo(x2 - al * Math.cos(angle + aa), y2 - al * Math.sin(angle + aa));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawAnnotationsToCanvas(
  ctx: CanvasRenderingContext2D,
  annotations: Annotation[],
  pageIndex: number,
  cw: number, ch: number,
  selectedIdx: number | null,
  imageCache: Map<string, HTMLImageElement>
) {
  ctx.clearRect(0, 0, cw, ch);

  annotations.forEach((ann, idx) => {
    if (ann.pageIndex !== pageIndex) return;
    ctx.save();

    switch (ann.type) {
      case "text": {
        ctx.globalAlpha = 1;
        ctx.font = `${ann.bold ? "bold " : ""}${ann.fontSize * 1.0}px Helvetica, sans-serif`;
        ctx.fillStyle = ann.color;
        ctx.fillText(ann.text, ann.x * cw, ann.y * ch + ann.fontSize);
        break;
      }
      case "rectangle": {
        ctx.globalAlpha = ann.opacity;
        ctx.fillStyle = ann.color;
        ctx.fillRect(ann.x * cw, ann.y * ch, ann.width * cw, ann.height * ch);
        if (ann.stroke) {
          ctx.globalAlpha = Math.min(1, ann.opacity + 0.3);
          ctx.strokeStyle = ann.strokeColor;
          ctx.lineWidth = ann.strokeWidth;
          ctx.strokeRect(ann.x * cw, ann.y * ch, ann.width * cw, ann.height * ch);
        }
        break;
      }
      case "highlight": {
        ctx.globalAlpha = ann.opacity;
        ctx.fillStyle = ann.color;
        ctx.fillRect(ann.x * cw, ann.y * ch, ann.width * cw, ann.height * ch);
        break;
      }
      case "ellipse": {
        ctx.globalAlpha = ann.opacity;
        ctx.fillStyle = ann.color;
        ctx.beginPath();
        ctx.ellipse(ann.cx * cw, ann.cy * ch, ann.rx * cw, ann.ry * ch, 0, 0, Math.PI * 2);
        ctx.fill();
        if (ann.stroke) {
          ctx.globalAlpha = Math.min(1, ann.opacity + 0.3);
          ctx.strokeStyle = ann.strokeColor;
          ctx.lineWidth = ann.strokeWidth;
          ctx.stroke();
        }
        break;
      }
      case "line": {
        ctx.globalAlpha = ann.opacity;
        ctx.strokeStyle = ann.color;
        ctx.lineWidth = ann.strokeWidth;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ann.x1 * cw, ann.y1 * ch);
        ctx.lineTo(ann.x2 * cw, ann.y2 * ch);
        ctx.stroke();
        if (ann.arrow) {
          drawArrowhead(ctx, ann.x1 * cw, ann.y1 * ch, ann.x2 * cw, ann.y2 * ch, ann.strokeWidth, ann.color, ann.opacity);
        }
        break;
      }
      case "freehand": {
        ctx.globalAlpha = ann.opacity;
        ctx.strokeStyle = ann.color;
        ctx.lineWidth = ann.strokeWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        smoothPath(ctx, ann.points, cw, ch);
        break;
      }
      case "image": {
        ctx.globalAlpha = 1;
        const img = imageCache.get(ann.dataUrl);
        if (img && img.complete) {
          ctx.drawImage(img, ann.x * cw, ann.y * ch, ann.width * cw, ann.height * ch);
        } else if (!img) {
          const el = new Image();
          el.src = ann.dataUrl;
          el.onload = () => imageCache.set(ann.dataUrl, el);
          imageCache.set(ann.dataUrl, el);
        }
        break;
      }
    }

    // Selection highlight
    if (selectedIdx === idx) {
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      let bx = 0, by = 0, bw = 0, bh = 0;
      switch (ann.type) {
        case "text": bx = ann.x * cw - 4; by = ann.y * ch - 2; bw = 120; bh = ann.fontSize + 8; break;
        case "rectangle": case "highlight": bx = ann.x * cw - 3; by = ann.y * ch - 3; bw = ann.width * cw + 6; bh = ann.height * ch + 6; break;
        case "ellipse": bx = (ann.cx - ann.rx) * cw - 3; by = (ann.cy - ann.ry) * ch - 3; bw = ann.rx * 2 * cw + 6; bh = ann.ry * 2 * ch + 6; break;
        case "line": bx = Math.min(ann.x1, ann.x2) * cw - 5; by = Math.min(ann.y1, ann.y2) * ch - 5; bw = Math.abs(ann.x2 - ann.x1) * cw + 10; bh = Math.abs(ann.y2 - ann.y1) * ch + 10; break;
        case "freehand": {
          const xs = ann.points.map(p => p.x * cw); const ys = ann.points.map(p => p.y * ch);
          bx = Math.min(...xs) - 5; by = Math.min(...ys) - 5; bw = Math.max(...xs) - bx + 10; bh = Math.max(...ys) - by + 10; break;
        }
        case "image": bx = ann.x * cw - 3; by = ann.y * ch - 3; bw = ann.width * cw + 6; bh = ann.height * ch + 6; break;
      }
      ctx.strokeRect(bx, by, bw, bh);
      ctx.setLineDash([]);
    }

    ctx.restore();
  });
}
