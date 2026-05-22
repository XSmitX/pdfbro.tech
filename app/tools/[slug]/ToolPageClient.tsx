"use client";

import { Suspense, lazy } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { ToolConfig } from "@/lib/types";
import type { ToolSeoContent } from "@/lib/toolFaq";
import ToolIcon from "@/components/ToolIcon";
import ToolCard from "@/components/ToolCard";
import PageBackground from "@/components/PageBackground";
import ErrorBoundary from "@/components/ErrorBoundary";
import { TOOLS } from "@/lib/toolRegistry";

const MergePDFTool = lazy(() => import("@/modules/ui/MergePDFTool"));
const SplitPDFTool = lazy(() => import("@/modules/ui/SplitPDFTool"));
const CompressPDFTool = lazy(() => import("@/modules/ui/CompressPDFTool"));
const ImageToPDFTool = lazy(() => import("@/modules/ui/ImageToPDFTool"));
const PDFToImageTool = lazy(() => import("@/modules/ui/PDFToImageTool"));
const PNGToJPEGTool = lazy(() => import("@/modules/ui/PNGToJPEGTool"));
const CompressImageTool = lazy(() => import("@/modules/ui/CompressImageTool"));
const PassportPhotoTool = lazy(() => import("@/modules/ui/PassportPhotoTool"));
const RotatePDFTool = lazy(() => import("@/modules/ui/RotatePDFTool"));
const WatermarkPDFTool = lazy(() => import("@/modules/ui/WatermarkPDFTool"));
const PageNumbersTool = lazy(() => import("@/modules/ui/PageNumbersTool"));
const UnlockPDFTool = lazy(() => import("@/modules/ui/UnlockPDFTool"));
const ProtectPDFTool = lazy(() => import("@/modules/ui/ProtectPDFTool"));
const ResizeImageTool = lazy(() => import("@/modules/ui/ResizeImageTool"));
const CropImageTool = lazy(() => import("@/modules/ui/CropImageTool"));
const RemoveBgTool = lazy(() => import("@/modules/ui/RemoveBgTool"));
const WordToPDFTool = lazy(() => import("@/modules/ui/WordToPDFTool"));
const PDFToWordTool = lazy(() => import("@/modules/ui/PDFToWordTool"));
const ExtractPDFPagesTool = lazy(() => import("@/modules/ui/ExtractPDFPagesTool"));
const ReorderPDFPagesTool = lazy(() => import("@/modules/ui/ReorderPDFPagesTool"));
const TextToPDFTool = lazy(() => import("@/modules/ui/TextToPDFTool"));
const QRCodeGeneratorTool = lazy(() => import("@/modules/ui/QRCodeGeneratorTool"));
const ImageToWebPTool = lazy(() => import("@/modules/ui/ImageToWebPTool"));
const PDFToTextTool = lazy(() => import("@/modules/ui/PDFToTextTool"));
const AddTextToImageTool = lazy(() => import("@/modules/ui/AddTextToImageTool"));
const FlipImageTool = lazy(() => import("@/modules/ui/FlipImageTool"));
const HEICToJPGTool = lazy(() => import("@/modules/ui/HEICToJPGTool"));
const FillPDFFormTool = lazy(() => import("@/modules/ui/FillPDFFormTool"));
const EditPDFTool = lazy(() => import("@/modules/ui/EditPDFTool"));
const EditWordTool = lazy(() => import("@/modules/ui/EditWordTool"));
const PDFToPowerPointTool = lazy(() => import("@/modules/ui/PDFToPowerPointTool"));
const PDFToExcelTool = lazy(() => import("@/modules/ui/PDFToExcelTool"));
const JPGToPNGTool = lazy(() => import("@/modules/ui/JPGToPNGTool"));
const WebPToJPGTool = lazy(() => import("@/modules/ui/WebPToJPGTool"));
const WebPToPNGTool = lazy(() => import("@/modules/ui/WebPToPNGTool"));
const SVGToPNGTool = lazy(() => import("@/modules/ui/SVGToPNGTool"));
const SVGToJPGTool = lazy(() => import("@/modules/ui/SVGToJPGTool"));
const GIFToMP4Tool = lazy(() => import("@/modules/ui/GIFToMP4Tool"));
const MP4ToGIFTool = lazy(() => import("@/modules/ui/MP4ToGIFTool"));
const SignPDFTool = lazy(() => import("@/modules/ui/SignPDFTool"));
const OCRPDFTool = lazy(() => import("@/modules/ui/OCRPDFTool"));

const TOOL_COMPONENT_MAP: Record<string, React.ReactElement> = {
  "merge-pdf": <MergePDFTool />,
  "pdf-to-powerpoint": <PDFToPowerPointTool />,
  "pdf-to-excel": <PDFToExcelTool />,
  "jpg-to-png": <JPGToPNGTool />,
  "webp-to-jpg": <WebPToJPGTool />,
  "webp-to-png": <WebPToPNGTool />,
  "svg-to-png": <SVGToPNGTool />,
  "svg-to-jpg": <SVGToJPGTool />,
  "gif-to-mp4": <GIFToMP4Tool />,
  "mp4-to-gif": <MP4ToGIFTool />,
  "sign-pdf": <SignPDFTool />,
  "ocr-pdf": <OCRPDFTool />,
  "split-pdf": <SplitPDFTool />,
  "compress-pdf": <CompressPDFTool />,
  "image-to-pdf": <ImageToPDFTool />,
  "pdf-to-image": <PDFToImageTool />,
  "png-to-jpeg": <PNGToJPEGTool />,
  "compress-image": <CompressImageTool />,
  "passport-photo": <PassportPhotoTool />,
  "rotate-pdf": <RotatePDFTool />,
  "add-watermark": <WatermarkPDFTool />,
  "pdf-page-numbers": <PageNumbersTool />,
  "unlock-pdf": <UnlockPDFTool />,
  "protect-pdf": <ProtectPDFTool />,
  "resize-image": <ResizeImageTool />,
  "crop-image": <CropImageTool />,
  "remove-bg": <RemoveBgTool />,
  "word-to-pdf": <WordToPDFTool />,
  "pdf-to-word": <PDFToWordTool />,
  "extract-pdf-pages": <ExtractPDFPagesTool />,
  "reorder-pdf-pages": <ReorderPDFPagesTool />,
  "text-to-pdf": <TextToPDFTool />,
  "qr-code-generator": <QRCodeGeneratorTool />,
  "image-to-webp": <ImageToWebPTool />,
  "pdf-to-text": <PDFToTextTool />,
  "add-text-to-image": <AddTextToImageTool />,
  "flip-image": <FlipImageTool />,
  "heic-to-jpg": <HEICToJPGTool />,
  "fill-pdf-form": <FillPDFFormTool />,
  "edit-pdf": <EditPDFTool />,
  "edit-word": <EditWordTool />,
};

