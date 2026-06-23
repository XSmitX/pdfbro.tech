import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

export const metadata: Metadata = {
  title: "Compress PDF for Email — Free Online, Under 25MB Instantly | PDFBro",
  description: "Compress PDF for email attachment free — reduce to under 25MB for Gmail, 20MB for Outlook, or 10MB for corporate email. No signup, instant compression.",
  keywords: [
    "compress pdf for email attachment free",
    "compress pdf for email",
    "reduce pdf size for email free",
    "compress pdf for gmail attachment",
    "compress pdf for outlook",
    "pdf too large for email how to compress",
    "compress pdf to send via email free",
    "reduce pdf file size for email no signup",
  ],
  alternates: { canonical: "https://pdfbro.tech/compress-pdf-for-email" },
  openGraph: {
    title: "Compress PDF for Email — Free Online, Under 25MB Instantly | PDFBro",
    description: "Compress PDF for email attachment free. Reduce to under 25MB for Gmail, 20MB for Outlook. No signup, instant download.",
    url: "https://pdfbro.tech/compress-pdf-for-email",
    type: "website",
  },
};

export default function CompressPdfForEmailPage() {
  return (
    <>
      <Script id="jsonld-compress-pdf-email" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://pdfbro.tech/compress-pdf-for-email#webpage",
            url: "https://pdfbro.tech/compress-pdf-for-email",
            name: "Compress PDF for Email — Free Online, Under 25MB Instantly",
            description: "Compress PDF for email attachment free — reduce to under 25MB for Gmail, 20MB for Outlook, 10MB for corporate email. No signup, instant.",
            inLanguage: "en-US",
            dateModified: "2026-06-23",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            breadcrumb: { "@id": "https://pdfbro.tech/compress-pdf-for-email#breadcrumb" },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://pdfbro.tech/compress-pdf-for-email#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${BASE_URL}/pdf-tools` },
              { "@type": "ListItem", position: 3, name: "Compress PDF for Email", item: "https://pdfbro.tech/compress-pdf-for-email" },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": "https://pdfbro.tech/compress-pdf-for-email#faq",
            mainEntity: [
              { "@type": "Question", name: "What size PDF can I send through Gmail?", acceptedAnswer: { "@type": "Answer", text: "Gmail allows email attachments up to 25 MB. If your PDF exceeds 25 MB, Gmail automatically uploads it to Google Drive and sends a link instead. To send as a direct attachment, compress your PDF to under 25 MB using PDFBro's free compression tool — most files reduce by 60-80%." } },
              { "@type": "Question", name: "What's the maximum attachment size for Outlook?", acceptedAnswer: { "@type": "Answer", text: "Outlook.com caps email attachments at 20 MB. Microsoft 365 / Exchange accounts may have limits between 10-150 MB depending on admin settings. For guaranteed delivery, compress your PDF to under 10 MB — this works across Gmail, Outlook, Yahoo Mail, and corporate email servers." } },
              { "@type": "Question", name: "How fast does PDFBro compress PDFs for email?", acceptedAnswer: { "@type": "Answer", text: "Most PDFs compress in under 5 seconds. PDFBro processes entirely in your browser using JavaScript — no upload wait time, no server queue. Just drag, compress, and download instantly. Even 100 MB files compress in under 15 seconds." } },
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
            <span style={{ color: "var(--text-secondary)" }}>Compress PDF for Email</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Compress PDF for Email — Free Online, Under 25MB Instantly
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            You&apos;re about to hit Send when Gmail blocks your attachment — &quot;File too large.&quot; Or worse, Outlook bounces your client&apos;s proposal before they even see it. PDFBro&apos;s compress PDF for email tool reduces your file size instantly so it fits under any email provider&apos;s limit. Whether you need under 25MB for Gmail, 20MB for Outlook, or 10MB for corporate Exchange servers, our compression handles it in seconds — with no signup and zero watermarks.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Most PDF compression tools upload your file to a server — slow, privacy-invasive, and capped with daily limits. PDFBro compresses entirely in your browser. Your PDF never leaves your device, and there are no usage caps.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Browser-Based</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "var(--accent-orange)", border: "1px solid rgba(245,158,11,0.2)" }}>Works Offline</span>
          </div>

          <Link
            href="/tools/compress-pdf"
            className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Compress PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Reduce PDF size by up to 90% — Low, Medium, or High compression. Perfect for email attachments.</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Compress Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Compress PDF for Email — 3 Steps</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your PDF", desc: "Click to upload or drag your oversized PDF into the compression tool. Works with files up to 100 MB — no signup, no email, no registration." },
                { step: 2, title: "Choose compression level", desc: "Select Low (best quality, ~30% reduction), Medium (balanced, ~60% reduction), or High (smallest file, ~80%+ reduction). For email, Medium usually hits the sweet spot." },
                { step: 3, title: "Download and attach to email", desc: "Your compressed PDF downloads instantly. Check the file size — if it&apos;s still over your email limit, re-compress at a higher level. Then attach and send." },
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

          <section className="rounded-2xl p-6 mb-6 space-y-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Email Provider Attachment Limits</h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Each email provider enforces different attachment size limits. Here&apos;s what you need to know before sending:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { provider: "Gmail", limit: "25 MB", note: "Over 25 MB → sends Google Drive link instead" },
                { provider: "Outlook.com", limit: "20 MB", note: "Over 20 MB → upload to OneDrive, send link" },
                { provider: "Yahoo Mail", limit: "25 MB", note: "Same as Gmail — compress to under 25 MB" },
                { provider: "Corporate Exchange", limit: "10–25 MB", note: "Varies by admin settings; 10 MB is the safe universal limit" },
                { provider: "Apple iCloud", limit: "20 MB", note: "Over 20 MB → uses Mail Drop (link valid 30 days)" },
                { provider: "ProtonMail", limit: "25 MB", note: "Free plan; premium plans allow larger attachments" },
              ].map((item) => (
                <div key={item.provider} className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.provider}</p>
                    <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ backgroundColor: "rgba(79,142,247,0.12)", color: "var(--accent-blue)" }}>{item.limit}</span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Compress PDF for Email</h2>
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
                { q: "What size PDF can I send through Gmail?", a: "Gmail allows email attachments up to 25 MB. If your PDF exceeds 25 MB, Gmail automatically uploads it to Google Drive and sends a link instead. To send as a direct attachment, compress your PDF to under 25 MB using PDFBro&apos;s free compression tool — most files reduce by 60-80%." },
                { q: "What&apos;s the maximum attachment size for Outlook?", a: "Outlook.com caps email attachments at 20 MB. Microsoft 365 / Exchange accounts may have limits between 10-150 MB depending on admin settings. For guaranteed delivery, compress your PDF to under 10 MB — this works across Gmail, Outlook, Yahoo Mail, and corporate email servers." },
                { q: "How fast does PDFBro compress PDFs for email?", a: "Most PDFs compress in under 5 seconds. PDFBro processes entirely in your browser using JavaScript — no upload wait time, no server queue. Just drag, compress, and download instantly. Even 100 MB files compress in under 15 seconds." },
                { q: "Will compression reduce my PDF quality?", a: "At Low compression, quality loss is nearly invisible — text stays crisp, images retain detail. Medium compression reduces file size by about 60% with minimal visual impact. High compression is best for email when file size is the top priority and the PDF is for screen viewing, not printing." },
              ].map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/tools/compress-pdf" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Compress PDF for Email — Free &amp; Instant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
