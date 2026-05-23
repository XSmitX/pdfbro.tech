import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Shield, Zap, Lock, FileText, Scissors, FilePlus2, RotateCcw, Hash, Stamp, LockOpen, ShieldCheck, PenLine, Search, Edit3, GripVertical, FileOutput } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/toolRegistry";

export const metadata: Metadata = {
  title: "Free PDF Tools Online — Merge PDF, Compress PDF, PDF to Word | PDFBro",
  description:
    "The best free online PDF tools. Merge PDF, split PDF, compress PDF, convert PDF to Word, PDF to Excel, PDF to PowerPoint, sign PDF, protect PDF with password, OCR PDF and 20+ more. No signup, no watermarks.",
  keywords: [
    // Mega-traffic
    "free PDF tools online",
    "merge PDF free",
    "compress PDF online",
    "PDF to Word free",
    "PDF converter free",
    "online PDF editor free",
    // High-traffic
    "split PDF online",
    "PDF to Excel free",
    "PDF to PowerPoint free",
    "sign PDF online",
    "rotate PDF pages",
    "OCR PDF free",
    // Medium/long-tail
    "password protect PDF free",
    "unlock PDF online",
    "add watermark to PDF",
    "PDF page numbers online",
    "edit PDF online free no signup",
    "fill PDF form online free",
    "free PDF tools no signup no watermark",
    // Competitor alternatives
    "ilovepdf alternative",
    "free acrobat alternative",
    "PDF tools no daily limit",
  ],
  alternates: { canonical: "https://pdfbro.tech/pdf-tools" },
  openGraph: {
    title: "Free PDF Tools Online | PDFBro",
    description: "Merge, split, compress, convert, sign and edit PDFs for free. No signup, browser-based.",
    url: "https://pdfbro.tech/pdf-tools",
  },
};

const PDF_FEATURES = [
  { icon: FilePlus2, title: "Merge PDF", desc: "Combine multiple PDF files into one document", href: "/tools/merge-pdf", color: "#ef4444" },
  { icon: Scissors, title: "Split PDF", desc: "Extract pages or page ranges from any PDF", href: "/tools/split-pdf", color: "#f97316" },
  { icon: FileText, title: "Compress PDF", desc: "Reduce PDF file size without quality loss", href: "/tools/compress-pdf", color: "#eab308" },
  { icon: FileOutput, title: "PDF to Word", desc: "Convert PDF to editable Word documents", href: "/tools/pdf-to-word", color: "#0ea5e9" },
  { icon: FileOutput, title: "PDF to Excel", desc: "Extract PDF tables to Excel spreadsheets", href: "/tools/pdf-to-excel", color: "#16a34a" },
  { icon: FileOutput, title: "PDF to PowerPoint", desc: "Convert PDF slides to editable PPTX", href: "/tools/pdf-to-powerpoint", color: "#dc2626" },
  { icon: PenLine, title: "Sign PDF", desc: "Add handwritten signatures to PDFs", href: "/tools/sign-pdf", color: "#2563eb" },
  { icon: ShieldCheck, title: "Protect PDF", desc: "Add password protection to any PDF", href: "/tools/protect-pdf", color: "#dc2626" },
  { icon: LockOpen, title: "Unlock PDF", desc: "Remove password from a PDF you own", href: "/tools/unlock-pdf", color: "#059669" },
  { icon: RotateCcw, title: "Rotate PDF", desc: "Fix page orientation in any PDF", href: "/tools/rotate-pdf", color: "#14b8a6" },
  { icon: Stamp, title: "Add Watermark", desc: "Add text or image watermark to PDF pages", href: "/tools/add-watermark", color: "#7c3aed" },
  { icon: Hash, title: "Page Numbers", desc: "Insert page numbers into your PDF", href: "/tools/pdf-page-numbers", color: "#ea580c" },
  { icon: Search, title: "OCR PDF", desc: "Extract text from scanned PDFs", href: "/tools/ocr-pdf", color: "#0ea5e9" },
  { icon: Edit3, title: "Edit PDF", desc: "Annotate, highlight and draw on PDFs", href: "/tools/edit-pdf", color: "#f97316" },
  { icon: GripVertical, title: "Reorder Pages", desc: "Drag and drop to rearrange PDF pages", href: "/tools/reorder-pdf-pages", color: "#0891b2" },
  { icon: FileOutput, title: "Extract Pages", desc: "Pull out specific pages to a new PDF", href: "/tools/extract-pdf-pages", color: "#7c3aed" },
  { icon: PenLine, title: "Fill PDF Form", desc: "Fill out PDF forms without Acrobat", href: "/tools/fill-pdf-form", color: "#b45309" },
  { icon: Lock, title: "PDF to Image", desc: "Convert PDF pages to PNG or JPG images", href: "/tools/pdf-to-image", color: "#06b6d4" },
];

