import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Code2, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const DEVS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/developers#webpage",
      url: "https://pdfbro.tech/for/developers",
      name: "PDFBro for Developers — Free PDF Tools, Tech Stack & Architecture",
      description: "PDFBro developer overview: Next.js, React, pdf-lib, PDF.js, browser-based architecture.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: "2026-05-23",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      about: { "@id": "https://pdfbro.tech/#organization" },
      audience: { "@type": "Audience", audienceType: "Developers" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "For Developers", item: "https://pdfbro.tech/for/developers" },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "PDFBro for Developers — Free PDF Tools, Tech Stack & Architecture",
  description: "PDFBro developer overview: tech stack, browser-based architecture, open-source libraries used, and how to use PDFBro tools in your workflow.",
  keywords: ["pdfbro for developers", "pdfbro tech stack", "browser based pdf processing javascript", "pdf-lib pdfjs free tools", "pdf tools for developers"],
  alternates: { canonical: "https://pdfbro.tech/for/developers" },
} as Metadata;

const TECH = [
  { name: "Next.js 16", desc: "App Router, SSG for all pages, Server Components", color: "#000" },
  { name: "React 19", desc: "Client components for interactive tools, RSC for static pages", color: "#61dafb" },
  { name: "pdf-lib 1.17", desc: "Pure JS PDF creation and manipulation — merge, split, annotate", color: "#ef4444" },
  { name: "PDF.js 3.x", desc: "Mozilla's PDF renderer — used for compression and image conversion", color: "#ff6d00" },
  { name: "browser-image-compression", desc: "Client-side JPEG/PNG/WebP compression", color: "#8b5cf6" },
  { name: "JSZip", desc: "ZIP file generation for multi-file downloads", color: "#f59e0b" },
  { name: "Mammoth.js", desc: "DOCX to HTML conversion for Word editing", color: "#2563eb" },
  { name: "Framer Motion 12", desc: "Animations — lazy loaded to avoid blocking paint", color: "#ff0050" },
];

const DEVTOOLS = [
  { title: "QR Code Generator", desc: "Generate QR codes for app deep links, debug URLs, test flows", slug: "qr-code-generator" },
  { title: "PDF to Text", desc: "Extract text content from PDFs for LLM context", slug: "pdf-to-text" },
  { title: "Image to WebP", desc: "Convert design assets to WebP for web performance", slug: "image-to-webp" },
  { title: "SVG to PNG", desc: "Convert vector exports to raster for cross-platform use", slug: "svg-to-png" },
  { title: "Text to PDF", desc: "Convert markdown or plain text outputs to PDF", slug: "text-to-pdf" },
  { title: "GIF to MP4", desc: "Convert demo GIFs to smaller MP4 for documentation sites", slug: "gif-to-mp4" },
];

export default function ForDevelopersPage() {
  return (
    <>
      <Script id="jsonld-for-developers" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(DEVS_JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>For Developers</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="h-8 w-8" style={{ color: "var(--accent-blue)" }} />
            <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>PDFBro for Developers</h1>
          </div>
          <p className="text-base max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            PDFBro is built entirely with open-source web technology. Every PDF and image operation runs in the browser using standard Web APIs. Here&apos;s the tech under the hood and how developers use these tools in their workflows.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Technology Stack</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {TECH.map((t) => (
              <div key={t.name} className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Tools Developers Use Most</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {DEVTOOLS.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`}
                className="group rounded-xl p-4 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{t.title}</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{t.desc}</p>
              </Link>
            ))}
          </div>

          <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>Architecture Note: Browser-First</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              PDFBro processes nearly all operations locally using <code style={{ color: "var(--accent-blue)", fontSize: "12px" }}>pdf-lib</code> and <code style={{ color: "var(--accent-blue)", fontSize: "12px" }}>PDF.js</code> via CDN-loaded scripts (bypassing webpack&apos;s <code style={{ color: "var(--accent-blue)", fontSize: "12px" }}>import.meta.url</code> restrictions). Files are read into <code style={{ color: "var(--accent-blue)", fontSize: "12px" }}>ArrayBuffer</code> via <code style={{ color: "var(--accent-blue)", fontSize: "12px" }}>FileReader</code>, processed in memory, and delivered via Blob URLs. The PDF.js CDN script is loaded on-demand using a shared singleton loader in <code style={{ color: "var(--accent-blue)", fontSize: "12px" }}>lib/pdfjsLoader.ts</code> — one script tag, no duplicates across tool navigations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex gap-3">
          <Link href="/tools" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
            All Tools <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
            About PDFBro →
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
