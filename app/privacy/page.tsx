import type { Metadata } from "next";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Privacy Policy — PDFBro",
  description:
    "PDFBro processes all files entirely in your browser. No files are uploaded to servers. Read our full privacy policy to understand how we protect your data.",
  alternates: { canonical: "https://pdfbro.tech/privacy" },
  openGraph: {
    title: "Privacy Policy — PDFBro",
    description: "PDFBro processes all files entirely in your browser. No uploads. No data collection.",
    url: "https://pdfbro.tech/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative" style={{ zIndex: 1 }}>
      <PageBackground variant="minimal" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-4">
          <Link href="/" className="text-sm transition-colors" style={{ color: "var(--accent-blue)" }}>
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>
          Last updated: May 2025
        </p>

        <div className="space-y-10 prose-custom">
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              1. Our Core Privacy Principle
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              PDFBro is built on a simple principle: <strong style={{ color: "var(--text-primary)" }}>your files never leave your device</strong>. Every tool on PDFBro.tech processes files entirely within your web browser using JavaScript. We do not receive, store, or transmit your files to any server. When you close the browser tab, all file data is discarded permanently.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              2. What Data We Collect
            </h2>
            <p className="mb-3" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              PDFBro collects minimal data to operate the website:
            </p>
            <ul className="space-y-2 pl-5 list-disc" style={{ color: "var(--text-secondary)" }}>
              <li><strong style={{ color: "var(--text-primary)" }}>Analytics:</strong> We use privacy-respecting analytics to understand aggregate traffic (pages visited, browser type, country). This data is anonymized and never personally identifiable.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Error logs:</strong> Anonymized error logs may be collected to help us fix bugs. These do not include file contents.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Cookies:</strong> We use a single cookie to remember your theme preference (dark/light mode). No tracking cookies are set.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              3. File Processing — 100% In-Browser
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              All PDF and image processing (merging, splitting, compressing, converting, and more) happens using browser-native APIs and JavaScript libraries loaded onto your device. Your files are read into browser memory only, processed, and returned to you as a download — at no point are they sent over the network to PDFBro servers or any third party.
            </p>
            <p className="mt-3" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              <strong style={{ color: "var(--text-primary)" }}>Exception:</strong> A small number of advanced tools (PDF to Word, PDF to Excel, Word to PDF, GIF to MP4, MP4 to GIF, PDF to PowerPoint, Unlock PDF) use secure server-side processing because they require software not available in browsers. These files are transmitted over HTTPS, processed immediately, and deleted from our servers within 1 hour of the request completing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              4. Third-Party Services
            </h2>
            <ul className="space-y-2 pl-5 list-disc" style={{ color: "var(--text-secondary)" }}>
              <li><strong style={{ color: "var(--text-primary)" }}>Vercel:</strong> PDFBro is hosted on Vercel, which may collect standard server access logs (IP address, request time) per their privacy policy.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Google Fonts:</strong> We load fonts from Google Fonts, which may log a request to Google's servers.</li>
              <li>We do not use advertising networks, social media trackers, or third-party analytics that sell your data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              5. Data Security
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              All connections to PDFBro.tech are encrypted via HTTPS/TLS. Security headers including <code style={{ color: "var(--accent-blue)" }}>X-Content-Type-Options</code>, <code style={{ color: "var(--accent-blue)" }}>X-Frame-Options</code>, and <code style={{ color: "var(--accent-blue)" }}>Referrer-Policy</code> are enforced on every response.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              6. Children&apos;s Privacy
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              PDFBro is not directed at children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              7. Changes to This Policy
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              We may update this policy from time to time. Changes will be reflected by updating the &quot;Last updated&quot; date above. Continued use of PDFBro after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              8. Contact Us
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              Questions about this privacy policy? Contact us at{" "}
              <Link href="/contact" style={{ color: "var(--accent-blue)" }}>
                our contact page
              </Link>{" "}
              or email{" "}
              <span style={{ color: "var(--accent-blue)" }}>privacy@pdfbro.tech</span>.
            </p>
          </section>
        </div>

        <div
          className="mt-12 rounded-2xl p-5 flex items-start gap-3"
          style={{ backgroundColor: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)" }}
        >
          <span className="text-xl">🔒</span>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-green)" }}>
              Bottom line
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              PDFBro was built to be private by design. Your files are yours. We process them locally, never store them, and never share them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
