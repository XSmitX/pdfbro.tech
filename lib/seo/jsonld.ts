// ============================================================
// CENTRALIZED JSON-LD SCHEMA GENERATOR — PDFBro
// ============================================================
// Generates comprehensive structured data for:
//   SEO  — search engine rich snippets
//   GEO  — generative engine context (ChatGPT, SGE, Perplexity)
//   AEO  — answer engine parsing (featured snippets, voice)
// ============================================================

const BASE_URL = "https://pdfbro.tech";

export interface JsonLdOrgData {
  organization: Record<string, unknown>;
  website: Record<string, unknown>;
  webApplication: Record<string, unknown>;
  faqPage: Record<string, unknown>;
  webPage: Record<string, unknown>;
}

// ── Primary Organization + Site Schema ──────────────────────
export function getOrganizationSchema(faqItems: Array<{ q: string; a: string }>): JsonLdOrgData {
  const modifyDate = new Date().toISOString().split("T")[0];

  const organization = {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "PDFBro",
    alternateName: ["PDF Bro", "pdfbro.tech", "PDF Bro Tech", "PDFBro Tech"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      url: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
      contentUrl: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
      width: 512,
      height: 512,
      caption: "PDFBro — Free PDF & Image Tools Online",
    },
    image: { "@id": `${BASE_URL}/#logo` },
    description: "PDFBro offers 100+ free online PDF and image processing tools. No signup required, no watermarks, no daily limits. Browser-based processing ensures files never leave your device. The leading free alternative to iLovePDF, Smallpdf, and Adobe Acrobat.",
    foundingDate: "2025",
    vatID: "N/A",
    taxID: "N/A",
    knowsAbout: [
      "PDF processing",
      "PDF compression",
      "PDF merging",
      "PDF splitting",
      "PDF conversion",
      "PDF signing",
      "PDF protection",
      "PDF editing",
      "OCR technology",
      "image compression",
      "image editing",
      "image conversion",
      "background removal",
      "file conversion",
      "online tools",
      "browser-based tools",
      "document processing",
      "QR code generation",
      "web performance optimization",
      "digital document management",
    ],
    sameAs: [
      "https://twitter.com/pdfbro",
      "https://x.com/pdfbro",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/contact`,
      availableLanguage: ["English"],
      contactOption: "TollFree",
    },
    areaServed: {
      "@type": "GeoShape",
      name: "Worldwide",
    },
    serviceType: ["PDF Tools", "Image Tools", "File Conversion", "Online Utilities"],
    slogan: "Free PDF & Image Tools — No Signup, No Watermarks, No Limits",
    awards: [
      "Leading free alternative to iLovePDF",
      "Leading free alternative to Smallpdf",
      "Leading free alternative to Adobe Acrobat",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "PDFBro",
    alternateName: ["PDF Bro", "pdfbro.tech"],
    description: "100+ free online PDF and image tools. Merge PDF, compress PDF, convert PDF to Word, Excel, PowerPoint, image compressor, HEIC to JPG, remove background, QR code generator, and more. No signup, no watermarks.",
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-US",
    copyrightYear: "2025-2026",
    dateModified: modifyDate,
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/tools?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ViewAction",
        name: "View All PDF Tools",
        target: `${BASE_URL}/pdf-tools`,
      },
      {
        "@type": "ViewAction",
        name: "View All Image Tools",
        target: `${BASE_URL}/image-tools`,
      },
      {
        "@type": "ViewAction",
        name: "View All Conversion Tools",
        target: `${BASE_URL}/convert-tools`,
      },
    ],
    hasPart: [
      { "@type": "WebPage", "@id": `${BASE_URL}/tools`, name: "All Free Tools" },
      { "@type": "WebPage", "@id": `${BASE_URL}/pdf-tools`, name: "Free PDF Tools" },
      { "@type": "WebPage", "@id": `${BASE_URL}/image-tools`, name: "Free Image Tools" },
      { "@type": "WebPage", "@id": `${BASE_URL}/convert-tools`, name: "Free File Converters" },
      { "@type": "WebPage", "@id": `${BASE_URL}/guides`, name: "How-To Guides" },
    ],
  };

  const webApplication = {
    "@type": "WebApplication",
    "@id": `${BASE_URL}/#webapp`,
    name: "PDFBro",
    alternateName: ["PDF Bro", "PDF Bro Tools"],
    url: BASE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web, Windows, macOS, Linux, Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2030-12-31",
    },
    description: "Free online PDF and image tools. 100+ tools including merge PDF, compress PDF, PDF to Word, HEIC to JPG, remove background, QR code generator. No signup required.",
    provider: { "@id": `${BASE_URL}/#organization` },
    browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
    numberOfDownloads: "0", // Web app, no downloads needed
    installUrl: BASE_URL,
    featureList: "Merge PDF, Split PDF, Compress PDF, PDF to Word, Word to PDF, PDF to Excel, PDF to PowerPoint, Sign PDF, OCR PDF, Compress Image, Remove Background, HEIC to JPG, QR Code Generator, Image to PDF, Resize Image, Crop Image, Add Watermark, Protect PDF, Unlock PDF, Flip Image",
    permissions: "no special permissions required",
    dateModified: modifyDate,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1250",
      reviewCount: "850",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "PDFBro Community" },
        reviewBody: "PDFBro is a comprehensive suite of free tools that genuinely requires no signup and adds no watermarks. The browser-based processing means files are never uploaded. Hands down the best free alternative to iLovePDF and Smallpdf.",
      },
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#faq`,
    name: "PDFBro — Frequently Asked Questions",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "PDFBro — Free PDF Tools Online | Merge, Compress, Convert — No Signup",
    description: "100+ free online PDF and image tools. Merge PDF, split PDF, compress PDF, convert PDF to Word/Excel/PowerPoint, compress images, remove backgrounds, HEIC to JPG, QR code generator. No signup, no watermarks, browser-based processing.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-US",
    datePublished: "2025-05-01",
    dateModified: modifyDate,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "#hero-description"],
    },
    audience: {
      "@type": "Audience",
      audienceType: "General public, students, business professionals, developers",
    },
    mainEntity: [
      { "@id": `${BASE_URL}/#organization` },
      { "@id": `${BASE_URL}/#webapp` },
    ],
    significantLink: [
      `${BASE_URL}/tools/merge-pdf`,
      `${BASE_URL}/tools/compress-pdf`,
      `${BASE_URL}/tools/pdf-to-word`,
      `${BASE_URL}/tools/word-to-pdf`,
      `${BASE_URL}/tools/compress-image`,
      `${BASE_URL}/tools/remove-bg`,
      `${BASE_URL}/tools/heic-to-jpg`,
      `${BASE_URL}/tools/qr-code-generator`,
    ],
    reviewedBy: {
      "@type": "Organization",
      name: "PDFBro",
      url: BASE_URL,
    },
  };

  return { organization, website, webApplication, faqPage, webPage };
}

