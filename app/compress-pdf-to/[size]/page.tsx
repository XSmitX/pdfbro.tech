import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2, PackageOpen } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

interface SizeConfig {
  slug: string;
  label: string;
  bytes: number;
  description: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faq: { q: string; a: string }[];
  keywords: string[];
  useCase: string;
}

const SIZES: SizeConfig[] = [
  {
    slug: "50kb",
    label: "50 KB",
    bytes: 50 * 1024,
    description: "Compress PDF to 50 KB for strict upload limits on government portals and visa applications.",
    metaTitle: "Compress PDF to 50KB Free Online — No Quality Loss | PDFBro",
    metaDescription: "Reduce PDF file size to under 50 KB online free. Perfect for government portals, visa applications, and strict upload limits. No signup, browser-based.",
    h1: "Compress PDF to 50KB — Free Online Tool",
    intro: "Need a PDF under 50KB for a government portal, visa application, or ID verification? PDFBro's compress PDF tool can reduce your file to 50 KB or less while keeping readable text. Many official portals reject PDFs larger than 50KB — compress yours instantly, no signup.",
    keywords: ["compress pdf to 50kb", "reduce pdf to 50 kb online", "compress pdf under 50kb", "pdf under 50kb free", "compress pdf 50kb online", "make pdf 50kb"],
    useCase: "Government ID portals, visa photo uploads, exam registration forms, online application systems with strict file limits.",
    faq: [
      { q: "Can I compress a PDF to exactly 50 KB?", a: "PDFBro can reduce most text-heavy PDFs to under 50 KB using aggressive compression. For image-heavy PDFs, you may need to reduce image resolution first. The tool automatically selects the best compression strategy." },
      { q: "What portals require PDFs under 50 KB?", a: "Indian government portals (passport, PAN card, Aadhaar), visa application sites, university exam registration forms, and many banking portals require PDFs between 10–50 KB for uploaded documents." },
      { q: "Will compressing to 50 KB make my PDF unreadable?", a: "Text remains sharp and readable because fonts are preserved. Images may appear slightly softer at extreme compression levels. The result is optimized for document verification, not photo-quality printing." },
      { q: "How fast can I compress a PDF to 50 KB?", a: "Compression happens entirely in your browser in under 10 seconds for most files. No uploading, no waiting for server processing." },
    ],
  },
  {
    slug: "100kb",
    label: "100 KB",
    bytes: 100 * 1024,
    description: "Compress PDF to 100 KB for job portals, application forms, and email attachments.",
    metaTitle: "Compress PDF to 100KB Free Online — Reduce File Size | PDFBro",
    metaDescription: "Compress PDF to under 100 KB online free. Perfect for job portals, online applications, and email attachments. No signup, no watermarks, browser-based.",
    h1: "Compress PDF to 100KB — Free Online Tool",
    intro: "Most job portals, university applications, and online forms require PDFs under 100 KB. PDFBro compresses your PDF to 100 KB or smaller in seconds — directly in your browser. No software, no signup, no watermarks on your output.",
    keywords: ["compress pdf to 100kb", "reduce pdf size to 100kb", "compress pdf under 100kb", "pdf 100kb compressor", "compress pdf to 100kb online free", "make pdf 100kb"],
    useCase: "Job application portals (Naukri, LinkedIn, Indeed), university admission forms, online exam registration, email attachments with size limits.",
    faq: [
      { q: "How do I compress a PDF to 100 KB?", a: "Upload your PDF to PDFBro's Compress PDF tool at pdfbro.tech/tools/compress-pdf, select 'High' compression level, and download. Most PDFs reduce to 100 KB or less in one pass." },
      { q: "What compression level should I use for 100 KB?", a: "Start with 'High' compression for the smallest file. If text becomes hard to read, switch to 'Medium' which balances file size and quality — most text PDFs reach 100 KB at Medium level." },
      { q: "Can I batch compress multiple PDFs to 100 KB?", a: "Compress each PDF individually with PDFBro's tool. For batch workflows, open the tool in multiple browser tabs — all processing is local and unlimited." },
      { q: "Will my document formatting be preserved?", a: "Yes. PDFBro preserves fonts, page dimensions, and text layout. Only image resolution is reduced to achieve the target file size." },
    ],
  },
  {
    slug: "200kb",
    label: "200 KB",
    bytes: 200 * 1024,
    description: "Compress PDF to 200 KB for online form submissions, scholarship applications, and document uploads.",
    metaTitle: "Compress PDF to 200KB Free Online — Reduce File Size | PDFBro",
    metaDescription: "Compress PDF to under 200 KB online free. Ideal for scholarship applications, online forms, and document portals. No signup, no watermarks.",
    h1: "Compress PDF to 200KB — Free Online Tool",
    intro: "Many scholarship applications, grant submissions, and online forms cap uploads at 200 KB. PDFBro reduces your PDF to 200 KB or smaller without requiring any software or signup. Process runs entirely in your browser.",
    keywords: ["compress pdf to 200kb", "reduce pdf to 200kb online", "compress pdf under 200kb", "pdf 200kb size", "compress pdf to 200kb free", "how to make pdf 200kb"],
    useCase: "Scholarship applications, grant proposals, online competition entries, document verification portals, small business form submissions.",
    faq: [
      { q: "How do I reduce a PDF to 200 KB?", a: "PDFBro's Compress PDF tool with 'Medium' compression typically reduces PDFs to 200 KB while maintaining good readability. Upload, select compression level, and download." },
      { q: "Is 200 KB good enough for document quality?", a: "At 200 KB, text-based PDFs retain excellent readability. Scanned documents remain legible. This is the sweet spot for most online form submissions — small enough to upload, clear enough to read." },
      { q: "Can I compress a scanned PDF to 200 KB?", a: "Yes. Scanned PDFs compress well to 200 KB. For best results, scan at 150–200 DPI grayscale before compressing — this dramatically reduces the original file size." },
      { q: "What if my PDF is still above 200 KB after compression?", a: "Try 'High' compression mode. If still above 200 KB, the file likely contains many high-resolution images — consider splitting it or converting images to a lower resolution first." },
    ],
  },
  {
    slug: "500kb",
    label: "500 KB",
    bytes: 500 * 1024,
    description: "Compress PDF to 500 KB for email attachments, messaging apps, and content management uploads.",
    metaTitle: "Compress PDF to 500KB Free Online — Optimized for Email | PDFBro",
    metaDescription: "Compress PDF to under 500 KB online free. Perfect for Gmail/Outlook attachments, WhatsApp sharing, and CMS uploads. No signup, browser-based.",
    h1: "Compress PDF to 500KB — Free Online Tool",
    intro: "Most email clients and messaging apps have attachment size limits around 25 MB, but smaller files send faster and download instantly. Compress your PDF to 500 KB for lightning-fast sharing via email, WhatsApp, Slack, or any content management system.",
    keywords: ["compress pdf to 500kb", "reduce pdf to 500kb online", "compress pdf under 500kb free", "pdf 500kb size", "compress pdf for gmail", "make pdf smaller 500kb"],
    useCase: "Gmail/Outlook attachments, WhatsApp/Telegram PDF sharing, WordPress/Shopify CMS uploads, Slack document sharing, quick client deliverables.",
    faq: [
      { q: "How do I make a PDF 500 KB for email?", a: "Use PDFBro's Compress PDF tool with 'Medium' compression. Most multi-page documents with images compress to 500 KB easily — perfect for email attachments under Gmail's 25 MB limit." },
      { q: "Will my PDF look professional at 500 KB?", a: "Yes. At 500 KB, most PDFs retain near-original quality in text and images. Only extremely high-resolution photos show slight quality reduction — acceptable for email and screen viewing." },
      { q: "Can I compress a PDF to exactly 500 KB?", a: "The exact output size depends on your original PDF content. PDFBro will get as close as possible. You can fine-tune by choosing Low/Medium/High compression levels." },
      { q: "Is there a daily limit on compressing PDFs?", a: "No. Unlike iLovePDF (2 tasks/hour limit) or Smallpdf (daily cap), PDFBro has zero limits. Compress as many PDFs as you need, any day." },
    ],
  },
  {
    slug: "1mb",
    label: "1 MB",
    bytes: 1024 * 1024,
    description: "Compress PDF to 1 MB for online submissions, client deliverables, and web uploads.",
    metaTitle: "Compress PDF to 1MB Free Online — Reduce to 1 MB | PDFBro",
    metaDescription: "Compress PDF to under 1 MB online free. Ideal for online submissions, client deliverables, and web uploads. Low compression preserves quality. No signup.",
    h1: "Compress PDF to 1MB — Free Online Tool",
    intro: "1 MB is the most common file size target for PDFs — small enough for any email or upload portal, large enough to preserve excellent quality. PDFBro compresses your PDF to 1 MB in seconds using browser-based processing.",
    keywords: ["compress pdf to 1mb", "reduce pdf to 1mb online", "compress pdf under 1mb free", "pdf 1mb compressor", "how to make pdf 1mb", "compress pdf to 1mb without losing quality"],
    useCase: "Client deliverables, design portfolio sharing, online marketplace uploads, freelance platform submissions, standard email attachments.",
    faq: [
      { q: "How do I compress a PDF to 1 MB?", a: "PDFBro's Compress PDF tool with 'Low' compression typically reduces PDFs to 1 MB while maintaining original quality. Upload your PDF, select compression level, and download." },
      { q: "Can I reduce a 10 MB PDF to 1 MB?", a: "Yes. With 'High' compression, PDFBro can reduce a 10 MB PDF to 1 MB. For image-heavy PDFs, expect a 60–90% reduction. Text-based PDFs compress even more dramatically." },
      { q: "What's the best compression for a 1 MB target?", a: "Start with 'Medium' compression. If the result is still above 1 MB, try 'High'. If quality suffers, 'Low' compression still reduces most PDFs significantly while keeping full visual fidelity." },
      { q: "Will 1 MB PDFs print well?", a: "PDFs compressed to 1 MB at 'Low' or 'Medium' settings print well for standard documents. 'High' compression is optimized for screen viewing. For print-quality output, use 'Low' compression." },
    ],
  },
  {
    slug: "2mb",
    label: "2 MB",
    bytes: 2 * 1024 * 1024,
    description: "Compress PDF to 2 MB for high-quality sharing while staying within common upload limits.",
    metaTitle: "Compress PDF to 2MB Free Online — High Quality | PDFBro",
    metaDescription: "Compress PDF to under 2 MB online free with minimal quality loss. Perfect for high-quality document sharing. No signup, no watermarks.",
    h1: "Compress PDF to 2MB — Free Online Tool",
    intro: "Need to reduce a large PDF to 2 MB while keeping professional quality? Many platforms accept files up to 2 MB for profile documents, portfolio submissions, and design proofs. PDFBro compresses with minimal quality loss.",
    keywords: ["compress pdf to 2mb", "reduce pdf to 2mb online", "compress pdf under 2mb free", "pdf 2mb compressor", "reduce pdf file size to 2mb", "make pdf 2mb"],
    useCase: "Design portfolio submissions, professional profile documents, print-on-demand uploads, photography portfolio sharing, high-quality client proofs.",
    faq: [
      { q: "How do I reduce a PDF to 2 MB without losing quality?", a: "Use PDFBro's 'Low' compression mode. It optimizes the PDF structure and compresses images minimally — reducing file size while preserving near-original visual quality." },
      { q: "Can a 20 MB PDF be compressed to 2 MB?", a: "Yes, with 'High' compression mode. The result depends on your file content — text documents compress more than photo-heavy PDFs. Most 20 MB documents reach 2 MB with visible but acceptable quality reduction." },
      { q: "Which platforms require PDFs under 2 MB?", a: "Upwork, Fiverr portfolio uploads, some university thesis submission systems, print-on-demand services (Redbubble, Printful), and professional networking platforms often cap at 2 MB." },
      { q: "Is 2 MB PDF compression free on PDFBro?", a: "Yes. All compression levels are completely free, with no signup, no watermarks, and no daily limits. Compress as many PDFs as you need." },
    ],
  },
  {
    slug: "5mb",
    label: "5 MB",
    bytes: 5 * 1024 * 1024,
    description: "Compress PDF to 5 MB for large document sharing within platform upload limits.",
    metaTitle: "Compress PDF to 5MB Free Online — Large File Compression | PDFBro",
    metaDescription: "Compress large PDFs to under 5 MB online free. Perfect for platform uploads with 5 MB limits. Maintains high quality at low compression. No signup.",
    h1: "Compress PDF to 5MB — Free Online Tool",
    intro: "Many document sharing platforms and government portals cap uploads at 5 MB. PDFBro reduces oversized PDFs to 5 MB with minimal quality loss using light compression. Perfect for large reports, presentations, and scanned documents.",
    keywords: ["compress pdf to 5mb", "reduce pdf to 5mb online", "compress pdf under 5mb free", "pdf 5mb compressor", "large pdf to 5mb", "reduce pdf file size to 5mb"],
    useCase: "Government tender submissions, large report sharing, academic paper submissions, legal document uploads, architecture/engineering plan sharing.",
    faq: [
      { q: "How do I compress a PDF to 5 MB?", a: "Use PDFBro's 'Low' compression — it provides enough reduction for most PDFs to reach 5 MB while keeping near-original quality. Larger files may need 'Medium' compression." },
      { q: "Can I reduce a 50 MB PDF to 5 MB?", a: "Yes, using 'Medium' or 'High' compression. A 50 MB PDF typically contains high-resolution images — reducing to 5 MB requires moderate image compression but text remains sharp." },
      { q: "What's the difference between compressing to 5 MB vs 1 MB?", a: "5 MB compression uses lighter optimization, preserving more image detail and color accuracy. 1 MB compression applies heavier optimization. Choose 5 MB when visual quality matters more than file size." },
      { q: "Does PDFBro support files larger than 100 MB for compression?", a: "PDFBro accepts files up to 100 MB. For files larger than 100 MB, you may need to split the PDF first, compress the parts individually, then merge them back." },
    ],
  },
  {
    slug: "10mb",
    label: "10 MB",
    bytes: 10 * 1024 * 1024,
    description: "Compress PDF to 10 MB for email attachments within common provider limits.",
    metaTitle: "Compress PDF to 10MB Free Online — Email-Friendly | PDFBro",
    metaDescription: "Compress PDF to under 10 MB online free. Safe size for Gmail, Outlook, Yahoo and corporate email. Low compression preserves quality. No signup.",
    h1: "Compress PDF to 10MB — Free Online Tool",
    intro: "10 MB is the universal safe limit for email attachments — works with Gmail, Outlook, Yahoo Mail, and most corporate email servers. PDFBro compresses your PDF to 10 MB in seconds with zero quality loss for text documents.",
    keywords: ["compress pdf to 10mb", "reduce pdf to 10mb online", "compress pdf for email 10mb", "pdf under 10mb free", "large pdf to 10mb"],
    useCase: "Email attachments across all providers, corporate document sharing, client report delivery, team collaboration via Slack/Teams.",
    faq: [
      { q: "Why compress to 10 MB for email?", a: "Most corporate email servers limit attachments to 10 MB. Gmail allows 25 MB but 10 MB ensures your attachment reaches anyone. It's the safest universal size." },
      { q: "Will my PDF look professional at 10 MB?", a: "At 10 MB, 'Low' compression preserves near-original quality. Most documents look identical to the source. Only extremely high-resolution images may show slight optimization." },
      { q: "Can I batch compress multiple PDFs to 10 MB each?", a: "Yes. Process each PDF one at a time — PDFBro has no daily limits so you can compress as many as needed." },
    ],
  },
  {
    slug: "15mb",
    label: "15 MB",
    bytes: 15 * 1024 * 1024,
    description: "Compress PDF to 15 MB for platform uploads with moderate size limits.",
    metaTitle: "Compress PDF to 15MB Free Online | PDFBro",
    metaDescription: "Compress PDF to under 15 MB online free. Ideal for platform uploads and sharing services. Minimal quality loss at low compression. No signup.",
    h1: "Compress PDF to 15MB — Free Online Tool",
    intro: "Many online platforms and document sharing services set upload limits at 15 MB. PDFBro brings your PDF under this threshold quickly with light compression that preserves visual quality.",
    keywords: ["compress pdf to 15mb", "reduce pdf to 15mb", "pdf under 15mb free", "compress pdf 15mb online", "large pdf to 15mb"],
    useCase: "Document sharing platforms, creative portfolio submissions, cloud storage uploads, educational platform submissions.",
    faq: [
      { q: "What platforms limit uploads to 15 MB?", a: "Many LMS platforms (Canvas, Moodle), document signing services, and cloud storage free tiers have 15 MB limits. PDFBro compression ensures your PDF passes all checks." },
      { q: "How much quality is lost compressing to 15 MB?", a: "Almost none at 'Low' compression. Text, fonts, and vector graphics are untouched. Only embedded images may be slightly optimized — usually invisible to the eye." },
    ],
  },
  {
    slug: "20mb",
    label: "20 MB",
    bytes: 20 * 1024 * 1024,
    description: "Compress PDF to 20 MB for Outlook and platform upload limits.",
    metaTitle: "Compress PDF to 20MB Free Online — Outlook Safe | PDFBro",
    metaDescription: "Compress PDF to under 20 MB online free. Works with Outlook, iCloud Mail, and major platforms. Light compression. No signup, no watermarks.",
    h1: "Compress PDF to 20MB — Free Online Tool",
    intro: "Outlook.com caps attachments at 20 MB. iCloud Mail also limits to 20 MB. PDFBro compresses your PDF under this limit with minimal quality loss using light optimization. Get your file delivered.",
    keywords: ["compress pdf to 20mb", "reduce pdf to 20mb", "pdf under 20mb free", "compress pdf for outlook", "pdf 20mb compressor"],
    useCase: "Outlook.com attachments, iCloud Mail, Apple Mail, large presentation sharing, high-quality PDF delivery.",
    faq: [
      { q: "Can I compress a 100 MB PDF to 20 MB?", a: "Yes. 'Medium' compression typically achieves 80% reduction on image-heavy PDFs. A 100 MB file can reach 20 MB with moderate quality impact — text remains sharp." },
      { q: "Is compressing to 20 MB free on PDFBro?", a: "Yes. All PDFBro tools are completely free. No signup, no watermarks, no daily limits. Compress to any size unlimited times." },
    ],
  },
  {
    slug: "25mb",
    label: "25 MB",
    bytes: 25 * 1024 * 1024,
    description: "Compress PDF to 25 MB for Gmail's maximum attachment limit.",
    metaTitle: "Compress PDF to 25MB Free Online — Gmail Ready | PDFBro",
    metaDescription: "Compress PDF to under 25 MB for Gmail's attachment limit. Free, no signup. Light compression preserves quality. Browser-based processing.",
    h1: "Compress PDF to 25MB — Free Online Tool",
    intro: "Gmail allows attachments up to 25 MB — anything larger requires Google Drive sharing. PDFBro compresses your PDF under this limit with the lightest possible compression so your document looks perfect while still attaching directly.",
    keywords: ["compress pdf to 25mb", "reduce pdf to 25mb", "pdf under 25mb gmail", "compress pdf for gmail attachment", "pdf 25mb compressor"],
    useCase: "Gmail direct attachments (over 25 MB triggers Drive link), Yahoo Mail attachments, cross-platform email compatibility.",
    faq: [
      { q: "What happens if my PDF is over 25 MB in Gmail?", a: "Gmail automatically uploads it to Google Drive and sends a link instead of an attachment. Some recipients can't access Drive links. Compress to under 25 MB to send as a direct attachment." },
      { q: "How do I check if my PDF is under 25 MB?", a: "Right-click the file → Properties (Windows) or Get Info (Mac) to check file size. PDFBro shows before/after sizes after compression." },
    ],
  },
  {
    slug: "under-100kb",
    label: "under 100 KB",
    bytes: 100 * 1024,
    description: "Compress PDF to under 100 KB for strict portal limits.",
    metaTitle: "Compress PDF Under 100KB Free Online — Strict Portal Ready | PDFBro",
    metaDescription: "Compress your PDF to under 100 KB for strict government and job portal uploads. Free, no signup, browser-based. High compression, readable text.",
    h1: "Compress PDF Under 100KB — Free Online Tool",
    intro: "Government portals, exam registration systems, and job applications often require PDFs strictly under 100 KB. PDFBro's high compression mode reduces your PDF while keeping text perfectly readable.",
    keywords: ["compress pdf under 100kb", "pdf less than 100kb", "reduce pdf below 100kb", "compress pdf to less than 100kb", "pdf under 100 kb free"],
    useCase: "Strict government portals, competitive exam registration, banking document uploads, ID verification systems.",
    faq: [
      { q: "How do I get my PDF under 100 KB?", a: "Use PDFBro's 'High' compression. For text-heavy PDFs, this is usually sufficient. For image-heavy PDFs, you may also need to convert images to lower resolution first." },
      { q: "What if High compression still doesn't get under 100 KB?", a: "Try splitting your PDF into smaller sections, or convert pages to images at 150 DPI and recombine them. Every page of image data adds to file size." },
    ],
  },
  {
    slug: "under-500kb",
    label: "under 500 KB",
    bytes: 500 * 1024,
    description: "Compress PDF to under 500 KB for quick sharing and messaging apps.",
    metaTitle: "Compress PDF Under 500KB Free Online | PDFBro",
    metaDescription: "Compress PDF to under 500 KB online free. Perfect for WhatsApp, Telegram, and quick sharing. No signup, browser-based, instant download.",
    h1: "Compress PDF Under 500KB — Free Online Tool",
    intro: "500 KB is the sweet spot for messaging app sharing — WhatsApp and Telegram download small files instantly. PDFBro compresses your PDF under 500 KB while maintaining good readability.",
    keywords: ["compress pdf under 500kb", "reduce pdf below 500kb", "pdf smaller than 500kb", "compress pdf for whatsapp", "pdf under 500kb free"],
    useCase: "WhatsApp and Telegram sharing, quick email attachments, social media document sharing, mobile-friendly PDFs.",
    faq: [
      { q: "Can I share a 500 KB PDF on WhatsApp?", a: "Yes. WhatsApp accepts files up to 100 MB, but 500 KB files download instantly even on slow connections. Ideal for quick document sharing." },
      { q: "Will a 500 KB PDF still be readable?", a: "Yes. Text remains sharp at 500 KB. Only high-resolution images in the PDF may show slight compression — still perfectly readable on phone and desktop screens." },
    ],
  },
  {
    slug: "under-1mb",
    label: "under 1 MB",
    bytes: 1024 * 1024,
    description: "Compress PDF to under 1 MB for universal compatibility.",
    metaTitle: "Compress PDF Under 1MB — Free Online | PDFBro",
    metaDescription: "Reduce your PDF to under 1 MB online free. Universal size for all portals, email, and messaging. No signup, no watermarks.",
    h1: "Compress PDF Under 1MB — Free Online Tool",
    intro: "Under 1 MB is the magic number — accepted everywhere, downloads instantly, and still looks professional. PDFBro compresses your PDF under 1 MB with intelligent optimization.",
    keywords: ["compress pdf under 1mb", "reduce pdf below 1mb", "pdf smaller than 1mb", "compress pdf to less than 1mb free", "pdf under 1 mb online"],
    useCase: "Universal file sharing — email, portals, messaging, cloud storage. Accepted by virtually every platform and service.",
    faq: [
      { q: "Is 1 MB small enough for all platforms?", a: "Yes. 1 MB is accepted by all email providers, government portals, job sites, university systems, and messaging apps. It's the most universally compatible PDF size." },
      { q: "How do I ensure my PDF is always under 1 MB?", a: "Use PDFBro's 'Medium' compression as your default. For most documents, this will keep you under 1 MB. Switch to 'High' if needed." },
    ],
  },
  {
    slug: "under-2mb",
    label: "under 2 MB",
    bytes: 2 * 1024 * 1024,
    description: "Compress PDF to under 2 MB with high quality preservation.",
    metaTitle: "Compress PDF Under 2MB Free Online — Quality Preserved | PDFBro",
    metaDescription: "Compress PDF to under 2 MB online free while preserving high quality. Perfect for professional documents. No signup, no watermarks.",
    h1: "Compress PDF Under 2MB — Free Online Tool",
    intro: "Under 2 MB gives you room for higher quality while staying within most platform limits. PDFBro compresses your PDF with light optimization to preserve visual fidelity.",
    keywords: ["compress pdf under 2mb", "reduce pdf below 2mb", "pdf smaller than 2mb", "compress pdf to less than 2mb free", "pdf under 2 mb quality"],
    useCase: "Professional document submissions, portfolio sharing, freelance platform uploads, high-quality client deliverables.",
    faq: [
      { q: "Can I keep print-quality at under 2 MB?", a: "Yes. 'Low' compression at 2 MB preserves print-quality output. Text and vector graphics are untouched. Images receive minimal optimization." },
      { q: "What's the best compression for a 2 MB target?", a: "'Low' compression for maximum quality. 'Medium' if the original file is very large (20 MB+). Both keep excellent readability." },
    ],
  },
  {
    slug: "for-email",
    label: "for Email",
    bytes: 10 * 1024 * 1024,
    description: "Compress PDF to email-friendly sizes for all major providers.",
    metaTitle: "Compress PDF for Email Free — Gmail, Outlook, Yahoo | PDFBro",
    metaDescription: "Compress PDF to send via email. Fits Gmail (25MB), Outlook (20MB), Yahoo (25MB) limits. Free, no signup, browser-based. Instant download.",
    h1: "Compress PDF for Email — Free Online Tool",
    intro: "Email providers have different attachment limits: Gmail 25 MB, Outlook 20 MB, Yahoo 25 MB, corporate email often 10 MB. PDFBro compresses your PDF to fit any provider — choose your target and compress in seconds.",
    keywords: ["compress pdf for email", "reduce pdf for email attachment", "compress pdf for gmail", "compress pdf for outlook", "pdf too large for email"],
    useCase: "Email attachments for Gmail, Outlook, Yahoo Mail, Apple Mail, corporate Exchange servers. Universal email compatibility.",
    faq: [
      { q: "What's the maximum email attachment size?", a: "Gmail: 25 MB, Outlook.com: 20 MB, Yahoo Mail: 25 MB, Apple iCloud: 20 MB. Corporate email is often capped at 10 MB. Compress to under 10 MB to reach everyone." },
      { q: "How do I compress a PDF for Gmail specifically?", a: "Target under 25 MB for Gmail. Use 'Low' compression for most files — it reduces size while preserving quality. For larger files, use 'Medium'." },
    ],
  },
  {
    slug: "for-government-portal",
    label: "for Government Portals",
    bytes: 100 * 1024,
    description: "Compress PDF for government portal uploads with strict size limits.",
    metaTitle: "Compress PDF for Government Portals Free — 50KB, 100KB, 1MB | PDFBro",
    metaDescription: "Compress PDF for government portals, tax filing, visa applications. Meet 50KB, 100KB, 200KB limits. Free, no signup, secure browser-based processing.",
    h1: "Compress PDF for Government Portals — Free Online",
    intro: "Government portals are notorious for strict file size limits — 50 KB for ID documents, 100 KB for forms, 1 MB for supporting documents. PDFBro compresses your PDF to meet any government requirement, with text staying sharp for official verification.",
    keywords: ["compress pdf for government portal", "compress pdf for irs", "compress pdf for immigration", "government pdf upload size", "compress pdf for tax filing"],
    useCase: "IRS e-filing, USCIS immigration forms, passport applications, visa document uploads, tax return submissions, government tender applications.",
    faq: [
      { q: "What size do government portals require?", a: "Varies by agency: Indian portals often 50-100 KB, UK government 5-10 MB, US immigration 2-5 MB, IRS e-filing 2 MB. Check the specific portal requirements before compressing." },
      { q: "Is PDFBro secure for government document compression?", a: "Yes. Processing happens entirely in your browser — your sensitive documents never leave your device. No server upload, no storage, no logs." },
    ],
  },
  {
    slug: "for-whatsapp",
    label: "for WhatsApp",
    bytes: 2 * 1024 * 1024,
    description: "Compress PDF for quick WhatsApp sharing and messaging.",
    metaTitle: "Compress PDF for WhatsApp Free — Small Size, Fast Sharing | PDFBro",
    metaDescription: "Reduce PDF size for WhatsApp sharing. Under 2 MB for instant download on any connection. Free, no signup, browser-based. Share documents fast.",
    h1: "Compress PDF for WhatsApp — Free Online Tool",
    intro: "WhatsApp accepts files up to 100 MB, but large files download slowly on mobile data. Compress your PDF to 2 MB or less for instant sharing — your recipients get the file in seconds, not minutes.",
    keywords: ["compress pdf for whatsapp", "reduce pdf size for whatsapp", "send pdf on whatsapp small size", "whatsapp pdf compressor free", "compress pdf to send on whatsapp"],
    useCase: "WhatsApp document sharing, Telegram PDF sending, Signal file sharing, mobile messaging document delivery.",
    faq: [
      { q: "What size PDF is best for WhatsApp?", a: "Under 2 MB downloads instantly even on slow mobile connections. Under 5 MB is also fine. Over 10 MB may take 30+ seconds on 3G/4G." },
      { q: "Will my PDF look good after WhatsApp compression?", a: "Yes. Use 'Medium' compression for WhatsApp — balances file size and readability. Text is sharp, images are optimized for phone screens." },
    ],
  },
];

