import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2, Shield, Zap } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pdfbro.tech/for/business#webpage",
      url: "https://pdfbro.tech/for/business",
      name: "Free PDF Tools for Business — Contracts, Invoices, Reports | PDFBro",
      description: "Free PDF tools for business teams. Sign contracts, protect invoices, compress reports, convert documents. No subscription, no per-user pricing, no limits.",
      inLanguage: "en-US",
      datePublished: "2025-05-01",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: { "@id": "https://pdfbro.tech/#website" },
      about: { "@id": "https://pdfbro.tech/#organization" },
      audience: { "@type": "Audience", audienceType: "Business" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfbro.tech" },
        { "@type": "ListItem", position: 2, name: "For Business", item: "https://pdfbro.tech/for/business" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is PDFBro free for business use?", acceptedAnswer: { "@type": "Answer", text: "Yes. All PDFBro tools are free for commercial and business use with no subscription, no per-user pricing, and no usage limits. Unlike Adobe Acrobat at $240/user/year or iLovePDF with per-task limits, PDFBro has zero cost for any business use." } },
        { "@type": "Question", name: "Can I use PDFBro to sign contracts?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's Sign PDF tool lets you add electronic signatures to contracts, NDAs, and agreements. Signatures are embedded directly into the PDF and are legally valid under the ESIGN Act. Processing happens in your browser for maximum confidentiality." } },
        { "@type": "Question", name: "Is PDFBro safe for confidential business documents?", acceptedAnswer: { "@type": "Answer", text: "Yes. Most PDFBro tools process files entirely in your browser — your documents never leave your device. For server-side tools (PDF to Word, PDF to Excel), files are encrypted in transit via HTTPS and deleted within 1 hour of processing. No document storage, no data retention." } },
        { "@type": "Question", name: "How does PDFBro compare to enterprise PDF solutions?", acceptedAnswer: { "@type": "Answer", text: "PDFBro covers 90% of daily business PDF tasks (merge, compress, convert, sign, protect, watermark) for free. Enterprise solutions like Adobe Acrobat Pro and Foxit offer advanced features like redaction, Bates numbering, and accessibility checking that PDFBro doesn't yet cover. For everyday PDF operations, PDFBro eliminates per-seat licensing costs completely." } },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Free PDF Tools for Business — Contracts, Invoices, Reports | PDFBro",
  description: "Free PDF tools for business teams. Sign contracts, protect invoices, compress reports, convert documents, add watermarks. No subscription, no per-user pricing, no limits. Works in browser.",
  keywords: ["free pdf tools for business", "pdf tools for business free", "sign contracts online free business", "compress pdf business", "pdf tools for teams", "business pdf editor free", "pdf converter for business", "free pdf tools commercial use", "protect pdf business", "watermark pdf business"],
  alternates: { canonical: "https://pdfbro.tech/for/business" },
  openGraph: {
    title: "Free PDF Tools for Business — No Subscription, No Limits | PDFBro",
    description: "Free PDF and image tools for business teams. Replace expensive per-seat software with a free, private, browser-based alternative.",
    url: "https://pdfbro.tech/for/business",
    type: "website",
  },
} as Metadata;

const WORKFLOWS = [
  { dept: "Finance", items: [{ title: "Compress PDF", desc: "Email-ready reports under 10 MB for client distribution and compliance archiving", slug: "compress-pdf" }, { title: "PDF to Excel", desc: "Extract invoice tables and financial data into spreadsheets for analysis", slug: "pdf-to-excel" }, { title: "Merge PDF", desc: "Combine monthly statements, receipts, and invoices into single files", slug: "merge-pdf" }, { title: "Protect PDF", desc: "Password-protect financial reports and statements before email distribution", slug: "protect-pdf" }] },
  { dept: "HR", items: [{ title: "Fill PDF Form", desc: "Complete onboarding, benefits, and compliance forms without Acrobat", slug: "fill-pdf-form" }, { title: "Sign PDF", desc: "E-sign offer letters, NDAs, and employment contracts with audit trail", slug: "sign-pdf" }, { title: "Word to PDF", desc: "Convert policy documents and handbooks to secure, non-editable PDFs", slug: "word-to-pdf" }, { title: "Extract PDF Pages", desc: "Pull individual employee documents from consolidated HR files", slug: "extract-pdf-pages" }] },
  { dept: "Sales", items: [{ title: "Add Watermark", desc: "Stamp DRAFT, CONFIDENTIAL, or pricing tiers on proposals before sharing", slug: "add-watermark" }, { title: "PDF to PowerPoint", desc: "Convert client proposal PDFs to editable slides for customization", slug: "pdf-to-powerpoint" }, { title: "Compress PDF", desc: "Shrink large pitch decks and catalogs for email delivery", slug: "compress-pdf" }, { title: "Sign PDF", desc: "Get contracts and SOWs signed electronically by clients", slug: "sign-pdf" }] },
  { dept: "Operations", items: [{ title: "Reorder Pages", desc: "Reorganize SOPs, procedure manuals, and training documents", slug: "reorder-pdf-pages" }, { title: "Rotate PDF", desc: "Fix sideways scanned documents from multifunction printers", slug: "rotate-pdf" }, { title: "OCR PDF", desc: "Make scanned supplier invoices and delivery notes searchable", slug: "ocr-pdf" }, { title: "Split PDF", desc: "Divide large procedure manuals into individual department sections", slug: "split-pdf" }] },
];

