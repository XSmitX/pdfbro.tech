// ============================================================
// CORE TYPE DEFINITIONS — pdfbro.tech Tool Engine
// ============================================================

export type ToolCategory =
  | "pdf"
  | "image"
  | "convert"
  | "utility";

export type FileType =
  | "application/pdf"
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "image/webp"
  | "image/gif"
  | "image/bmp"
  | "image/tiff"
  | "image/*"
  | "application/pdf,image/*";

export interface ToolConfig {
  /** Unique slug used in the URL: /tools/[slug] */
  slug: string;
  /** Display name */
  name: string;
  /** Short description shown in tool card */
  description: string;
  /** Longer description shown on tool page */
  longDescription: string;
  /** Category for grouping */
  category: ToolCategory;
  /** Icon name from lucide-react */
  icon: string;
  /** Accent color for the tool card */
  color: string;
  /** Background gradient for the tool card */
  gradient: string;
  /** Accepted file MIME types */
  acceptedTypes: string;
  /** Whether multiple files can be uploaded */
  multiple: boolean;
  /** Max file size in bytes (0 = unlimited) */
  maxFileSize: number;
  /** Max number of files (0 = unlimited) */
  maxFiles: number;
  /** Whether the tool is free or requires upgrade */
  isPremium: boolean;
  /** Free usage limit (e.g., 5 files/day) */
  freeLimit: number;
  /** Tags for search */
  tags: string[];
}

// ---- Window extension for pdf.js global ----

export interface PdfJsWindow {
  pdfjsLib?: {
    GlobalWorkerOptions: {
      workerSrc: string;
    };
    getDocument: (params: any) => any;
  };
}

declare global {
  interface Window extends PdfJsWindow {}
}

export interface ProcessingResult {
  success: boolean;
  files: ProcessedFile[];
  error?: string;
  processingTime?: number;
}

export interface ProcessedFile {
  name: string;
  blob: Blob;
  size: number;
  type: string;
  url?: string;
}

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  status: "idle" | "processing" | "done" | "error";
  progress: number;
  error?: string;
}

export interface ToolState {
  files: UploadedFile[];
  isProcessing: boolean;
  progress: number;
  result: ProcessingResult | null;
  error: string | null;
}

export type ProcessingStrategy = "client" | "worker" | "server";

export interface ToolModule {
  config: ToolConfig;
  process: (files: File[], options?: Record<string, unknown>) => Promise<ProcessingResult>;
  strategy: ProcessingStrategy;
}

// ---- PDF-specific option types ----

export interface MergePDFOptions {
  order?: number[]; // indices of files in merge order
}

export interface SplitPDFOptions {
  mode: "range" | "every" | "extract";
  ranges?: string;       // e.g. "1-3,5,7-9"
  everyN?: number;       // split every N pages
  extractPages?: number[]; // extract specific pages
}

export interface CompressPDFOptions {
  quality: "low" | "medium" | "high";
}

// ---- Image-specific option types ----

export interface ImageToPDFOptions {
  pageSize: "A4" | "Letter" | "fit";
  margin: number; // in pts
}

export interface PDFToImageOptions {
  format: "png" | "jpeg";
  quality: number; // 0-1
  scale: number;   // render scale
}

export interface PNGToJPEGOptions {
  quality: number; // 0-100
  background: string; // hex color for transparency
}

export interface ImageCompressorOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  quality: number; // 0-1
  useWebWorker: boolean;
}

export interface PassportPhotoOptions {
  size: "2x2" | "35x45" | "51x51";  // in mm or standard names
  backgroundColor: string;
  layout: "single" | "4x1" | "2x2grid";
}
