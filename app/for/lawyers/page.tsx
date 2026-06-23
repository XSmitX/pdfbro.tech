import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Scale, Shield, Zap } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Free PDF Tools for Lawyers — Contracts, Evidence, Filings | PDFBro",
  description: "Free PDF tools for lawyers and legal professionals. Merge contracts, redact documents, OCR scanned evidence, sign filings, protect client documents. No signup, no limits.",
  keywords: ["pdf tools for lawyers", "legal pdf tools free", "merge legal documents pdf", "sign legal documents online free", "ocr legal documents", "redact pdf free", "pdf tools for law firms", "legal document management free", "free pdf tools attorneys"],
  alternates: { canonical: "https://pdfbro.tech/for/lawyers" },
  openGraph: {
    title: "Free PDF Tools for Lawyers — Contracts, Evidence, Filings | PDFBro",
    description: "Free PDF tools for legal professionals. Merge, redact, OCR, sign, and protect legal documents. No signup, no limits. Browser-based privacy.",
    url: "https://pdfbro.tech/for/lawyers",
    type: "website",
  },
} as Metadata;

const LAWYERS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/lawyers#webpage",
      url: "https://pdfbro.tech/for/lawyers",
      name: "Free PDF Tools for Lawyers — Contracts, Evidence, Filings | PDFBro",
      description: "Free PDF tools for lawyers and legal professionals. Merge contracts, redact documents, OCR scanned evidence, sign filings, protect documents.",
      inLanguage: "en-US",
      datePublished: "2025-06-01",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      about: { "@id": "https://pdfbro.tech/#organization" },
      audience: { "@type": "Audience", audienceType: "Legal Professionals" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "For Lawyers", item: "https://pdfbro.tech/for/lawyers" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro secure enough for legal documents?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most PDFBro tools process files entirely in your browser — your legal documents never leave your device. For server-side tools, files are encrypted via HTTPS and deleted within 1 hour. No document storage, no data retention. This is more secure than cloud-based PDF services that store and analyze your documents." } },
        { "@type": "Question", name: "Can I redact confidential information from legal PDFs with PDFBro?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's Edit PDF tool lets you permanently redact text, social security numbers, account numbers, and privileged information from legal documents. Unlike drawing a black box over text (which can be removed), PDFBro's redaction permanently removes the underlying text and replaces it with a black rectangle — safe for court filings and discovery." } },
        { "@type": "Question", name: "How do I OCR a scanned court document or discovery PDF?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's OCR PDF tool at pdfbro.tech/tools/ocr-pdf to make scanned legal documents text-searchable. Upload scanned court filings, discovery documents, or deposition transcripts and download a searchable PDF. Essential for e-discovery review and document management." } },
        { "@type": "Question", name: "Can PDFBro help with Bates numbering for legal documents?", acceptedAnswer: { "@type": "Answer", text: "PDFBro's PDF Page Numbers tool at pdfbro.tech/tools/pdf-page-numbers can add sequential page numbers to legal document sets. While not a dedicated Bates stamping tool (which adds prefixes and custom stamps), it provides basic sequential numbering for small to medium document sets at no cost." } },
      ],
    },
  ],
};

