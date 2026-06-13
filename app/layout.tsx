import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/themeContext";
import SecurityProvider from "@/components/SecurityProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdfbro.tech"),
  title: {
    default: "PDFBro — Free PDF Tools Online | Merge, Compress, Convert — No Signup",
    template: "%s | PDFBro — Free Online Tools",
  },
  description:
    "PDFBro: 100+ free online PDF and image tools. Merge PDF, split PDF, compress PDF, convert PDF to Word/excel/powerpoint, sign PDF, compress images, remove backgrounds, HEIC to JPG, QR code generator. No signup, no watermarks, browser-based.",
  keywords: [
    "PDFBro", "PDF Bro", "pdfbro",
    "PDF converter", "merge PDF", "compress PDF", "PDF to Word",
    "free PDF tools", "online PDF editor", "split PDF", "PDF to Excel",
    "PDF to JPG", "JPG to PDF", "compress image online", "image compressor",
    "resize image", "remove background", "HEIC to JPG",
    "free online tools no signup", "PDF tools no watermark",
    "browser-based PDF tools", "free PDF tools no sign up",
    "ilovepdf alternative", "smallpdf alternative",
    "free adobe acrobat alternative", "best free pdf editor 2026",
    "free document converter", "online image editor free",
    "free pdf merger no limit", "pdf compressor no loss",
  ],
  authors: [{ name: "PDFBro", url: "https://pdfbro.tech" }],
  creator: "PDFBro",
  publisher: "PDFBro",
  applicationName: "PDFBro",
  category: "technology",
  classification: "Utilities, PDF Tools, Image Tools, File Conversion, Online Services",
  appleWebApp: {
    capable: true,
    title: "PDFBro",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pdfbro.tech",
    siteName: "PDFBro",
    title: "PDFBro — Free PDF & Image Tools Online | No Signup, No Watermarks",
    description:
      "100+ free browser-based tools. Merge PDF, split PDF, compress PDF, convert PDF to Word, Excel, PowerPoint, compress images, remove backgrounds, HEIC to JPG, QR code generator. No signup, no watermarks, no daily limits.",
    images: [
      {
        url: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "PDFBro — Free PDF & Image Tools Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pdfbro",
    title: "PDFBro — Free PDF & Image Tools Online | No Signup",
    description: "100+ free browser-based PDF and image tools. No signup, no limits, no watermarks.",
    creator: "@pdfbro",
    images: ["https://pdfbro.tech/favicon/web-app-manifest-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "ai-content-declaration": "human-curated",
    "revisit-after": "7 days",
    "rating": "general",
    "document-type": "Web Application",
    "page-topic": "Free Online PDF and Image Tools",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        {/* llms.txt — LLM/AI crawler discovery */}
        <link rel="alternate" type="text/plain" href="https://pdfbro.tech/llms.txt" title="LLMs.txt" />
        {/* llms-full.txt — comprehensive AI crawler content */}
        <link rel="alternate" type="text/plain" href="https://pdfbro.tech/llms-full.txt" title="LLMs Full" />
        {/* Brand identity — link rel="me" for entity disambiguation */}
        <link rel="me" href="https://twitter.com/pdfbro" />
        <link rel="me" href="https://x.com/pdfbro" />
        {/* Preconnect to analytics/font CDNs for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Schema.org JSON-LD — Organization + WebSite — must be in <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://pdfbro.tech/#organization",
                  name: "PDFBro",
                  alternateName: ["PDF Bro", "pdfbro.tech"],
                  url: "https://pdfbro.tech",
                  logo: "https://pdfbro.tech/favicon/web-app-manifest-512x512.png",
                  sameAs: ["https://twitter.com/pdfbro", "https://x.com/pdfbro"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    url: "https://pdfbro.tech/contact",
                    availableLanguage: "English",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://pdfbro.tech/#website",
                  url: "https://pdfbro.tech",
                  name: "PDFBro",
                  description: "100+ free online PDF and image tools. No signup, no watermarks, browser-based.",
                  publisher: { "@id": "https://pdfbro.tech/#organization" },
                  inLanguage: "en-US",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://pdfbro.tech/tools?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen antialiased overflow-x-hidden`}
        style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        <GoogleAnalytics />
        <SecurityProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col w-full page-wrapper">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </SecurityProvider>
      </body>
    </html>
  );
}