interface ToolPageClientProps {
  tool: ToolConfig;
  seoContent: ToolSeoContent;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
}

export default function ToolPageClient({ tool, seoContent, primaryKeyword, secondaryKeywords }: ToolPageClientProps) {
  const relatedTools = TOOLS
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tool-page" accentColor={tool.color} />

      {/* Breadcrumb */}
      <div className="relative" style={{ borderBottom: "1px solid var(--border-subtle)", background: "color-mix(in srgb, var(--bg-secondary) 85%, transparent)", backdropFilter: "blur(12px)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}>
              Home
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <Link href="/tools" className="flex items-center gap-1 transition-colors" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}>
              <ChevronLeft className="h-3.5 w-3.5" />All Tools
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{tool.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* ── Main tool area ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tool header */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm" style={{ backgroundColor: `${tool.color}18` }}>
                <ToolIcon name={tool.icon} className="h-7 w-7" style={{ color: tool.color }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {primaryKeyword
                      ? `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} — Free Online Tool`
                      : tool.name}
                  </h1>
                  <span className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: "rgba(52,211,153,0.12)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    Free
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: "rgba(79,142,247,0.10)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>
                    No Signup
                  </span>
                </div>
                <p style={{ color: "var(--text-secondary)" }}>{tool.longDescription}</p>
                {secondaryKeywords && secondaryKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {secondaryKeywords.slice(0, 5).map((kw) => (
                      <span key={kw} className="rounded-full px-2.5 py-0.5 text-xs"
                        style={{ backgroundColor: `${tool.color}10`, color: tool.color, border: `1px solid ${tool.color}20` }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Tool UI — wrapped with error boundary for production safety */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <ErrorBoundary toolName={tool.name}>
                <Suspense fallback={<ToolLoadingSkeleton />}>
                  {TOOL_COMPONENT_MAP[tool.slug] ?? <ComingSoonUI />}
                </Suspense>
              </ErrorBoundary>
            </motion.div>

            {/* How to use */}
            {seoContent.howTo && seoContent.howTo.length > 0 && (
              <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                  How to use {tool.name}
                </h2>
                <ol className="space-y-4">
                  {seoContent.howTo.map((step) => (
                    <li key={step.step} className="flex gap-3">
                      <span
                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
                      >
                        {step.step}
                      </span>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{step.title}</p>
                        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* FAQ */}
            {seoContent.faq.length > 0 && (
              <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {seoContent.faq.map((item) => (
                    <div key={item.q}>
                      <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Tool info */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Tool Info</h3>
              <div className="space-y-3">
                {[
                  { label: "Max file size", value: tool.maxFileSize > 0 ? `${Math.round(tool.maxFileSize / 1024 / 1024)} MB` : "Unlimited" },
                  { label: "Max files", value: tool.maxFiles > 0 ? String(tool.maxFiles) : "Unlimited" },
                  { label: "Processing", value: "In-browser", green: true },
                  { label: "Cost", value: "Free Forever", green: true },
                ].map(({ label, value, green }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span className="font-medium" style={{ color: green ? "var(--accent-green)" : "var(--text-primary)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature highlights */}
            <div className="rounded-2xl p-4 space-y-2" style={{ backgroundColor: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)" }}>
              {[
                "100% Free — no hidden fees",
                "No signup or account needed",
                "Files processed locally in browser",
                "No watermarks added",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{feat}</p>
                </div>
              ))}
            </div>

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Related Tools</h3>
                <div className="space-y-2">
                  {relatedTools.map((relTool, i) => (
                    <ToolCard key={relTool.slug} tool={relTool} index={i} compact />
                  ))}
                </div>
              </div>
            )}

            {/* Browse all CTA */}
            <Link
              href="/tools"
              className="block rounded-2xl p-4 text-center text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))", color: "#fff" }}
            >
              Browse All 100+ Tools →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolLoadingSkeleton() {
  return (
    <div className="rounded-2xl p-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
      <div className="space-y-4 animate-pulse">
        <div className="h-40 rounded-xl" style={{ backgroundColor: "var(--bg-secondary)" }} />
        <div className="h-10 rounded-lg" style={{ backgroundColor: "var(--bg-secondary)" }} />
        <div className="h-10 rounded-lg w-1/2" style={{ backgroundColor: "var(--bg-secondary)" }} />
      </div>
    </div>
  );
}

function ComingSoonUI() {
  return (
    <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
      <div className="mb-4 text-4xl">🚧</div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Coming Soon</h3>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        This tool is under development. Check back soon!
      </p>
    </div>
  );
}
