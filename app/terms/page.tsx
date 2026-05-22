import type { Metadata } from "next";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Terms of Service — PDFBro",
  description:
    "Terms of Service for PDFBro.tech — free online PDF and image tools. Read the rules for using our browser-based file processing tools.",
  alternates: { canonical: "https://pdfbro.tech/terms" },
  openGraph: {
    title: "Terms of Service — PDFBro",
    description: "Terms of Service for PDFBro.tech — free online PDF and image tools.",
    url: "https://pdfbro.tech/terms",
  },
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>
          Last updated: May 2025
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              By accessing and using PDFBro.tech (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              2. Description of Service
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              PDFBro provides free browser-based tools for processing PDF and image files. Tools include merging, splitting, compressing, converting, and editing PDF files and images. Most operations are performed entirely within your browser. A small number of advanced conversion tools use server-side processing; see our{" "}
              <Link href="/privacy" style={{ color: "var(--accent-blue)" }}>Privacy Policy</Link>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              3. Acceptable Use
            </h2>
            <p className="mb-3" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              You agree to use PDFBro only for lawful purposes. You may not use the Service to:
            </p>
            <ul className="space-y-2 pl-5 list-disc" style={{ color: "var(--text-secondary)" }}>
              <li>Process files containing illegal, harmful, or infringing content</li>
              <li>Attempt to reverse-engineer, scrape, or abuse the Service</li>
              <li>Circumvent rate limits or access controls</li>
              <li>Violate any applicable laws or third-party rights</li>
              <li>Upload files you do not own or have no right to process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              4. Intellectual Property
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              You retain full ownership of any files you process through PDFBro. PDFBro does not claim any rights to your files or their contents. The PDFBro website, code, design, branding, and content are owned by PDFBro and protected by copyright law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              5. Disclaimer of Warranties
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              PDFBro is provided &quot;as is&quot; without warranties of any kind, express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or produce results suitable for any particular purpose. You use the Service at your own risk. Always keep backups of important files before processing them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              6. Limitation of Liability
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              To the maximum extent permitted by law, PDFBro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, arising from your use of or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              7. Service Availability &amp; Changes
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We may also update these Terms of Service; continued use of the Service after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              8. Governing Law
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              These Terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved in the appropriate courts of competent jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              9. Contact
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              For questions about these Terms, please{" "}
              <Link href="/contact" style={{ color: "var(--accent-blue)" }}>
                contact us
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4 flex-wrap">
          <Link
            href="/privacy"
            className="text-sm font-medium transition-colors hover:underline underline-offset-2"
            style={{ color: "var(--accent-blue)" }}
          >
            Privacy Policy →
          </Link>
          <Link
            href="/tools"
            className="text-sm font-medium transition-colors hover:underline underline-offset-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Browse All Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}
