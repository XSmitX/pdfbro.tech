import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Canva — PDF Tools Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs Canva 2025 Comparison | PDFBro",
  description: "PDFBro vs Canva — honest comparison of PDF capabilities, features, limits, and price. Find out which tool is right for your PDF needs in 2025.",
  keywords: ["pdfbro vs canva", "canva alternative", "canva pdf tools", "best free pdf tool 2025", "canva pdf editor alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/canva" },
  openGraph: { title: "PDFBro vs Canva — Which PDF Tool Wins?", description: "Honest comparison: PDF features, design tools, pricing, and best use cases.", url: "https://pdfbro.tech/vs/canva" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", canva: "Free tier + $15/mo Pro", win: "pdfbro" },
  { feature: "PDF focus", pdfbro: "Dedicated PDF tools", canva: "Design tool with PDF export", win: "pdfbro" },
  { feature: "Daily task limit", pdfbro: "None", canva: "Limited export formats on free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", canva: "Required", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", canva: "On free tier", win: "pdfbro" },
  { feature: "File size limit", pdfbro: "100 MB", canva: "25 MB", win: "pdfbro" },
  { feature: "Browser-based", pdfbro: "Yes", canva: "Server-based", win: "pdfbro" },
  { feature: "Number of PDF tools", pdfbro: "25+ PDF tools", canva: "2-3 PDF features", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "15+ tools", canva: "Full design editor", win: "canva" },
  { feature: "QR code generator", pdfbro: "Yes", canva: "Yes", win: "tie" },
  { feature: "Templates", pdfbro: "No", canva: "250,000+", win: "canva" },
  { feature: "Best for", pdfbro: "PDF processing", canva: "Graphic design", win: "tie" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/canva#webpage",
      url: "https://pdfbro.tech/vs/canva",
      name: "PDFBro vs Canva — PDF Tools Comparison 2026 | Which is Better?",
      headline: "PDFBro vs Canva — PDF Tools Comparison 2026",
      description: "Full comparison of PDFBro and Canva for PDF tasks: features, limits, pricing, and best use cases. Find out which tool fits your PDF needs.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs Canva", item: "https://pdfbro.tech/vs/canva" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than Canva for PDFs?", acceptedAnswer: { "@type": "Answer", text: "Yes, PDFBro is significantly better than Canva for PDF processing. PDFBro offers 25+ dedicated PDF tools including merge, compress, OCR, and convert features. Canva has only 2-3 basic PDF features since it is primarily a design tool." } },
        { "@type": "Question", name: "What is the difference between PDFBro and Canva?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is a dedicated PDF processing platform with 100+ tools, no signup, and browser-based privacy. Canva is a graphic design platform with PDF export capabilities and 250,000+ templates, but very limited PDF-specific functionality." } },
        { "@type": "Question", name: "Is PDFBro free like Canva?", acceptedAnswer: { "@type": "Answer", text: "Both PDFBro and Canva offer free tiers, but PDFBro has no restrictions, no watermarks, and no signup required. Canva's free tier limits export formats, adds watermarks on premium features, and requires an account." } },
        { "@type": "Question", name: "Should I use PDFBro or Canva for PDF editing?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro for PDF processing tasks like merging, compressing, converting, and annotating PDFs. Use Canva for graphic design projects that include PDF export. They serve different purposes and work well together." } },
      ],
    },
  ],
};

export default function VsCanva() {
  return (
    <>
      <Script id="jsonld-vs-canva" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/guides/canva-alternative-free" className="hover:underline">Canva Alternative</Link> / <span>PDFBro vs Canva</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs Canva — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Canva is a popular graphic design platform with basic PDF export features. PDFBro is a dedicated PDF processing toolkit with 100+ free tools. They serve different purposes — here&apos;s how they compare.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Canva</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "canva" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "canva" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.canva}
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
              { title: "Choose PDFBro if you…", items: ["Need dedicated PDF processing tools", "Want to merge, compress, or convert PDFs", "Value zero signup and no watermarks", "Need browser-based file privacy"], color: "var(--accent-blue)" },
              { title: "Choose Canva if you…", items: ["Need full graphic design capabilities", "Want access to 250,000+ templates", "Design social media content and presentations", "Need team collaboration for design projects"], color: "#f97316" },
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
            <Link href="/guides/canva-alternative-free" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full Canva Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
