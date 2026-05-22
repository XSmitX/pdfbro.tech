import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Shield, Lock, Server, Eye, CheckCircle2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "PDFBro Security & Privacy — How Your Files Are Protected",
  description: "How PDFBro protects your files and privacy. Browser-based processing, HTTPS encryption, no data storage, no tracking. Full security overview.",
  keywords: ["pdfbro security", "pdfbro privacy", "is pdfbro safe", "pdfbro file safety", "pdfbro data protection", "browser based pdf security"],
  alternates: { canonical: "https://pdfbro.tech/security" },
} as Metadata;

const SECURITY_POINTS = [
  { icon: Lock, title: "Files Stay in Your Browser", desc: "For all standard PDF and image operations (merge, split, compress, sign, annotate, rotate, convert images, OCR, etc.), PDFBro processes files entirely in your browser using JavaScript. Your files never travel over the network. This is the strongest possible data protection — there's no server to breach.", color: "#10b981" },
  { icon: Server, title: "Server-Side Tools — HTTPS + 1-Hour Deletion", desc: "A small number of complex operations (PDF to Word, Word to PDF, PDF to Excel, PDF to PowerPoint, GIF/MP4 conversions) require server processing because the required software can't run in a browser. These files are transmitted over HTTPS/TLS, processed immediately, and automatically deleted within 1 hour of the request completing.", color: "#4f8ef7" },
  { icon: Eye, title: "No Tracking, No Profiling", desc: "PDFBro doesn't set tracking cookies, doesn't build user profiles, and doesn't sell data to advertisers. We use privacy-respecting analytics (aggregate traffic only) to understand which tools are used. We have no email newsletter, no CRM, and no remarketing audiences.", color: "#8b5cf6" },
  { icon: Shield, title: "Security Headers on Every Response", desc: "Every PDFBro response includes: X-Content-Type-Options, X-Frame-Options (DENY), Referrer-Policy, and X-XSS-Protection headers. Content Security Policy is enforced on all pages.", color: "#f59e0b" },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PDFBro Security & Privacy",
  description: "How PDFBro protects your files and data.",
  url: "https://pdfbro.tech/security",
};

export default function SecurityPage() {
  return (
    <>
      <Script id="jsonld-security" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="minimal" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link> / <span>Security</span>
          </div>
          <h1 className="text-3xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>Security &amp; Privacy</h1>
          <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>Your files contain sensitive information. Here&apos;s exactly how PDFBro handles them.</p>

          <div className="space-y-5 mb-12">
            {SECURITY_POINTS.map((point) => (
              <div key={point.title} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${point.color}18` }}>
                    <point.icon className="h-5 w-5" style={{ color: point.color }} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>{point.title}</h2>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{point.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Tools That Process In Your Browser (Zero Uploads)</h2>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {["Merge PDF", "Split PDF", "Compress PDF", "Rotate PDF", "Sign PDF", "OCR PDF", "Edit PDF", "Fill PDF Form", "Protect PDF", "Unlock PDF", "Add Watermark", "Page Numbers", "Extract Pages", "Reorder Pages", "Compress Image", "Resize Image", "Crop Image", "Remove Background", "HEIC to JPG", "Passport Photo", "Image to PDF", "PDF to Image", "QR Code Generator", "All image conversions"].map((tool) => (
                <div key={tool} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#10b981" }} />
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{tool}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/privacy" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Read Privacy Policy →
            </Link>
            <Link href="/contact" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