export async function generateStaticParams() {
  return SIZES.map((s) => ({ size: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ size: string }> }): Promise<Metadata> {
  const { size } = await params;
  const config = SIZES.find((s) => s.slug === size);
  if (!config) return { title: "Not Found" };

  const url = `${BASE_URL}/compress-pdf-to/${size}`;
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url,
      type: "website",
      siteName: "PDFBro",
      images: [{ url: `${BASE_URL}/favicon/web-app-manifest-512x512.png`, width: 512, height: 512, alt: config.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
      images: [`${BASE_URL}/favicon/web-app-manifest-512x512.png`],
    },
    other: {
      "ai-content-declaration": "human-curated",
      "generator": "PDFBro",
    },
  };
}

function SizeJsonLd({ config }: { config: SizeConfig }) {
  const url = `${BASE_URL}/compress-pdf-to/${config.slug}`;
  const modifyDate = new Date().toISOString().split("T")[0];

  return (
    <Script
      id={`jsonld-compress-${config.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${url}#webpage`,
              url,
              name: config.metaTitle,
              description: config.metaDescription,
              inLanguage: "en-US",
              dateModified: modifyDate,
              isPartOf: { "@id": `${BASE_URL}/#website` },
              breadcrumb: { "@id": `${url}#breadcrumb` },
              about: { "@type": "Thing", name: "PDF Compression", description: config.description },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
                { "@type": "ListItem", position: 2, name: "Compress PDF", item: `${BASE_URL}/tools/compress-pdf` },
                { "@type": "ListItem", position: 3, name: `Compress PDF to ${config.label}`, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: config.faq.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
            {
              "@type": "HowTo",
              "@id": `${url}#howto`,
              name: `How to Compress PDF to ${config.label}`,
              description: config.description,
              inLanguage: "en-US",
              totalTime: "PT1M",
              tool: [{ "@type": "HowToTool", name: "PDFBro", url: BASE_URL }],
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: `Upload your PDF`,
                  text: `Click to upload or drag and drop your PDF file into the compression tool. Maximum file size: 100 MB.`,
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: `Choose compression level`,
                  text: `Select compression level based on your target size of ${config.label}. Use High for aggressive compression, Medium for balanced results.`,
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: `Download compressed PDF`,
                  text: `Click Compress and download your PDF. Most files reach ${config.label} or smaller. If not, try a higher compression level.`,
                },
              ],
            },
          ],
        }),
      }}
    />
  );
}

