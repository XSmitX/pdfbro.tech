import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, PenLine, Shield } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Free PDF Tools for Freelancers — Proposals, Invoices, Contracts | PDFBro",
  description: "Free PDF tools for freelancers. Create professional proposals, convert invoices to PDF, sign contracts, watermark portfolios, compress deliverables. No signup, no limits.",
  keywords: ["pdf tools for freelancers", "freelance pdf tools free", "create invoice pdf free", "sign freelance contract pdf", "watermark portfolio pdf free", "compress deliverables pdf", "free pdf tools for self employed"],
  alternates: { canonical: "https://pdfbro.tech/for/freelancers" },
  openGraph: {
    title: "Free PDF Tools for Freelancers — Proposals, Invoices, Contracts | PDFBro",
    description: "Free PDF tools for freelancers. Proposals, invoices, contracts, portfolios, deliverables. No signup, no limits. Professional output at zero cost.",
    url: "https://pdfbro.tech/for/freelancers",
    type: "website",
  },
} as Metadata;

const FREELANCERS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/freelancers#webpage",
      url: "https://pdfbro.tech/for/freelancers",
      name: "Free PDF Tools for Freelancers — Proposals, Invoices, Contracts | PDFBro",
      description: "Free PDF tools for freelancers. Create professional proposals, convert invoices to PDF, sign contracts, watermark portfolios, compress deliverables.",
      inLanguage: "en-US",
      datePublished: "2025-06-01",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      about: { "@id": "https://pdfbro.tech/#organization" },
      audience: { "@type": "Audience", audienceType: "Freelancers and Independent Contractors" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "For Freelancers", item: "https://pdfbro.tech/for/freelancers" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I create a professional freelance proposal as a PDF?", acceptedAnswer: { "@type": "Answer", text: "Write your proposal in any text editor, Google Docs, or Markdown. Use PDFBro's Text to PDF tool at pdfbro.tech/tools/text-to-pdf to convert it to a clean, professional PDF. The output is crisp, well-formatted, and ready to send to clients." } },
        { "@type": "Question", name: "How can I watermark my portfolio before sharing with prospective clients?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's Add Watermark tool at pdfbro.tech/tools/add-watermark to stamp your portfolio pages with CONFIDENTIAL, SAMPLE, your name, or your logo. Watermarks protect your work from being used without payment while still letting clients evaluate your quality." } },
        { "@type": "Question", name: "Can I sign freelance contracts electronically without paying for DocuSign?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's Sign PDF tool at pdfbro.tech/tools/sign-pdf lets you add electronic signatures to freelance contracts, NDAs, and SOWs for free. No per-document fees, no subscription, no user limits." } },
        { "@type": "Question", name: "How do I compress a large deliverable for client email?", acceptedAnswer: { "@type": "Answer", text: "Use PDFBro's Compress PDF tool at pdfbro.tech/tools/compress-pdf. If your final deliverable exceeds 25 MB, choose High compression. For client review copies, Medium compression preserves full visual fidelity at a smaller file size." } },
      ],
    },
  ],
};

