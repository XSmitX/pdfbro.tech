import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Best Free Alternatives to iLovePDF, Smallpdf & Adobe Acrobat | PDFBro",
  description:
    "PDFBro is the best free alternative to iLovePDF, Smallpdf, and Adobe Acrobat. No daily limits, no watermarks, browser-based. 100+ free PDF and image tools.",
  keywords: [
    "ilovepdf alternative free",
    "smallpdf alternative",
    "adobe acrobat alternative free",
    "free pdf tool alternative",
    "best free pdf tools",
    "ilovepdf replacement no limits",
    "smallpdf no daily limit alternative",
    "free online pdf editor no signup",
    "best free pdf merger",
    "best free pdf compressor",
    "best pdf tools free 2026",
  ],
  alternates: { canonical: "https://pdfbro.tech/alternatives" },
  openGraph: {
    title: "Best Free Alternatives to iLovePDF, Smallpdf & Adobe Acrobat",
    description: "PDFBro: 100+ free PDF tools. No limits, no watermarks, no signup. The best replacement for iLovePDF, Smallpdf, and Adobe Acrobat.",
    url: "https://pdfbro.tech/alternatives",
    type: "article",
    publishedTime: "2025-05-01T00:00:00Z",
    modifiedTime: "2026-05-23T00:00:00Z",
  },
};

const ALTERNATIVES = [
  {
    competitor: "iLovePDF",
    why: "iLovePDF free tier limits users to 2 tasks per hour and uploads all files to its servers.",
    pdfbro_advantage: "PDFBro has no task limits, no hourly caps, and processes most files in your browser for full privacy.",
    tools: ["merge-pdf", "compress-pdf", "split-pdf", "pdf-to-word", "sign-pdf"],
    toolNames: ["Merge PDF", "Compress PDF", "Split PDF", "PDF to Word", "Sign PDF"],
    comparison: "/vs/ilovepdf",
    guide: "/guides/ilovepdf-alternative",
    color: "#ef4444",
  },
  {
    competitor: "Smallpdf",
    why: "Smallpdf restricts free users to 2 tasks per hour, limits file sizes to 15 MB on the free tier, and has a paid subscription from $9/month.",
    pdfbro_advantage: "PDFBro has no daily or hourly limits, supports 100 MB files for free, and costs nothing — ever.",
    tools: ["compress-pdf", "pdf-to-word", "merge-pdf", "word-to-pdf", "pdf-to-excel"],
    toolNames: ["Compress PDF", "PDF to Word", "Merge PDF", "Word to PDF", "PDF to Excel"],
    comparison: "/vs/smallpdf",
    guide: "/guides/smallpdf-alternative",
    color: "#f97316",
  },
  {
    competitor: "Adobe Acrobat Pro",
    why: "Adobe Acrobat Pro costs $19.99/month ($240/year). Most users only need basic PDF operations occasionally.",
    pdfbro_advantage: "PDFBro covers 90%+ of typical Acrobat use cases for everyday users — merge, compress, convert, sign, OCR, protect — all free.",
    tools: ["pdf-to-word", "compress-pdf", "sign-pdf", "protect-pdf", "ocr-pdf"],
    toolNames: ["PDF to Word", "Compress PDF", "Sign PDF", "Protect PDF", "OCR PDF"],
    comparison: "/vs/adobe-acrobat",
    guide: "/guides/adobe-acrobat-alternative-free",
    color: "#ef4444",
  },
  {
    competitor: "Sejda PDF",
    why: "Sejda PDF free tier limits 3 tasks per hour and files to 50 MB or 200 pages.",
    pdfbro_advantage: "PDFBro has no task limit and supports 100 MB files. No account required for any tool.",
    tools: ["merge-pdf", "split-pdf", "compress-pdf", "edit-pdf"],
    toolNames: ["Merge PDF", "Split PDF", "Compress PDF", "Edit PDF"],
    comparison: null,
    guide: null,
    color: "#8b5cf6",
  },
  {
    competitor: "PDF2Go",
    why: "PDF2Go uploads all files to its servers and has a limited free tier with file size restrictions.",
    pdfbro_advantage: "PDFBro processes most files in your browser — files never leave your device. More private and faster.",
    tools: ["compress-pdf", "pdf-to-word", "rotate-pdf", "unlock-pdf"],
    toolNames: ["Compress PDF", "PDF to Word", "Rotate PDF", "Unlock PDF"],
    comparison: null,
    guide: null,
    color: "#0ea5e9",
  },
];

