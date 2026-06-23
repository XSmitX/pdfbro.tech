import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";
const PAGE_URL = `${BASE_URL}/unlock-pdf-online-free`;
const TOOL_URL = "/tools/unlock-pdf";

export const metadata: Metadata = {
  title: "Unlock PDF Online Free — Remove Password Protection Instantly | PDFBro",
  description: "Remove password protection from PDF files online free. Unlock PDFs without password, no signup required. Instant browser-based unlocking for all encrypted PDFs.",
  keywords: ["unlock pdf online free", "remove pdf password online", "unlock pdf without password", "pdf password remover free", "unlock encrypted pdf online", "remove pdf protection free", "pdf unlocker no signup"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Unlock PDF Online Free — Remove Password Protection Instantly | PDFBro",
    description: "Remove password protection from PDF files online free. Unlock PDFs without password, no signup. Instant browser-based unlocking.",
    url: PAGE_URL,
    type: "website",
  },
} as Metadata;

const STEPS = [
  { title: "Upload your protected PDF", desc: "Drag and drop your password-protected PDF into the unlocker. The tool accepts all types of encrypted PDFs — owner passwords, user passwords, and permission-restricted documents." },
  { title: "Enter the password (if known)", desc: "Type the PDF's password to authorize removal. If you don't have the password but have permission to access the file, the tool attempts permission-based unlocking. All processing stays in your browser." },
  { title: "Download the unlocked PDF", desc: "Click Unlock and download your PDF immediately — now fully editable, printable, and copyable. The original file quality is preserved, and no watermarks are added." },
];

const FAQ_ITEMS = [
  { q: "Can I unlock a PDF without knowing the password?", a: "PDFBro can remove owner-level protection (printing, copying, editing restrictions) even without the password. However, removing a user/open password requires you to enter it. PDFBro never attempts to crack or brute-force passwords." },
  { q: "Is it safe to unlock PDFs online?", a: "Yes. PDFBro processes files entirely in your browser — your PDF never leaves your device. No file is uploaded, stored, or accessible by anyone else. This is safer than server-based unlockers that upload your sensitive documents." },
  { q: "What types of PDF protection can be removed?", a: "PDFBro removes both owner passwords (restrictions on printing, copying, editing) and user/open passwords (the password to open the file). It works with PDF 1.0 through 2.0 and AES-128/256 encryption." },
  { q: "Will unlocking affect my PDF's formatting or content?", a: "No. Unlocking only removes the encryption layer and permission restrictions. Your PDF's text, images, fonts, and layout remain completely unchanged. The file is structurally identical — just no longer locked." },
  { q: "Are there any file size or daily usage limits?", a: "No. PDFBro accepts PDFs up to 100 MB and has zero daily limits. Unlock as many PDFs as you need — no account required, no throttling, no premium tier." },
  { q: "Does the unlock tool work on mobile?", a: "Yes. The unlock PDF tool is fully functional on mobile browsers including Safari on iPhone and Chrome on Android. Upload, unlock, and download directly to your phone." },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Unlock PDF Online Free — Remove Password Protection Instantly",
      description: "Remove password protection from PDF files online free. Unlock PDFs without password, no signup. Browser-based processing for privacy.",
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
        { "@type": "ListItem", position: 3, name: "Unlock PDF Online Free", item: PAGE_URL },
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

export default function UnlockPdfOnlineFree() {
  return (
    <>
      <Script id="jsonld-unlock-pdf-online-free" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#4f8ef7" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/pdf-tools" className="hover:underline">PDF Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Unlock PDF Online Free</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Unlock PDF Online Free — Remove Password Protection Instantly
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Locked out of your own PDF by a forgotten password or permission restrictions? PDFBro unlocks your PDFs online in seconds — free, no signup, and no software installation. Remove owner passwords, user passwords, and copying restrictions so you can edit, print, and share your documents freely.
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
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Unlock PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Remove password protection and unlock your PDF — entirely browser-based</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Unlock PDF Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Unlock a PDF Online Free — 3 Steps</h2>
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
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Unlock PDFs</h2>
            {["100% Free — no subscription", "No signup required", "Browser-based — files never leave your device", "No watermarks on unlocked output", "No daily limits — unlimited use", "Works on Windows, Mac, iPhone, Android"].map((feat) => (
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
              Unlock Your PDF Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
