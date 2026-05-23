import type { Annotation, FreehandAnnotation } from "./editPDFTypes";

// Canvas font family map
const FONT_MAP: Record<string, string> = {
  Helvetica: "Helvetica, Arial, sans-serif",
  Times: "\"Times New Roman\", Times, serif",
  Courier: "\"Courier New\", Courier, monospace",
};

function smoothPath(ctx: CanvasRenderingContext2D, pts: FreehandAnnotation["points"], cw: number, ch: number) {
  if (pts.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x * cw, pts[0].y * ch);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2 * cw;
    const my = (pts[i].y + pts[i + 1].y) / 2 * ch;
    ctx.quadraticCurveTo(pts[i].x * cw, pts[i].y * ch, mx, my);
  }
  ctx.lineTo(pts[pts.length - 1].x * cw, pts[pts.length - 1].y * ch);
  ctx.stroke();
}

function drawArrowhead(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, size: number, color: string, opacity: number) {
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

  annotations.forEach((ann) => {
    if (ann.pageIndex !== pageIndex) return;
    ctx.save();

    switch (ann.type) {
      case "text": {
        const family = FONT_MAP[ann.fontFamily] ?? FONT_MAP.Helvetica;
        const weight = ann.bold ? "bold " : "";
        const style = ann.italic ? "italic " : "";
        ctx.globalAlpha = 1;
        ctx.fillStyle = ann.color;
        ctx.font = `${style}${weight}${ann.fontSize}px ${family}`;
        ctx.textAlign = ann.align;
        const lineHeight = ann.fontSize * 1.35;
        const lines = ann.text.split("\n");
        lines.forEach((line, li) => {
          ctx.fillText(line, ann.x * cw, ann.y * ch + ann.fontSize + li * lineHeight);
        });
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
        let img = imageCache.get(ann.dataUrl);
        if (!img) {
          img = new Image();
          img.src = ann.dataUrl;
          img.onload = () => imageCache.set(ann.dataUrl, img!);
          imageCache.set(ann.dataUrl, img);
        }
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, ann.x * cw, ann.y * ch, ann.width * cw, ann.height * ch);
        }
        break;
      }

      case "stamp": {
        const x = ann.x * cw;
        const y = ann.y * ch;
        const w = ann.width * cw;
        const h = ann.height * ch;
        // Hollow border rectangle
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = ann.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);
        // Bold text centered
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = ann.color;
        const fontSize = Math.min(h * 0.55, 22);
        ctx.font = `bold ${fontSize}px Helvetica, Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ann.label, x + w / 2, y + h / 2, w - 10);
        ctx.textBaseline = "alphabetic";
        break;
      }

      case "underline": {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = ann.color;
        ctx.lineWidth = ann.strokeWidth;
        ctx.lineCap = "round";
        const uy = (ann.y + ann.height) * ch;
        ctx.beginPath();
        ctx.moveTo(ann.x * cw, uy);
        ctx.lineTo((ann.x + ann.width) * cw, uy);
        ctx.stroke();
        break;
      }

      case "strikethrough": {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = ann.color;
        ctx.lineWidth = ann.strokeWidth;
        ctx.lineCap = "round";
        const sy = (ann.y + ann.height / 2) * ch;
        ctx.beginPath();
        ctx.moveTo(ann.x * cw, sy);
        ctx.lineTo((ann.x + ann.width) * cw, sy);
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
  });

  // Draw selection UI on top
  if (selectedIdx !== null && selectedIdx < annotations.length) {
    const ann = annotations[selectedIdx];
    if (ann.pageIndex === pageIndex) {
      drawSelectionUI(ctx, ann, cw, ch);
    }
  }
}

function drawSelectionUI(ctx: CanvasRenderingContext2D, ann: Annotation, cw: number, ch: number) {
  // Get bounding box in canvas pixels
  let bx = 0, by = 0, bw = 0, bh = 0;
  switch (ann.type) {
    case "text":           bx = ann.x * cw - 4;      by = ann.y * ch - 2;       bw = 200; bh = ann.fontSize + 8; break;
    case "rectangle":
    case "highlight":
    case "underline":
    case "strikethrough":  bx = ann.x * cw - 3;      by = ann.y * ch - 3;       bw = ann.width * cw + 6;  bh = ann.height * ch + 6; break;
    case "stamp":          bx = ann.x * cw - 3;      by = ann.y * ch - 3;       bw = ann.width * cw + 6;  bh = ann.height * ch + 6; break;
    case "ellipse":        bx = (ann.cx - ann.rx) * cw - 3; by = (ann.cy - ann.ry) * ch - 3; bw = ann.rx * 2 * cw + 6; bh = ann.ry * 2 * ch + 6; break;
    case "line":           bx = Math.min(ann.x1, ann.x2) * cw - 6; by = Math.min(ann.y1, ann.y2) * ch - 6; bw = Math.abs(ann.x2 - ann.x1) * cw + 12; bh = Math.abs(ann.y2 - ann.y1) * ch + 12; break;
    case "freehand": {
      const xs = ann.points.map(p => p.x * cw); const ys = ann.points.map(p => p.y * ch);
      bx = Math.min(...xs) - 5; by = Math.min(...ys) - 5; bw = Math.max(...xs) - bx + 10; bh = Math.max(...ys) - by + 10; break;
    }
    case "image":          bx = ann.x * cw - 3;      by = ann.y * ch - 3;       bw = ann.width * cw + 6;  bh = ann.height * ch + 6; break;
  }

  ctx.save();
  // Dashed selection border
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 3]);
  ctx.strokeRect(bx, by, bw, bh);
  ctx.setLineDash([]);

  // Corner handles
  const handles = [
    [bx, by], [bx + bw, by], [bx, by + bh], [bx + bw, by + bh],
    [bx + bw / 2, by], [bx + bw / 2, by + bh], [bx, by + bh / 2], [bx + bw, by + bh / 2],
  ];
  handles.forEach(([hx, hy]) => {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}
