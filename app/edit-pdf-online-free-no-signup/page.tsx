import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/edit-pdf-online-free-no-signup`;
const TOOL_URL = "/tools/edit-pdf";

export const metadata: Metadata = {
  title: "Edit PDF Online Free No Signup — Annotate, Highlight, Draw | PDFBro",
  description: "Edit PDFs online free without signing up. Highlight text, draw shapes, add notes, underline, strikethrough — all in your browser. No account needed, no watermarks.",
  keywords: ["edit pdf online free no signup", "free pdf editor online", "annotate pdf free", "edit pdf without adobe", "highlight pdf online free", "pdf editor no registration", "free online pdf annotation tool"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Edit PDF Online Free No Signup — Annotate, Highlight, Draw | PDFBro",
    description: "Edit PDFs online free without signing up. Highlight text, draw shapes, add notes, underline. No account, no watermarks, browser-based.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload your PDF document", desc: "Drag and drop any PDF into the editor. Works with text documents, scanned PDFs, forms, presentations — any PDF content. Supports files up to 100 MB." },
  { title: "Annotate, highlight, and draw", desc: "Use the toolbar to highlight text in multiple colors, underline key passages, add sticky notes, draw freehand shapes, strike through text, and insert text boxes. Full annotation suite." },
  { title: "Download your edited PDF", desc: "Click save and download your annotated PDF. All edits are baked into the file — visible in any PDF reader. No watermarks, no quality loss, no signup required." },
];

const FAQ_ITEMS = [
  { q: "Can I edit PDF text for free without signing up?", a: "PDFBro's Edit PDF tool lets you annotate PDFs — highlight, underline, draw, add notes, and insert text boxes — all free without any signup. For full text editing (changing existing PDF text), use PDFBro's PDF to Word converter to export to an editable format first." },
  { q: "What editing features are available on PDFBro?", a: "The free editor includes: text highlighting (multiple colors), underlining, strikethrough, sticky notes, freehand drawing, shape drawing (rectangles, ellipses, lines), text boxes, and comment annotations. All tools work in your browser with no software install." },
  { q: "Will my edited PDF have watermarks?", a: "Never. PDFBro adds zero watermarks to any output. Your annotated PDF downloads clean and professional — all edits are permanently embedded in the file for viewing in any PDF reader." },
  { q: "Can I edit a PDF on my phone without an app?", a: "Yes. PDFBro's editor works in mobile browsers — Safari on iPhone and Chrome on Android. No app to download, no account to create. Just open the page, upload your PDF, and start annotating on any screen size." },
  { q: "How does PDFBro compare to paid PDF editors?", a: "PDFBro offers annotation and markup tools comparable to Adobe Acrobat's commenting features — for free. While full text restructuring requires a word processor, PDFBro covers 90% of what most users need from a PDF editor: highlight, annotate, draw, and sign." },
  { q: "Are my documents private when I edit them online?", a: "Yes. PDFBro processes all edits entirely in your browser. Your PDF never leaves your device — nothing is uploaded to servers, stored, or accessible by third parties. This is more private than cloud editors that require server uploads." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Edit PDF Online Free No Signup — Annotate, Highlight, Draw",
      description: "Edit PDFs online free without signing up. Highlight, draw, add notes, underline — all browser-based. No account, no watermarks.",
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
        { "@type": "ListItem", position: 3, name: "Edit PDF Online Free No Signup", item: PAGE_URL },
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

export default function EditPdfOnlineFreeNoSignup() {
  return (
    <>
      <Script id="jsonld-edit-pdf-online-free-no-signup" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Edit PDF Online Free No Signup</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Edit PDF Online Free No Signup — Annotate, Highlight, Draw
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Why pay $19.99/month for Adobe Acrobat when you can edit PDFs online for free with no signup? PDFBro&apos;s browser-based PDF editor gives you powerful annotation tools — highlight, draw, add notes, underline text, insert text boxes — all without creating an account or installing anything. Open, edit, and save in seconds.
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
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Edit PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Highlight, draw, annotate, and add notes — all browser-based, zero signup</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Edit PDF Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Edit PDF Online Free With No Signup</h2>
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Edit PDFs</h2>
            {["100% Free — no subscription", "No signup required — instant access", "Browser-based — files private", "No watermarks on output", "No daily limits — unlimited edits", "Works on mobile and desktop"].map((feat) => (
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
              Start Editing PDFs — Free & No Signup <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
