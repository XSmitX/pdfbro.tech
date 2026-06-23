import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/pdf-to-excel-free-online`;
const TOOL_URL = "/tools/pdf-to-excel";

export const metadata: Metadata = {
  title: "PDF to Excel Free Online — Extract Tables to Spreadsheet | PDFBro",
  description: "Convert PDF to Excel spreadsheet online free. Extract tables and data from PDFs into editable XLSX files. No signup, no watermarks, accurate table extraction.",
  keywords: ["pdf to excel free online", "convert pdf to excel free", "extract table from pdf to excel", "pdf to xlsx converter free", "pdf to spreadsheet online", "pdf data extraction free", "pdf to excel no signup"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "PDF to Excel Free Online — Extract Tables to Spreadsheet | PDFBro",
    description: "Convert PDF to Excel online free. Extract tables and data from PDFs into editable XLSX spreadsheets. No signup, accurate extraction.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload your PDF with tables", desc: "Drag and drop your PDF containing tables, financial data, or structured information. Accepts scanned PDFs, reports, invoices, and data sheets up to 100 MB." },
  { title: "Convert PDF to Excel", desc: "Click Convert and our engine extracts all tables, rows, and cells from your PDF into a proper Excel spreadsheet. Each table becomes a separate worksheet when possible." },
  { title: "Download your XLSX file", desc: "Download the Excel file and open in Microsoft Excel, Google Sheets, or LibreOffice. All data is in editable cells — sort, filter, and analyze immediately." },
];

const FAQ_ITEMS = [
  { q: "How accurate is PDF to Excel table extraction?", a: "For digitally created PDFs with clear table structures, PDFBro achieves high accuracy — rows, columns, and cell data are faithfully preserved. Scanned PDFs use OCR to recognize text first, which may require minor cleanup for complex layouts or handwritten tables. Simple and well-formatted tables extract with near-perfect accuracy." },
  { q: "Does PDF to Excel work on scanned PDF documents?", a: "Yes. PDFBro uses OCR (Optical Character Recognition) to extract text and table structures from scanned documents. The quality depends on the scan resolution — 200 DPI or higher produces the best results. Clean, straight scans with clear borders extract most accurately." },
  { q: "Will my Excel file preserve formatting, colors, and formulas?", a: "PDFBro extracts the data structure — rows, columns, and cell values — into an Excel spreadsheet. Borders, font formatting, and cell colors from the original PDF may not be preserved. Formulas cannot be extracted from PDFs as PDFs don't store formula logic — you'll need to re-apply formulas in Excel." },
  { q: "Is my data secure when converting PDF to Excel?", a: "Yes. For server-side conversion, PDFBro uses encrypted transmission and deletes your file within 1 hour of processing. Unlike many alternatives, we never store, analyze, or sell your data. For sensitive financial documents, this provides stronger privacy guarantees than free services that mine uploaded content." },
  { q: "Can I convert password-protected PDFs to Excel?", a: "First unlock your PDF using PDFBro's free Unlock PDF tool, then upload the unprotected version to the PDF to Excel converter. Both tools are completely free with no signup." },
  { q: "What's the file size limit for PDF to Excel conversion?", a: "PDFBro accepts PDFs up to 100 MB for conversion. Very large files (50+ MB) with many tables may take a few extra seconds to process. There are no daily conversion limits." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "PDF to Excel Free Online — Extract Tables to Spreadsheet",
      description: "Convert PDF to Excel online free. Extract tables and data from PDFs into editable XLSX files. No signup, no watermarks, accurate extraction.",
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
        { "@type": "ListItem", position: 2, name: "Convert Tools", item: `${BASE_URL}/convert-tools` },
        { "@type": "ListItem", position: 3, name: "PDF to Excel Free Online", item: PAGE_URL },
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

export default function PdfToExcelFreeOnline() {
  return (
    <>
      <Script id="jsonld-pdf-to-excel-free-online" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/convert-tools" className="hover:underline">Convert Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>PDF to Excel Free Online</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            PDF to Excel Free Online — Extract Tables to Spreadsheet
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Stop manually retyping data from PDF tables into Excel. PDFBro converts PDF files to editable Excel spreadsheets (XLSX) online — completely free, no signup required. Extract financial statements, invoices, reports, and data tables into structured spreadsheets you can sort, filter, and analyze in seconds.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Accurate Extraction</span>
          </div>

          <Link href={TOOL_URL} className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>PDF to Excel</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Extract tables and data from any PDF into an editable Excel spreadsheet</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Convert Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Convert PDF to Excel Free Online</h2>
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro for PDF to Excel Conversion</h2>
            {["100% Free — no subscription", "No signup — use instantly", "Accurate table and data extraction", "Editable XLSX output format", "Works with scanned PDFs (OCR)", "No daily limits — convert unlimited files"].map((feat) => (
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
              Convert PDF to Excel Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
