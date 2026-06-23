import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/toolRegistry";
import { GUIDES } from "@/lib/guides/index";
import { BLOG_POSTS } from "@/lib/blog/data";

const PASSPORT_COUNTRIES = [
  "us","uk","canada","australia","india","germany","france","spain","italy",
  "netherlands","uae","singapore","japan","china","brazil","mexico",
  "south-africa","nigeria","philippines","malaysia","new-zealand",
  "ireland","switzerland","sweden","saudi-arabia",
];

const RESIZE_PLATFORMS = [
  "instagram-post","instagram-story","facebook-cover","facebook-profile",
  "twitter-header","twitter-post","linkedin-banner","linkedin-profile",
  "youtube-thumbnail","youtube-banner","tiktok-video","whatsapp-dp",
];

const KEYWORD_PAGES = [
  "merge-pdf-without-watermark","pdf-to-word-no-email","remove-background-free",
  "compress-pdf-for-email","heic-to-jpg-batch","convert-jpg-to-pdf-multiple",
  "add-page-numbers-to-pdf-online","split-pdf-online-free","unlock-pdf-online-free",
  "edit-pdf-online-free-no-signup","sign-pdf-online-free","pdf-to-excel-free-online",
  "ocr-pdf-free-online","pdf-to-powerpoint-free-online","fill-pdf-form-online-free",
];

const AUDIENCE_PAGES = ["lawyers","teachers","job-seekers","freelancers"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdfbro.tech";
  // Static launch date for stable content pages
  const launchDate = new Date("2025-05-01");
  // Date SEO improvements were applied
  const seoUpdateDate = new Date("2026-05-23");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/guides`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.92 },
    { url: `${baseUrl}/pdf-tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/image-tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/convert-tools`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: launchDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: launchDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: launchDate, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/about`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.5 },
    // Brand + comparison + use-case pages
    { url: `${baseUrl}/features`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/security`, lastModified: launchDate, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/vs/ilovepdf`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/vs/smallpdf`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/vs/adobe-acrobat`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/for/students`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.78 },
    { url: `${baseUrl}/for/business`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.78 },
    { url: `${baseUrl}/for/developers`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.68 },
    // HTML sitemap — Google follows all links from here to discover all 150+ pages
    { url: `${baseUrl}/sitemap-html`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.6 },
    // Alternatives hub — high-traffic "X alternative" keyword
    { url: `${baseUrl}/alternatives`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    // Competitor comparison pages
    { url: `${baseUrl}/vs/sejda`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/pdf2go`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/pdffiller`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/pdfescape`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/canva`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/google-docs`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/vs/pdf24`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/vs/tinywow`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/vs/pdfcandy`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/vs/dochub`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/vs/foxit`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.80 },
    { url: `${baseUrl}/vs/nitro-pdf`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.80 },
    { url: `${baseUrl}/vs/sodapdf`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.80 },
    { url: `${baseUrl}/vs/lightpdf`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.80 },
    { url: `${baseUrl}/changelog`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.65 },
    // New audience pages
    ...AUDIENCE_PAGES.map((slug) => ({
      url: `${baseUrl}/for/${slug}`,
      lastModified: seoUpdateDate,
      changeFrequency: "monthly" as const,
      priority: 0.76,
    })),
    // Blog
    { url: `${baseUrl}/blog`, lastModified: seoUpdateDate, changeFrequency: "weekly", priority: 0.85 },
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
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: HIGH_PRIORITY_TOOL_SLUGS.has(tool.slug) ? 0.92 : 0.82,
  }));

  // Guide pages — high-competition keywords get 0.92 priority
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
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: HIGH_PRIORITY_GUIDE_SLUGS.has(guide.slug) ? 0.92 : 0.82,
  }));

  const compressPdfToRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/compress-pdf-to/50kb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/compress-pdf-to/100kb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.92 },
    { url: `${baseUrl}/compress-pdf-to/200kb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/compress-pdf-to/500kb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/compress-pdf-to/1mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.92 },
    { url: `${baseUrl}/compress-pdf-to/2mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/compress-pdf-to/5mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/compress-pdf-to/10mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/compress-pdf-to/15mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.80 },
    { url: `${baseUrl}/compress-pdf-to/20mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/compress-pdf-to/25mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/compress-pdf-to/under-100kb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/compress-pdf-to/under-500kb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/compress-pdf-to/under-1mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/compress-pdf-to/under-2mb`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/compress-pdf-to/for-email`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.90 },
    { url: `${baseUrl}/compress-pdf-to/for-government-portal`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.88 },
    { url: `${baseUrl}/compress-pdf-to/for-whatsapp`, lastModified: seoUpdateDate, changeFrequency: "monthly", priority: 0.85 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  const keywordPageRoutes: MetadataRoute.Sitemap = KEYWORD_PAGES.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  const resizeImageForRoutes: MetadataRoute.Sitemap = RESIZE_PLATFORMS.map((platform) => ({
    url: `${baseUrl}/resize-image-for/${platform}`,
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const passportPhotoRoutes: MetadataRoute.Sitemap = PASSPORT_COUNTRIES.map((country) => ({
    url: `${baseUrl}/passport-photo/${country}`,
    lastModified: seoUpdateDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...toolRoutes, ...guideRoutes, ...compressPdfToRoutes, ...blogRoutes, ...keywordPageRoutes, ...resizeImageForRoutes, ...passportPhotoRoutes];
}
