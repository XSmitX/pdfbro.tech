import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/ocr-pdf-free-online`;
const TOOL_URL = "/tools/ocr-pdf";

export const metadata: Metadata = {
  title: "OCR PDF Free Online — Extract Text from Scanned Documents | PDFBro",
  description: "Extract text from scanned PDFs and images online free using OCR. Convert scanned documents, receipts, books into searchable, copyable text. No signup required.",
  keywords: ["ocr pdf free online", "extract text from scanned pdf", "ocr online free", "pdf ocr converter", "scanned pdf to text free", "ocr image to text online", "make pdf searchable free"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "OCR PDF Free Online — Extract Text from Scanned Documents | PDFBro",
    description: "Extract text from scanned PDFs and images online free with OCR. Convert scanned docs into searchable, copyable text. No signup.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload your scanned PDF or image", desc: "Drag and drop a scanned PDF, photo of a document, screenshot, or any image containing text. Works with JPEG, PNG, and PDF files up to 100 MB." },
  { title: "Run OCR processing", desc: "Click Extract Text and our OCR engine recognizes characters from your scanned document. Works with printed text, typewriter documents, and clean handwritten text. Processing takes seconds for most files." },
  { title: "Download or copy extracted text", desc: "View the recognized text directly, copy it to clipboard, or download as a text file. The source document stays private — everything processes on your device." },
];

const FAQ_ITEMS = [
  { q: "What is OCR and how does it work?", a: "OCR (Optical Character Recognition) is technology that converts images of text — like scanned documents, photos of books, or screenshots — into machine-readable, searchable, and copyable text. PDFBro's OCR engine analyzes each character's shape, compares it against known letter patterns, and outputs editable text. It transforms a 'picture of text' into actual text you can search, copy, and edit." },
  { q: "How accurate is OCR on handwritten documents?", a: "PDFBro's OCR works well on printed text (books, documents, forms) with 95-99% accuracy for clear scans. Handwriting accuracy varies significantly — neat, separated print handwriting may achieve 70-85% accuracy, while cursive or messy handwriting may be 40-60% accurate. For best results with handwritten documents, use clean, high-contrast scans at 300 DPI." },
  { q: "Does PDFBro OCR support multiple languages?", a: "Yes. The OCR engine supports English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean, Arabic, Hindi, and 50+ other languages. For multi-language documents, the engine auto-detects or allows manual language selection for improved accuracy." },
  { q: "Is my scanned document private during OCR processing?", a: "Yes. PDFBro's OCR processes your document entirely in your browser using client-side technology. Your scanned PDF or image never leaves your device — no upload to servers, no storage, no third-party access. Sensitive documents like IDs, contracts, and medical records stay private." },
  { q: "Can I make a scanned PDF searchable with OCR?", a: "Yes. Upload your scanned PDF, run OCR, and download a searchable version. The recognized text layer is added to the PDF, making it fully searchable in any PDF reader. This is essential for archiving scanned documents that you need to find later." },
  { q: "What file formats can I upload for OCR?", a: "PDFBro accepts scanned PDFs, JPEG images, PNG images, and TIFF files. For best results, use high-resolution scans — 200-300 DPI provides the clearest character recognition. Low-resolution or blurry images will have reduced accuracy." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "OCR PDF Free Online — Extract Text from Scanned Documents",
      description: "Extract text from scanned PDFs and images online free using OCR. Convert scanned documents into searchable, copyable text. No signup required.",
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
        { "@type": "ListItem", position: 3, name: "OCR PDF Free Online", item: PAGE_URL },
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

export default function OcrPdfFreeOnline() {
  return (
    <>
      <Script id="jsonld-ocr-pdf-free-online" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>OCR PDF Free Online</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            OCR PDF Free Online — Extract Text from Scanned Documents
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Turn scanned documents, photos of books, and image-based PDFs into searchable, selectable, copyable text — all free, no signup. PDFBro&apos;s OCR (Optical Character Recognition) tool extracts text from any image or scanned PDF directly in your browser, so your sensitive documents never leave your device. No software, no subscription, no limits.
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
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>OCR PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Extract text from scanned documents and images — browser-based OCR</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Extract Text Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to OCR a PDF Online Free — 3 Steps</h2>
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro for OCR</h2>
            {["100% Free — no subscription", "No signup required", "Browser-based — files stay private", "50+ languages supported", "No daily limits — unlimited OCR", "Works with PDFs and images"].map((feat) => (
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
              Extract Text with OCR — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