export default function ForBusinessPage() {
  return (
    <>
      <Script id="jsonld-for-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="tools" />

      {/* Hero */}
      <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/for/students" className="hover:underline">For Students</Link> / <span>For Business</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            Free PDF Tools for Business
          </h1>
          <p className="text-base max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
            PDFBro replaces expensive per-seat PDF software for everyday business tasks across your entire team. Finance, HR, Sales, Operations — every department has PDF needs. All tools are covered for free with no per-user licensing, no subscription tiers, and no usage limits.
          </p>
          <p className="text-sm max-w-2xl mb-4" style={{ color: "var(--text-muted)" }}>
            Unlike enterprise PDF suites that cost $20–$50/user/month, PDFBro processes most files in your browser for maximum privacy. Your confidential contracts, financial reports, and HR documents never leave your device.
          </p>
          <div className="rounded-2xl p-4 flex items-start gap-3 max-w-xl mb-6" style={{ backgroundColor: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.2)" }}>
            <Zap className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-blue)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>ROI Example:</strong> A team of 15 employees using Adobe Acrobat Pro at $19.99/month each = <strong style={{ color: "var(--accent-red)" }}>$3,598/year</strong>. PDFBro covers 90% of the same PDF tasks for <strong style={{ color: "var(--accent-green)" }}>$0/year</strong>. For basic PDF operations, that's a 100% cost reduction with zero feature sacrifice.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["No per-user pricing", "No subscription", "No daily limits", "No signup", "Browser-based privacy", "All tools free"].map((badge) => (
              <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Department workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>PDF Tools by Department</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Every department has specific PDF needs. Here's how each team uses PDFBro daily.</p>
          {WORKFLOWS.map((dept) => (
            <div key={dept.dept}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                {dept.dept === "Finance" && "💰"}
                {dept.dept === "HR" && "👥"}
                {dept.dept === "Sales" && "📈"}
                {dept.dept === "Operations" && "⚙️"}
                {dept.dept} Department
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {dept.items.map((item) => (
                  <Link key={item.slug} href={`/tools/${item.slug}`}
                    className="group rounded-xl p-4 transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                    <p className="text-sm font-semibold mb-1 group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why PDFBro for business */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Why Businesses Choose PDFBro</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🔒", title: "Maximum Document Privacy", desc: "Files process in the browser and never leave employee devices. No cloud storage, no server uploads (for most tools). Ideal for NDAs, contracts, and confidential financial data." },
              { icon: "♾️", title: "No Per-User Pricing", desc: "Unlike enterprise suites that charge per seat, PDFBro is free for any number of employees. No procurement process, no budget approval needed. Just open and use." },
              { icon: "⚡", title: "Zero IT Overhead", desc: "No software to install, no licenses to manage, no updates to deploy. Works in any modern browser on Windows, Mac, and Linux. Zero support tickets for PDF software." },
              { icon: "🛡️", title: "Enterprise-Grade Security", desc: "AES-256 encryption for PDF protection, HTTPS for all connections, magic-byte file validation to prevent injection attacks, and server-side files auto-deleted within 1 hour." },
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

      {/* Common business workflows */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Most Common Business PDF Workflows</h2>
          <div className="space-y-4">
            {[
              {
                title: "Sending a Contract for Signature",
                desc: "Convert your Word contract to PDF using Word to PDF. Add your company watermark with Add Watermark. Send to the client — they upload it to Sign PDF, add their signature, and return it. All free, all in the browser.",
                tools: ["word-to-pdf", "add-watermark", "sign-pdf"],
              },
              {
                title: "Monthly Financial Reporting Package",
                desc: "Extract invoice data from PDFs with PDF to Excel. Compress the final report PDF for email distribution. Password-protect it with Protect PDF before sending. Password sent separately for security.",
                tools: ["pdf-to-excel", "compress-pdf", "protect-pdf"],
              },
              {
                title: "Onboarding a New Employee",
                desc: "The new hire receives onboarding forms as PDFs. They use Fill PDF Form to complete them in browser. HR uses Merge PDF to combine all completed forms into one personnel file. Sign PDF handles the offer letter acceptance.",
                tools: ["fill-pdf-form", "merge-pdf", "sign-pdf"],
              },
              {
                title: "Preparing a Client Proposal",
                desc: "Combine the proposal document, pricing sheet, and case studies with Merge PDF. Add DRAFT or CONFIDENTIAL watermark. Compress to under 5 MB for email delivery. Client signs the SOW with Sign PDF.",
                tools: ["merge-pdf", "add-watermark", "compress-pdf", "sign-pdf"],
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

      {/* Bottom CTA */}
      <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Ready to eliminate PDF software costs?</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>All tools are free. No per-user pricing. No limits. Start now.</p>
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
