import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Shield, Zap, Lock, FileText, FileImage, Video, ImageIcon, FileOutput } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/toolRegistry";

export const metadata: Metadata = {
  title: "Free File Converter Online — PDF to Word, HEIC to JPG, Image to PDF | PDFBro",
  description:
    "Free file converter online. PDF to Word, Word to PDF, PDF to Excel, HEIC to JPG, JPG to PNG, PNG to JPG, WebP to JPG, Image to WebP, GIF to MP4, SVG to PNG, Text to PDF and 30+ more. No signup.",
  keywords: [
    // Mega/high-traffic converter keywords
    "PDF to Word free",
    "Word to PDF converter",
    "PDF converter free",
    "HEIC to JPG converter",
    "image to PDF converter",
    "JPG to PDF free",
    "PDF to JPG free",
    // High traffic
    "PDF to Excel converter",
    "PDF to PowerPoint free",
    "JPG to PNG converter",
    "PNG to JPG converter",
    "WebP to JPG converter",
    "image to WebP converter",
    "GIF to MP4 converter",
    "SVG to PNG free",
    "text to PDF free",
    // Long-tail
    "convert PDF to Word free online no signup",
    "convert HEIC to JPG online free",
    "file converter online free no signup",
    "online converter no watermark",
    "batch file converter free",
  ],
  alternates: { canonical: "https://pdfbro.tech/convert-tools" },
  openGraph: {
    title: "Free File Conversion Tools Online | PDFBro",
    description: "Convert PDF, images, Word, and video files online for free. No signup, browser-based.",
    url: "https://pdfbro.tech/convert-tools",
  },
};

const CONVERT_FEATURES = [
  { icon: FileOutput, title: "PDF to Word", desc: "Convert PDFs to editable Word documents", href: "/tools/pdf-to-word", color: "#0ea5e9" },
  { icon: FileText, title: "Word to PDF", desc: "Convert .docx files to professional PDFs", href: "/tools/word-to-pdf", color: "#2563eb" },
  { icon: FileOutput, title: "PDF to Excel", desc: "Extract PDF tables to .xlsx spreadsheets", href: "/tools/pdf-to-excel", color: "#16a34a" },
  { icon: FileOutput, title: "PDF to PowerPoint", desc: "Turn PDF slides into editable PPTX", href: "/tools/pdf-to-powerpoint", color: "#dc2626" },
  { icon: FileImage, title: "Image to PDF", desc: "Convert JPG/PNG images to a PDF document", href: "/tools/image-to-pdf", color: "#22c55e" },
  { icon: FileImage, title: "PDF to Image", desc: "Convert each PDF page to PNG or JPG", href: "/tools/pdf-to-image", color: "#06b6d4" },
  { icon: ImageIcon, title: "HEIC to JPG", desc: "Convert iPhone HEIC photos to JPEG", href: "/tools/heic-to-jpg", color: "#16a34a" },
  { icon: ImageIcon, title: "Image to WebP", desc: "Convert images to smaller WebP format", href: "/tools/image-to-webp", color: "#7c3aed" },
  { icon: FileImage, title: "JPG to PNG", desc: "Convert JPEG images to lossless PNG", href: "/tools/jpg-to-png", color: "#22c55e" },
  { icon: FileImage, title: "PNG to JPEG", desc: "Convert PNG to smaller JPEG files", href: "/tools/png-to-jpeg", color: "#3b82f6" },
  { icon: FileImage, title: "WebP to JPG", desc: "Convert WebP to universal JPEG format", href: "/tools/webp-to-jpg", color: "#f97316" },
  { icon: FileImage, title: "SVG to PNG", desc: "Convert SVG vectors to PNG images", href: "/tools/svg-to-png", color: "#0ea5e9" },
  { icon: Video, title: "GIF to MP4", desc: "Convert animated GIFs to smaller MP4 videos", href: "/tools/gif-to-mp4", color: "#16a34a" },
  { icon: Video, title: "MP4 to GIF", desc: "Turn video clips into animated GIFs", href: "/tools/mp4-to-gif", color: "#8b5cf6" },
  { icon: FileText, title: "Text to PDF", desc: "Convert plain text or notes to PDF", href: "/tools/text-to-pdf", color: "#059669" },
  { icon: FileOutput, title: "PDF to Text", desc: "Extract all text content from a PDF", href: "/tools/pdf-to-text", color: "#ea580c" },
];