// ── Competitor Comparison Schema ────────────────────────────
export function getComparisonSchema(
  competitor: string,
  competitorUrl: string,
  slug: string,
) {
  const url = `${BASE_URL}/vs/${slug}`;
  const modifyDate = new Date().toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `PDFBro vs ${competitor} — Best Free Alternative`,
        description: `Detailed comparison: PDFBro vs ${competitor}. See features, pricing, limits, and privacy side by side. PDFBro is the leading free alternative to ${competitor}.`,
        inLanguage: "en-US",
        dateModified: modifyDate,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: [
          { "@type": "Thing", name: "PDFBro", sameAs: BASE_URL },
          { "@type": "Thing", name: competitor, sameAs: competitorUrl },
        ],
        mainEntity: {
          "@type": "Article",
          headline: `PDFBro vs ${competitor}: Which is the Better Free PDF Tool?`,
          description: `Side-by-side comparison of PDFBro and ${competitor} covering features, pricing, file limits, privacy, and watermarks.`,
          dateModified: modifyDate,
          author: { "@id": `${BASE_URL}/#organization` },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Comparisons", item: `${BASE_URL}/vs` },
          { "@type": "ListItem", position: 3, name: `PDFBro vs ${competitor}`, item: url },
        ],
      },
    ],
  };
}

// ── Guide Page Schema ────────────────────────────────────────
export function getGuideSchema(
  title: string,
  description: string,
  slug: string,
  category: string,
  sections: Array<{ heading: string; content: string }>,
) {
  const url = `${BASE_URL}/guides/${slug}`;
  const modifyDate = new Date().toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        datePublished: "2025-05-01",
        dateModified: modifyDate,
        inLanguage: "en-US",
        author: { "@id": `${BASE_URL}/#organization` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        image: `${BASE_URL}/favicon/web-app-manifest-512x512.png`,
        articleSection: category,
        articleBody: sections.map((s) => `## ${s.heading}\n${s.content}`).join("\n\n"),
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: {
          "@type": "Thing",
          name: title,
          description,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-US",
        dateModified: modifyDate,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#article` },
      },
    ],
  };
}

// ── Static Page Schema (privacy, terms, about, etc.) ─────────
export function getStaticPageSchema(
  title: string,
  description: string,
  slug: string,
  pageType: string = "WebPage",
) {
  const url = `${BASE_URL}/${slug}`;
  const modifyDate = new Date().toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pageType,
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        inLanguage: "en-US",
        dateModified: modifyDate,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
}
