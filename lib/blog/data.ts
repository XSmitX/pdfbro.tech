export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: "pdf-guides" | "image-guides" | "comparisons" | "tutorials";
  author: string;
  authorBio: string;
  publishedDate: string;
  modifiedDate: string;
  readTime: number;
  keywords: string[];
  tags: string[];
  imageUrl: string;
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  relatedPosts: string[];
  relatedTools: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-ocr-pdf",
    title: "What Is OCR for PDF? How to Extract Text from Scanned Documents",
    metaTitle: "What Is OCR for PDF? A Complete Beginner's Guide (2026) | PDFBro",
    metaDescription: "Learn what OCR (Optical Character Recognition) is, how it works for PDF documents, and how to extract text from scanned PDFs free. Beginner-friendly guide with step-by-step instructions.",
    excerpt: "OCR (Optical Character Recognition) converts scanned documents and image-based PDFs into searchable, editable text. This guide explains how OCR works, why you need it, and how to use it for free.",
    category: "pdf-guides",
    author: "PDFBro Editorial Team",
    authorBio: "The PDFBro Editorial Team creates guides on PDF tools, document management, and digital workflows. Our content is reviewed by software engineers and technical writers for accuracy.",
    publishedDate: "2025-08-15",
    modifiedDate: new Date().toISOString().split("T")[0],
    readTime: 6,
    keywords: ["what is OCR", "OCR PDF guide", "optical character recognition explained", "extract text from scanned PDF", "how OCR works", "free OCR tools", "OCR technology PDF"],
    tags: ["OCR", "PDF", "scanned documents", "text extraction", "document digitization"],
    imageUrl: "/favicon/web-app-manifest-512x512.png",
    sections: [
      {
        heading: "What Is OCR?",
        body: "OCR stands for **Optical Character Recognition**. It's a technology that converts images of typed, handwritten, or printed text into machine-readable text. When you scan a document, what you actually get is a picture of the text — not the text itself. OCR software analyzes that picture, identifies letters and words, and creates a searchable text file.\n\nOCR has existed since the 1970s but recent advances in machine learning have made it dramatically more accurate. Modern OCR can handle unusual fonts, low-contrast scans, multiple languages, and even handwritten text with high accuracy.\n\nFor PDF users, OCR is the technology that transforms a **scanned PDF** (essentially a photo album of text pages) into a **searchable PDF** (where you can select, copy, and search text). Without OCR, a scanned PDF is just a collection of images — you can't search for a word, copy a paragraph, or use text-to-speech on it."
      },
      {
        heading: "How Does OCR Work?",
        body: "OCR works through a multi-stage process:\n\n| Stage | What Happens |\n|-------|-------------|\n| **1. Preprocessing** | The image is cleaned up — deskewed, de-noised, and converted to grayscale or black-and-white for better contrast. |\n| **2. Text Detection** | The software identifies where text blocks, lines, and individual characters are located on the page. |\n| **3. Character Recognition** | Each character image is compared against a database of known characters (pattern matching) or analyzed using a neural network (AI-based). |\n| **4. Post-processing** | The recognized text is checked against dictionary words and grammar rules to correct errors and improve accuracy. |\n\nModern OCR engines like Tesseract (open source, used by PDFBro) combine traditional pattern matching with AI-based recognition for accuracy rates above 99% on clean documents."
      },
      {
        heading: "Why You Need OCR for PDFs",
        body: "There are several common situations where OCR becomes essential:\n\n**1. Searching Scanned Documents**\nYou scanned a 50-page contract but can't search for specific clauses. OCR makes the entire document searchable.\n\n**2. Copying Text from PDFs**\nYou need to quote a paragraph from a scanned book chapter but can't select the text. OCR extracts it into copyable form.\n\n**3. Making Documents Accessible**\nScreen readers for visually impaired users need actual text — not images of text. OCR makes scanned documents accessible.\n\n**4. Converting Scanned PDFs to Word**\nBefore you can convert a scanned PDF to an editable Word document, OCR must first extract the text. PDFBro's PDF to Word tool includes OCR for scanned documents.\n\n**5. Digital Archiving**\nOrganizations digitizing decades of paper records use OCR to create searchable archives. A searchable digital archive is infinitely more useful than a collection of unsearchable scanned images."
      },
    ],
    faq: [
      { q: "What does OCR stand for in PDF?", a: "OCR stands for Optical Character Recognition. In the context of PDFs, it refers to the technology that converts scanned image-based PDFs into searchable, editable text documents." },
      { q: "How accurate is OCR on PDFs?", a: "Modern OCR achieves 99%+ accuracy on clean, well-scanned documents. Accuracy decreases with low-resolution scans, unusual fonts, handwritten text, or poor contrast. Preprocessing (cleaning up the scan) significantly improves accuracy." },
      { q: "Is OCR free to use?", a: "Yes. PDFBro offers free OCR for PDFs at pdfbro.tech/tools/ocr-pdf with no signup required. The processing happens entirely in your browser. Tesseract OCR, the engine used, is also open source and free." },
      { q: "Can OCR read handwriting?", a: "OCR can read some handwriting, particularly if it's neat and well-spaced. However, handwritten text remains challenging for OCR. Print text recognition is much more reliable than cursive or highly stylized handwriting." },
      { q: "What's the difference between OCR and PDF to Word conversion?", a: "OCR extracts text from images (scanned PDFs). PDF to Word conversion creates an editable Word document — and often uses OCR as a first step when dealing with scanned PDFs. If your PDF is a text-based digital PDF (not scanned), conversion doesn't need OCR." },
    ],
    relatedPosts: ["how-to-use-ocr-on-pdf", "pdf-to-word-vs-ocr"],
    relatedTools: ["ocr-pdf", "pdf-to-word", "pdf-to-text"],
  },
  {
    slug: "how-to-reduce-pdf-file-size",
    title: "How to Reduce PDF File Size: 7 Methods That Actually Work",
    metaTitle: "How to Reduce PDF File Size — 7 Proven Methods (2026) | PDFBro",
    metaDescription: "Learn 7 effective methods to reduce PDF file size. From online compression to manual optimization. Step-by-step guide with comparison of each technique.",
    excerpt: "Struggling with large PDF files? This guide covers 7 proven methods to shrink your PDFs — from one-click online compression to manual optimization techniques. Compare results and choose the best approach.",
    category: "pdf-guides",
    author: "PDFBro Editorial Team",
    authorBio: "The PDFBro Editorial Team creates guides on PDF tools, document management, and digital workflows.",
    publishedDate: "2025-08-01",
    modifiedDate: new Date().toISOString().split("T")[0],
    readTime: 8,
    keywords: ["reduce PDF file size", "how to make PDF smaller", "compress PDF guide", "PDF too large", "reduce PDF size methods", "shrink PDF file", "PDF optimization guide"],
    tags: ["PDF compression", "file optimization", "document management", "file size reduction"],
    imageUrl: "/favicon/web-app-manifest-512x512.png",
    sections: [
      {
        heading: "Why PDF Files Get So Large",
        body: "PDF files can balloon in size for several reasons. Understanding why your PDF is large helps you choose the right reduction method:\n\n**High-Resolution Images:** A single high-resolution photo can be 5–20 MB. A PDF containing multiple such images can quickly exceed 50 MB.\n\n**Embedded Fonts:** Each font used in a PDF can add 50–200 KB per font family. Documents using many fonts accumulate size.\n\n**Unoptimized Scans:** Scanning at 600 DPI color instead of 200 DPI grayscale can produce 10x larger files with no benefit for most documents.\n\n**Redundant Objects:** PDFs edited multiple times may contain old, unused objects (images, fonts, annotations) that bloat the file.\n\n**Uncompressed Streams:** Some PDF creators don't compress content streams, leaving them as raw text that takes up unnecessary space."
      },
      {
        heading: "7 Methods to Reduce PDF File Size",
        body: "Here are 7 proven techniques, ranked from easiest to most technical:\n\n**Method 1: Online Compression (Easiest)**\n\nUse PDFBro's free Compress PDF tool at pdfbro.tech/tools/compress-pdf. Upload your file, choose a compression level, and download. This removes redundant data, compresses images, and optimizes the PDF structure in one step. Most files reduce by 40–80%.\n\n**Method 2: Reduce Image Resolution**\n\nIf your PDF is image-heavy, reducing image resolution has the biggest impact. Most documents only need 150–200 DPI for screen viewing. Use PDFBro's compression at High level to aggressively reduce image resolution.\n\n**Method 3: Remove Unnecessary Pages**\n\nUse PDFBro's Split PDF or Extract PDF Pages tool to remove blank pages, duplicate pages, or pages you don't need. Fewer pages = smaller file.\n\n**Method 4: Convert to Grayscale**\n\nColor data takes 3x more space than grayscale. If your document doesn't need color, convert it to grayscale before creating the PDF. This can reduce file size by 50–70%.\n\n**Method 5: Use Efficient Image Formats**\n\nWhen creating PDFs from images, use JPEG instead of PNG for photos and WebP for the smallest possible file sizes. PNG is lossless but much larger than JPEG at comparable quality.\n\n**Method 6: Recreate the PDF**\n\nSometimes the fastest fix is to print the PDF to a new PDF. This removes all hidden metadata, annotations, and redundant objects. Use your browser's Print → Save as PDF feature.\n\n**Method 7: Compress to a Specific Size**\n\nNeed your PDF under a specific limit? PDFBro offers targeted compression:\n- **Compress PDF to 100 KB** — for strict portal uploads\n- **Compress PDF to 200 KB** — for form submissions\n- **Compress PDF to 1 MB** — for email attachments\n- **Compress PDF to 2 MB** — for high-quality sharing\n\nVisit pdfbro.tech/compress-pdf-to/100kb and similar URLs for size-specific compression guides."
      },
    ],
    faq: [
      { q: "What is the fastest way to reduce PDF file size?", a: "The fastest method is online compression using PDFBro's free Compress PDF tool. Upload, click compress, and download — typically under 30 seconds for most files with no software installation needed." },
      { q: "Why is my PDF still large after compression?", a: "High-resolution embedded images are the most common cause. If your PDF contains 300+ DPI photos, even aggressive compression may only reduce size by 30–50%. For extreme reduction, manually reduce image resolution before creating the PDF." },
      { q: "Can I compress a PDF without losing quality?", a: "Low compression preserves near-original quality while removing redundant data and optimizing structure. You'll typically see 10–30% size reduction with no visible quality loss. High compression visibly reduces image quality but dramatically shrinks file size." },
      { q: "What is the size limit for email attachments?", a: "Gmail limits attachments to 25 MB. Outlook limits to 20 MB. Most business email servers limit to 10–25 MB. PDFBro compresses most files well below these limits. For the fastest email delivery, aim for under 5 MB." },
      { q: "How do I compress a PDF to exactly 100 KB?", a: "Use PDFBro's High compression setting. If the result is still above 100 KB, the file likely contains many images. Visit the Compress PDF to 100 KB guide at pdfbro.tech/compress-pdf-to/100kb for specific techniques." },
    ],
    relatedPosts: ["compress-pdf-for-email", "how-to-compress-pdf", "compress-pdf-to-1mb-free"],
    relatedTools: ["compress-pdf", "compress-image", "split-pdf"],
  },
  {
    slug: "pdf-vs-word",
    title: "PDF vs Word: When to Use Each Format (Complete Guide)",
    metaTitle: "PDF vs Word — When to Use PDF or Word Document | PDFBro",
    metaDescription: "PDF vs Word: Understand the key differences, when to use each format, and how to convert between them. Complete comparison guide for students and professionals.",
    excerpt: "Confused about whether to use PDF or Word? This guide explains the fundamental differences, the strengths of each format, and exactly when to choose one over the other.",
    category: "pdf-guides",
    author: "PDFBro Editorial Team",
    authorBio: "The PDFBro Editorial Team creates guides on PDF tools, document management, and digital workflows.",
    publishedDate: "2025-09-01",
    modifiedDate: new Date().toISOString().split("T")[0],
    readTime: 7,
    keywords: ["PDF vs Word", "when to use PDF", "PDF vs DOCX", "difference between PDF and Word", "PDF format guide", "Word vs PDF comparison"],
    tags: ["PDF", "Microsoft Word", "document formats", "file comparison"],
    imageUrl: "/favicon/web-app-manifest-512x512.png",
    sections: [
      {
        heading: "The Fundamental Difference",
        body: "PDF (Portable Document Format) and Word (DOCX) documents serve fundamentally different purposes:\n\n**PDF is a presentation format.** It preserves the exact layout, fonts, images, and formatting of a document regardless of what device or software opens it. A PDF will look identical on Windows, Mac, iPhone, or Android.\n\n**Word is an editing format.** It's designed for creating and modifying documents. Text reflows, images can be repositioned, and styles can be changed. Word documents can look different depending on the version of Word, installed fonts, and screen size.\n\nThink of PDF as a printed page — fixed and final. Think of Word as a notebook — fluid and editable."
      },
      {
        heading: "When to Use PDF",
        body: "Use PDF when:\n\n**1. The document is final and should not be edited**\nContracts, certificates, resumes, invoices, and official reports should be PDFs to prevent unauthorized changes.\n\n**2. Layout and formatting must be preserved**\nDesign-heavy documents, brochures, and presentations need to look exactly the same on every device.\n\n**3. You're sharing with people who may not have the original software**\nA PDF can be opened on any device without Microsoft Word, Google Docs, or specialized design software.\n\n**4. Legal or compliance requirements demand tamper-evident format**\nDigital signatures, document certification, and long-term archiving are PDF strengths.\n\n**5. You need to protect the document from copying or editing**\nPDFs support password protection, copy restrictions, and print restrictions."
      },
      {
        heading: "When to Use Word",
        body: "Use Word (DOCX) when:\n\n**1. The document is a work in progress**\nDrafts, collaborative documents, and documents that need multiple rounds of edits should stay in Word format.\n\n**2. Multiple people need to edit the same document**\nWord supports tracked changes, comments, and real-time collaboration through cloud services.\n\n**3. You need advanced text formatting**\nStyles, automatic table of contents, mail merge, and complex formatting are Word strengths.\n\n**4. The content will be repurposed**\nIf text will be copied to other documents, emails, or presentations, keep it editable in Word.\n\n**5. File size matters for archiving**\nWord documents are typically smaller than PDFs with equivalent content because they don't embed fonts and images in the same way."
      },
    ],
    faq: [
      { q: "Is PDF better than Word?", a: "Neither is universally better. PDF excels at presenting final documents with perfect formatting. Word excels at creating and editing documents. Choose based on whether the document needs editing (Word) or is final (PDF)." },
      { q: "Can I convert PDF to Word for free?", a: "Yes. PDFBro converts PDF to editable Word (.docx) for free at pdfbro.tech/tools/pdf-to-word. No signup required. The conversion preserves text, tables, and heading structure." },
      { q: "Can I convert Word to PDF for free?", a: "Yes. PDFBro converts Word documents to PDF for free at pdfbro.tech/tools/word-to-pdf. Upload your .docx and download a professionally formatted PDF instantly." },
      { q: "Why does my PDF look different when converted to Word?", a: "PDF stores exact positions while Word uses flowing text. Complex layouts, columns, and custom fonts may not translate perfectly. Converting a simple text PDF to Word produces the best results." },
    ],
    relatedPosts: ["how-to-convert-pdf-to-word", "how-to-convert-word-to-pdf"],
    relatedTools: ["pdf-to-word", "word-to-pdf"],
  },
  {
    slug: "best-free-pdf-editor-no-watermark",
    title: "Best Free PDF Editors 2026 — No Watermark, No Signup, No Limits",
    metaTitle: "Best Free PDF Editors 2026 — No Watermark, No Signup | PDFBro",
    metaDescription: "Compare the best free PDF editors that don't add watermarks. Feature comparison of PDFBro, Sejda, Smallpdf, iLovePDF, and more. Find the truly free PDF editor.",
    excerpt: "Most 'free' PDF editors add watermarks or limit you to 2 files per day. Here are the genuinely free PDF editors with no watermarks, no signup requirements, and no daily limits.",
    category: "comparisons",
    author: "PDFBro Editorial Team",
    authorBio: "The PDFBro Editorial Team creates guides and comparisons of PDF tools and document management solutions.",
    publishedDate: "2025-10-01",
    modifiedDate: new Date().toISOString().split("T")[0],
    readTime: 7,
    keywords: ["best free PDF editor", "free PDF editor no watermark", "PDF editor free no signup", "best free PDF tools 2026", "free PDF editor no limits", "PDF editor comparison"],
    tags: ["PDF editor", "free tools", "comparisons", "PDF software"],
    imageUrl: "/favicon/web-app-manifest-512x512.png",
    sections: [
      {
        heading: "The Problem with 'Free' PDF Editors",
        body: "Many online PDF editors advertise themselves as 'free' but come with significant restrictions:\n\n| Restriction | How Common | Example |\n|------------|-----------|--------|\n| Watermarks on output | Very common | 'Edited with FreePDFEditor.com' stamp on every page |\n| Daily/hourly task limits | Very common | iLovePDF: 2 tasks/hour on free tier |\n| Signup required | Common | Must create account after first file |\n| File size caps | Common | 5 MB limit on free tier |\n| Feature paywalls | Very common | Text editing is paid, only annotations are free |\n\nThis guide identifies PDF editors that are genuinely free — no watermarks, no task limits, no forced signups."
      },
      {
        heading: "Top 5 Truly Free PDF Editors (2026)",
        body: "**1. PDFBro — Best Overall Free PDF Editor**\n\nPDFBro offers 25+ PDF tools including a full PDF editor with text annotation, highlighting, shape drawing, and freehand markup. All tools are **100% free** with no watermark, no signup, and no daily limits. Processing happens in your browser for maximum privacy.\n\n**2. Sejda PDF Editor — Best for Desktop Users**\n\nSejda offers a capable PDF editor with 3 free tasks per hour. The web version adds no watermarks. Desktop version is paid but offers more features. Good for occasional use with basic editing needs.\n\n**3. Smallpdf — Best for Brand Recognition**\n\nSmallpdf offers 2 free tasks per day with no watermarks on free tier output. Well-known brand but very restrictive free tier. Paid plans start at $9/month for unlimited access.\n\n**4. iLovePDF — Best for Mobile App Users**\n\niLovePDF limits free users to 2 tasks per hour. No watermarks on most tools. iOS and Android apps available. Strong for users who need mobile PDF tools with native app experience.\n\n**5. PDFescape — Best for Full Editing**\n\nPDFescape offers a full PDF editor in the browser. Free version limits files to 10 MB and 100 pages. Desktop version available for Windows. Good for users who need actual text editing (not just annotation)."
      },
    ],
    faq: [
      { q: "What is the best completely free PDF editor?", a: "PDFBro is the best completely free PDF editor because it has no watermarks, no signup, no daily limits, and includes annotation, highlighting, shape drawing, and freehand markup — all in the browser with no file uploads." },
      { q: "Do free PDF editors add watermarks?", a: "Many do, but PDFBro never adds watermarks to any output file. Smallpdf and Sejda also don't add watermarks on their free tiers. Always check before using — if the tool previews a watermark on the result, look for an alternative." },
      { q: "Can I edit PDF text for free?", a: "Full text editing (changing existing text in a PDF) is rare in free tools because it requires complex PDF reconstruction. Most free editors offer annotation (adding new text, highlighting, drawing). For full text editing, PDFescape and paid tools like Adobe Acrobat Pro are options." },
      { q: "How do I edit a PDF without installing software?", a: "Use a browser-based PDF editor like PDFBro. Open pdfbro.tech/tools/edit-pdf in any browser, upload your PDF, add annotations, highlights, and shapes, then download the edited file. No installation required." },
    ],
    relatedPosts: ["ilovepdf-alternative", "adobe-acrobat-alternative-free", "best-online-pdf-editor-free"],
    relatedTools: ["edit-pdf", "ocr-pdf", "pdf-to-word"],
  },
  {
    slug: "how-to-sign-pdf-online-free",
    title: "How to Sign a PDF Online for Free — No Printing, No Scanning",
    metaTitle: "How to Sign a PDF Online Free (2026 Guide) | PDFBro",
    metaDescription: "Learn how to sign PDF documents online free without printing or scanning. Step-by-step guide for electronic signatures on contracts, forms, and agreements.",
    excerpt: "Stop printing, signing, and scanning documents. This guide shows you how to add your signature to any PDF online — for free, in under 2 minutes, from any device.",
    category: "tutorials",
    author: "PDFBro Editorial Team",
    authorBio: "The PDFBro Editorial Team creates how-to guides for digital document workflows.",
    publishedDate: "2025-10-15",
    modifiedDate: new Date().toISOString().split("T")[0],
    readTime: 5,
    keywords: ["how to sign a PDF online free", "sign PDF without printing", "electronic signature PDF free", "e-sign PDF guide", "digital signature free", "how to e-sign documents"],
    tags: ["e-signature", "PDF signing", "document signing", "digital signature"],
    imageUrl: "/favicon/web-app-manifest-512x512.png",
    sections: [
      {
        heading: "Why Sign PDFs Online Instead of Printing?",
        body: "The traditional method of signing PDFs is outdated and inefficient:\n\n1. Receive PDF by email\n2. Print the document\n3. Sign with a pen\n4. Scan the signed document\n5. Email the scan back\n\nThis takes 10-15 minutes, requires a printer and scanner, and produces a lower-quality scanned copy. Online PDF signing completes the same process in under 2 minutes from any device — phone, tablet, or computer — with a cleaner result.\n\nElectronic signatures are legally valid in most countries under laws like the **ESIGN Act** (US), **eIDAS** (EU), and similar legislation worldwide."
      },
      {
        heading: "How to Sign a PDF Online for Free (3 Steps)",
        body: "**Step 1: Upload your PDF**\n\nGo to PDFBro's Sign PDF tool at pdfbro.tech/tools/sign-pdf. Click the upload area or drag and drop your PDF file. The tool works entirely in your browser — your file is never uploaded to any server.\n\n**Step 2: Create your signature**\n\nYou have three options:\n- **Draw:** Use your mouse, trackpad, or touchscreen to draw your signature freehand\n- **Type:** Type your name and choose from handwriting-style fonts\n- **Upload:** Upload a photo or scan of your actual handwritten signature\n\nAdjust the size, position, and color of your signature. Place it exactly where it needs to appear on the page.\n\n**Step 3: Download your signed PDF**\n\nClick Apply and your signed PDF downloads instantly. The signature is embedded directly into the PDF file — not as a separate overlay or image layer. Your signed PDF is ready to email, upload, or print."
      },
    ],
    faq: [
      { q: "Are electronic signatures legally valid?", a: "Yes. Electronic signatures are legally valid in most countries. The US ESIGN Act (2000) and EU eIDAS regulation establish that electronic signatures cannot be denied legal effect solely because they are electronic. Most business contracts, NDAs, and agreements can be e-signed." },
      { q: "Is it safe to sign a PDF online?", a: "Yes, when using a browser-based tool like PDFBro. Your PDF never leaves your device — processing happens locally in JavaScript. The signed PDF downloads directly to your device with no intermediary server storing your document." },
      { q: "Can I sign a PDF on my phone for free?", a: "Yes. PDFBro works on mobile browsers (Safari on iPhone, Chrome on Android). Open the Sign PDF tool, upload from your Files app, draw your signature with your finger, and download the signed PDF to your phone." },
      { q: "What's the difference between an electronic signature and a digital signature?", a: "An electronic signature (e-signature) is any electronic indication of intent to sign — a typed name, drawn signature, or uploaded image. A digital signature uses cryptographic technology to verify the signer's identity and that the document hasn't been altered after signing. Digital signatures are more secure but require a digital certificate." },
    ],
    relatedPosts: ["sign-pdf-free-no-subscription", "how-to-fill-pdf-form"],
    relatedTools: ["sign-pdf", "fill-pdf-form", "protect-pdf"],
  },
];

export const BLOG_CATEGORIES = [
  { slug: "pdf-guides", name: "PDF Guides", description: "In-depth guides about PDF tools, formats, and workflows" },
  { slug: "image-guides", name: "Image Guides", description: "Tutorials on image compression, conversion, and editing" },
  { slug: "comparisons", name: "Comparisons", description: "Honest comparisons of PDF tools, editors, and alternatives" },
  { slug: "tutorials", name: "Tutorials", description: "Step-by-step how-to guides for common document tasks" },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(cat: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === cat);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedPosts
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => !!p)
    .slice(0, 3);
}
