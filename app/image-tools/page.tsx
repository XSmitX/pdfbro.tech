import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Shield, Zap, Lock, Camera, Minimize2, Maximize2, Crop, Eraser, Type, FlipHorizontal, ImageIcon } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/toolRegistry";

export const metadata: Metadata = {
  title: "Free Image Tools Online — Compress Image, HEIC to JPG, Remove Background | PDFBro",
  description:
    "Free online image tools: compress image online, resize image, crop image, remove background from image, HEIC to JPG, PNG to JPG, WebP converter, QR code generator, passport photo maker, add text to image. No signup, no watermarks.",
  keywords: [
    // Mega/high-traffic image keywords
    "compress image online free",
    "remove background from image free",
    "HEIC to JPG converter",
    "resize image online free",
    "image compressor",
    "QR code generator free",
    "passport photo maker free",
    // Medium traffic
    "crop image online free",
    "add text to image online",
    "flip image online",
    "PNG to JPG converter",
    "WebP to JPG converter",
    "SVG to PNG converter",
    // Long-tail
    "compress image without losing quality free",
    "remove image background no watermark",
    "convert HEIC to JPG online free no software",
    "free image tools no signup no watermark",
    "image tools browser based",
  ],
  alternates: { canonical: "https://pdfbro.tech/image-tools" },
  openGraph: {
    title: "Free Image Tools Online | PDFBro",
    description: "Compress, resize, convert, crop and edit images for free. No signup, browser-based, no watermarks.",
    url: "https://pdfbro.tech/image-tools",
  },
};

const IMAGE_FEATURES = [
  { icon: Minimize2, title: "Compress Image", desc: "Reduce image file size while keeping quality", href: "/tools/compress-image", color: "#8b5cf6" },
  { icon: Maximize2, title: "Resize Image", desc: "Resize to exact pixel dimensions or percentage", href: "/tools/resize-image", color: "#0891b2" },
  { icon: Crop, title: "Crop Image", desc: "Crop to any aspect ratio or custom size", href: "/tools/crop-image", color: "#65a30d" },
  { icon: Eraser, title: "Remove Background", desc: "Auto-remove backgrounds for transparent PNGs", href: "/tools/remove-bg", color: "#be185d" },
  { icon: Camera, title: "Passport Photo", desc: "Create passport photos in standard sizes", href: "/tools/passport-photo", color: "#ec4899" },
  { icon: Type, title: "Add Text to Image", desc: "Add captions, labels or watermarks", href: "/tools/add-text-to-image", color: "#be185d" },
  { icon: FlipHorizontal, title: "Flip Image", desc: "Mirror images horizontally or vertically", href: "/tools/flip-image", color: "#0891b2" },
  { icon: ImageIcon, title: "HEIC to JPG", desc: "Convert iPhone HEIC photos to JPEG", href: "/tools/heic-to-jpg", color: "#16a34a" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Image Tools Online — PDFBro",
  description: "Compress, resize, convert and edit images for free. No signup. Browser-based.",
  url: "https://pdfbro.tech/image-tools",
  publisher: { "@type": "Organization", name: "PDFBro", url: "https://pdfbro.tech" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
      { "@type": "ListItem", position: 2, name: "Image Tools", item: "https://pdfbro.tech/image-tools" },
    ],
  },
};

export default function ImageToolsPage() {
  const imageTools = getToolsByCategory("image");

  return (
    <>
      <Script id="jsonld-image-tools" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />

        {/* Hero */}
        <section className="relative py-16 sm:py-20" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3">
              <Link href="/" className="text-xs" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span className="mx-2 text-xs" style={{ color: "var(--border)" }}>/</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Image Tools</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-4" style={{ color: "var(--text-primary)" }}>
              Free Image Tools Online — Compress, Convert &amp; Edit Images
            </h1>
            <p className="max-w-2xl text-lg mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Compress image online</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>remove background from image</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>HEIC to JPG converter</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>resize image</strong>,{" "}
              QR code generator, passport photo maker and more — all free.
            </p>
            <p className="max-w-2xl text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              All image tools are{" "}
              <strong style={{ color: "var(--text-primary)" }}>100% free</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>no signup required</strong>, and produce{" "}
              <strong style={{ color: "var(--text-primary)" }}>watermark-free results</strong>. Files processed in your browser — never uploaded.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools/compress-image" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
                Compress Image
              </Link>
              <Link href="/tools/remove-bg" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #ec4899, #be185d)" }}>
                Remove Background
              </Link>
              <Link href="/tools/heic-to-jpg" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}>
                HEIC to JPG
              </Link>
            </div>
          </div>
        </section>

        {/* All image tools */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>All Image Tools</h2>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              {imageTools.length} free image tools — no signup, no watermarks
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {imageTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
            </div>
          </div>
        </section>

        {/* Feature blocks */}
        <section className="py-14" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
              Popular Image Tools
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {IMAGE_FEATURES.map((feat) => (
                <Link
                  key={feat.href}
                  href={feat.href}
                  className="group rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${feat.color}15` }}>
                    <feat.icon className="h-5 w-5" style={{ color: feat.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{feat.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{feat.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium mt-auto" style={{ color: feat.color }}>
                    Open tool <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why section */}
        <section className="py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Why use PDFBro for image editing?
            </h2>
            <div className="space-y-4">
              {[
                { icon: Shield, title: "All processing happens in your browser", body: "Image compression, resizing, and conversion all run locally in JavaScript. Your images are never sent to a server. They stay on your device the entire time." },
                { icon: Zap, title: "No Photoshop or software needed", body: "PDFBro image tools work in any modern browser. No Photoshop, GIMP, or any software needed. Perfect for quick edits on any device." },
                { icon: Lock, title: "No watermarks, ever", body: "Unlike many free online tools, PDFBro never adds watermarks to your images. What you create is 100% yours." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-violet)" }} />
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
              <Link href="/convert-tools" className="rounded-xl px-4 py-2 text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                File Conversion Tools →
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