export default async function CompressPdfToSizePage({ params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const config = SIZES.find((s) => s.slug === size);
  if (!config) notFound();

  return (
    <>
      <SizeJsonLd config={config} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#eab308" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/tools/compress-pdf" className="hover:underline">Compress PDF</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Compress PDF to {config.label}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "#eab30818" }}>
                <PackageOpen className="h-6 w-6" style={{ color: "#eab308" }} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                  {config.h1}
                </h1>
              </div>
            </div>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
              {config.intro}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.08)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.15)" }}>Browser-Based</span>
            </div>
          </div>

          {/* CTA to Compress Tool */}
          <Link
            href="/tools/compress-pdf"
            className="group mb-10 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(234,179,8,0.12), rgba(234,179,8,0.05))", border: "1px solid rgba(234,179,8,0.3)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#eab308" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Compress PDF</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Reduce PDF file size by up to 80% — choose Low, Medium, or High compression</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #eab308, #ca8a04)" }}>
              Compress Now →
            </div>
          </Link>

          {/* Use cases */}
          <section className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              When You Need a PDF Under {config.label}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {config.useCase}
            </p>
          </section>

          {/* How-to steps */}
          <section className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              How to Compress PDF to {config.label} — 3 Simple Steps
            </h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your PDF", desc: "Click to upload or drag and drop your PDF into our compression tool. Works with files up to 100 MB." },
                { step: 2, title: "Choose compression level", desc: `Select compression level: Low (best quality), Medium (balanced), or High (smallest size). For ${config.label}, start with Medium compression.` },
                { step: 3, title: "Download compressed PDF", desc: `Click Compress and your PDF downloads immediately. Most files reach ${config.label} or smaller. If not, try High compression.` },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(234,179,8,0.15)", color: "#eab308" }}>
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

          {/* Why PDFBro */}
          <section className="rounded-2xl p-5 mb-8 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Compress PDF to {config.label}</h2>
            {[
              "100% Free — no subscription, no paywall, no premium tier",
              "No signup required — use instantly, no email, no account",
              "Browser-based processing — your files never leave your device",
              "No watermarks on output — clean PDFs every time",
              "No daily limits — unlike iLovePDF (2/hour) or Smallpdf (2/day)",
              "Works on all devices — desktop, tablet, and mobile browsers",
            ].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
              </div>
            ))}
          </section>

          {/* FAQ */}
          <section className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {config.faq.map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < config.faq.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related size links */}
          <section className="mb-8">
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>Compress PDF to Other Sizes</h2>
            <div className="flex flex-wrap gap-2">
              {SIZES.filter((s) => s.slug !== config.slug).map((s) => (
                <Link
                  key={s.slug}
                  href={`/compress-pdf-to/${s.slug}`}
                  className="rounded-xl px-4 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                >
                  Compress PDF to {s.label} →
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link
              href="/tools/compress-pdf"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}
            >
              Compress Your PDF Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
