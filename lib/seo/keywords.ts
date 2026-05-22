// ============================================================
// CENTRALIZED SEO KEYWORD MAP
// Researched keyword volumes (estimates) — May 2025
// One primary keyword per page to avoid cannibalization
// ============================================================

export interface ToolKeywords {
  primary: string;            // H1 / title primary target
  secondary: string[];        // Meta, H2s, content
  longTail: string[];         // FAQ, guide content
  metaTitle: string;          // ≤ 60 chars, click-optimized
  metaDescription: string;    // ≤ 160 chars, CTA-rich
}

// ── HOMEPAGE ─────────────────────────────────────────────────
export const HOME_KEYWORDS = {
  primary: "free PDF tools online",
  secondary: [
    "online PDF editor free",
    "merge PDF free",
    "compress PDF online",
    "PDF converter free",
    "image compressor online",
    "free online tools no signup",
  ],
  longTail: [
    "free PDF tools no signup no watermark",
    "online PDF tools browser based",
    "merge PDF online free no sign up",
    "compress image without losing quality",
    "free PDF editor no watermark",
  ],
};

// ── TOOL PAGES ────────────────────────────────────────────────
export const TOOL_KEYWORDS: Record<string, ToolKeywords> = {
  "merge-pdf": {
    primary: "merge PDF",
    secondary: ["combine PDF files free", "merge PDF online free", "join PDF files", "PDF merger no signup"],
    longTail: ["merge PDF online free no sign up", "combine multiple PDF files online", "merge PDF without software"],
    metaTitle: "Merge PDF Online Free — Combine PDF Files | PDFBro",
    metaDescription: "Merge multiple PDF files into one document online free. No signup, no watermarks. Drag to reorder, click Merge. Up to 20 files, 100 MB each.",
  },
  "split-pdf": {
    primary: "split PDF",
    secondary: ["split PDF online free", "separate PDF pages", "split PDF into multiple files", "extract pages from PDF"],
    longTail: ["split PDF by page number online free", "separate PDF pages online no signup", "split PDF without Acrobat"],
    metaTitle: "Split PDF Online Free — Extract Pages | PDFBro",
    metaDescription: "Split a PDF into multiple files by page range. Free, no signup, browser-based. Enter page ranges or single pages and download instantly.",
  },
  "compress-pdf": {
    primary: "compress PDF",
    secondary: ["PDF compressor", "reduce PDF size free", "compress PDF without losing quality", "compress PDF online"],
    longTail: ["compress PDF without losing quality free", "reduce PDF file size online free", "compress PDF for email free"],
    metaTitle: "Compress PDF Online Free — Reduce PDF Size | PDFBro",
    metaDescription: "Compress PDF files and reduce size by up to 80% without losing quality. Free, no signup. Choose Low/Medium/High compression. Runs in browser.",
  },
  "sign-pdf": {
    primary: "sign PDF online",
    secondary: ["e-sign PDF free", "electronic signature PDF", "sign PDF without Acrobat", "PDF signature online"],
    longTail: ["sign PDF online free no signup no download", "add electronic signature to PDF free", "sign PDF on iPhone free"],
    metaTitle: "Sign PDF Online Free — E-Sign PDF | PDFBro",
    metaDescription: "Add your electronic signature to any PDF online free. Draw, type, or upload your signature. No Adobe Acrobat, no signup. Legally valid e-signature.",
  },
  "ocr-pdf": {
    primary: "OCR PDF",
    secondary: ["extract text from scanned PDF", "OCR online free", "scanned PDF to text", "searchable PDF free"],
    longTail: ["extract text from scanned PDF online free", "OCR PDF online no signup", "make scanned PDF searchable free"],
    metaTitle: "OCR PDF Free — Extract Text from Scanned PDF | PDFBro",
    metaDescription: "Extract text from scanned PDFs using free OCR online. Convert scanned image-based PDFs to searchable text. Download as .txt. No signup required.",
  },
  "rotate-pdf": {
    primary: "rotate PDF",
    secondary: ["rotate PDF pages online", "fix sideways PDF free", "rotate PDF pages free", "flip PDF pages online"],
    longTail: ["rotate specific pages in PDF online free", "fix sideways PDF pages online no signup"],
    metaTitle: "Rotate PDF Pages Online Free — Fix Orientation | PDFBro",
    metaDescription: "Rotate PDF pages to fix sideways or upside-down pages. Free, no signup. Rotate all pages or select specific ones by 90°, 180°, or 270°.",
  },
  "add-watermark": {
    primary: "add watermark to PDF",
    secondary: ["PDF watermark online free", "watermark PDF without Acrobat", "stamp PDF online", "confidential watermark PDF"],
    longTail: ["add watermark to PDF online free no signup", "stamp CONFIDENTIAL on PDF free"],
    metaTitle: "Add Watermark to PDF Online Free | PDFBro",
    metaDescription: "Add text or image watermarks to every PDF page online free. Customize position, opacity, font, and color. No Acrobat, no signup. Instant download.",
  },
  "unlock-pdf": {
    primary: "remove PDF password",
    secondary: ["unlock PDF online free", "decrypt PDF", "remove PDF encryption", "PDF unlocker online"],
    longTail: ["remove password from PDF online free no signup", "unlock password protected PDF free", "decrypt PDF file online"],
    metaTitle: "Remove PDF Password Free Online — Unlock PDF | PDFBro",
    metaDescription: "Remove password protection from a PDF you own. Free, browser-based, no signup. Enter the current password to download an unlocked PDF instantly.",
  },
  "protect-pdf": {
    primary: "password protect PDF",
    secondary: ["encrypt PDF online free", "secure PDF with password", "password protect PDF free", "AES-256 PDF encryption"],
    longTail: ["password protect PDF online free no software", "add password to PDF without Acrobat", "encrypt PDF free online"],
    metaTitle: "Password Protect PDF Online Free — Encrypt PDF | PDFBro",
    metaDescription: "Password protect any PDF with AES-256 encryption online free. No Adobe Acrobat needed. Add a password to prevent unauthorized access. No signup.",
  },
  "pdf-page-numbers": {
    primary: "add page numbers to PDF",
    secondary: ["PDF page numbering online", "number PDF pages free", "insert page numbers PDF", "PDF header footer"],
    longTail: ["add page numbers to PDF online free no signup", "insert page numbers into PDF without Acrobat"],
    metaTitle: "Add Page Numbers to PDF Online Free | PDFBro",
    metaDescription: "Insert custom page numbers into any PDF online free. Choose position (header/footer), starting number, font size and style. No signup, instant download.",
  },
  "extract-pdf-pages": {
    primary: "extract pages from PDF",
    secondary: ["pull pages from PDF free", "PDF page extractor online", "select PDF pages online", "extract PDF pages free"],
    longTail: ["extract specific pages from PDF online free no signup", "pull individual pages from PDF free"],
    metaTitle: "Extract PDF Pages Online Free — PDF Page Extractor | PDFBro",
    metaDescription: "Extract specific pages from any PDF online free. Click thumbnails or enter page ranges to create a new PDF from selected pages. No signup required.",
  },
  "reorder-pdf-pages": {
    primary: "reorder PDF pages",
    secondary: ["rearrange PDF pages online free", "reorganize PDF pages", "sort PDF pages free", "PDF page organizer"],
    longTail: ["drag and drop to reorder PDF pages online free", "rearrange pages in PDF without Acrobat"],
    metaTitle: "Reorder PDF Pages Online Free — Drag & Drop | PDFBro",
    metaDescription: "Rearrange PDF pages by drag and drop online free. Visually reorganize your document page order and download instantly. No signup, no watermarks.",
  },
  "fill-pdf-form": {
    primary: "fill PDF form online",
    secondary: ["fillable PDF online free", "PDF form filler", "complete PDF form free", "fill PDF without Acrobat"],
    longTail: ["fill out PDF form online free no software", "fillable PDF form free no signup", "fill PDF form in browser"],
    metaTitle: "Fill PDF Form Online Free — No Adobe Acrobat | PDFBro",
    metaDescription: "Fill out PDF forms online free without Adobe Acrobat. Click into fields, type your data, check boxes. Download completed form instantly. No signup.",
  },
  "edit-pdf": {
    primary: "edit PDF online free",
    secondary: ["PDF editor free no watermark", "annotate PDF online", "add text to PDF free", "PDF editor no signup"],
    longTail: ["edit PDF online free no signup no watermark", "free PDF editor no Acrobat", "annotate PDF in browser free"],
    metaTitle: "Edit PDF Online Free — No Acrobat, No Watermark | PDFBro",
    metaDescription: "Edit PDF files online free. Add text, highlights, and shapes to any PDF in your browser. No Adobe Acrobat, no signup, no watermarks. Instant download.",
  },
  "edit-word": {
    primary: "edit Word document online free",
    secondary: ["online Word editor free", "edit DOCX online free", "Word editor no Microsoft Office", "DOCX editor browser"],
    longTail: ["edit Word document online free without Microsoft Word", "open DOCX file online free"],
    metaTitle: "Edit Word Document Online Free — No MS Word | PDFBro",
    metaDescription: "Edit Word .docx documents online free without Microsoft Word. Rich-text editor with formatting, save and download. No signup, no subscription.",
  },
  "image-to-pdf": {
    primary: "image to PDF",
    secondary: ["JPG to PDF online free", "convert image to PDF free", "PNG to PDF converter", "photos to PDF"],
    longTail: ["convert JPG to PDF online free no signup", "multiple images to one PDF free", "photos to PDF free no watermark"],
    metaTitle: "Image to PDF Converter Free Online — JPG, PNG to PDF | PDFBro",
    metaDescription: "Convert JPG, PNG, or WebP images to PDF online free. Combine up to 30 images into one PDF. Arrange order. No signup, no watermarks. Instant download.",
  },
  "pdf-to-image": {
    primary: "PDF to image",
    secondary: ["PDF to JPG online free", "PDF to PNG converter", "convert PDF pages to images", "PDF to JPG converter"],
    longTail: ["convert PDF to JPG online free no signup", "PDF to image converter free no watermark"],
    metaTitle: "PDF to Image Converter Free — PDF to JPG/PNG | PDFBro",
    metaDescription: "Convert PDF pages to high-quality JPG or PNG images online free. Download all pages as a ZIP. No signup, browser-based, no watermarks.",
  },
  "png-to-jpeg": {
    primary: "PNG to JPG",
    secondary: ["convert PNG to JPEG free", "PNG to JPG online", "PNG to JPG converter no signup", "batch PNG to JPG"],
    longTail: ["convert PNG to JPEG online free no signup", "batch PNG to JPG converter free"],
    metaTitle: "PNG to JPG Converter Free Online — Batch Convert | PDFBro",
    metaDescription: "Convert PNG images to JPG/JPEG online free. Adjust quality, handle transparency. Batch convert up to 20 files. No signup, no watermarks.",
  },
  "jpg-to-png": {
    primary: "JPG to PNG",
    secondary: ["convert JPG to PNG free", "JPEG to PNG online", "JPG to PNG converter no signup", "batch JPG to PNG"],
    longTail: ["convert JPEG to PNG online free no signup", "JPG to PNG lossless free"],
    metaTitle: "JPG to PNG Converter Free Online — Lossless | PDFBro",
    metaDescription: "Convert JPG/JPEG images to lossless PNG online free. Batch convert multiple files. No signup, no watermarks. Instant download.",
  },
  "webp-to-jpg": {
    primary: "WebP to JPG",
    secondary: ["convert WebP to JPEG free", "WebP to JPG online", "open WebP file", "WebP converter free"],
    longTail: ["convert WebP to JPG online free no signup", "WebP to JPEG batch converter free"],
    metaTitle: "WebP to JPG Converter Free Online | PDFBro",
    metaDescription: "Convert WebP images to JPG/JPEG online free. Universal compatibility. Batch convert up to 20 files. No software, no signup. Instant download.",
  },
  "webp-to-png": {
    primary: "WebP to PNG",
    secondary: ["convert WebP to PNG free", "WebP to PNG online", "WebP converter transparent"],
    longTail: ["convert WebP to PNG online free no signup", "WebP to PNG with transparency"],
    metaTitle: "WebP to PNG Converter Free Online | PDFBro",
    metaDescription: "Convert WebP images to PNG online free. Preserves transparency. Batch convert up to 20 files. No signup, no watermarks. Instant download.",
  },
  "svg-to-png": {
    primary: "SVG to PNG",
    secondary: ["convert SVG to PNG free", "SVG to PNG online", "vector to PNG", "SVG converter free"],
    longTail: ["convert SVG to PNG online free high resolution", "SVG to PNG any size free"],
    metaTitle: "SVG to PNG Converter Free Online — Any Resolution | PDFBro",
    metaDescription: "Convert SVG vector graphics to high-resolution PNG online free. Choose output size. Batch convert. No signup, no watermarks. Instant download.",
  },
  "svg-to-jpg": {
    primary: "SVG to JPG",
    secondary: ["convert SVG to JPEG free", "SVG to JPG online", "vector to JPEG", "SVG to image converter"],
    longTail: ["convert SVG to JPG online free no signup"],
    metaTitle: "SVG to JPG Converter Free Online | PDFBro",
    metaDescription: "Convert SVG vector files to JPG online free. Batch convert. No signup, no watermarks. Instant download.",
  },
  "gif-to-mp4": {
    primary: "GIF to MP4",
    secondary: ["convert GIF to video free", "animated GIF to MP4", "GIF converter online", "GIF to MP4 free"],
    longTail: ["convert animated GIF to MP4 online free no signup", "GIF to MP4 smaller file size"],
    metaTitle: "GIF to MP4 Converter Free Online — Smaller File | PDFBro",
    metaDescription: "Convert animated GIFs to MP4 video online free. MP4 is 10x smaller than GIF with smoother playback. Fast server-side conversion. No signup.",
  },
  "mp4-to-gif": {
    primary: "MP4 to GIF",
    secondary: ["convert video to GIF free", "MP4 to animated GIF", "video to GIF converter online", "create GIF from video"],
    longTail: ["convert MP4 to GIF online free no signup", "make GIF from video clip free"],
    metaTitle: "MP4 to GIF Converter Free Online | PDFBro",
    metaDescription: "Convert MP4 video clips to animated GIFs online free. Social media ready. Fast server-side conversion. No signup, instant download.",
  },
  "word-to-pdf": {
    primary: "Word to PDF",
    secondary: ["convert Word to PDF free", "DOCX to PDF online", "Word to PDF converter", "Word document to PDF"],
    longTail: ["convert Word to PDF free online no signup", "Word to PDF without Microsoft Office", "DOCX to PDF preserving formatting"],
    metaTitle: "Word to PDF Converter Free Online — Perfect Formatting | PDFBro",
    metaDescription: "Convert Word .doc/.docx to PDF online free. Preserves fonts, images, tables, and all formatting. No Microsoft Word needed. No signup required.",
  },
  "pdf-to-word": {
    primary: "PDF to Word",
    secondary: ["convert PDF to Word free", "PDF to DOCX online", "editable Word from PDF", "PDF to Word converter free"],
    longTail: ["convert PDF to Word free online no signup", "convert scanned PDF to Word free", "PDF to editable Word document"],
    metaTitle: "PDF to Word Converter Free Online — Editable DOCX | PDFBro",
    metaDescription: "Convert PDF to editable Word (.docx) online free. Preserves text, headings, and tables. Works on scanned PDFs too. No signup required.",
  },
  "pdf-to-excel": {
    primary: "PDF to Excel",
    secondary: ["convert PDF to Excel free", "PDF to XLSX online", "extract table from PDF", "PDF data to spreadsheet"],
    longTail: ["convert PDF to Excel online free no signup", "extract tables from PDF to Excel free", "PDF to spreadsheet converter"],
    metaTitle: "PDF to Excel Converter Free Online — Extract Tables | PDFBro",
    metaDescription: "Convert PDF tables to editable Excel (.xlsx) spreadsheets online free. Perfect for invoices, reports, and financial data. No signup required.",
  },
  "pdf-to-powerpoint": {
    primary: "PDF to PowerPoint",
    secondary: ["convert PDF to PPT free", "PDF to PPTX online", "PDF to slides free", "PDF PowerPoint converter"],
    longTail: ["convert PDF to PowerPoint online free no signup", "PDF to editable PowerPoint free"],
    metaTitle: "PDF to PowerPoint Converter Free Online — Editable PPTX | PDFBro",
    metaDescription: "Convert PDF to editable PowerPoint (.pptx) online free. Each page becomes an editable slide. Works in PowerPoint, Google Slides. No signup.",
  },
  "text-to-pdf": {
    primary: "text to PDF",
    secondary: ["TXT to PDF online free", "convert plain text to PDF", "notes to PDF free", "text file to PDF"],
    longTail: ["convert text to PDF online free no signup", "TXT file to PDF free online", "paste text and convert to PDF"],
    metaTitle: "Text to PDF Converter Free Online — TXT to PDF | PDFBro",
    metaDescription: "Convert plain text or .txt files to formatted PDF online free. Choose font, size, margins. No signup, instant download.",
  },
  "pdf-to-text": {
    primary: "extract text from PDF",
    secondary: ["PDF to text free", "copy text from PDF online", "PDF text extractor", "PDF to TXT online"],
    longTail: ["extract text from PDF online free no signup", "copy all text from PDF free", "PDF to plain text converter"],
    metaTitle: "Extract Text from PDF Free Online — PDF to TXT | PDFBro",
    metaDescription: "Extract all text from any PDF online free. Copy to clipboard or download as .txt file. Works on native PDFs. No signup, no watermarks.",
  },
  "image-to-webp": {
    primary: "image to WebP",
    secondary: ["convert image to WebP free", "JPG to WebP online", "PNG to WebP converter", "WebP optimizer free"],
    longTail: ["convert images to WebP online free no signup", "JPG PNG to WebP for website free"],
    metaTitle: "Image to WebP Converter Free — JPG/PNG to WebP | PDFBro",
    metaDescription: "Convert JPG, PNG, or GIF to WebP online free. WebP is 25–35% smaller than JPEG/PNG. Speed up your website. Batch convert. No signup.",
  },
  "heic-to-jpg": {
    primary: "HEIC to JPG",
    secondary: ["convert HEIC to JPEG free", "iPhone photos to JPG", "HEIC converter online", "HEIF to JPG free"],
    longTail: ["convert HEIC to JPG online free without software", "iPhone HEIC photo to JPEG online", "batch HEIC to JPG free"],
    metaTitle: "HEIC to JPG Converter Free Online — iPhone Photos | PDFBro",
    metaDescription: "Convert iPhone HEIC/HEIF photos to JPG online free. Works on PC and Mac. Batch convert up to 20 files. No software, no signup. Instant download.",
  },
  "qr-code-generator": {
    primary: "QR code generator",
    secondary: ["create QR code free", "QR code maker online", "free QR code for URL", "WiFi QR code generator"],
    longTail: ["create QR code for free online no signup", "QR code generator free no expiry", "create WiFi QR code free"],
    metaTitle: "Free QR Code Generator Online — URL, WiFi, Text | PDFBro",
    metaDescription: "Create QR codes free online. Supports URLs, WiFi, text, email, and phone. Download PNG or SVG. No signup, no expiry, commercial use allowed.",
  },
  "compress-image": {
    primary: "compress image online",
    secondary: ["image compressor free", "reduce image file size", "compress JPG PNG WebP", "image optimizer no signup"],
    longTail: ["compress image online free no signup no watermark", "reduce image size without losing quality free", "batch compress images free"],
    metaTitle: "Compress Image Online Free — JPG, PNG, WebP | PDFBro",
    metaDescription: "Compress images online free without losing quality. Reduce JPG, PNG, WebP file size by up to 80%. Batch compress 20 images. No signup, no watermarks.",
  },
  "resize-image": {
    primary: "resize image online",
    secondary: ["image resizer free", "change image size online", "resize JPG PNG free", "image dimensions online"],
    longTail: ["resize image online free no signup", "resize image to exact pixels free", "batch resize images free online"],
    metaTitle: "Resize Image Online Free — Exact Pixels or % | PDFBro",
    metaDescription: "Resize images to exact pixel dimensions or by percentage online free. Lock aspect ratio to prevent distortion. Batch resize 20 images. No signup.",
  },
  "crop-image": {
    primary: "crop image online",
    secondary: ["image cropper free", "crop photo online", "crop to aspect ratio free", "crop JPG PNG online"],
    longTail: ["crop image online free no signup no watermark", "crop photo to 1:1 square free", "crop image to exact size free"],
    metaTitle: "Crop Image Online Free — Any Ratio or Size | PDFBro",
    metaDescription: "Crop images online free with an interactive cropper. Standard ratios (1:1, 16:9, 4:3) or custom dimensions. No signup, no watermarks. Instant download.",
  },
  "remove-bg": {
    primary: "remove background from image",
    secondary: ["background remover online free", "transparent background maker", "remove image background no watermark", "AI background removal"],
    longTail: ["remove background from image online free no signup no watermark", "auto background remover free", "transparent PNG creator free"],
    metaTitle: "Remove Background from Image Free Online | PDFBro",
    metaDescription: "Remove backgrounds from photos automatically online free. Get transparent PNG instantly. AI-powered, no Photoshop, no signup, no watermarks.",
  },
  "passport-photo": {
    primary: "passport photo online free",
    secondary: ["passport photo maker", "ID photo online free", "US passport photo size", "visa photo maker free"],
    longTail: ["make passport photo online free at home", "US passport photo 2x2 free online", "create passport photo from phone free"],
    metaTitle: "Passport Photo Maker Free Online — US, UK, EU | PDFBro",
    metaDescription: "Create passport photos online free. Supports US (2x2\"), UK, EU, and 50+ international standards. Print-ready output. No signup required.",
  },
  "add-text-to-image": {
    primary: "add text to image online",
    secondary: ["text on photo free", "image text editor online", "caption photo free", "meme text generator"],
    longTail: ["add text to image online free no signup no watermark", "add caption to photo free online", "put text on image free"],
    metaTitle: "Add Text to Image Online Free — Captions & Labels | PDFBro",
    metaDescription: "Add text to any image online free. Control font, size, color, position, and opacity. Perfect for captions, memes, and watermarks. No signup.",
  },
  "flip-image": {
    primary: "flip image online",
    secondary: ["mirror image free", "flip photo horizontally", "reverse image online", "mirror photo free"],
    longTail: ["flip image online free no signup", "mirror image horizontally free online", "flip photo without software"],
    metaTitle: "Flip Image Online Free — Mirror Photo | PDFBro",
    metaDescription: "Flip images horizontally or vertically online free. Mirror JPG, PNG, WebP instantly. Batch flip 20 images. No signup, no watermarks.",
  },
};

