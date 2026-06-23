import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Online Free — No Software, No Signup | PDFBro",
  description: "Add page numbers to PDF online free with no software download. Customize position, font size, starting number. No signup, no watermark, browser-based.",
  keywords: [
    "add page numbers to pdf online free",
    "add page numbers to pdf without acrobat",
    "insert page numbers into pdf online",
    "number pages in pdf free online",
    "add page numbering to pdf no software",
    "pdf page numbers online tool free",
    "put page numbers on pdf free no signup",
    "add page numbers pdf browser free",
  ],
  alternates: { canonical: "https://pdfbro.tech/add-page-numbers-to-pdf-online" },
  openGraph: {
    title: "Add Page Numbers to PDF Online Free — No Software, No Signup | PDFBro",
    description: "Add page numbers to PDF online free. Customize position, font, starting number. No software download. No signup.",
    url: "https://pdfbro.tech/add-page-numbers-to-pdf-online",
    type: "website",
  },
};

export default function AddPageNumbersToPdfPage() {
  return (
    <>
      <Script id="jsonld-add-page-numbers" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://pdfbro.tech/add-page-numbers-to-pdf-online#webpage",
            url: "https://pdfbro.tech/add-page-numbers-to-pdf-online",
            name: "Add Page Numbers to PDF Online Free — No Software, No Signup",
            description: "Add page numbers to PDF online free with no software download. Customize position, font size, starting number. No signup, no watermark.",
            inLanguage: "en-US",
            dateModified: "2026-06-23",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            breadcrumb: { "@id": "https://pdfbro.tech/add-page-numbers-to-pdf-online#breadcrumb" },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://pdfbro.tech/add-page-numbers-to-pdf-online#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${BASE_URL}/pdf-tools` },
              { "@type": "ListItem", position: 3, name: "Add Page Numbers to PDF", item: "https://pdfbro.tech/add-page-numbers-to-pdf-online" },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": "https://pdfbro.tech/add-page-numbers-to-pdf-online#faq",
            mainEntity: [
              { "@type": "Question", name: "Can I customize where the page numbers appear on the PDF?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's PDF Page Numbers tool lets you position numbers at the top (header) or bottom (footer) of each page, aligned left, center, or right. You can also choose the starting page number (e.g., start at page 3 if you have a cover page), customize font size, and select the number format (1, 2, 3 or Roman numerals)." } },
              { "@type": "Question", name: "Can I set a custom starting page number?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can set any starting number — useful when your PDF is part of a larger document or you have unnumbered cover pages. For example, if your first 2 pages are a cover and table of contents, start numbering from page 3 with the value '1'. The tool applies the sequence automatically to all subsequent pages." } },
              { "@type": "Question", name: "Does the tool add page numbers to all pages in the PDF?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro adds page numbers to every page in your PDF by default. If you need to skip certain pages (like a cover page), you can use our Split PDF tool to separate those pages, number the main document, and then merge them back together." } },
              { "@type": "Question", name: "Do I need to install software to add page numbers to a PDF?", acceptedAnswer: { "@type": "Answer", text: "No. PDFBro runs entirely in your web browser — no downloads, no installations, no Adobe Acrobat subscription. Upload your PDF, choose your page number settings, and download the numbered document. Works on Windows, Mac, Linux, and ChromeOS." } },
            ],
          },
        ],
      }) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Add Page Numbers to PDF</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Add Page Numbers to PDF Online Free — No Software, No Signup
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            You&apos;re about to submit a thesis, report, or legal document and realize — there are no page numbers. Now what? Installing Adobe Acrobat? Searching for sketchy freeware? PDFBro&apos;s free page number tool adds professional numbering to any PDF in seconds, directly in your browser. Choose position (top or bottom, left/center/right), pick your font size, set a starting number, and download the numbered document — no software to install, no signup, and no watermarks on the output.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Adobe Acrobat costs $22.99/month just to add page numbers. Other online tools cap you at a few pages or stamp a watermark on every sheet. PDFBro processes all pages — 2 or 200 — for free, with no daily usage limits.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Browser-Based</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(139,106,245,0.1)", color: "var(--accent-violet)", border: "1px solid rgba(139,106,245,0.2)" }}>Customizable</span>
          </div>

          <Link
            href="/tools/pdf-page-numbers"
            className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>PDF Page Numbers</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Add professional page numbering to any PDF — customize position, size, and starting number</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Add Page Numbers →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Add Page Numbers to PDF Online</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your PDF", desc: "Click to upload or drag your PDF file into the page numbering tool. No signup needed — the tool loads instantly in your browser." },
                { step: 2, title: "Choose numbering settings", desc: "Select position (top/bottom of page), alignment (left/center/right), font size, starting page number, and number format. Preview updates as you adjust settings." },
                { step: 3, title: "Download numbered PDF", desc: "Click Apply and your numbered PDF downloads immediately. Every page gets a sequential number in your chosen position and style — no watermarks, 100% clean output." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(79,142,247,0.15)", color: "var(--accent-blue)" }}>
                    {s.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Add Page Numbers to PDF</h2>
            {["100% Free — no subscription, no premium tier", "No signup required — use instantly", "Browser-based processing — your files stay private", "No watermarks on output", "No daily limits"].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
              </div>
            ))}
          </section>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
            <div className="space-y-5">
              {[
                { q: "Can I customize where the page numbers appear on the PDF?", a: "Yes. PDFBro&apos;s PDF Page Numbers tool lets you position numbers at the top (header) or bottom (footer) of each page, aligned left, center, or right. You can also choose the starting page number (e.g., start at page 3 if you have a cover page), customize font size and color, and select the number format — standard numbers (1, 2, 3) or Roman numerals (i, ii, iii)." },
                { q: "Can I set a custom starting page number?", a: "Yes. Set any starting number — useful when your PDF is part of a larger document or you have unnumbered cover pages. For example, if your first 2 pages are a cover and table of contents, start numbering from page 3 with the value &apos;1&apos;. The tool applies the sequence automatically to all subsequent pages." },
                { q: "Does the tool add page numbers to all pages in the PDF?", a: "Yes. PDFBro adds page numbers to every page by default. Need to skip pages? Use our Split PDF tool to separate cover pages, number the main document, then merge them back — all free tools work together in your browser." },
                { q: "Do I need to install software to add page numbers to a PDF?", a: "No. PDFBro runs entirely in your web browser — no downloads, no installations, no Adobe Acrobat subscription ($22.99/month). Upload your PDF, configure numbering, and download. Works on Windows, Mac, Linux, ChromeOS, and mobile browsers." },
              ].map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/tools/pdf-page-numbers" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Add Page Numbers to PDF — Free Online <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