const PDF_TOOL_ITEMS = [
  { name: "Merge PDF", url: "https://pdfbro.tech/tools/merge-pdf", desc: "Combine multiple PDF files into one document" },
  { name: "Split PDF", url: "https://pdfbro.tech/tools/split-pdf", desc: "Extract pages or page ranges from a PDF" },
  { name: "Compress PDF", url: "https://pdfbro.tech/tools/compress-pdf", desc: "Reduce PDF file size by up to 80%" },
  { name: "PDF to Word", url: "https://pdfbro.tech/tools/pdf-to-word", desc: "Convert PDF to editable Word document" },
  { name: "Word to PDF", url: "https://pdfbro.tech/tools/word-to-pdf", desc: "Convert Word documents to PDF" },
  { name: "PDF to Excel", url: "https://pdfbro.tech/tools/pdf-to-excel", desc: "Extract PDF tables to Excel spreadsheets" },
  { name: "PDF to PowerPoint", url: "https://pdfbro.tech/tools/pdf-to-powerpoint", desc: "Convert PDF to editable PowerPoint presentation" },
  { name: "Sign PDF", url: "https://pdfbro.tech/tools/sign-pdf", desc: "Add electronic signature to any PDF" },
  { name: "Protect PDF", url: "https://pdfbro.tech/tools/protect-pdf", desc: "Password protect PDF with AES-256 encryption" },
  { name: "Unlock PDF", url: "https://pdfbro.tech/tools/unlock-pdf", desc: "Remove password from a PDF you own" },
  { name: "OCR PDF", url: "https://pdfbro.tech/tools/ocr-pdf", desc: "Extract text from scanned PDF files" },
  { name: "Edit PDF", url: "https://pdfbro.tech/tools/edit-pdf", desc: "Add text, highlights, and shapes to PDFs" },
  { name: "Fill PDF Form", url: "https://pdfbro.tech/tools/fill-pdf-form", desc: "Fill interactive PDF forms online" },
  { name: "Rotate PDF", url: "https://pdfbro.tech/tools/rotate-pdf", desc: "Fix page orientation in PDFs" },
  { name: "Add Watermark", url: "https://pdfbro.tech/tools/add-watermark", desc: "Stamp text or image watermarks on PDFs" },
  { name: "PDF Page Numbers", url: "https://pdfbro.tech/tools/pdf-page-numbers", desc: "Insert page numbers into PDFs" },
  { name: "Extract PDF Pages", url: "https://pdfbro.tech/tools/extract-pdf-pages", desc: "Extract specific pages to a new PDF" },
  { name: "Reorder PDF Pages", url: "https://pdfbro.tech/tools/reorder-pdf-pages", desc: "Drag-and-drop PDF page reordering" },
  { name: "PDF to Text", url: "https://pdfbro.tech/tools/pdf-to-text", desc: "Extract all text content from a PDF" },
  { name: "Text to PDF", url: "https://pdfbro.tech/tools/text-to-pdf", desc: "Convert plain text to a formatted PDF" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pdfbro.tech/pdf-tools#webpage",
      name: "Free PDF Tools Online — Merge PDF, Compress PDF, Convert PDF | PDFBro",
      description: "Complete suite of free online PDF tools. Merge PDF, split PDF, compress PDF, convert PDF to Word, Excel, PowerPoint, sign PDF, OCR and 20+ more. No signup required. Browser-based.",
      url: "https://pdfbro.tech/pdf-tools",
      inLanguage: "en-US",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      publisher: { "@id": "https://pdfbro.tech/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: "https://pdfbro.tech/pdf-tools" },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://pdfbro.tech/pdf-tools#toollist",
      name: "Free PDF Tools Online",
      description: "Complete list of free online PDF tools on PDFBro — no signup, no watermarks, browser-based.",
      url: "https://pdfbro.tech/pdf-tools",
      numberOfItems: PDF_TOOL_ITEMS.length,
      itemListElement: PDF_TOOL_ITEMS.map((tool, i) => ({
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

export default function PDFToolsPage() {
  const pdfTools = getToolsByCategory("pdf");

  return (
    <>
      <Script id="jsonld-pdf-tools" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />

        {/* Hero */}
        <section className="relative py-16 sm:py-20" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3">
              <Link href="/" className="text-xs" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span className="mx-2 text-xs" style={{ color: "var(--border)" }}>/</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>PDF Tools</span>
            </div>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-4" style={{ color: "var(--text-primary)" }}>
              Free PDF Tools Online — Merge PDF, Compress PDF, Convert PDF
            </h1>
            <p className="max-w-2xl text-lg mb-3" style={{ color: "var(--text-secondary)" }}>
              The complete suite of free online PDF tools. <strong style={{ color: "var(--text-primary)" }}>Merge PDF</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>split PDF</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>compress PDF</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>PDF to Word</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>PDF to Excel</strong>, sign PDF, protect PDF with password, and 20+ more.
            </p>
            <p className="max-w-2xl text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              All tools are{" "}
              <strong style={{ color: "var(--text-primary)" }}>100% free</strong>, require{" "}
              <strong style={{ color: "var(--text-primary)" }}>no signup</strong>, add no watermarks, and run directly in your browser — no file uploads for most tools.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools/merge-pdf" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #ef4444, #f97316)" }}>
                Merge PDF
              </Link>
              <Link href="/tools/compress-pdf" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #eab308, #f97316)" }}>
                Compress PDF
              </Link>
              <Link href="/tools/pdf-to-word" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #2563eb)" }}>
                PDF to Word
              </Link>
            </div>
          </div>
        </section>

        {/* All PDF tools grid */}
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>All PDF Tools</h2>
            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              {pdfTools.length} free PDF tools — no signup, no watermarks, no limits
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {pdfTools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} index={i} />)}
            </div>
          </div>
        </section>

        {/* Feature blocks */}
        <section className="py-14" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
              Quick Access — Most Popular PDF Tools
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PDF_FEATURES.slice(0, 9).map((feat) => (
                <Link
                  key={feat.href}
                  href={feat.href}
                  className="group rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${feat.color}15` }}>
                    <feat.icon className="h-5 w-5" style={{ color: feat.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{feat.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{feat.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-muted)" }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why use PDF tools */}
        <section className="py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Why use PDFBro for your PDF needs?
            </h2>
            <div className="space-y-4">
              {[
                { icon: Shield, title: "100% Private — Files Never Leave Your Device", body: "Nearly all PDF tools on PDFBro process files entirely in your web browser using JavaScript. Your PDF files are never uploaded to, stored on, or read by any server. When you close the tab, all file data is gone." },
                { icon: Zap, title: "No Software to Install", body: "PDFBro PDF tools work in any modern web browser — Chrome, Firefox, Safari, Edge. No Adobe Acrobat, no downloads, no plugins needed. Works on Windows, Mac, Linux, iPhone and Android." },
                { icon: Lock, title: "No Signup, No Account, No Cost", body: "Every PDF tool on PDFBro is completely free. No email required, no credit card, no subscription. Just open the tool, upload your file, and get your result instantly." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-blue)" }} />
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

        {/* Cross-links to other categories */}
        <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>Also explore</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/image-tools" className="rounded-xl px-4 py-2 text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Free Image Tools →
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