const WORKFLOWS = [
  { title: "Text to PDF for Proposals & Quotes", desc: "Write your proposal or project quote in any text editor, paste it into PDFBro, and generate a clean, professional PDF instantly. Perfect for quick proposals and project estimates.", tool: "text-to-pdf", toolName: "Text to PDF" },
  { title: "Merge Deliverables & Reports", desc: "Combine multiple project files — reports, design mockups, invoices, timesheets — into a single client deliverable PDF. Arrange pages in logical order for one polished file.", tool: "merge-pdf", toolName: "Merge PDF" },
  { title: "Sign Contracts & NDAs", desc: "Sign client contracts, non-disclosure agreements, and statements of work electronically. Embed your signature directly into the PDF. Share with clients — they sign the same way for free.", tool: "sign-pdf", toolName: "Sign PDF" },
  { title: "Watermark Portfolio & Drafts", desc: "Protect your work by adding CONFIDENTIAL, DRAFT, SAMPLE, or your name as a watermark across portfolio pages. Control opacity and position before sharing with prospects.", tool: "add-watermark", toolName: "Add Watermark" },
  { title: "Compress for Email Delivery", desc: "Shrink large deliverables to fit within Gmail's 25 MB limit or client email server restrictions. High compression for final delivery, Medium for review copies.", tool: "compress-pdf", toolName: "Compress PDF" },
  { title: "Fill Client Intake Forms", desc: "Complete client onboarding forms, project briefs, and tax forms (W-9, W-8BEN) directly in your browser. Type into PDF form fields — no printing, no scanning.", tool: "fill-pdf-form", toolName: "Fill PDF Form" },
  { title: "Protect Invoices with Passwords", desc: "Password-protect sensitive financial documents — invoices with banking details, tax documents, rate sheets — before emailing. AES-256 encryption keeps data secure.", tool: "protect-pdf", toolName: "Protect PDF" },
  { title: "QR Code for Portfolio & Contact", desc: "Generate a QR code linking to your online portfolio, Behance, Dribbble, GitHub, or LinkedIn. Add it to proposals and invoices — clients scan and see your work instantly.", tool: "qr-code-generator", toolName: "QR Code Generator" },
];