// ── CATEGORY PAGES ────────────────────────────────────────────
export const CATEGORY_KEYWORDS = {
  "pdf-tools": {
    primary: "free PDF tools online",
    h1: "Free PDF Tools Online — Merge, Split, Compress & Convert",
    secondary: ["online PDF editor free", "best PDF tools 2025", "PDF tools no signup", "free PDF converter"],
    metaTitle: "Free PDF Tools Online — Merge, Split, Compress | PDFBro",
    metaDescription: "Complete suite of free online PDF tools. Merge PDF, split PDF, compress PDF, convert PDF to Word/Excel/PowerPoint, sign, protect. No signup required.",
  },
  "image-tools": {
    primary: "free image tools online",
    h1: "Free Image Tools Online — Compress, Resize, Convert & Edit",
    secondary: ["image compressor online free", "image editor online free", "resize image free", "remove background free"],
    metaTitle: "Free Image Tools Online — Compress, Resize, Edit | PDFBro",
    metaDescription: "Free online image tools: compress, resize, crop, remove backgrounds, convert HEIC to JPG, add text, and more. No signup, no watermarks.",
  },
  "convert-tools": {
    primary: "file converter online free",
    h1: "Free File Conversion Tools Online — PDF, Images, Video",
    secondary: ["PDF converter free", "image format converter", "convert files online no signup", "document converter free"],
    metaTitle: "Free File Converter Online — PDF, Images, Video | PDFBro",
    metaDescription: "Convert PDF, Word, Excel, images, and video files online free. PDF to Word, Word to PDF, HEIC to JPG, Image to WebP, GIF to MP4 and 30+ more.",
  },
};