const WORKFLOWS = [
  { title: "Merge Contracts & Exhibits", desc: "Combine multiple contract versions, amendments, schedules, and exhibits into a single execution-ready PDF. Upload up to 20 files, arrange in order, and download the merged document in seconds.", tool: "merge-pdf", toolName: "Merge PDF" },
  { title: "Sign Agreements & Affidavits", desc: "Add electronic signatures to contracts, settlement agreements, NDAs, and affidavits. Signatures are embedded directly into the PDF and legally valid under the ESIGN Act and UETA.", tool: "sign-pdf", toolName: "Sign PDF" },
  { title: "OCR Scanned Discovery", desc: "Make scanned court filings, deposition transcripts, and evidence documents text-searchable. Essential for e-discovery review, privilege logs, and document management systems.", tool: "ocr-pdf", toolName: "OCR PDF" },
  { title: "Protect Client Filings", desc: "Password-protect confidential filings, pre-trial briefs, and client documents with AES-256 encryption. Send the password separately via secure channels for attorney-client communication.", tool: "protect-pdf", toolName: "Protect PDF" },
  { title: "Compress Evidence for E-filing", desc: "Many court e-filing systems impose file size limits (typically 10–35 MB). Compress large evidence PDFs and exhibits to meet filing system requirements without sacrificing readability.", tool: "compress-pdf", toolName: "Compress PDF" },
  { title: "Page Number Briefs & Motions", desc: "Add sequential page numbers to legal briefs, motions, and memorandum. Customize position, font size, and starting number. Most courts require paginated filings.", tool: "pdf-page-numbers", toolName: "PDF Page Numbers" },
  { title: "Extract Exhibits from Filings", desc: "Pull individual exhibits and attachments from multi-document filings. Extract a specific affidavit or schedule without splitting and re-saving the entire document.", tool: "extract-pdf-pages", toolName: "Extract PDF Pages" },
  { title: "Redact Privileged Information", desc: "Permanently remove confidential text, client names, social security numbers, and privileged content from documents before production. True redaction — not just a black overlay.", tool: "edit-pdf", toolName: "Edit PDF" },
];

