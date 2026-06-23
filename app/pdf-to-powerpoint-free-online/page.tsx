import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/pdf-to-powerpoint-free-online`;
const TOOL_URL = "/tools/pdf-to-powerpoint";

export const metadata: Metadata = {
  title: "PDF to PowerPoint Free Online — Convert PDF to Editable Slides | PDFBro",
  description: "Convert PDF to PowerPoint (PPTX) online free. Transform PDF pages into editable presentation slides. No signup, preserves images and layouts. Instant download.",
  keywords: ["pdf to powerpoint free online", "convert pdf to pptx free", "pdf to ppt converter online", "pdf to editable powerpoint", "convert pdf slides free", "pdf to presentation converter", "pdf to ppt no signup"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "PDF to PowerPoint Free Online — Convert PDF to Editable Slides | PDFBro",
    description: "Convert PDF to PowerPoint (PPTX) online free. Turn PDF pages into editable slides. No signup, preserves images and layouts.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload your PDF document", desc: "Drag and drop any PDF into the converter. Works with presentations, reports, slide decks, and multi-page documents up to 100 MB. Each PDF page becomes a PowerPoint slide." },
  { title: "Convert PDF to PPTX", desc: "Click Convert and the tool transforms each PDF page into an editable PowerPoint slide. Text becomes text boxes, images are preserved, and the overall layout is maintained for easy editing." },
  { title: "Download your PowerPoint file", desc: "Download the PPTX file and open in Microsoft PowerPoint, Google Slides, or LibreOffice Impress. Edit text, move images, adjust layouts — fully editable slides." },
];

const FAQ_ITEMS = [
  { q: "Are the converted slides actually editable in PowerPoint?", a: "Yes. PDFBro converts each PDF page into an editable PowerPoint slide. Text is placed in editable text boxes, images are preserved as movable objects, and you can modify fonts, colors, and layouts in PowerPoint. The output is a standard PPTX file compatible with all versions of PowerPoint and Google Slides." },
  { q: "Does the conversion preserve images and charts from my PDF?", a: "Yes. Images, charts, diagrams, and other embedded graphics are extracted and preserved in the PowerPoint file. The layout may shift slightly during conversion — complex multi-column layouts may need minor repositioning. Simple slides and presentations convert with excellent fidelity." },
  { q: "Can I convert any PDF to PowerPoint?", a: "PDFBro works with any PDF file, including presentations saved as PDF, reports with graphics, scanned documents, and multi-page PDFs. Text-based PDFs convert with the best results. Scanned documents may lose some formatting but images are preserved. Encrypted PDFs must be unlocked first with PDFBro's free Unlock PDF tool." },
  { q: "What's the quality difference vs saving from Acrobat?", a: "PDFBro's conversion produces comparable quality to Adobe Acrobat's PDF-to-PPTX export — both convert text to editable text boxes and preserve images. Acrobat may handle complex vector graphics slightly better, but for presentations, reports, and standard documents, PDFBro's output is equally usable." },
  { q: "Is there a page limit for PDF to PowerPoint conversion?", a: "No hard page limit. PDFs up to 100 MB are accepted, which covers most presentations (100+ slides for standard decks). There are no daily limits on how many conversions you can do." },
  { q: "Will my converted slides look exactly like the original PDF?", a: "Layouts are preserved with high fidelity, though exact positioning may shift by a few pixels. Fonts may differ if the original PDF uses fonts not available on your system. Images retain their resolution and positioning. For presentations where pixel-perfect layout is critical, a quick review and minor adjustment in PowerPoint will align everything." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "PDF to PowerPoint Free Online — Convert PDF to Editable Slides",
      description: "Convert PDF to PowerPoint (PPTX) online free. Transform PDF pages into editable slides. No signup, preserves images and layouts.",
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
        { "@type": "ListItem", position: 3, name: "PDF to PowerPoint Free Online", item: PAGE_URL },
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

export default function PdfToPowerpointFreeOnline() {
  return (
    <>
      <Script id="jsonld-pdf-to-powerpoint-free-online" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/convert-tools" className="hover:underline">Convert Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>PDF to PowerPoint Free Online</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            PDF to PowerPoint Free Online — Convert PDF to Editable Slides
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Need to edit a PDF presentation but don&apos;t have the original PowerPoint file? PDFBro converts any PDF into an editable PPTX file online — free, no signup, no software. Each page becomes a slide with editable text, movable images, and preserved layouts. Open in PowerPoint, Google Slides, or LibreOffice and start editing.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Editable Slides</span>
          </div>

          <Link href={TOOL_URL} className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>PDF to PowerPoint</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Convert any PDF into an editable PPTX presentation — each page becomes a slide</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Convert Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Convert PDF to PowerPoint Free</h2>
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro for PDF to PPT Conversion</h2>
            {["100% Free — no subscription", "No signup required", "Editable PowerPoint output (PPTX)", "Preserves images and charts", "Each PDF page = one slide", "No daily limits — convert unlimited files"].map((feat) => (
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
              Convert PDF to PowerPoint — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