export default function ForFreelancersPage() {
  return (
    <>
      <Script id="jsonld-for-freelancers" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FREELANCERS_JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />

      {/* Hero */}
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/for/business" className="hover:underline">For Business</Link> / <span>For Freelancers</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <PenLine className="h-8 w-8" style={{ color: "var(--accent-orange)" }} />
            <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Free PDF Tools for Freelancers &amp; Solopreneurs
            </h1>
          </div>
          <p className="text-base max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
            As a freelancer, you wear every hat — sales, operations, accounting, delivery. PDFBro streamlines the document side of your business so you spend less time on admin and more time doing billable work. Proposals, invoices, contracts, portfolios — all free, all in your browser.
          </p>
          <p className="text-sm max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
            The average freelancer spends $40–$100/month on software tools (Adobe, DocuSign, invoicing apps). PDFBro covers 6+ of those tools for $0/month — that's $480–$1,200 back in your pocket every year.
          </p>
          <div className="rounded-2xl p-4 flex items-start gap-3 max-w-xl mb-6" style={{ backgroundColor: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)" }}>
            <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#f97316" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>IP Protection:</strong> PDFBro processes files locally in your browser. Your portfolio work, client contracts, and financial documents never leave your device — keeping your creative IP secure and client data confidential.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["No signup required", "No daily limits", "No watermarks on output", "Browser-based privacy", "All tools free forever"].map((badge) => (
              <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "var(--accent-orange)", border: "1px solid rgba(249,115,22,0.2)" }}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>8 Freelance Workflows — All Free</h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Every document a freelancer needs — from pitch to payment — covered in one place.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {WORKFLOWS.map((w) => (
              <Link key={w.tool} href={`/tools/${w.tool}`}
                className="group rounded-2xl p-5 flex items-start gap-4 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{w.title}</p>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{w.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: "var(--accent-orange)" }}>Use {w.toolName} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why PDFBro for Freelancers */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Why PDFBro Is Built for Freelancers</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "💰", title: "Cut Your Software Stack Costs", desc: "Freelancers typically pay for Adobe Acrobat ($19.99/mo), DocuSign ($10/mo), Canva Pro ($13/mo), and an invoicing app ($10/mo). PDFBro replaces the PDF, e-signature, watermark, and compression functions of all four — saving $40+/month with zero compromise." },
              { icon: "🔒", title: "Client Confidentiality Built In", desc: "When you handle client documents — NDAs, contracts, sensitive briefs — you cannot risk uploading them to cloud services. PDFBro processes everything locally in your browser. Your client's confidential information never leaves your computer." },
              { icon: "⚙️", title: "No Setup, No Learning Curve", desc: "You did not become a freelancer to learn enterprise software. PDFBro tools work exactly how you expect — upload a file, get a result, download it. No tutorials, no account creation, no feature overwhelm. Thirty seconds from page load to finished document." },
              { icon: "💼", title: "Professional Output That Wins Clients", desc: "Clients judge your professionalism by every touchpoint. A crisp PDF proposal with a QR code to your portfolio signals competence. Watermarked work samples show you value your IP. Clean invoices with proper formatting get paid faster." },
              { icon: "🌐", title: "Works With Your Global Client Base", desc: "Freelancers work with clients worldwide. PDFBro supports passport photo sizes for 25+ countries, OCR for multi-language documents, and PDF tools that work in any browser, any device, anywhere. No geo-restrictions." },
              { icon: "♾️", title: "Scale Without Scaling Costs", desc: "Your PDF tool costs do not increase when your client base grows. Process 10 proposals today, 50 tomorrow, 200 next month — PDFBro stays free with no usage caps. Unlike per-document pricing models, your document volume is never penalized." },
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

      {/* Freelancer Workflow Examples */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Your Freelance Document Workflow: Pitch to Payment</h2>
          <div className="space-y-4">
            {[
              {
                title: "Winning the Client: Proposal & Portfolio",
                desc: "Write your proposal in any text editor. Convert to a clean PDF with Text to PDF. Merge your portfolio samples and case studies with Merge PDF. Add a QR code linking to your full online portfolio. Add a DRAFT or CONFIDENTIAL watermark before sharing. Compress the final proposal under 10 MB for email.",
                tools: ["text-to-pdf", "merge-pdf", "qr-code-generator", "add-watermark", "compress-pdf"],
              },
              {
                title: "Starting Work: Contract & Onboarding",
                desc: "Client sends the NDA and contract as PDFs. You sign them electronically with Sign PDF — no printing, no scanning. Client does the same. Fill out client intake forms (brief, brand guidelines, tax W-9) with Fill PDF Form. Protect all signed documents with a password using Protect PDF.",
                tools: ["sign-pdf", "fill-pdf-form", "protect-pdf"],
              },
              {
                title: "Delivering Work: Final Assets & Invoice",
                desc: "Your final deliverables are ready. Merge multiple files into one delivery PDF. Compress under 25 MB for Gmail. Convert your invoice text to PDF with Text to PDF. Merge the invoice with timesheets using Merge PDF. Password-protect the invoice before sending.",
                tools: ["merge-pdf", "compress-pdf", "text-to-pdf", "protect-pdf"],
              },
            ].map((wf) => (
              <div key={wf.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{wf.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{wf.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {wf.tools.map((slug) => (
                    <Link key={slug} href={`/tools/${slug}`} className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--accent-orange)", border: "1px solid var(--border-subtle)" }}>
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
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Freelancers Ask</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Can I use PDFBro for client work without violating confidentiality?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes. PDFBro is actually better for client confidentiality than cloud-based tools because files process in your browser. Your client's NDAs, contracts, brand assets, and deliverables never upload to a server. You maintain full control of client data throughout the project lifecycle — no third party stores or analyzes their documents.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>How do I create invoices as PDFs without an invoicing app?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Write your invoice in any text editor or Google Docs with your branding. Use Text to PDF to convert it to a clean, professional PDF. Use Protect PDF to password-protect it before emailing. For recurring clients, save your invoice template as a fillable PDF — just update amounts and dates each billing cycle.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>How do I watermark my work samples before sharing?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Use PDFBro's Add Watermark tool. Before sending portfolio samples to a prospect, add a semi-transparent SAMPLE watermark with your name across all pages. Use 30–50% opacity so they can evaluate quality but cannot use the work. Once the contract is signed, send clean, unwatermarked versions.</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Is electronic contract signing with PDFBro legally valid?</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>Yes, electronic signatures added via PDFBro's Sign PDF tool are legally valid under the ESIGN Act (US) and eIDAS (EU). The signature is embedded directly into the PDF. While lacking the advanced audit trail of dedicated platforms like DocuSign, it is legally sufficient for most freelance contracts, NDAs, and SOWs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Run your freelance business with professional tools at zero cost.</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>No signup. No limits. No software budget. Start now.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/tools/text-to-pdf" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-orange), var(--accent-amber))" }}>
              Create a Proposal PDF <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tools" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Browse All Tools →
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