export default function ForLawyersPage() {
  return (
    <>
      <Script id="jsonld-for-lawyers" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LAWYERS_JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />

      {/* Hero */}
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/for/business" className="hover:underline">For Business</Link> / <span>For Lawyers</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Scale className="h-8 w-8" style={{ color: "var(--accent-blue)" }} />
            <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Free PDF Tools for Lawyers &amp; Legal Professionals
            </h1>
          </div>
          <p className="text-base max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
            From solo practitioners to Big Law associates — every lawyer deals with PDFs daily. Merge contracts, redact privileged content, OCR scanned discovery, sign filings, protect confidential documents. PDFBro handles all of it for free, in your browser, with zero upload limits.
          </p>
          <p className="text-sm max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
            Replace expensive litigation support software and per-user Adobe Acrobat subscriptions ($19.99/month). PDFBro processes files on your device — your client&apos;s privileged documents never touch a third-party server.
          </p>
          <div className="rounded-2xl p-4 flex items-start gap-3 max-w-xl mb-6" style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
            <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>Attorney-Client Privilege Notice:</strong> PDFBro processes nearly all legal documents locally in your browser. Your contracts, evidence, and privileged communications never leave your device. This is critical for maintaining confidentiality obligations under ABA Model Rule 1.6.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["No signup required", "No daily limits", "Browser-based privacy", "No watermarks", "All tools free", "Attorney-ready"].map((badge) => (
              <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>8 Legal Workflows — All Free</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>From client intake to court filing, every step of legal document management covered.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {WORKFLOWS.map((w) => (
              <Link key={w.tool} href={`/tools/${w.tool}`}
                className="group rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{w.title}</p>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{w.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>Use {w.toolName} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why PDFBro for Lawyers */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Why PDFBro for Legal Work</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🔒", title: "Client Confidentiality First", desc: "Files process in your browser and never leave your device. Your privileged documents, settlement drafts, and client communications stay private — not stored, not analyzed, not shared. Essential for maintaining attorney-client privilege." },
              { icon: "⚡", title: "No IT Approval Needed", desc: "No software to install, no admin rights required, no procurement process. Works in any modern browser on firm-issued laptops. Bypass the 3-week IT approval queue and start processing legal documents immediately." },
              { icon: "💰", title: "Eliminate Per-User Licensing", desc: "Law firms typically pay $20–$50/user/month for PDF software. A 20-attorney firm saves $4,800–$12,000/year on PDF tools alone. All PDFBro tools are completely free for any number of users — unlimited firm-wide use." },
              { icon: "📄", title: "E-Filing Ready", desc: "Compress evidence to meet court filing size limits, add page numbers to briefs, merge exhibits, and OCR scanned documents. Every output is ready for PACER, CM/ECF, and state court e-filing systems." },
              { icon: "🛡️", title: "No Document Retention", desc: "Unlike cloud PDF services that retain your files for analysis, training AI models, or 'service improvement,' PDFBro deletes server-side files within 1 hour. Most tools never upload files at all — they stay on your device." },
              { icon: "♾️", title: "Unlimited Daily Use", desc: "No per-task fees, no daily caps, no 'premium' tier. Process 100 documents today and 500 tomorrow. Whether you're in trial prep or reviewing thousands of discovery documents, PDFBro never throttles your workflow." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Legal Workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Common Legal PDF Workflows</h2>
          <div className="space-y-4">
            {[
              {
                title: "Filing a Motion with Exhibits",
                desc: "Draft the motion in your word processor. Convert to PDF with Word to PDF. Number the pages with PDF Page Numbers. Merge all exhibits in order using Merge PDF. Compress the final filing under the court's size limit with Compress PDF. Protect with password before emailing to co-counsel.",
                tools: ["word-to-pdf", "pdf-page-numbers", "merge-pdf", "compress-pdf", "protect-pdf"],
              },
              {
                title: "Responding to Discovery Requests",
                desc: "OCR all scanned discovery documents with OCR PDF to make them searchable. Redact privileged information using Edit PDF (true redaction, not overlay). Extract only responsive documents with Extract PDF Pages. Compress the production set for secure file transfer.",
                tools: ["ocr-pdf", "edit-pdf", "extract-pdf-pages", "compress-pdf"],
              },
              {
                title: "Client Intake & Engagement",
                desc: "Client fills out intake forms with Fill PDF Form. Convert engagement letter from Word to PDF with Word to PDF. Merge the signed engagement letter, intake forms, and fee agreement with Merge PDF. Add the client's e-signature to the engagement letter with Sign PDF.",
                tools: ["fill-pdf-form", "word-to-pdf", "merge-pdf", "sign-pdf"],
              },
              {
                title: "Preparing a Trial Exhibit Binder",
                desc: "OCR all scanned exhibits for searchability. Add sequential exhibit numbering with PDF Page Numbers. Merge all exhibits into a single binder PDF. Compress for sharing with the court and opposing counsel. Protect with password before distribution.",
                tools: ["ocr-pdf", "pdf-page-numbers", "merge-pdf", "compress-pdf", "protect-pdf"],
              },
            ].map((wf) => (
              <div key={wf.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{wf.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{wf.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {wf.tools.map((slug) => (
                    <Link key={slug} href={`/tools/${slug}`} className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--accent-blue)", border: "1px solid var(--border-subtle)" }}>
                      {slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Lawyers Ask</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Is PDFBro compliant with data privacy regulations?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>PDFBro&apos;s browser-based processing model aligns with GDPR, CCPA, and other privacy regulations by minimizing data collection and transmission. For most tools, no personal data leaves the user&apos;s device. Server-side tools use encrypted transmission and immediate deletion. However, law firms should conduct their own compliance assessment.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Can I use PDFBro for e-discovery and document review?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>PDFBro supports key e-discovery workflows: OCR scanned documents for searchability, redact privileged content, extract specific pages, and compress production sets. For large-scale e-discovery (thousands of documents), dedicated platforms like Relativity or Logikcull are more appropriate.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Does PDFBro offer true redaction or just black overlays?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>PDFBro&apos;s Edit PDF tool performs true redaction — it permanently removes underlying text and replaces it with a black rectangle. This is safe for court filings and public record submissions. Always verify redactions by reopening the saved document and attempting to copy or search the redacted text.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Is this suitable for solo practitioners and small firms?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes. Solo practitioners and small firms benefit most from PDFBro because it eliminates per-user PDF software costs entirely. A solo attorney saving $240/year on Adobe Acrobat plus $120/year on e-signature tools effectively gets a $360/year operational cost reduction — with no sacrifice in document quality or functionality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Replace expensive legal PDF software today.</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>All tools free. No per-user pricing. No limits. Start now.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/guides/pdf-tools-for-business" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Business PDF Guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/security" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              <Shield className="h-4 w-4 inline mr-1" /> Security & Privacy →
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
