import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro vs Adobe Acrobat — Free Alternative to $20/Month Acrobat",
  description: "Compare PDFBro vs Adobe Acrobat Pro. 90% of Acrobat's daily use cases covered for free. No $239/year subscription needed for standard PDF tasks.",
  keywords: ["pdfbro vs adobe acrobat", "free adobe acrobat alternative", "acrobat replacement free", "acrobat too expensive alternative", "adobe pdf editor free alternative"],
  alternates: { canonical: "https://pdfbro.tech/vs/adobe-acrobat" },
} as Metadata;

const TASKS = [
  { task: "Merge PDFs", pdfbro: true, acrobat: true },
  { task: "Split/Extract pages", pdfbro: true, acrobat: true },
  { task: "Compress PDF", pdfbro: true, acrobat: true },
  { task: "Annotate & highlight", pdfbro: true, acrobat: true },
  { task: "Fill PDF forms", pdfbro: true, acrobat: true },
  { task: "Sign documents", pdfbro: true, acrobat: true },
  { task: "Password protect", pdfbro: true, acrobat: true },
  { task: "PDF to Word/Excel", pdfbro: true, acrobat: true },
  { task: "OCR scanned PDFs", pdfbro: true, acrobat: true },
  { task: "Edit existing body text", pdfbro: false, acrobat: true },
  { task: "Create fillable forms", pdfbro: false, acrobat: true },
  { task: "Redact sensitive content", pdfbro: false, acrobat: true },
  { task: "PDF/A archival compliance", pdfbro: false, acrobat: true },
  { task: "Preflight for print", pdfbro: false, acrobat: true },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "Article"],
      "@id": "https://pdfbro.tech/vs/adobe-acrobat#webpage",
      url: "https://pdfbro.tech/vs/adobe-acrobat",
      name: "PDFBro vs Adobe Acrobat — Free Alternative Comparison 2026",
      headline: "PDFBro vs Adobe Acrobat — Free Alternative Comparison 2026",
      description: "PDFBro covers 90% of typical Adobe Acrobat use cases for free. Compare features, price, privacy.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: "2026-05-23",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      author: { "@id": "https://pdfbro.tech/#organization" },
      publisher: { "@id": "https://pdfbro.tech/#organization" },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "PDFBro vs Adobe Acrobat", item: "https://pdfbro.tech/vs/adobe-acrobat" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro a good free alternative to Adobe Acrobat?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro covers 90%+ of typical Acrobat daily use cases including merge, split, compress, convert, sign, protect, OCR, and edit PDFs — all completely free, no $20/month subscription required." } },
        { "@type": "Question", name: "What can PDFBro do that Adobe Acrobat does?", acceptedAnswer: { "@type": "Answer", text: "PDFBro can merge PDFs, compress PDFs, convert PDF to Word/Excel/PowerPoint, add electronic signatures, password protect PDFs, run OCR on scanned PDFs, edit and annotate PDFs, and fill PDF forms — all the most common Acrobat tasks, free." } },
        { "@type": "Question", name: "What can Adobe Acrobat do that PDFBro cannot?", acceptedAnswer: { "@type": "Answer", text: "Adobe Acrobat has capabilities PDFBro lacks: editing existing body text in-place, creating fillable forms from scratch, redacting sensitive content, PDF/A archival compliance, and print preflight. For these advanced features, Acrobat Pro is necessary." } },
        { "@type": "Question", name: "How much does Adobe Acrobat cost vs PDFBro?", acceptedAnswer: { "@type": "Answer", text: "Adobe Acrobat Pro costs $19.99/month ($239.88/year). PDFBro is 100% free with no subscription, no hidden fees, and no premium tier." } },
      ],
    },
  ],
};

export default function VsAdobeAcrobat() {
  const freeCount = TASKS.filter(t => t.pdfbro).length;
  return (
    <>
      <Script id="jsonld-vs-acrobat" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>PDFBro vs Adobe Acrobat</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro vs Adobe Acrobat — Free Alternative to $20/Month
          </h1>
          <p className="text-base mb-3" style={{ color: "var(--text-secondary)" }}>
            Adobe Acrobat Pro costs $239.88/year ($19.99/month). For most people, that&apos;s paying for features they use 3% of the time. PDFBro covers the 97% of tasks most users actually need — for free.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-10" style={{ backgroundColor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
            <CheckCircle2 className="h-4 w-4" style={{ color: "var(--accent-green)" }} />
            <span className="text-sm font-semibold" style={{ color: "var(--accent-green)" }}>{freeCount} of {TASKS.length} common Acrobat tasks — free on PDFBro</span>
          </div>

          <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid var(--border-subtle)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>PDF Task</th>
                  <th className="px-4 py-3 text-xs font-bold text-center" style={{ color: "var(--accent-blue)" }}>PDFBro (Free)</th>
                  <th className="px-4 py-3 text-xs font-semibold text-center" style={{ color: "var(--text-muted)" }}>Adobe Acrobat ($20/mo)</th>
                </tr>
              </thead>
              <tbody>
                {TASKS.map((row) => (
                  <tr key={row.task} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <td className="px-5 py-2.5 text-sm" style={{ color: "var(--text-primary)" }}>{row.task}</td>
                    <td className="px-4 py-2.5 text-center">
                      {row.pdfbro ? <CheckCircle2 className="h-4 w-4 mx-auto" style={{ color: "var(--accent-green)" }} /> : <span className="text-xs" style={{ color: "var(--text-muted)" }}>—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <CheckCircle2 className="h-4 w-4 mx-auto" style={{ color: "var(--accent-green)" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>When to Still Use Adobe Acrobat</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Acrobat Pro is worth paying for if you: (1) need to edit existing body text directly in complex PDFs, (2) create interactive forms from scratch, (3) need legally-compliant PDF/A archival, (4) do professional print preflighting, or (5) need Acrobat Sign&apos;s audit trail for high-value contracts. For everyone else, PDFBro handles the job for free.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/tools" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Try PDFBro Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/guides/adobe-acrobat-alternative-free" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Full Acrobat Alternative Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
