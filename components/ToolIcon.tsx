// ============================================================
// ToolIcon — Static icon map (NO wildcard lucide-react import)
// Tree-shakeable: only the icons used in the registry are imported.
// ============================================================

import type { CSSProperties, FC } from "react";
import {
  FilePlus2,
  Scissors,
  PackageOpen,
  ImageIcon,
  FileImage,
  ArrowLeftRight,
  Minimize2,
  Camera,
  RotateCcw,
  FileText,
  FileOutput,
  Stamp,
  LockOpen,
  ShieldCheck,
  Hash,
  Maximize2,
  Crop,
  Eraser,
  Eye,
  EyeOff,
  AlertCircle,
  Download,
  CheckCircle,
  Archive,
  Zap,
  Search,
  QrCode,
  FlipHorizontal,
  PenLine,
  Type,
  GripVertical,
  Video,
} from "lucide-react";

type IconComponent = FC<{ className?: string; style?: CSSProperties }>;

const ICON_MAP: Record<string, IconComponent> = {
  FilePlus2,
  Scissors,
  PackageOpen,
  ImageIcon,
  FileImage,
  ArrowLeftRight,
  Minimize2,
  Camera,
  RotateCcw,
  FileText,
  FileOutput,
  Stamp,
  LockOpen,
  ShieldCheck,
  Hash,
  Maximize2,
  Crop,
  Eraser,
  Eye,
  EyeOff,
  AlertCircle,
  Download,
  CheckCircle,
  Archive,
  Zap,
  Search,
  QrCode,
  FlipHorizontal,
  PenLine,
  Type,
  GripVertical,
  Video,
};

interface ToolIconProps {
  name: string;
  className?: string;
  style?: CSSProperties;
}

export default function ToolIcon({ name, className, style }: ToolIconProps) {
  const Icon = ICON_MAP[name] ?? FileText;
  return <Icon className={className} style={style} />;
}
