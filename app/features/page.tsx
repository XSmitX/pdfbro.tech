import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, Shield, Zap, Globe, ArrowRight } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import { TOOLS } from "@/lib/toolRegistry";

export const metadata: Metadata = {
  title: "PDFBro Features — 100+ Free PDF & Image Tools | Full Feature List",
  description: "Full feature list for PDFBro: 100+ free PDF tools, 15+ image tools, 20+ converters. No signup, no limits, browser-based privacy. See everything PDFBro can do.",
  keywords: ["pdfbro features", "pdfbro tools list", "what can pdfbro do", "pdfbro free tools", "pdfbro pdf editor features"],
  alternates: { canonical: "https://pdfbro.tech/features" },
} as Metadata;

const CATEGORIES = [
  { id: "pdf" as const, label: "PDF Tools", color: "#ef4444" },
  { id: "image" as const, label: "Image Tools", color: "#8b5cf6" },
  { id: "convert" as const, label: "Conversion Tools", color: "#0ea5e9" },
  { id: "utility" as const, label: "Utilities", color: "#10b981" },
];

const CORE_FEATURES = [
  { icon: Shield, title: "100% Browser-Based Privacy", desc: "Nearly all tools process files locally in your browser. Files never leave your device. No server uploads for standard operations.", color: "#10b981" },
  { icon: Zap, title: "Instant Processing", desc: "No upload queues, no 'please wait' emails. Processing starts immediately when you click the button.", color: "#f59e0b" },
  { icon: Globe, title: "Zero Signup Required", desc: "Every single tool works without creating an account. No email, no credit card, no registration.", color: "#4f8ef7" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PDFBro Features — Complete Tool List",
  url: "https://pdfbro.tech/features",
  description: "Full list of PDFBro features: 100+ free PDF and image tools.",
};

export default function FeaturesPage() {
  return (
    <>
      <Script id="jsonld-features" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>Features</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
            PDFBro Features — Everything Included Free
          </h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
            {TOOLS.length}+ tools. Zero cost. No signup. Here&apos;s the complete list of what PDFBro can do.
          </p>

          {/* Core features */}
          <div className="grid gap-4 sm:grid-cols-3 mb-12">
            {CORE_FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <f.icon className="h-6 w-6 mb-3" style={{ color: f.color }} />
                <h2 className="text-sm font-bold mb-1.5" style={{ color: "var(--text-primary)" }}>{f.title}</h2>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Tools by category */}
          {CATEGORIES.map((cat) => {
            const tools = TOOLS.filter(t => t.category === cat.id);
            if (!tools.length) return null;
            return (
              <div key={cat.id} className="mb-10">
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>{cat.label} <span className="text-sm font-normal ml-2" style={{ color: "var(--text-muted)" }}>({tools.length} tools)</span></h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`}
                      className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:scale-[1.01]"
                      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: cat.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:underline underline-offset-2" style={{ color: "var(--text-primary)" }}>{tool.name}</p>
                        <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{tool.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex gap-3 mt-6">
            <Link href="/tools" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Browse All Tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
