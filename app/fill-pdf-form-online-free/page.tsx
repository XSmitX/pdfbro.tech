import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/fill-pdf-form-online-free`;
const TOOL_URL = "/tools/fill-pdf-form";

export const metadata: Metadata = {
  title: "Fill PDF Form Online Free — No Adobe Acrobat, No Signup | PDFBro",
  description: "Fill out PDF forms online free without Adobe Acrobat. Type into form fields, check boxes, select radio buttons. No signup, no software, browser-based form filling.",
  keywords: ["fill pdf form online free", "fill pdf form without adobe", "type on pdf form free", "pdf form filler online", "complete pdf form online", "fillable pdf editor free", "pdf form no signup"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Fill PDF Form Online Free — No Adobe Acrobat, No Signup | PDFBro",
    description: "Fill out PDF forms online free without Adobe Acrobat. Type into fields, check boxes, select radios. No signup, browser-based form filling.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload your PDF form", desc: "Drag and drop any PDF form into the form filler. Works with government forms, tax documents, applications, surveys, contracts — any fillable or non-fillable PDF up to 100 MB." },
  { title: "Fill in your information", desc: "Click on any field to start typing. The tool detects form fields automatically. For non-fillable PDFs, use the text tool to type anywhere on the page. Check boxes, select options, fill every section with ease." },
  { title: "Download your completed form", desc: "Click save and download your filled PDF form. All entries are embedded permanently. Print, email, or submit your form — no watermarks, no signup, completely free." },
];

const FAQ_ITEMS = [
  { q: "What types of PDF forms does PDFBro support?", a: "PDFBro works with every type of PDF form: fillable forms created in Adobe Acrobat (AcroForms), static non-fillable forms, government forms, tax documents, application forms, surveys, medical intake forms, and rental agreements. Even forms created as flat PDFs can be filled using the free-text tool — just click anywhere and start typing." },
  { q: "Can I save a partially completed form and finish later?", a: "Yes. Download your partially filled form at any time as a PDF with the entries you've made so far embedded in the file. When you're ready to continue, re-upload the same file and add or edit remaining fields. Your previous entries remain in place." },
  { q: "Does the PDF form filler work on mobile devices?", a: "Yes. PDFBro's form filler is fully functional on iPhone (Safari) and Android (Chrome) browsers. The touch-friendly interface lets you tap fields and type with your on-screen keyboard. Perfect for filling forms on the go without installing any app." },
  { q: "Will my form data be saved or shared with anyone?", a: "No. PDFBro processes form filling entirely in your browser. Your form and all the data you type never leave your device. Nothing is uploaded, stored, or accessible by third parties. For sensitive forms like tax returns, medical forms, and legal documents, this provides stronger privacy than cloud-based form fillers." },
  { q: "Can I fill forms without Adobe Acrobat installed?", a: "Yes — that's exactly what PDFBro is built for. Adobe Acrobat Reader DC costs $19.99/month for form filling capabilities. PDFBro provides the same functionality for free with no software installation, no account, and no subscription. Open your browser, upload your form, and start filling." },
  { q: "How is PDFBro's form filler different from Adobe Reader?", a: "Adobe Reader allows viewing and filling AcroForm forms for free, but flat/non-interactive forms require the paid Acrobat Pro. PDFBro fills both interactive and flat PDF forms for free. Additionally, PDFBro is browser-based (no download), has no signup, and processes everything locally on your device for better privacy." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Fill PDF Form Online Free — No Adobe Acrobat, No Signup",
      description: "Fill out PDF forms online free without Adobe Acrobat. Type into form fields, check boxes, select radio buttons. No signup, browser-based.",
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
        { "@type": "ListItem", position: 3, name: "Fill PDF Form Online Free", item: PAGE_URL },
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

export default function FillPdfFormOnlineFree() {
  return (
    <>
      <Script id="jsonld-fill-pdf-form-online-free" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Fill PDF Form Online Free</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Fill PDF Form Online Free — No Adobe Acrobat, No Signup
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Tired of printing forms, filling them by hand, and scanning them back? PDFBro lets you fill out any PDF form online — free, no Adobe Acrobat required, no signup. Type directly into form fields, check boxes, select radio buttons, and add text anywhere on the page. Tax forms, applications, contracts, medical intake — complete them all in your browser.
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
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Fill PDF Form</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Type into any PDF form — fillable or flat — directly in your browser</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Fill Form Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Fill a PDF Form Online Free — 3 Steps</h2>
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Fill PDF Forms</h2>
            {["100% Free — no subscription", "No signup required — instant use", "Works on fillable AND flat PDF forms", "No Adobe Acrobat needed", "Browser-based — data stays private", "No daily limits — fill unlimited forms"].map((feat) => (
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
              Fill Your PDF Form Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
