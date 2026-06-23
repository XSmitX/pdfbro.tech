import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/sign-pdf-online-free`;
const TOOL_URL = "/tools/sign-pdf";

export const metadata: Metadata = {
  title: "Sign PDF Online Free — Electronic Signature, No Software | PDFBro",
  description: "Sign PDF documents online free. Create electronic signatures, draw your signature, or type it. No software download, no signup required. Browser-based signing.",
  keywords: ["sign pdf online free", "electronic signature pdf free", "esign pdf free online", "draw signature on pdf free", "digital signature pdf online", "sign documents without adobe", "free pdf signer no registration"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Sign PDF Online Free — Electronic Signature, No Software | PDFBro",
    description: "Sign PDF documents online free. Create, draw, or type your signature. No software, no signup. Browser-based e-signing for any document.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload the PDF you need to sign", desc: "Drag and drop any PDF document into the signer. Works with contracts, agreements, forms, offer letters — any PDF that requires a signature. Maximum 100 MB per file." },
  { title: "Create your signature", desc: "Draw your signature with your mouse, trackpad, or touchscreen. Or type your name and choose from multiple signature font styles. Position it exactly where needed on the page." },
  { title: "Download the signed PDF", desc: "Apply your signature and download instantly. The signature is embedded in the PDF and visible in any reader. No watermarks, no account creation, no software required." },
];

const FAQ_ITEMS = [
  { q: "Is an electronic signature from PDFBro legally valid?", a: "Yes. E-signatures created with PDFBro are valid under the ESIGN Act (US), eIDAS (EU), and similar laws globally. An electronic signature is legally binding as long as both parties intend to sign. PDFBro's signatures meet the standard requirements for most contracts, NDAs, and agreements." },
  { q: "Can I draw my actual handwritten signature?", a: "Yes. Use your mouse, trackpad, stylus, or touchscreen to draw your signature exactly as it appears on paper. PDFBro captures the natural strokes for a realistic hand-signed look. Works especially well on iPads and touchscreen laptops." },
  { q: "Does the signature tool work on my phone?", a: "Yes. The sign PDF tool is fully responsive — works on iPhone (Safari), Android (Chrome), and tablets. Touchscreens make drawing signatures even easier. Sign documents on the go without downloading an app." },
  { q: "Will my signed PDF have a watermark?", a: "Never. PDFBro adds zero watermarks to any signed document. Your PDF downloads clean and professional — just like a desktop PDF application, but free and browser-based." },
  { q: "How does PDFBro's signing compare to DocuSign or Adobe Sign?", a: "PDFBro provides the core signing functionality — draw, type, or upload a signature and place it on a PDF — completely free. DocuSign and Adobe Sign add workflow automation, audit trails, and multi-party routing for paid business plans. For individual signing needs, PDFBro covers everything you need at zero cost." },
  { q: "Can I sign multiple pages or multiple documents?", a: "Yes. Place your signature on any page of your PDF. For multi-page documents, you can sign each page individually. There are no daily limits — sign as many documents as you need, all free." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Sign PDF Online Free — Electronic Signature, No Software",
      description: "Sign PDF documents online free. Create electronic signatures, draw or type your signature. No software, no signup. Browser-based e-signing.",
      inLanguage: "en-US",
      dateModified: "2026-06-23",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "PDF Tools", item: `${BASE_URL}/pdf-tools` },
        { "@type": "ListItem", position: 3, name: "Sign PDF Online Free", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function SignPdfOnlineFree() {
  return (
    <>
      <Script id="jsonld-sign-pdf-online-free" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Sign PDF Online Free</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Sign PDF Online Free — Electronic Signature, No Software
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Printing, signing, and scanning documents is a waste of time. PDFBro lets you sign PDFs online for free — draw your signature with your mouse or touchscreen, type it, or upload an image of your handwritten signature. No software download, no account creation, no credit card. Sign contracts, NDAs, offer letters, and forms in seconds.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>Browser-Based</span>
          </div>

          <Link href={TOOL_URL} className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Sign PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Draw, type, or upload your signature onto any PDF — browser-based signing</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Sign PDF Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Sign PDF Online Free — 3 Steps</h2>
            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(79,142,247,0.15)", color: "var(--accent-blue)" }}>{i + 1}</span>
                  <div><p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</p><p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Sign PDFs</h2>
            {["100% Free — no subscription ever", "No signup required", "Browser-based — your document stays private", "No watermarks on signed output", "Draw, type, or upload your signature", "Legally valid e-signature"].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
              </div>
            ))}
          </section>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
            <div className="space-y-5">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href={TOOL_URL} className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Sign Your PDF Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
