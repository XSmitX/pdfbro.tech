import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Google Docs — PDF Tools Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs Google Docs 2025 Comparison | PDFBro",
  description: "PDFBro vs Google Docs — honest comparison of PDF capabilities, features, limits, and price. Find out which tool is right for your PDF needs in 2025.",
  keywords: ["pdfbro vs google docs", "google docs alternative", "google docs pdf tools", "best free pdf tool 2025", "google docs pdf editor alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/google-docs" },
  openGraph: { title: "PDFBro vs Google Docs — Which PDF Tool Wins?", description: "Honest comparison: PDF features, editing, file format support, and best use cases.", url: "https://pdfbro.tech/vs/google-docs" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", googledocs: "Free", win: "tie" },
  { feature: "PDF editing", pdfbro: "Annotations + editing", googledocs: "Limited PDF support", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", googledocs: "Google account required", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", googledocs: "None", win: "tie" },
  { feature: "Merge PDF", pdfbro: "Yes", googledocs: "No native support", win: "pdfbro" },
  { feature: "Compress PDF", pdfbro: "Yes", googledocs: "No native support", win: "pdfbro" },
  { feature: "OCR PDF", pdfbro: "Yes", googledocs: "No", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "100+", googledocs: "3-4 PDF features", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes 15+", googledocs: "No", win: "pdfbro" },
  { feature: "Sign PDF", pdfbro: "Yes", googledocs: "No", win: "pdfbro" },
  { feature: "Convert PDF to Word", pdfbro: "Yes", googledocs: "Via export", win: "pdfbro" },
  { feature: "Browser-based", pdfbro: "Yes", googledocs: "Cloud-based", win: "pdfbro" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/google-docs#webpage",
      url: "https://pdfbro.tech/vs/google-docs",
      name: "PDFBro vs Google Docs — PDF Tools Comparison 2026 | Which is Better?",
      headline: "PDFBro vs Google Docs — PDF Tools Comparison 2026",
      description: "Full comparison of PDFBro and Google Docs for PDF tasks: features, editing, file format support, and best use cases. Find out which tool fits your PDF needs.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: "2026-05-23",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      author: { "@id": "https://pdfbro.tech/#organization" },
      publisher: { "@id": "https://pdfbro.tech/#organization" },
      image: { "@type": "ImageObject", url: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png" },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "PDFBro vs Google Docs", item: "https://pdfbro.tech/vs/google-docs" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than Google Docs for PDFs?", acceptedAnswer: { "@type": "Answer", text: "Yes, PDFBro is significantly better than Google Docs for PDF processing. PDFBro offers 100+ dedicated PDF tools including merge, compress, OCR, and sign features. Google Docs has only basic PDF viewing and export capabilities with limited native PDF support." } },
        { "@type": "Question", name: "What is the difference between PDFBro and Google Docs?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is a dedicated PDF processing platform with 100+ tools, no signup required, and browser-based privacy. Google Docs is a cloud-based document editor with basic PDF viewing and export but no native merge, compress, OCR, or sign features." } },
        { "@type": "Question", name: "Can I use PDFBro without a Google account?", acceptedAnswer: { "@type": "Answer", text: "Yes, PDFBro requires no signup or account of any kind. Google Docs requires a Google account to create, edit, or export documents. PDFBro is completely anonymous and free to use." } },
        { "@type": "Question", name: "Should I use PDFBro or Google Docs for working with PDFs?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro for all PDF processing tasks like merging, compressing, converting, annotating, and signing PDFs. Use Google Docs for creating and editing documents that you plan to export as PDFs. They complement each other well." } },
      ],
    },
  ],
};

export default function VsGoogleDocs() {
  return (
    <>
      <Script id="jsonld-vs-google-docs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/guides/google-docs-alternative" className="hover:underline">Google Docs Alternative</Link> / <span>PDFBro vs Google Docs</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs Google Docs — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Google Docs is a popular cloud-based document editor with basic PDF support. PDFBro is a dedicated PDF processing toolkit with 100+ free tools. Here&apos;s how they compare for PDF-related tasks.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Google Docs</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.feature} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                      <td className="px-5 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{row.feature}</td>
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdfbro" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "pdfbro" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.pdfbro}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "googledocs" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "googledocs" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.googledocs}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            {[
              { title: "Choose PDFBro if you…", items: ["Need dedicated PDF processing tools", "Want to merge, compress, or convert PDFs", "Value zero signup and full anonymity", "Need OCR, signing, and image tools"], color: "var(--accent-blue)" },
              { title: "Choose Google Docs if you…", items: ["Need collaborative document editing", "Already use Google Workspace", "Create documents to export as PDFs", "Need real-time team collaboration"], color: "#f97316" },
            ].map((block) => (
              <div key={block.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>{block.title}</h3>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: block.color }} />
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/tools" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Try PDFBro Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides/google-docs-alternative" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full Google Docs Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
