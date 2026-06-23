import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Soda PDF — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs Soda PDF 2025 Comparison | PDFBro",
  description: "PDFBro vs Soda PDF — honest comparison of features, limits, privacy, and price. Find out which PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs soda pdf", "soda pdf alternative", "soda pdf free limits", "best free pdf tool 2025", "soda pdf free alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/sodapdf" },
  openGraph: { title: "PDFBro vs Soda PDF — Which PDF Tool Wins?", description: "Honest comparison: features, price, privacy, and tool count.", url: "https://pdfbro.tech/vs/sodapdf" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", sodapdf: "Free tier + $10/mo premium", win: "pdfbro" },
  { feature: "Free task limit", pdfbro: "None", sodapdf: "Limited (varies by tool)", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", sodapdf: "Yes (for premium features)", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", sodapdf: "None on most tools", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", sodapdf: "Varies by plan", win: "tie" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", sodapdf: "No — server uploads", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", sodapdf: "25+", win: "pdfbro" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", sodapdf: "Limited", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", sodapdf: "No", win: "pdfbro" },
  { feature: "Desktop app", pdfbro: "No", sodapdf: "Yes — Windows + Mac", win: "sodapdf" },
  { feature: "Mobile app", pdfbro: "Web only", sodapdf: "iOS + Android", win: "sodapdf" },
  { feature: "OCR support", pdfbro: "No", sodapdf: "Yes (premium)", win: "sodapdf" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/sodapdf#webpage",
      url: "https://pdfbro.tech/vs/sodapdf",
      name: "PDFBro vs Soda PDF — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs Soda PDF — Full Comparison 2026",
      description: "Full comparison of PDFBro and Soda PDF: features, limits, privacy, price. Find out which PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs Soda PDF", item: "https://pdfbro.tech/vs/sodapdf" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than Soda PDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than Soda PDF for free users because it has no task limits, no signup required, offers more tools including 15+ image tools, and processes files in the browser for privacy. Soda PDF has advantages in desktop/mobile apps and OCR." } },
        { "@type": "Question", name: "What is the difference between PDFBro and Soda PDF?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is a free browser-based tool with 35+ PDF and image tools and browser-based processing. Soda PDF is a freemium service with desktop and mobile apps, OCR capabilities, but limited free usage and server-side processing." } },
        { "@type": "Question", name: "Does Soda PDF have a free version?", acceptedAnswer: { "@type": "Answer", text: "Yes, Soda PDF offers a free tier but with limited features and usage caps. Premium plans start at $10/month. PDFBro offers all its tools completely free with no restrictions." } },
        { "@type": "Question", name: "Can PDFBro do OCR like Soda PDF?", acceptedAnswer: { "@type": "Answer", text: "No, PDFBro does not currently offer OCR (optical character recognition) capabilities. Soda PDF includes OCR as part of its premium subscription. For OCR needs, Soda PDF has the advantage." } },
      ],
    },
  ],
};

export default function VsSodaPdf() {
  return (
    <>
      <Script id="jsonld-vs-sodapdf" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs Soda PDF</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs Soda PDF — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            Soda PDF is a multi-platform PDF editor with desktop, mobile, and web versions. PDFBro offers a free, browser-based alternative with more tools and no restrictions. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Soda PDF</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "sodapdf" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "sodapdf" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.sodapdf}
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
              { title: "Choose PDFBro if you…", items: ["Want a completely free tool with no limits", "Need image processing alongside PDF tools", "Value browser-based privacy (no upload)", "Prefer no signup and instant access"], color: "var(--accent-blue)" },
              { title: "Choose Soda PDF if you…", items: ["Need OCR for scanned documents", "Want desktop + mobile native apps", "Prefer a multi-platform experience", "Don't mind paying $10/month for premium"], color: "#f97316" },
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
            <Link href="/tools" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Explore All PDFBro Tools →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