const COMPARISON_TABLE = [
  { feature: "Price", pdfbro: "100% Free", ilovepdf: "Free (limited)", smallpdf: "Free (limited)", acrobat: "$20/month" },
  { feature: "Daily limit", pdfbro: "None", ilovepdf: "2/hour", smallpdf: "2/hour", acrobat: "No limit" },
  { feature: "File upload privacy", pdfbro: "Browser-based*", ilovepdf: "Server upload", smallpdf: "Server upload", acrobat: "Cloud upload" },
  { feature: "Watermarks", pdfbro: "Never", ilovepdf: "None", smallpdf: "Sometimes", acrobat: "None" },
  { feature: "Signup required", pdfbro: "Never", ilovepdf: "Optional", smallpdf: "Optional", acrobat: "Required" },
  { feature: "Number of tools", pdfbro: "100+", ilovepdf: "25+", smallpdf: "20+", acrobat: "30+" },
  { feature: "Image tools", pdfbro: "Yes (15+)", ilovepdf: "No", smallpdf: "No", acrobat: "No" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/alternatives#webpage",
      url: "https://pdfbro.tech/alternatives",
      name: "Best Free Alternatives to iLovePDF, Smallpdf & Adobe Acrobat | PDFBro",
      headline: "Best Free Alternatives to iLovePDF, Smallpdf & Adobe Acrobat (2026)",
      description: "PDFBro is the best free alternative to iLovePDF, Smallpdf, and Adobe Acrobat. No daily limits, no watermarks, browser-based. 100+ free PDF tools.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: "2026-05-23",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      author: { "@id": "https://pdfbro.tech/#organization" },
      publisher: { "@id": "https://pdfbro.tech/#organization" },
      image: { "@type": "ImageObject", url: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png" },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".page-intro", "h2"] },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "Alternatives", item: "https://pdfbro.tech/alternatives" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best free alternative to iLovePDF?",
          acceptedAnswer: { "@type": "Answer", text: "PDFBro is the best free alternative to iLovePDF. It offers the same core tools (merge PDF, compress PDF, PDF to Word) with no daily task limits (iLovePDF restricts free users to 2 tasks/hour), no watermarks, browser-based processing for privacy, and 100+ additional tools including image tools that iLovePDF doesn't offer." },
        },
        {
          "@type": "Question",
          name: "What is the best free alternative to Smallpdf?",
          acceptedAnswer: { "@type": "Answer", text: "PDFBro is the best free alternative to Smallpdf. Unlike Smallpdf which limits free users to 2 tasks per hour and 15 MB files, PDFBro has no usage limits and supports 100 MB files, all completely free with no signup required." },
        },
        {
          "@type": "Question",
          name: "What is the best free alternative to Adobe Acrobat?",
          acceptedAnswer: { "@type": "Answer", text: "PDFBro is the best free alternative to Adobe Acrobat for everyday PDF users. It covers 90%+ of common Acrobat tasks: merge, split, compress, convert to Word/Excel/PowerPoint, sign, protect, OCR, and edit PDFs — all completely free vs Acrobat's $20/month subscription." },
        },
        {
          "@type": "Question",
          name: "Is PDFBro really free with no limits?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro is genuinely free with no daily limits, no task caps, no file quotas, and no hidden fees. There is no premium tier. All 100+ tools are free forever." },
        },
        {
          "@type": "Question",
          name: "Does PDFBro upload my files to servers?",
          acceptedAnswer: { "@type": "Answer", text: "For most tools, no. PDFBro processes PDFs and images entirely within your web browser using JavaScript — files never leave your device. A small number of advanced conversions (PDF to Word, PDF to Excel, etc.) use secure server processing, and those files are deleted within 1 hour." },
        },
      ],
    },
  ],
};

