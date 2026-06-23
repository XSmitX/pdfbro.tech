import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/split-pdf-online-free`;
const TOOL_URL = "/tools/split-pdf";

export const metadata: Metadata = {
  title: "Split PDF Online Free — Separate Pages Instantly, No Signup | PDFBro",
  description: "Split PDF into individual pages or extract page ranges online free. No signup, no watermarks, no daily limits. Split PDFs instantly in your browser.",
  keywords: ["split pdf online free", "split pdf into individual pages", "extract pages from pdf free", "split pdf by page range", "separate pdf pages online", "split pdf no signup", "free pdf splitter online"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Split PDF Online Free — Separate Pages Instantly, No Signup | PDFBro",
    description: "Split PDF into individual pages or extract page ranges online free. No signup, no watermarks, no daily limits. Browser-based processing.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload your PDF", desc: "Drag and drop your PDF file into the splitter tool. Works with any PDF — scanned documents, multi-page reports, presentations. Maximum 100 MB per file." },
  { title: "Choose how to split", desc: "Select to extract every page as separate PDFs, split by page ranges (e.g., pages 1-5, 6-10), or extract specific pages by number. Full control over your output." },
  { title: "Download split PDFs", desc: "Click Split and download instantly. Each page or range becomes a separate PDF file. All processing happens in your browser — nothing is uploaded to any server." },
];

const FAQ_ITEMS = [
  { q: "How do I split a PDF into individual pages for free?", a: "Use PDFBro's Split PDF tool at pdfbro.tech/tools/split-pdf. Upload your PDF, select 'Extract all pages as separate PDFs', and click Split. Each page downloads as an individual PDF — all completely free, no signup required." },
  { q: "Can I split a PDF by specific page ranges?", a: "Yes. You can split by page ranges like 1-3, 4, 5-8 — each range becomes its own PDF. You can also extract individual pages by entering their numbers. Useful for separating chapters, sections, or forms." },
  { q: "Is there a page limit when splitting PDFs?", a: "PDFBro handles PDFs up to 100 MB with no page count limit. Whether your PDF has 2 pages or 500 pages, the splitter processes it entirely in your browser. No daily usage limits either." },
  { q: "Will my split PDFs have watermarks?", a: "Never. PDFBro never adds watermarks to any output. Your split PDFs are clean, professional, and identical in quality to the original pages — just separated into individual files." },
  { q: "Can I split a password-protected PDF?", a: "First use PDFBro's Unlock PDF tool to remove the password from your PDF, then split it. Both tools are completely free and browser-based." },
  { q: "Does splitting work on mobile devices?", a: "Yes. PDFBro's Split PDF tool works on mobile browsers — iPhone, Android, tablets. Upload from your device, split, and download the results directly to your phone." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Split PDF Online Free — Separate Pages Instantly, No Signup",
      description: "Split PDF into individual pages or extract page ranges online free. No signup, no watermarks, no daily limits. Browser-based.",
      inLanguage: "en-US",
      dateModified: "2026-06-23",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${BASE_URL}/pdf-tools` },
        { "@type": "ListItem", position: 3, name: "Split PDF Online Free", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function SplitPdfOnlineFree() {
  return (
    <>
      <Script id="jsonld-split-pdf-online-free" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Split PDF Online Free</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Split PDF Online Free — Separate Pages Instantly, No Signup
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Need to split a PDF into individual pages or extract specific chapters? PDFBro&apos;s split PDF tool separates multi-page documents into individual files instantly — all online, all free, no signup required. Whether you have a 2-page form or a 500-page textbook, split with precision and zero watermarks.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Browser-Based</span>
          </div>

          <Link href={TOOL_URL} className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Split PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Extract individual pages or ranges from any PDF — all browser-based, no uploads</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Split PDF Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Split PDF Online Free — 3 Simple Steps</h2>
            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(79,142,247,0.15)", color: "var(--accent-blue)" }}>{i + 1}</span>
                  <div><p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</p><p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Split PDFs</h2>
            {["100% Free — no subscription", "No signup required", "Browser-based — files stay private", "No watermarks on output", "No daily limits — unlimited use", "Works on all devices — desktop, tablet, mobile"].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
              </div>
            ))}
          </section>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href={TOOL_URL} className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Split Your PDF Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
