import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs PDFCandy — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs PDFCandy 2025 Comparison | PDFBro",
  description: "PDFBro vs PDFCandy — honest comparison of features, limits, privacy, and price. Find out which free PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs pdfcandy", "pdfcandy alternative", "pdfcandy free limits", "best free pdf tool 2025", "pdfcandy no signup alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/pdfcandy" },
  openGraph: { title: "PDFBro vs PDFCandy — Which Free PDF Tool Wins?", description: "Honest comparison: features, daily limits, privacy, and tool count.", url: "https://pdfbro.tech/vs/pdfcandy" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", pdfcandy: "Free tier + $4/mo premium", win: "pdfbro" },
  { feature: "Free task limit", pdfbro: "None", pdfcandy: "1 task/hour free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", pdfcandy: "Never (for free)", win: "tie" },
  { feature: "Watermarks", pdfbro: "Never", pdfcandy: "None", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", pdfcandy: "No stated limit", win: "pdfcandy" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", pdfcandy: "No — server uploads", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", pdfcandy: "40+", win: "pdfcandy" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", pdfcandy: "Limited", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", pdfcandy: "No", win: "pdfbro" },
  { feature: "Desktop app", pdfbro: "No", pdfcandy: "Yes — Windows + Mac", win: "pdfcandy" },
  { feature: "Mobile app", pdfbro: "Web only", pdfcandy: "No", win: "tie" },
  { feature: "API access", pdfbro: "No", pdfcandy: "No", win: "tie" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/pdfcandy#webpage",
      url: "https://pdfbro.tech/vs/pdfcandy",
      name: "PDFBro vs PDFCandy — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs PDFCandy — Full Comparison 2026",
      description: "Full comparison of PDFBro and PDFCandy: features, limits, privacy, price. Find out which free PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs PDFCandy", item: "https://pdfbro.tech/vs/pdfcandy" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than PDFCandy?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is better than PDFCandy for free users because it has no task limits (PDFCandy limits free users to 1 task per hour), processes files in the browser for privacy, and offers image tools and a QR code generator that PDFCandy doesn't have." } },
        { "@type": "Question", name: "What is the difference between PDFBro and PDFCandy?", acceptedAnswer: { "@type": "Answer", text: "PDFBro processes files in your browser with no server uploads, has no daily limits, and offers PDF + image tools. PDFCandy uploads files to servers, limits free users to 1 task per hour, and has a paid desktop app for Windows and Mac." } },
        { "@type": "Question", name: "Is PDFCandy free like PDFBro?", acceptedAnswer: { "@type": "Answer", text: "PDFCandy offers a free tier but limits users to 1 task per hour. PDFBro is completely free with no restrictions and no task caps, making it more generous for free users." } },
        { "@type": "Question", name: "Does PDFBro have a desktop app like PDFCandy?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is web-only and works in all modern browsers on any device. PDFCandy offers paid desktop apps for Windows and Mac. If you need offline desktop processing, PDFCandy has an advantage there." } },
      ],
    },
  ],
};

export default function VsPdfCandy() {
  return (
    <>
      <Script id="jsonld-vs-pdfcandy" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs PDFCandy</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs PDFCandy — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            PDFCandy is a popular online PDF toolset with over 40 tools and a desktop app option. PDFBro offers an unrestricted, browser-based alternative. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>PDFCandy</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "pdfcandy" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "pdfcandy" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.pdfcandy}
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
              { title: "Choose PDFBro if you…", items: ["Don't want task-per-hour limits", "Value browser-based privacy", "Need image tools alongside PDF tools", "Want a QR code generator built in"], color: "var(--accent-blue)" },
              { title: "Choose PDFCandy if you…", items: ["Want a paid desktop app (Windows/Mac)", "Need a slightly larger tool count (40+)", "Don't mind the 1 task/hour free limit", "Prefer server-based processing"], color: "#f97316" },
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
