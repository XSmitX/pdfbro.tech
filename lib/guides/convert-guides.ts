import type { GuideData } from "./types";

export const CONVERT_GUIDES: GuideData[] = [
  {
    slug: "how-to-create-qr-code-free",
    title: "How to Create a QR Code for Free — URLs, WiFi, Text & More",
    metaTitle: "How to Create QR Code Free Online | URL, WiFi | PDFBro",
    metaDescription: "Create QR codes for free online. Generate QR codes for URLs, WiFi, text, email, or phone numbers. Download as PNG or SVG. No signup, instant download.",
    category: "convert",
    badge: "Tool Guide",
    intro: "QR codes have become a universal bridge between physical and digital — on restaurant menus, business cards, product packaging, event posters, and boarding passes. Creating a professional QR code used to require paid software. PDFBro generates QR codes in seconds, completely free, with no signup.",
    toolSlug: "qr-code-generator",
    sections: [
      {
        heading: "How to Create a QR Code in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Choose your content type", body: "Select what your QR code will encode: URL/website link, plain text, WiFi network credentials, email address, or phone number." },
          { n: 2, title: "Enter your data and customize", body: "Type your URL, text, or other content. Optionally customize size, colors (foreground and background), and error correction level." },
          { n: 3, title: "Download your QR code", body: "Download as PNG (for digital use and standard print) or SVG (for scalable vector print at any size)." },
        ],
      },
      {
        heading: "QR Code Types — What Each One Does",
        body: "**URL QR code:** Opens a website when scanned. The most common type. Can link to any web page — product page, landing page, YouTube video, Google Maps location.\n\n**WiFi QR code:** Encodes network name (SSID) and password. Scanning connects the device automatically without typing. Perfect for Airbnbs, cafés, offices, and events.\n\n**Text QR code:** Encodes plain text. Scanning displays the text in the viewer's QR scanner app. Good for business card information, quotes, or instructions.\n\n**Email QR code:** Opens a compose window pre-filled with recipient email, subject, and body. Convenient for contact forms on printed materials.\n\n**Phone QR code:** Encodes a phone number. Scanning opens the dialer ready to call.",
      },
      {
        heading: "Best Practices for Printing QR Codes",
        body: "**Minimum size:** QR codes must be at least 2×2 cm (about 0.8 inches) for reliable scanning at arm's length. Larger is always better.\n\n**Quiet zone:** QR codes require a white border (quiet zone) of at least 4 modules wide around all edges. Don't crop the QR code tightly.\n\n**Color contrast:** High contrast between the dark modules and light background is essential. Black on white is optimal. Dark-on-dark or light-on-light will fail to scan.\n\n**Download SVG for print:** Use SVG format from PDFBro for any printed material — it's a vector format that prints sharply at any size.\n\n**Test before distributing:** Always scan your QR code with multiple devices (iPhone, Android) before printing or distributing.",
        callout: { type: "warning", text: "Always test your QR code with multiple devices after printing. Paper glossiness and color variation can affect scannability." },
      },
      {
        heading: "Error Correction — What It Means",
        body: "QR codes have built-in error correction that allows them to be scanned even when partially damaged or obscured:\n\n**Level L (Low, ~7% correction):** Use for digital displays where the code will never be physically damaged. Produces slightly simpler pattern.\n\n**Level M (Medium, ~15% correction):** Good default for most uses.\n\n**Level Q (Quartile, ~25% correction):** Better for outdoor signage that may get rained on or lightly vandalized.\n\n**Level H (High, ~30% correction):** Use when you want to overlay a logo in the center of the QR code. The logo covers part of the data, but high error correction rebuilds it.",
      },
    ],
    proTips: [
      "For business cards, use a URL QR code linking to your LinkedIn, website, or Linktree — easily update the destination URL later without reprinting.",
      "Use PDFBro's SVG export for business cards and posters — vector scales to any print size without pixelation.",
      "Add a call-to-action above the QR code ('Scan to connect to WiFi' / 'Scan to visit our menu') — people scan more when they know what the code does.",
    ],
    faq: [
      { q: "Are QR codes from PDFBro free to use commercially?", a: "Yes. QR codes you generate are yours to use freely, including for commercial purposes." },
      { q: "Do QR codes expire?", a: "Standard QR codes (static) never expire. The data is encoded directly in the pattern and works forever. Dynamic QR codes (with redirect services) can expire if the service stops." },
      { q: "What's the best QR code for WiFi sharing?", a: "Use PDFBro's WiFi QR code type. Enter your network SSID, password, and encryption type (WPA/WPA2). Guests scan and connect without typing." },
      { q: "Can I put a logo in the center of my QR code?", a: "Use High (H) error correction level and keep the logo to under 30% of the total QR code area for reliable scanning." },
      { q: "What's the difference between PNG and SVG for QR codes?", a: "PNG is a raster image (pixels) — fine for digital use and small print. SVG is vector — scales to any size without pixelation, essential for large-format printing." },
    ],
    relatedGuides: ["how-to-create-qr-code-free", "best-free-pdf-tools-2025", "how-to-convert-image-to-webp"],
    relatedTools: ["qr-code-generator", "image-to-webp", "add-text-to-image"],
    keywords: ["create QR code free", "QR code generator online", "free QR code maker", "WiFi QR code generator", "QR code for URL free"],
  },

  {
    slug: "how-to-convert-gif-to-mp4",
    title: "How to Convert GIF to MP4 Online Free — Smaller & Smoother",
    metaTitle: "How to Convert GIF to MP4 Free Online | PDFBro Guide",
    metaDescription: "Convert animated GIFs to MP4 video online free. MP4 is 10× smaller than GIF and plays smoother. No software, fast server-side conversion. Instant download.",
    category: "convert",
    badge: "Convert Guide",
    intro: "GIF files are surprisingly large for their quality — a 5-second animation can easily be 10–30 MB. The same animation as MP4 is typically 1–3 MB — 5–15× smaller with dramatically smoother playback. Converting GIF to MP4 is essential for fast-loading websites, social media posts, and messaging apps.",
    toolSlug: "gif-to-mp4",
    sections: [
      {
        heading: "How to Convert GIF to MP4 in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your GIF file", body: "Upload the animated GIF file you want to convert. Supports GIFs up to 100 MB." },
          { n: 2, title: "Convert to MP4", body: "PDFBro converts the GIF to H.264 MP4 video using fast server-side processing. Typical conversion takes 5–15 seconds." },
          { n: 3, title: "Download your MP4", body: "Download the MP4 file — dramatically smaller than the original GIF with smoother, higher-quality animation." },
        ],
      },
      {
        heading: "Why MP4 Is Superior to GIF",
        body: "GIF is a 1987 format that predates modern video compression. It stores animation as sequential frames with a limited 256-color palette per frame — causing color banding and huge file sizes.\n\nMP4 (H.264) uses modern temporal compression — it only stores the pixels that change between frames, plus motion vectors. The result:\n\n| | GIF | MP4 |\n|---|---|---|\n| File size | Large | 5-15× smaller |\n| Color depth | 256 colors | 16+ million colors |\n| Playback smoothness | Often jerky | Smooth |\n| Browser support | Universal | Universal (HTML5 video) |\n| Loop support | Native | Via HTML loop attribute |",
        callout: { type: "tip", text: "For web use, embed the MP4 as an auto-playing, looping, muted video tag: `<video autoplay loop muted playsinline>` — it behaves exactly like a GIF but loads much faster." },
      },
      {
        heading: "When to Keep GIF vs Convert to MP4",
        body: "**Keep GIF when:**\n- Email clients (most don't support embedded video)\n- Some messaging apps that don't support MP4 attachments\n- Platforms that specifically require GIF format\n- Simple 2–3 frame animations where quality difference is negligible\n\n**Convert to MP4 when:**\n- Website embedding (massive page speed improvement)\n- Social media (Twitter/X, Instagram accept both but display MP4 better)\n- Discord and Slack support both but compress GIFs further\n- Any animation with more than a few seconds",
      },
    ],
    proTips: [
      "If you need both formats, convert GIF to MP4 once and keep both. Use MP4 for web and GIF for email.",
      "The MP4 will have no audio track — this is correct for animations that were GIFs.",
    ],
    faq: [
      { q: "Why is GIF so much larger than MP4?", a: "GIF stores every frame completely as an uncompressed palette image. MP4 uses motion compensation and temporal compression, storing only changed pixels between frames." },
      { q: "Will the animation quality improve when converting GIF to MP4?", a: "Yes. MP4 uses full RGB color depth vs GIF's 256-color limit. Colors are more accurate and gradients look smoother." },
      { q: "Can I convert MP4 back to GIF?", a: "Yes. PDFBro's MP4 to GIF tool converts video clips to animated GIFs." },
    ],
    relatedGuides: ["how-to-compress-images-online", "how-to-convert-image-to-webp", "compress-image-for-web"],
    relatedTools: ["gif-to-mp4", "mp4-to-gif", "compress-image"],
    keywords: ["GIF to MP4 free", "convert GIF to video online", "animated GIF to MP4", "GIF converter online free"],
  },

  {
    slug: "how-to-convert-text-to-pdf",
    title: "How to Convert Text to PDF Online Free — Plain Text & Notes",
    metaTitle: "How to Convert Text to PDF Free Online | PDFBro Guide",
    metaDescription: "Convert plain text or .txt files to formatted PDF online free. Choose font size, margins, and page layout. No signup. Instant download.",
    category: "convert",
    badge: "Convert Guide",
    intro: "Turning a plain text document — meeting notes, a script, research notes, log files — into a formatted PDF makes it shareable, printable, and professional. PDFBro's Text to PDF tool gives you instant, clean PDF output with customizable fonts, margins, and page sizes.",
    toolSlug: "text-to-pdf",
    sections: [
      {
        heading: "How to Convert Text to PDF in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Enter or paste your text", body: "Type or paste your text into the editor, or upload a .txt file. Any plain text works." },
          { n: 2, title: "Customize formatting", body: "Choose font, font size, line spacing, page margins, and page size (A4 or Letter). Preview updates in real time." },
          { n: 3, title: "Convert and download", body: "Click Convert to PDF. Your formatted PDF downloads immediately." },
        ],
      },
      {
        heading: "Text to PDF Use Cases",
        body: "**Meeting notes:** Paste from a notes app and generate a clean PDF to share with the team.\n\n**Log files:** Convert developer logs, error reports, or server logs to PDF for archiving or attaching to tickets.\n\n**Scripts and manuscripts:** Convert a text file screenplay or manuscript to a clean PDF for distribution.\n\n**Email text:** Paste an important email conversation to PDF for legal or compliance archiving.\n\n**Quotes and pricing:** Type up a quick quote in plain text format and convert to a professional-looking PDF to send to clients.",
      },
      {
        heading: "Formatting Tips for Better Text PDFs",
        body: "Plain text doesn't have headings, bold, or formatting — but you can improve the output:\n\n**Use blank lines for paragraph spacing:** Two blank lines between sections creates visual breathing room in the PDF.\n\n**ALL CAPS for headings:** Simple way to visually distinguish section titles without markdown support.\n\n**--- dividers ---:** Three dashes create an obvious visual separator between sections.\n\n**Standard font choice:** Inter, Helvetica, or Times New Roman is appropriate. Avoid decorative fonts for formal documents.",
        callout: { type: "tip", text: "For documents needing headers, footers, and complex formatting, convert to Word first with the free Text to PDF tool, then add Word formatting before exporting." },
      },
    ],
    proTips: [
      "Set line spacing to 1.5× for better readability, especially for longer documents.",
      "For code or log files, use a monospace font (Courier) to preserve column alignment.",
    ],
    faq: [
      { q: "Can I upload a .txt file instead of pasting?", a: "Yes. PDFBro accepts .txt file uploads in addition to direct text input." },
      { q: "Does the tool preserve line breaks from my text?", a: "Yes. Single line breaks become line breaks in the PDF. Double line breaks become paragraph breaks." },
      { q: "What page sizes are available?", a: "A4 (international standard) and Letter (US standard, 8.5×11 inches)." },
    ],
    relatedGuides: ["how-to-convert-pdf-to-word", "how-to-compress-pdf", "how-to-extract-text-from-pdf"],
    relatedTools: ["text-to-pdf", "pdf-to-text", "pdf-to-word"],
    keywords: ["text to PDF free", "TXT to PDF online", "convert plain text to PDF", "notes to PDF online"],
  },

  {
    slug: "how-to-extract-text-from-pdf",
    title: "How to Extract Text from a PDF Online Free — Copy & Download",
    metaTitle: "How to Extract Text from PDF Free Online | PDFBro Guide",
    metaDescription: "Extract all text content from any PDF online free. Copy to clipboard or download as .txt file. Works on native PDFs. No signup. Instant download.",
    category: "convert",
    badge: "Convert Guide",
    intro: "Need the text from a PDF but don't want to retype it? PDFBro's PDF to Text tool extracts all readable text from any native PDF (non-scanned) in seconds and lets you copy it or download as a .txt file — completely free, no signup.",
    toolSlug: "pdf-to-text",
    sections: [
      {
        heading: "How to Extract Text from PDF in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your PDF", body: "Upload the PDF you want to extract text from." },
          { n: 2, title: "Text is extracted automatically", body: "PDFBro reads all text layers from the PDF and displays the content." },
          { n: 3, title: "Copy or download the text", body: "Copy all text with one click, or download as a .txt file for use in any text editor, Word, or Google Docs." },
        ],
      },
      {
        heading: "Native PDFs vs Scanned PDFs",
        body: "This is the most important distinction for text extraction:\n\n**Native PDF (works perfectly):** A PDF created digitally — from Word, Excel, a browser, or a PDF printer. Contains actual text data you can select in a PDF reader. PDFBro extracts this text with 100% accuracy.\n\n**Scanned PDF (use OCR instead):** A PDF created by scanning a physical document. The pages are images, not text. You can't select text in a PDF reader. For these, use PDFBro's OCR PDF tool instead.",
        callout: { type: "info", text: "Not sure if your PDF is native or scanned? Try to select text in a PDF reader. If you can highlight and copy text, it's native. If not, it's a scan." },
      },
      {
        heading: "What to Do With Extracted PDF Text",
        body: "**Edit in Word:** Paste into Microsoft Word or Google Docs to reformat, update, and repurpose the content.\n\n**Data extraction:** For structured data like reports or forms, extract text and use Find & Replace to parse fields.\n\n**Translation:** Paste extracted text into Google Translate for quick document translation.\n\n**Text analysis:** Import the .txt file into text analysis tools, AI writing assistants, or data pipelines.\n\n**Compliance archiving:** Some compliance workflows require text-searchable archives — extract and index PDF content.",
      },
    ],
    proTips: [
      "For PDFs with multiple columns, text extraction reads columns left-to-right which may mix up column order in the output.",
      "Headers, footers, and page numbers from the PDF appear in the extracted text — delete these lines in your text editor after extraction.",
    ],
    faq: [
      { q: "What's the difference between PDF to Text and OCR PDF?", a: "PDF to Text extracts existing text data from native PDFs. OCR PDF recognizes text in scanned image-based PDFs. Use OCR for scanned documents." },
      { q: "Is 100% of the text extracted?", a: "For native PDFs with standard text encoding, yes. Some PDFs use unusual encoding or fonts that may produce garbled characters — rare but possible." },
      { q: "Can I extract text from a password-protected PDF?", a: "No. Unlock the PDF first using PDFBro's Unlock PDF tool, then extract text." },
    ],
    relatedGuides: ["how-to-use-ocr-on-pdf", "how-to-convert-text-to-pdf", "how-to-convert-pdf-to-word", "how-to-compress-pdf"],
    relatedTools: ["pdf-to-text", "ocr-pdf", "pdf-to-word"],
    keywords: ["extract text from PDF free", "PDF to text online", "copy text from PDF", "PDF text extractor free", "PDF to TXT online"],
  },

  {
    slug: "how-to-convert-image-to-webp",
    title: "How to Convert Images to WebP — Faster Websites & Core Web Vitals",
    metaTitle: "How to Convert Image to WebP Free Online | PDFBro Guide",
    metaDescription: "Convert JPG, PNG, or GIF to WebP online free. WebP is 25–35% smaller at same quality. Improve web page speed and Core Web Vitals. Batch convert.",
    category: "convert",
    badge: "Convert Guide",
    intro: "WebP has become the recommended web image format — supported by all modern browsers since 2020 and consistently 25–35% smaller than equivalent JPEG or PNG. Switching your website's images to WebP is one of the highest-ROI optimizations you can make for page speed and SEO.",
    toolSlug: "image-to-webp",
    sections: [
      {
        heading: "How to Convert Images to WebP in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your images", body: "Upload JPG, PNG, or GIF images. Batch convert up to 20 files at once." },
          { n: 2, title: "Set WebP quality", body: "Choose quality level (default: 80%). WebP at 80% typically looks identical to JPEG at 90% while being significantly smaller." },
          { n: 3, title: "Download WebP files", body: "Download individual WebP files or all as a ZIP archive." },
        ],
      },
      {
        heading: "WebP Size Comparison — Real Numbers",
        body: "Here's what you actually save converting to WebP:\n\n| Image Type | JPEG | PNG | WebP |\n|---|---|---|---|\n| Product photo | 150 KB | 620 KB | 95 KB |\n| Blog thumbnail | 85 KB | 340 KB | 52 KB |\n| Hero image | 380 KB | 1.2 MB | 230 KB |\n| Logo/icon | 28 KB | 45 KB | 18 KB |\n\nFor a website with 20 page images, switching to WebP typically saves 1–3 MB per page load — a massive speed improvement.",
      },
      {
        heading: "Browser Support — Is WebP Safe to Use?",
        body: "WebP browser support as of 2025:\n\n- **Chrome** (all versions) ✓\n- **Firefox** (since 2019) ✓\n- **Safari** (since iOS 14/macOS Big Sur, 2020) ✓\n- **Edge** (all modern versions) ✓\n- **Samsung Internet** ✓\n\nThis covers 97%+ of global web users. For the 3% on very old browsers, provide a JPEG fallback using the HTML `<picture>` element:\n\n```html\n<picture>\n  <source srcset=\"image.webp\" type=\"image/webp\">\n  <img src=\"image.jpg\" alt=\"Description\">\n</picture>\n```",
        callout: { type: "tip", text: "WordPress users: install the WebP Express plugin to automatically serve WebP to supported browsers with automatic JPEG fallback for older ones." },
      },
    ],
    proTips: [
      "Convert before uploading to your CMS — most platforms store the file as-is, so upload WebP directly.",
      "For GIF animations, WebP supports animation with much better compression than GIF. Use animated WebP for web use.",
    ],
    faq: [
      { q: "Will switching to WebP affect image quality?", a: "At 80% quality, differences are not visible in normal web viewing. WebP's compression is more efficient than JPEG, producing better quality at the same file size." },
      { q: "Does WebP support transparency?", a: "Yes. WebP supports both transparent and animated images, making it a complete replacement for both PNG and GIF." },
      { q: "Should I delete my original JPEG/PNG after converting to WebP?", a: "Keep the originals. Use WebP for web serving, and keep originals for editing and platforms that don't support WebP." },
    ],
    relatedGuides: ["compress-image-for-web", "how-to-compress-images-online", "how-to-convert-png-to-jpg", "how-to-convert-webp-to-jpg"],
    relatedTools: ["image-to-webp", "compress-image", "png-to-jpeg"],
    keywords: ["convert image to WebP free", "JPG to WebP online", "PNG to WebP converter", "image to WebP for website"],
  },

  {
    slug: "how-to-convert-jpg-to-png",
    title: "How to Convert JPG to PNG Online Free — Lossless Quality",
    metaTitle: "How to Convert JPG to PNG Free Online | PDFBro Guide",
    metaDescription: "Convert JPG to PNG online free. Lossless PNG output for design work and transparency needs. Batch convert multiple JPEG files. No signup. Instant download.",
    category: "convert",
    badge: "Convert Guide",
    intro: "JPG to PNG conversion is useful when you need to edit an image further (PNG doesn't lose quality with each save), add transparency, or use it in design tools that prefer PNG. PDFBro converts JPG to PNG in seconds with no quality loss.",
    toolSlug: "jpg-to-png",
    sections: [
      {
        heading: "How to Convert JPG to PNG in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload JPG files", body: "Upload one or multiple JPG/JPEG files. Batch convert up to 20 files." },
          { n: 2, title: "Convert to PNG", body: "PDFBro converts each JPEG to a lossless PNG file." },
          { n: 3, title: "Download PNG files", body: "Download individual PNGs or all as a ZIP archive." },
        ],
      },
      {
        heading: "Why Convert JPG to PNG?",
        body: "**For design work:** PNG supports transparency (alpha channel) — JPEG doesn't. If you need to remove a background or overlay the image on a colored background in a design tool, PNG is required.\n\n**For screenshots:** Screenshots of interfaces, websites, and software look sharper in PNG. JPEGs blur text and sharp edges.\n\n**For further editing:** PNG is lossless — you can save, edit, and re-save without cumulative quality degradation. JPEG loses quality every time you re-save.\n\n**For print:** Print shops sometimes require PNG for graphics with text.",
      },
      {
        heading: "Important: JPG → PNG Doesn't Undo JPEG Compression",
        body: "A critical misunderstanding: converting an already-compressed JPEG to PNG does NOT recover the lost quality from JPEG compression. The PNG will be lossless from that point forward, but any quality already lost to JPEG compression remains lost.\n\nThe PNG will be larger than the JPEG (PNG is lossless and stores more data), but the image content won't be higher quality than the JPEG it came from.\n\nThe correct workflow: work from original high-quality sources in PNG, then export final output as JPEG.",
      },
    ],
    proTips: [
      "If you need transparency, you'll still need to remove the background manually or with PDFBro's Remove Background tool after converting to PNG.",
      "PNG files are significantly larger than JPEG — use this format only when PNG's advantages (transparency, no re-save loss) matter.",
    ],
    faq: [
      { q: "Does JPG to PNG improve image quality?", a: "No. Converting JPEG to PNG makes future saves lossless but doesn't recover quality already lost by JPEG compression." },
      { q: "Why is my PNG file larger than the JPEG?", a: "PNG is a lossless format and stores more data than compressed JPEG. This is expected — PNG quality is higher but files are bigger." },
      { q: "Can I add transparency after converting JPG to PNG?", a: "The converted PNG will have a solid (white) background. Use PDFBro's Remove Background tool to make the background transparent." },
    ],
    relatedGuides: ["how-to-convert-png-to-jpg", "how-to-compress-images-online", "how-to-remove-image-background", "how-to-convert-image-to-webp"],
    relatedTools: ["jpg-to-png", "png-to-jpeg", "remove-bg"],
    keywords: ["JPG to PNG converter free", "convert JPEG to PNG online", "JPG to PNG no signup", "batch JPG to PNG"],
  },

  {
    slug: "how-to-convert-pdf-to-jpg",
    title: "How to Convert PDF Pages to JPG Images Online Free",
    metaTitle: "How to Convert PDF to JPG Free Online | PDFBro Guide",
    metaDescription: "Convert each PDF page to a high-quality JPG or PNG image. Free, no signup, browser-based. Download all images as a ZIP. Step-by-step guide.",
    category: "convert",
    badge: "Convert Guide",
    intro: "Converting PDF pages to images lets you embed PDF content in presentations, websites, and image-only platforms. Whether you need a thumbnail of a specific PDF page or all pages as individual images for a gallery, PDFBro converts them in seconds.",
    toolSlug: "pdf-to-image",
    sections: [
      {
        heading: "How to Convert PDF to Images in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your PDF", body: "Upload the PDF you want to convert to images. Supports files up to 50 MB." },
          { n: 2, title: "Choose output format", body: "Select PNG (lossless, best for text-heavy pages) or JPEG (smaller files, best for pages with photographs)." },
          { n: 3, title: "Download images", body: "Download individual page images or all pages as a ZIP archive." },
        ],
      },
      {
        heading: "PNG vs JPEG for PDF Page Images",
        body: "The output format choice matters:\n\n**PNG (recommended for most PDFs):** Lossless compression preserves text sharpness perfectly. PDF pages with text, charts, and diagrams look crisp at any size. Files are larger but visually perfect.\n\n**JPEG (recommended for photo-heavy PDFs):** Better for PDFs that are mostly photographs — brochures, portfolios, photo books. Smaller files. Text may appear slightly soft.",
      },
      {
        heading: "Common Uses for PDF to Image Conversion",
        body: "**Website galleries:** Display PDF content as an image gallery without requiring a PDF viewer plugin.\n\n**Presentations:** Import a PDF slide as an image into PowerPoint or Google Slides.\n\n**Social media:** Post a PDF page as an image — Twitter/X, LinkedIn, and Instagram support image sharing, not PDF.\n\n**Previews and thumbnails:** Create a preview thumbnail of a document for a website or app.\n\n**Email:** Embed a PDF page as an image in an email instead of attaching a PDF.",
      },
    ],
    proTips: [
      "For high-quality thumbnails, convert at 2× normal size then resize down — this gives sharper results than directly converting to thumbnail size.",
      "For multi-page PDFs, the ZIP download is much faster than downloading individual pages.",
    ],
    faq: [
      { q: "What resolution will the output images be?", a: "PDFBro converts at 150 DPI by default, which is appropriate for screen viewing. For print-quality output, request higher DPI." },
      { q: "Can I convert just one page from a multi-page PDF?", a: "Yes. Use PDFBro's Extract PDF Pages tool to pull out a single page first, then convert that single-page PDF to an image." },
      { q: "What's the quality difference between PNG and JPEG output?", a: "PNG is lossless and looks sharper for text. JPEG is lossy but produces smaller files. For text pages, use PNG. For photo pages, JPEG is fine." },
    ],
    relatedGuides: ["how-to-convert-image-to-pdf", "how-to-compress-pdf", "how-to-split-pdf"],
    relatedTools: ["pdf-to-image", "image-to-pdf", "compress-image"],
    keywords: ["PDF to JPG free", "PDF to image converter", "convert PDF pages to images", "PDF to PNG online"],
  },

  {
    slug: "how-to-flip-image-online",
    title: "How to Flip or Mirror an Image Online Free",
    metaTitle: "How to Flip Image Online Free | Mirror Photo | PDFBro",
    metaDescription: "Flip images horizontally (mirror) or vertically online free. Works with JPG, PNG, WebP. Batch flip multiple images. No signup, no watermarks. Instant download.",
    category: "convert",
    badge: "Image Guide",
    intro: "Flipping an image horizontally creates a mirror image — essential for symmetry design work, correcting selfies taken with a front camera, or creating reflection effects. Vertical flips are used for upside-down corrections and unique design treatments. PDFBro flips images instantly in your browser.",
    toolSlug: "flip-image",
    sections: [
      {
        heading: "How to Flip an Image in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your image(s)", body: "Upload one or multiple JPG, PNG, or WebP images. Batch flip up to 20 files at once." },
          { n: 2, title: "Choose flip direction", body: "Select Horizontal (creates a mirror image — left becomes right) or Vertical (flips upside-down — top becomes bottom)." },
          { n: 3, title: "Download flipped images", body: "Download individual flipped images or all as a ZIP archive." },
        ],
      },
      {
        heading: "Horizontal vs Vertical Flip — When to Use Each",
        body: "**Horizontal flip (mirror image):**\n- Selfies taken on front cameras look mirrored — flip horizontally to match how others see you\n- Create symmetrical compositions for design\n- Correct scanned images where text appears reversed\n- Product photos showing left-hand vs right-hand orientation\n\n**Vertical flip (upside-down):**\n- Correct images accidentally captured upside-down\n- Create reflection effects (flip + place below original)\n- Correct scanning where the page was loaded wrong",
        callout: { type: "tip", text: "Selfies look mirrored to others because front cameras show you a mirror image of yourself. Flip horizontally to see how others see your selfie." },
      },
    ],
    proTips: [
      "Combine flip + Add Text to Image for creating reflection-style social media graphics — flip the image, place below the original, add a gradient fade.",
      "Batch flip all images in a product catalog where the same item needs to face both left and right for different layouts.",
    ],
    faq: [
      { q: "What's the difference between flipping and rotating an image?", a: "Flipping creates a mirror image (reflection). Rotating turns the image by a set angle (90°, 180°, etc.) without mirroring." },
      { q: "Does flipping an image affect its quality?", a: "No. Flipping only changes pixel positions — no compression or re-encoding occurs." },
      { q: "Can I flip multiple images at once?", a: "Yes. Upload up to 20 images and flip them all in one batch." },
    ],
    relatedGuides: ["how-to-rotate-pdf-pages", "how-to-compress-images-online", "how-to-crop-image-online"],
    relatedTools: ["flip-image", "crop-image", "resize-image"],
    keywords: ["flip image online free", "mirror image online", "flip photo horizontally free", "reverse image online"],
  },
];