const CONVERT_TOOL_ITEMS = [
  { name: "PDF to Word", url: "https://pdfbro.tech/tools/pdf-to-word", desc: "Convert PDF to editable Word (.docx) document" },
  { name: "Word to PDF", url: "https://pdfbro.tech/tools/word-to-pdf", desc: "Convert Word .doc/.docx files to PDF" },
  { name: "PDF to Excel", url: "https://pdfbro.tech/tools/pdf-to-excel", desc: "Extract PDF tables to Excel (.xlsx) spreadsheets" },
  { name: "PDF to PowerPoint", url: "https://pdfbro.tech/tools/pdf-to-powerpoint", desc: "Convert PDF to editable PowerPoint (.pptx)" },
  { name: "Image to PDF", url: "https://pdfbro.tech/tools/image-to-pdf", desc: "Convert JPG, PNG, or WebP images to a PDF" },
  { name: "PDF to Image", url: "https://pdfbro.tech/tools/pdf-to-image", desc: "Convert PDF pages to PNG or JPEG images" },
  { name: "HEIC to JPG", url: "https://pdfbro.tech/tools/heic-to-jpg", desc: "Convert iPhone HEIC/HEIF photos to JPEG" },
  { name: "Image to WebP", url: "https://pdfbro.tech/tools/image-to-webp", desc: "Convert JPG/PNG to WebP for smaller file sizes" },
  { name: "JPG to PNG", url: "https://pdfbro.tech/tools/jpg-to-png", desc: "Convert JPEG images to lossless PNG format" },
  { name: "PNG to JPG", url: "https://pdfbro.tech/tools/png-to-jpeg", desc: "Convert PNG images to compressed JPEG" },
  { name: "WebP to JPG", url: "https://pdfbro.tech/tools/webp-to-jpg", desc: "Convert WebP images to JPEG" },
  { name: "WebP to PNG", url: "https://pdfbro.tech/tools/webp-to-png", desc: "Convert WebP images to PNG, preserving transparency" },
  { name: "SVG to PNG", url: "https://pdfbro.tech/tools/svg-to-png", desc: "Convert SVG vector graphics to high-resolution PNG" },
  { name: "SVG to JPG", url: "https://pdfbro.tech/tools/svg-to-jpg", desc: "Convert SVG vector files to JPEG" },
  { name: "GIF to MP4", url: "https://pdfbro.tech/tools/gif-to-mp4", desc: "Convert animated GIFs to MP4 video (10x smaller)" },
  { name: "MP4 to GIF", url: "https://pdfbro.tech/tools/mp4-to-gif", desc: "Convert MP4 video clips to animated GIF" },
  { name: "Text to PDF", url: "https://pdfbro.tech/tools/text-to-pdf", desc: "Convert plain text or .txt files to formatted PDF" },
  { name: "PDF to Text", url: "https://pdfbro.tech/tools/pdf-to-text", desc: "Extract all text content from a PDF" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pdfbro.tech/convert-tools#webpage",
      name: "Free File Converter Online — PDF to Word, HEIC to JPG, Image to PDF | PDFBro",
      description: "Free file converters online: PDF to Word, Word to PDF, PDF to Excel, HEIC to JPG, Image to WebP, GIF to MP4, SVG to PNG and 30+ more. No signup, browser-based.",
      url: "https://pdfbro.tech/convert-tools",
      inLanguage: "en-US",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      publisher: { "@id": "https://pdfbro.tech/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "Conversion Tools", item: "https://pdfbro.tech/convert-tools" },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://pdfbro.tech/convert-tools#toollist",
      name: "Free File Conversion Tools Online",
      description: "Complete list of free file conversion tools on PDFBro — no signup, no watermarks, browser-based.",
      url: "https://pdfbro.tech/convert-tools",
      numberOfItems: CONVERT_TOOL_ITEMS.length,
      itemListElement: CONVERT_TOOL_ITEMS.map((tool, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: tool.name,
        description: tool.desc,
        url: tool.url,
        item: {
          "@type": "SoftwareApplication",
          name: `${tool.name} — PDFBro`,
          url: tool.url,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: tool.desc,
        },
      })),
    },
  ],
};

export default function ConvertToolsPage() {
  const convertTools = getToolsByCategory("convert");

  return (
    <>
      <Script id="jsonld-convert-tools" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />

        {/* Hero */}
        <section className="relative py-16 sm:py-20" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3">
              <Link href="/" className="text-xs" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span className="mx-2 text-xs" style={{ color: "var(--border)" }}>/</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Conversion Tools</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-4" style={{ color: "var(--text-primary)" }}>
              Free File Converter Online — PDF, Images &amp; Video
            </h1>
            <p className="max-w-2xl text-lg mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>PDF to Word</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>Word to PDF</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>HEIC to JPG</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>Image to WebP</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>PDF to Excel</strong>, GIF to MP4 and 30+ more converters — all free.
            </p>
            <p className="max-w-2xl text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              No software, no signup, no watermarks. Fast, accurate file conversion directly in your browser — or via secure server-side processing for complex formats.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools/pdf-to-word" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #2563eb)" }}>
                PDF to Word
              </Link>
              <Link href="/tools/heic-to-jpg" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}>
                HEIC to JPG
              </Link>
              <Link href="/tools/image-to-webp" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>
                Image to WebP
              </Link>
            </div>
          </div>
        </section>

        {/* All conversion tools grid */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>All Conversion Tools</h2>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              {convertTools.length} free file converters — instant results, no signup
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {convertTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
            </div>
          </div>
        </section>

        {/* Quick access grid */}
        <section className="py-14" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
              Most Popular Converters
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CONVERT_FEATURES.slice(0, 8).map((feat) => (
                <Link
                  key={feat.href}
                  href={feat.href}
                  className="group rounded-2xl p-4 flex items-center gap-3 transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${feat.color}15` }}>
                    <feat.icon className="h-4 w-4" style={{ color: feat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{feat.title}</p>
                    <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>{feat.desc}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-muted)" }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why section */}
        <section className="py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Why convert files with PDFBro?
            </h2>
            <div className="space-y-4">
              {[
                { icon: Shield, title: "Secure — no data stored", body: "Most converters run entirely in your browser. For server-side conversions (PDF to Word, etc.), files are processed and deleted within 1 hour. We never store or share your files." },
                { icon: Zap, title: "Fast — results in seconds", body: "Browser-based conversions complete in seconds. Server-side conversions typically finish within 10–30 seconds depending on file size." },
                { icon: Lock, title: "Free — no account, no limits", body: "Every converter on PDFBro is 100% free. No subscription, no daily limits, no email required." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-orange)" }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>Also explore</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/pdf-tools" className="rounded-xl px-4 py-2 text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Free PDF Tools →
              </Link>
              <Link href="/image-tools" className="rounded-xl px-4 py-2 text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Free Image Tools →
              </Link>
              <Link href="/tools" className="rounded-xl px-4 py-2 text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                All 100+ Tools →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
