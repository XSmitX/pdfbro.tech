import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

export const metadata: Metadata = {
  title: "Remove Background from Image Free Online — No Signup, No Watermark | PDFBro",
  description: "Remove background from image free online with no signup. Instant background removal for photos, product images, and portraits. No watermark on output. Browser-based.",
  keywords: [
    "remove background from photo free no signup",
    "remove background from image free online",
    "free background remover no signup",
    "remove bg without watermark free",
    "photo background remover free no registration",
    "remove image background online free no login",
    "background remover free no watermark no signup",
  ],
  alternates: { canonical: "https://pdfbro.tech/remove-background-free" },
  openGraph: {
    title: "Remove Background from Image Free Online — No Signup, No Watermark | PDFBro",
    description: "Remove background from image free online — no signup, no watermark. Instant bg removal for photos, products, portraits.",
    url: "https://pdfbro.tech/remove-background-free",
    type: "website",
  },
};

export default function RemoveBackgroundFreePage() {
  return (
    <>
      <Script id="jsonld-remove-bg-free" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": "https://pdfbro.tech/remove-background-free#webpage",
            url: "https://pdfbro.tech/remove-background-free",
            name: "Remove Background from Image Free Online — No Signup, No Watermark",
            description: "Remove background from image free online with no signup. Instant background removal for photos, product images, and portraits. No watermark.",
            inLanguage: "en-US",
            dateModified: "2026-06-23",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            breadcrumb: { "@id": "https://pdfbro.tech/remove-background-free#breadcrumb" },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://pdfbro.tech/remove-background-free#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "Image Tools", item: `${BASE_URL}/image-tools` },
              { "@type": "ListItem", position: 3, name: "Remove Background Free", item: "https://pdfbro.tech/remove-background-free" },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": "https://pdfbro.tech/remove-background-free#faq",
            mainEntity: [
              { "@type": "Question", name: "Is the PDFBro background remover really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's background removal tool is completely free with no signup, no daily limits, and no watermarks on output. You can remove backgrounds from as many images as you need, every day, at zero cost. Unlike remove.bg which requires credits after the first free image, PDFBro has no usage caps." } },
              { "@type": "Question", name: "Does the background remover work on product photos?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro's background remover works well on product photos — clothing items, electronics, jewelry, accessories, and more. The AI automatically detects the main subject and removes the background. For best results, use photos where the product has clear contrast against the background." } },
              { "@type": "Question", name: "Is there any quality loss when removing the background?", acceptedAnswer: { "@type": "Answer", text: "No. The subject of your photo retains full resolution and quality. Only the background is removed — your product, person, or object stays sharp and crisp. You download a PNG with a transparent background, perfect for e-commerce listings, design projects, and social media." } },
              { "@type": "Question", name: "Can I remove background without signup on PDFBro?", acceptedAnswer: { "@type": "Answer", text: "Yes. PDFBro never requires signup for any tool. Upload your image, the AI removes the background in seconds, and you download your transparent PNG immediately — no account, no email, no registration." } },
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
            <Link href="/image-tools" className="hover:underline">Image Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Remove Background Free</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            Remove Background from Image Free Online — No Signup, No Watermark
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Need a transparent background for your product photo, profile picture, or design project — but don&apos;t want to pay for Photoshop or waste free credits on remove.bg? PDFBro&apos;s free background remover uses AI to detect your subject and wipe the background in seconds. No signup, no watermark on your output, and no &quot;1 free image then pay&quot; bait. Upload your photo, watch the background disappear, and download a clean transparent PNG — as many times as you need, forever free.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
            Most background removers give you one or two free images, then demand payment. remove.bg requires credits. Adobe charges $22.99/month. PDFBro&apos;s background remover is genuinely free with zero caps and zero watermarks.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,0.08)", color: "var(--accent-green)", border: "1px solid rgba(16,185,129,0.15)" }}>AI-Powered</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(139,106,245,0.1)", color: "var(--accent-violet)", border: "1px solid rgba(139,106,245,0.2)" }}>No Watermark</span>
          </div>

          <Link
            href="/tools/remove-bg"
            className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(79,142,247,0.05))", border: "1px solid rgba(79,142,247,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent-blue)" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Remove Background</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>AI-powered background removal — transparent PNG output, no watermark, instant download</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Remove Background →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Remove Background from Image Free</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your image", desc: "Drag and drop any JPEG, PNG, or WebP photo into the tool. Works with product shots, portraits, animals, and objects. No signup required." },
                { step: 2, title: "AI removes the background", desc: "Our background removal algorithm automatically detects the subject and removes everything behind it — processing happens in your browser in under 5 seconds." },
                { step: 3, title: "Download transparent PNG", desc: "Your image downloads as a PNG with a transparent background. No watermark, no logo, no branding added. Use immediately for e-commerce, design, or social media." },
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

          <section className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Remove Background from Images</h2>
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
                { q: "Is the PDFBro background remover really free?", a: "Yes. PDFBro&apos;s background removal tool is completely free with no signup, no daily limits, and no watermarks on output. You can remove backgrounds from as many images as you need, every day, at zero cost. Unlike remove.bg which requires credits after the first free image, PDFBro has no usage caps." },
                { q: "Does the background remover work on product photos?", a: "Yes. PDFBro&apos;s background remover works well on product photos — clothing items, electronics, jewelry, accessories, and more. The AI automatically detects the main subject and removes the background. For best results, use photos where the product has clear contrast against the background." },
                { q: "Is there any quality loss when removing the background?", a: "No. The subject of your photo retains full resolution and quality. Only the background is removed — your product, person, or object stays sharp and crisp. You download a PNG with a transparent background, perfect for e-commerce listings, design projects, and social media." },
                { q: "Can I remove background without signup on PDFBro?", a: "Yes. PDFBro never requires signup for any tool. Upload your image, the AI removes the background in seconds, and you download your transparent PNG immediately — no account, no email, no registration." },
              ].map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < 3 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/tools/remove-bg" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Remove Background for Free — No Signup <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
