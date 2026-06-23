import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs DocHub — Full Comparison 2025 | Which is Better?",
  metaTitle: "PDFBro vs DocHub 2025 Comparison | PDFBro",
  description: "PDFBro vs DocHub — honest comparison of features, limits, privacy, and price. Find out which PDF tool is right for you in 2025.",
  keywords: ["pdfbro vs dochub", "dochub alternative", "dochub free limits", "best free pdf tool 2025", "dochub no signup alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/dochub" },
  openGraph: { title: "PDFBro vs DocHub — Which PDF Tool Wins?", description: "Honest comparison: features, limits, privacy, and tool count.", url: "https://pdfbro.tech/vs/dochub" },
} as Metadata;

const ROWS = [
  { feature: "Price", pdfbro: "Free forever", dochub: "Free tier + $10/mo premium", win: "pdfbro" },
  { feature: "Free document limit", pdfbro: "None", dochub: "5 documents/month free", win: "pdfbro" },
  { feature: "Signup required", pdfbro: "Never", dochub: "Yes (Google account)", win: "pdfbro" },
  { feature: "Watermarks", pdfbro: "Never", dochub: "None", win: "tie" },
  { feature: "File size limit", pdfbro: "100 MB", dochub: "Not stated", win: "tie" },
  { feature: "Browser-based processing", pdfbro: "Yes (most tools)", dochub: "No — cloud-based", win: "pdfbro" },
  { feature: "Number of tools", pdfbro: "35+", dochub: "5+ (edit, sign, fill)", win: "pdfbro" },
  { feature: "Focus area", pdfbro: "PDF + Image tools", dochub: "Signing + form filling", win: "tie" },
  { feature: "Image tools", pdfbro: "Yes (15+ tools)", dochub: "No", win: "pdfbro" },
  { feature: "QR code generator", pdfbro: "Yes", dochub: "No", win: "pdfbro" },
  { feature: "E-signatures", pdfbro: "No", dochub: "Yes", win: "dochub" },
  { feature: "Collaboration", pdfbro: "No", dochub: "Yes (shared docs)", win: "dochub" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/dochub#webpage",
      url: "https://pdfbro.tech/vs/dochub",
      name: "PDFBro vs DocHub — Full Comparison 2026 | Which is Better?",
      headline: "PDFBro vs DocHub — Full Comparison 2026",
      description: "Full comparison of PDFBro and DocHub: features, limits, privacy, price. Find out which PDF tool is right for you.",
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
        { "@type": "ListItem", position: 2, name: "PDFBro vs DocHub", item: "https://pdfbro.tech/vs/dochub" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro better than DocHub?", acceptedAnswer: { "@type": "Answer", text: "It depends on your needs. PDFBro is better for PDF editing, conversion, and image processing with no signup and no limits. DocHub is better for document signing, form filling, and collaboration, but requires a Google account and limits free users to 5 documents per month." } },
        { "@type": "Question", name: "What is the difference between PDFBro and DocHub?", acceptedAnswer: { "@type": "Answer", text: "PDFBro is a general-purpose PDF and image processing tool with 35+ tools, browser-based processing, and no signup. DocHub specializes in document signing, form filling, and team collaboration, requiring a Google account for access." } },
        { "@type": "Question", name: "Does DocHub have a free plan like PDFBro?", acceptedAnswer: { "@type": "Answer", text: "DocHub offers a free tier but limits users to 5 documents per month and requires a Google account. PDFBro is completely free with no document limits and no signup required at all." } },
        { "@type": "Question", name: "Can PDFBro do e-signatures like DocHub?", acceptedAnswer: { "@type": "Answer", text: "No, PDFBro does not currently offer e-signature features. DocHub is purpose-built for signing, form filling, and document collaboration. For signing and form filling, DocHub is the better choice." } },
      ],
    },
  ],
};

export default function VsDocHub() {
  return (
    <>
      <Script id="jsonld-vs-dochub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs DocHub</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs DocHub — 2025 Comparison
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            DocHub is a Google-integrated document signing and form-filling platform. PDFBro is a general-purpose PDF and image processing tool with zero restrictions. Here&apos;s an honest side-by-side comparison.
          </p>

          <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid var(--border-subtle)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Feature</th>
                    <th className="px-5 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                    <th className="px-5 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>DocHub</th>
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
                      <td className="px-5 py-3 text-sm text-center" style={{ color: row.win === "dochub" ? "var(--accent-green)" : "var(--text-secondary)" }}>
                        <div className="flex items-center justify-center gap-1.5">
                          {row.win === "dochub" && <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                          {row.win === "pdfbro" && <XCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                          {row.dochub}
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
              { title: "Choose PDFBro if you…", items: ["Want general PDF tools (merge, split, convert)", "Need image processing tools too", "Prefer no signup and no document limits", "Value browser-based privacy"], color: "var(--accent-blue)" },
              { title: "Choose DocHub if you…", items: ["Need e-signatures and document signing", "Want form filling capabilities", "Need team collaboration on documents", "Are already in the Google ecosystem"], color: "#f97316" },
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
