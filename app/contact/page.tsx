import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, ExternalLink } from "lucide-react";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Contact Us — PDFBro",
  description:
    "Get in touch with the PDFBro team. Report a bug, request a feature, or ask a question about our free PDF and image tools.",
  alternates: { canonical: "https://pdfbro.tech/contact" },
  openGraph: {
    title: "Contact Us — PDFBro",
    description: "Get in touch with the PDFBro team. Report bugs, request features, or ask questions.",
    url: "https://pdfbro.tech/contact",
  },
};

const FAQ = [
  {
    q: "Why isn't my tool working?",
    a: "Most tools run entirely in your browser. Try refreshing the page, using a modern browser (Chrome, Firefox, Edge, Safari), and ensuring JavaScript is enabled. If the issue persists, please email us with the tool name and a description of the error.",
  },
  {
    q: "Are my files safe?",
    a: "Yes. Almost all PDFBro tools process files entirely in your browser — your files are never uploaded to our servers. A small number of advanced tools (PDF to Word, PDF to Excel, Word to PDF, etc.) use secure server-side processing; those files are deleted within 1 hour.",
  },
  {
    q: "Can I request a new tool?",
    a: "Absolutely! We love feature requests. Email us with the tool you'd like and how you'd use it. Popular requests get prioritized.",
  },
  {
    q: "Is PDFBro really free?",
    a: "Yes, all tools are free to use. No account, no credit card, no hidden limits for standard use.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="minimal" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-4">
          <Link href="/" className="text-sm transition-colors" style={{ color: "var(--accent-blue)" }}>
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          Contact Us
        </h1>
        <p className="text-base mb-12" style={{ color: "var(--text-secondary)" }}>
          We read every message. Typical response time is under 24 hours.
        </p>

        {/* Contact methods */}
        <div className="grid gap-4 sm:grid-cols-2 mb-14">
          <a
            href="mailto:hello@pdfbro.tech"
            className="group rounded-2xl p-6 flex items-start gap-4 transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: "rgba(79,142,247,0.12)" }}
            >
              <Mail className="h-5 w-5" style={{ color: "var(--accent-blue)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                Email
              </p>
              <p className="text-sm" style={{ color: "var(--accent-blue)" }}>
                hello@pdfbro.tech
              </p>
              <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                General questions, bug reports, feature requests
              </p>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-muted)" }} />
          </a>

          <a
            href="mailto:privacy@pdfbro.tech"
            className="group rounded-2xl p-6 flex items-start gap-4 transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: "rgba(52,211,153,0.12)" }}
            >
              <MessageCircle className="h-5 w-5" style={{ color: "var(--accent-green)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                Privacy
              </p>
              <p className="text-sm" style={{ color: "var(--accent-green)" }}>
                privacy@pdfbro.tech
              </p>
              <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                Privacy questions, data requests, GDPR
              </p>
            </div>
            <ExternalLink className="h-4 w-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-muted)" }} />
          </a>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl p-5"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {item.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div className="mt-12 flex gap-4 flex-wrap">
          <Link href="/tools" className="text-sm font-medium" style={{ color: "var(--accent-blue)" }}>
            Browse All Tools →
          </Link>
          <Link href="/privacy" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Privacy Policy →
          </Link>
          <Link href="/terms" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