// ── GUIDES INDEX PAGE ──────────────────────────────────────────
export const GUIDES_INDEX_KEYWORDS = {
  metaTitle: "Free PDF & Image How-To Guides — 50+ Tutorials | PDFBro",
  metaDescription: "50+ free how-to guides for PDF and image tasks. Merge PDF, compress PDF, remove backgrounds, convert HEIC to JPG, alternatives to iLovePDF and more.",
  keywords: [
    "PDF tutorials free",
    "how to merge PDF guide",
    "how to compress PDF free",
    "iLovePDF alternative guide",
    "free PDF tools guide",
    "compress image online tutorial",
    "PDF how-to 2025",
  ],
};

// ── TOOLS INDEX PAGE ───────────────────────────────────────────
export const TOOLS_INDEX_KEYWORDS = {
  metaTitle: "100+ Free PDF & Image Tools Online — No Signup | PDFBro",
  metaDescription: "Browse 100+ free online PDF and image tools. Merge, split, compress, convert, sign PDFs. Compress, resize, crop, convert images. No signup required.",
  h1: "All Free PDF & Image Tools Online",
  keywords: [
    "free PDF tools",
    "online image tools",
    "PDF converter free",
    "image compressor",
    "PDF editor online free",
    "merge PDF free",
    "compress image online",
    "no signup tools",
  ],
};