export default function AlternativesPage() {
  return (
    <>
      <Script id="jsonld-alternatives" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />

      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">

          {/* Breadcrumb */}
          <div className="mb-5 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Alternatives</span>
          </div>

          {/* Hero */}
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Best Free Alternatives to iLovePDF, Smallpdf &amp; Adobe Acrobat
          </h1>
          <p className="page-intro text-base max-w-3xl mb-3" style={{ color: "var(--text-secondary)" }}>
            PDFBro is a completely free, browser-based alternative to the most popular PDF tools online. Unlike iLovePDF (2 tasks/hour), Smallpdf (daily cap), and Adobe Acrobat ($20/month), PDFBro has <strong style={{ color: "var(--text-primary)" }}>no daily limits, no watermarks, and requires no signup</strong> — for all 100+ tools.
          </p>
          <div className="flex flex-wrap gap-2 mb-12">
            {["No Daily Limits", "No Watermarks", "No Signup", "100% Free Forever", "Browser-Based Privacy"].map((b) => (
              <span key={b} className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "rgba(52,211,153,0.10)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>
                ✓ {b}
              </span>
            ))}
          </div>

          {/* Comparison Table */}
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              PDFBro vs iLovePDF vs Smallpdf vs Adobe Acrobat
            </h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Feature</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--accent-blue)" }}>PDFBro</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--text-muted)" }}>iLovePDF</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--text-muted)" }}>Smallpdf</th>
                      <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-center" style={{ color: "var(--text-muted)" }}>Acrobat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_TABLE.map((row) => (
                      <tr key={row.feature} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                        <td className="px-5 py-3 font-medium" style={{ color: "var(--text-primary)" }}>{row.feature}</td>
                        <td className="px-5 py-3 text-center font-semibold" style={{ color: "var(--accent-green)" }}>{row.pdfbro}</td>
                        <td className="px-5 py-3 text-center" style={{ color: "var(--text-secondary)" }}>{row.ilovepdf}</td>
                        <td className="px-5 py-3 text-center" style={{ color: "var(--text-secondary)" }}>{row.smallpdf}</td>
                        <td className="px-5 py-3 text-center" style={{ color: "var(--text-secondary)" }}>{row.acrobat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              * PDFBro processes files in your browser for most tools. Server-side tools (PDF to Word etc.) delete files within 1 hour.
            </p>
          </section>

          {/* Per-competitor sections */}
          <div className="space-y-10 mb-14">
            {ALTERNATIVES.map((alt) => (
              <section key={alt.competitor} className="rounded-2xl p-7" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: alt.color }}>
                    {alt.competitor[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      PDFBro as a Free {alt.competitor} Alternative
                    </h2>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mb-5">
                  <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#ef4444" }}>Problem with {alt.competitor}</p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{alt.why}</p>
                  </div>
                  <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--accent-green)" }}>Why PDFBro is Better</p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{alt.pdfbro_advantage}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {alt.toolNames.map((name, i) => (
                    <Link key={name} href={`/tools/${alt.tools[i]}`}
                      className="rounded-xl px-3 py-1.5 text-xs font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: `${alt.color}10`, color: alt.color, border: `1px solid ${alt.color}25` }}>
                      {name} →
                    </Link>
                  ))}
                </div>

                <div className="flex gap-3 flex-wrap">
                  {alt.comparison && (
                    <Link href={alt.comparison} className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
                      style={{ color: "var(--accent-blue)" }}>
                      <ArrowRight className="h-3.5 w-3.5" />
                      Full comparison: PDFBro vs {alt.competitor}
                    </Link>
                  )}
                  {alt.guide && (
                    <Link href={alt.guide} className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
                      style={{ color: "var(--accent-blue)" }}>
                      <ArrowRight className="h-3.5 w-3.5" />
                      {alt.competitor} alternative guide
                    </Link>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Why PDFBro summary */}
          <section className="mb-14 rounded-2xl p-7" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Why PDFBro is the Best Free PDF Tool
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "No daily limits — ever", body: "Unlike iLovePDF (2/hour) and Smallpdf (2/hour), PDFBro has zero usage caps. Process 100 files in one session." },
                { title: "Files never leave your device", body: "Most tools run 100% in your browser. Your contracts, tax returns, and photos never touch a server." },
                { title: "No watermarks on any output", body: "PDFBro never stamps, brands, or watermarks your files. What you download is exactly what you processed." },
                { title: "100+ tools in one place", body: "PDF tools AND image tools — more than any competitor's free tier. Merge, compress, convert, compress images, HEIC to JPG, remove backgrounds." },
                { title: "No subscription, no paywall", body: "There is no premium tier. PDFBro is not 'free with limits and paid for more'. It is just free." },
                { title: "Works on all devices", body: "All tools work in any modern browser on desktop, phone, and tablet. No app download required." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-base mb-4 font-semibold" style={{ color: "var(--text-primary)" }}>
              Try PDFBro — 100+ free tools, no signup, no limits
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/pdf-tools" className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
                Free PDF Tools <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/image-tools" className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Free Image Tools →
              </Link>
              <Link href="/tools" className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                All 100+ Tools →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
