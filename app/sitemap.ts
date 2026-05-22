import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/toolRegistry";
import { GUIDES } from "@/lib/guides/index";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdfbro.tech";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.92 },
    { url: `${baseUrl}/pdf-tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/image-tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/convert-tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    // Brand + comparison pages
    { url: `${baseUrl}/features`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/vs/ilovepdf`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/smallpdf`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/adobe-acrobat`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/for/students`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/for/business`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/for/developers`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
  ];

  const HIGH_PRIORITY_TOOL_SLUGS = new Set([
    "merge-pdf", "compress-pdf", "split-pdf", "pdf-to-word", "word-to-pdf",
    "pdf-to-excel", "compress-image", "heic-to-jpg", "qr-code-generator",
    "remove-bg", "image-to-pdf", "pdf-to-image", "sign-pdf", "resize-image",
    "text-to-pdf", "pdf-to-text", "image-to-webp", "add-text-to-image",
    "pdf-to-powerpoint", "edit-pdf",
  ]);

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: HIGH_PRIORITY_TOOL_SLUGS.has(tool.slug) ? 0.9 : 0.8,
  }));

  // Guide pages — high-competition keywords get 0.9 priority
  const HIGH_PRIORITY_GUIDE_SLUGS = new Set([
    "how-to-merge-pdf", "how-to-compress-pdf", "how-to-convert-pdf-to-word",
    "how-to-compress-images-online", "how-to-convert-heic-to-jpg",
    "how-to-create-qr-code-free", "how-to-remove-image-background",
    "ilovepdf-alternative", "smallpdf-alternative", "adobe-acrobat-alternative-free",
    "best-free-pdf-tools-2025", "best-online-pdf-editor-free",
    "how-to-reduce-pdf-file-size", "compress-pdf-for-email",
  ]);

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: HIGH_PRIORITY_GUIDE_SLUGS.has(guide.slug) ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...toolRoutes, ...guideRoutes];
}
