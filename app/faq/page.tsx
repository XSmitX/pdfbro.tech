import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro FAQ — Frequently Asked Questions | Free PDF Tools",
  description: "Answers to the most common questions about PDFBro — limits, privacy, file safety, supported formats, and how tools work.",
  keywords: ["pdfbro faq", "pdfbro questions", "is pdfbro safe", "pdfbro free limits", "pdfbro privacy", "pdfbro how it works"],
  alternates: { canonical: "https://pdfbro.tech/faq" },
} as Metadata;

const FAQS = [
  { section: "Pricing & Limits", items: [
    { q: "Is PDFBro really free?", a: "Yes, completely free. All tools are free to use without any payment, subscription, or upgrade required. There are no hidden limits for standard use." },
    { q: "Are there daily usage limits?", a: "No. PDFBro has no daily task limits, no hourly caps, and no file quotas. You can process 100 files in one session if needed." },
    { q: "Will PDFBro add watermarks to my files?", a: "Never. PDFBro does not add any watermarks, logos, or branding to any output file — ever." },
    { q: "Is there a premium plan?", a: "No. PDFBro has no premium tier. Everything is free forever. We don't use a watermark-to-upgrade strategy." },
  ]},
  { section: "Privacy & Security", items: [
    { q: "Are my files uploaded to PDFBro's servers?", a: "For most tools: No. PDFBro processes PDFs and images entirely in your browser using JavaScript. Your files never leave your device. Server-side tools (PDF to Word, PDF to Excel, Word to PDF, GIF/MP4 conversions) do upload files — these are processed on secure servers and deleted within 1 hour." },
    { q: "Is PDFBro safe for confidential documents?", a: "Yes, for browser-based tools. Your contract, tax return, or medical record never reaches any server. For server-side tools, files are transmitted over HTTPS and deleted immediately after processing." },
    { q: "Does PDFBro track what files I process?", a: "No. Browser-based tools process everything locally with zero server visibility. Server-side tools receive the file temporarily but don't log file contents." },
    { q: "Does PDFBro collect my data?", a: "We use privacy-respecting analytics to understand aggregate traffic (pages visited, browser type). We don't set tracking cookies, don't build user profiles, and don't sell data to advertisers." },
  ]},
  { section: "Technical Questions", items: [
    { q: "What file size limits does PDFBro have?", a: "Most PDF tools: up to 100 MB per file. Image tools: up to 20–30 MB per image. Server-side conversions: up to 50 MB. These limits apply per file, not per session." },
    { q: "Why does PDF to Word require uploading to a server?", a: "Accurate PDF to Word conversion requires document processing software that can't run in a browser. These tools use secure server-side processing with immediate file deletion." },
    { q: "Does PDFBro work on iPhone and Android?", a: "Yes. All PDFBro tools work in mobile browsers — Safari on iPhone, Chrome on Android. Upload from your Files app or Photos app directly." },
    { q: "What browsers are supported?", a: "All modern browsers: Chrome, Firefox, Safari, Edge. PDFBro uses standard Web APIs that work across all major browsers on desktop and mobile." },
    { q: "Can I use PDFBro offline?", a: "After the page loads, browser-based tools (merge, compress, sign, etc.) work without an internet connection. Server-based tools require connectivity." },
  ]},
  { section: "PDF Questions", items: [
    { q: "Can PDFBro handle password-protected PDFs?", a: "Some tools accept password-protected PDFs if you provide the password. To process a protected PDF with tools that don't support passwords, use Unlock PDF first." },
    { q: "Will merging PDFs reduce quality?", a: "No. PDFBro merges PDFs at the binary level without re-rendering content. Image quality, fonts, and layout are preserved exactly." },
    { q: "Can I edit existing text in a PDF?", a: "PDFBro's Edit PDF tool handles annotations (adding text, highlights, shapes). To change existing body text: convert to Word with PDF to Word, edit in Word or Google Docs, then convert back with Word to PDF." },
  ]},
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://pdfbro.tech/faq#faqpage",
      name: "PDFBro FAQ — Frequently Asked Questions",
      description: "Answers to the most common questions about PDFBro — limits, privacy, file safety, supported formats, and how tools work.",
      url: "https://pdfbro.tech/faq",
      inLanguage: "en-US",
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      mainEntity: FAQS.flatMap(s => s.items.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "FAQ", item: "https://pdfbro.tech/faq" },
      ],
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <Script id="jsonld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="minimal" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>FAQ</span>
          </div>
          <h1 className="text-3xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>Everything you need to know about PDFBro — privacy, limits, file safety, and how tools work.</p>

          <div className="space-y-10">
            {FAQS.map((section) => (
              <div key={section.section}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>{section.section}</h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.q} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl p-5 flex items-center justify-between gap-4" style={{ backgroundColor: "rgba(79,142,247,0.06)", border: "1px solid rgba(79,142,247,0.2)" }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Still have a question?</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>We read every message. Average response time under 24 hours.</p>
            </div>
            <Link href="/contact" className="flex-shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
