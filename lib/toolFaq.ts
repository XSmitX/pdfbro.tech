// Per-tool FAQ data for SEO rich snippets and on-page content

export interface ToolFaqItem {
  q: string;
  a: string;
}

export interface ToolGuideStep {
  step: number;
  title: string;
  desc: string;
}

export interface ToolSeoContent {
  faq: ToolFaqItem[];
  howTo?: ToolGuideStep[];
}

const DEFAULT_STEPS = (toolName: string): ToolGuideStep[] => [
  { step: 1, title: "Upload your file", desc: `Click the upload area or drag and drop your file into the ${toolName} tool.` },
  { step: 2, title: "Configure options", desc: "Adjust any available settings like quality, page range, or output format." },
  { step: 3, title: "Process and download", desc: "Click the process button and download your result instantly." },
];

const TOOL_SEO: Record<string, ToolSeoContent> = {
  "merge-pdf": {
    howTo: [
      { step: 1, title: "Upload PDF files", desc: "Click to upload or drag and drop two or more PDF files into the merge tool." },
      { step: 2, title: "Arrange the order", desc: "Drag the file cards to reorder them exactly as you want them merged." },
      { step: 3, title: "Merge and download", desc: "Click 'Merge PDFs' and your combined PDF downloads instantly." },
    ],
    faq: [
      { q: "How do I merge PDF files online for free?", a: "Upload your PDF files to PDFBro's Merge PDF tool, arrange them in the order you want, and click Merge. The combined PDF downloads immediately — no signup required." },
      { q: "How many PDFs can I merge at once?", a: "You can merge up to 20 PDF files at once on PDFBro, with a maximum of 100 MB per file." },
      { q: "Is it safe to merge PDFs online?", a: "Yes. PDFBro's PDF merge tool runs entirely in your browser. Your files are never sent to or stored on any server." },
      { q: "Will merging PDFs reduce quality?", a: "No. PDFBro merges PDFs without re-rendering or re-encoding content, so there is no quality loss." },
      { q: "Can I merge PDF files with different page sizes?", a: "Yes. PDFBro can combine PDFs with different page orientations and sizes into a single document." },
    ],
  },
  "split-pdf": {
    howTo: [
      { step: 1, title: "Upload your PDF", desc: "Click to upload or drag and drop the PDF file you want to split." },
      { step: 2, title: "Enter page range", desc: "Specify which pages to extract, e.g., '1-3' or '1,4,7-10'." },
      { step: 3, title: "Split and download", desc: "Click Split and download your extracted pages as a new PDF file." },
    ],
    faq: [
      { q: "How do I split a PDF online for free?", a: "Upload your PDF to PDFBro's Split PDF tool, enter the page range you want (e.g. 1-5), and click Split. Your pages download as a new PDF — completely free, no signup." },
      { q: "Can I split a PDF into individual pages?", a: "Yes. Enter each page number separated by commas to extract individual pages, or use a range like '1-10' to extract a page range." },
      { q: "Is splitting a PDF safe to do online?", a: "Yes. PDFBro processes your PDF entirely in your browser using JavaScript. Nothing is ever uploaded to servers." },
      { q: "What is the maximum PDF size I can split?", a: "PDFBro supports PDF files up to 100 MB for the split tool." },
    ],
  },
  "compress-pdf": {
    howTo: [
      { step: 1, title: "Upload your PDF", desc: "Drag and drop or click to upload the PDF you want to compress." },
      { step: 2, title: "Choose compression level", desc: "Select a compression level: low (best quality), medium (balanced), or high (smallest size)." },
      { step: 3, title: "Compress and download", desc: "Click Compress and download your smaller PDF." },
    ],
    faq: [
      { q: "How do I compress a PDF online for free?", a: "Upload your PDF to PDFBro's Compress PDF tool, choose your compression level, and click Compress. The smaller PDF downloads immediately — no signup needed." },
      { q: "How much can PDF compression reduce file size?", a: "Depending on the content, compression can reduce PDF size by 30–80%. PDFs with many images compress the most." },
      { q: "Does compressing a PDF affect quality?", a: "PDFBro offers multiple compression levels. At low compression, quality is nearly identical to the original. Higher compression reduces image resolution." },
      { q: "Why is my PDF not getting smaller after compression?", a: "PDFs that already have compressed images or mostly contain text may not compress much further. Try the 'High' compression mode for maximum reduction." },
    ],
  },
  "pdf-to-word": {
    howTo: [
      { step: 1, title: "Upload your PDF", desc: "Click to upload or drag and drop the PDF you want to convert to Word." },
      { step: 2, title: "Convert", desc: "Click 'Convert to Word'. The file is securely processed and converted." },
      { step: 3, title: "Download your Word file", desc: "Download your editable .docx Word document." },
    ],
    faq: [
      { q: "How do I convert PDF to Word online for free?", a: "Upload your PDF to PDFBro, click Convert, and download your editable Word (.docx) file. Free, no signup required." },
      { q: "Will the formatting be preserved when converting PDF to Word?", a: "PDFBro extracts text and attempts to preserve heading structure. Complex layouts with tables and columns convert well; scanned PDFs convert best with our OCR PDF tool first." },
      { q: "Is PDF to Word conversion secure?", a: "Files are transmitted over HTTPS, converted immediately on secure servers, and deleted within 1 hour. We never store or share your files." },
      { q: "Can I convert a scanned PDF to Word?", a: "For scanned PDFs, use PDFBro's OCR PDF tool first to extract the text, then convert." },
    ],
  },
  "word-to-pdf": {
    howTo: [
      { step: 1, title: "Upload your Word document", desc: "Click to upload or drag and drop your .doc or .docx file." },
      { step: 2, title: "Convert to PDF", desc: "Click 'Convert to PDF'. The document is securely converted on our servers." },
      { step: 3, title: "Download your PDF", desc: "Download your professionally formatted PDF file." },
    ],
    faq: [
      { q: "How do I convert Word to PDF online for free?", a: "Upload your Word .docx file to PDFBro's Word to PDF tool and click Convert. Your PDF downloads immediately — no Word installation needed, no signup." },
      { q: "Will my Word formatting be preserved in the PDF?", a: "Yes. PDFBro uses professional conversion software that preserves fonts, margins, tables, images, and other formatting from your Word document." },
      { q: "Can I convert .doc files as well as .docx?", a: "Yes. PDFBro supports both legacy .doc and modern .docx Word formats." },
      { q: "Is my Word document safe when converting online?", a: "Files are transmitted over HTTPS, converted, and deleted from our servers within 1 hour. We never read or share your document content." },
    ],
  },
  "compress-image": {
    howTo: [
      { step: 1, title: "Upload your images", desc: "Upload one or multiple JPG, PNG, or WebP images to compress." },
      { step: 2, title: "Set quality level", desc: "Drag the quality slider to balance file size and visual quality." },
      { step: 3, title: "Download compressed images", desc: "Download individual images or all as a ZIP file." },
    ],
    faq: [
      { q: "How do I compress images online for free?", a: "Upload your images to PDFBro's Image Compressor, adjust the quality slider, and download the compressed files — all free, no signup, no watermarks." },
      { q: "What image formats can I compress?", a: "PDFBro supports JPG/JPEG, PNG, and WebP image compression." },
      { q: "How much can image compression reduce file size?", a: "JPEG images can typically be reduced by 40–80% with minimal visible quality loss. PNG files with transparency compress less." },
      { q: "Will compressed images have a watermark?", a: "No. PDFBro never adds watermarks to compressed images. Your files are returned exactly as processed." },
    ],
  },
  "image-to-pdf": {
    howTo: [
      { step: 1, title: "Upload your images", desc: "Upload one or more JPG, PNG, or WebP images." },
      { step: 2, title: "Arrange the order", desc: "Drag images to arrange the page order in your PDF." },
      { step: 3, title: "Convert and download", desc: "Click Convert and download your PDF with each image as a page." },
    ],
    faq: [
      { q: "How do I convert images to PDF online for free?", a: "Upload your JPG, PNG, or WebP images to PDFBro, arrange their order, and click Convert. The PDF downloads instantly — no signup." },
      { q: "Can I convert multiple images to a single PDF?", a: "Yes. Upload up to 30 images and they will all be combined into a single PDF, one image per page, in the order you specify." },
      { q: "What image formats can I convert to PDF?", a: "PDFBro supports JPG, JPEG, PNG, and WebP images for PDF conversion." },
      { q: "What page size will the PDF be?", a: "Each image is placed on a page sized to fit the image. You can also choose from standard sizes like A4 or Letter." },
    ],
  },
  "heic-to-jpg": {
    howTo: [
      { step: 1, title: "Upload HEIC files", desc: "Upload your iPhone HEIC or HEIF photos from your computer or device." },
      { step: 2, title: "Set output quality", desc: "Choose the JPEG quality level if needed (default is high quality)." },
      { step: 3, title: "Download JPG files", desc: "Download your converted JPEG images, compatible with all devices." },
    ],
    faq: [
      { q: "How do I convert HEIC to JPG online for free?", a: "Upload your HEIC files to PDFBro's HEIC to JPG converter and download the converted JPEGs instantly — no software needed, no signup." },
      { q: "What is a HEIC file?", a: "HEIC (High Efficiency Image Container) is Apple's modern photo format used on iPhone and iPad. It offers great quality at small sizes but isn't supported by all devices and apps." },
      { q: "Why can't I open HEIC files on Windows or Android?", a: "HEIC is an Apple-specific format. Windows and Android don't natively support it. Converting to JPG gives you a universally compatible image." },
      { q: "Is HEIC to JPG conversion quality good?", a: "Yes. PDFBro converts HEIC to JPG at high quality. The default quality setting preserves excellent visual fidelity." },
      { q: "Can I convert multiple HEIC files at once?", a: "Yes. PDFBro supports batch HEIC to JPG conversion — upload up to 20 HEIC files at once." },
    ],
  },
  "qr-code-generator": {
    howTo: [
      { step: 1, title: "Enter your content", desc: "Type a URL, plain text, WiFi credentials, email, or phone number." },
      { step: 2, title: "Customize your QR code", desc: "Choose size, error correction level, and foreground/background colors." },
      { step: 3, title: "Download your QR code", desc: "Download as PNG or SVG for print or digital use." },
    ],
    faq: [
      { q: "How do I create a QR code for free?", a: "Enter your URL or text in PDFBro's QR Code Generator, customize the style if desired, and download as PNG or SVG — completely free." },
      { q: "Can I create a QR code for a website URL?", a: "Yes. Enter any URL and PDFBro instantly generates a scannable QR code that opens the link when scanned." },
      { q: "Can I create a QR code for WiFi?", a: "Yes. PDFBro's QR code generator supports WiFi credentials. Enter your network name and password, and the QR code lets people connect just by scanning." },
      { q: "What formats can I download my QR code in?", a: "PDFBro provides QR codes as PNG (for digital and print use) and SVG (for scalable vector graphics, best for large-format printing)." },
      { q: "Are QR codes from PDFBro free to use commercially?", a: "Yes. QR codes you generate on PDFBro are yours to use freely, including for commercial purposes." },
    ],
  },
  "remove-bg": {
    howTo: [
      { step: 1, title: "Upload your image", desc: "Upload a JPG or PNG photo. Works best with subjects that are clearly distinct from the background." },
      { step: 2, title: "Background is removed automatically", desc: "The tool automatically detects and removes the background, leaving the subject on a transparent background." },
      { step: 3, title: "Download transparent PNG", desc: "Download your image as a PNG with a transparent background." },
    ],
    faq: [
      { q: "How do I remove the background from an image online for free?", a: "Upload your image to PDFBro's Remove Background tool. The background is automatically removed and you can download the result as a transparent PNG — free, no signup." },
      { q: "What file formats are supported for background removal?", a: "PDFBro supports JPG and PNG images for background removal. The output is always a transparent PNG." },
      { q: "Does background removal work on all images?", a: "Background removal works best on photos with a clear subject (person, product, animal) against a distinct background. Complex or blurry backgrounds may require manual touch-up." },
      { q: "Will my removed-background image have a watermark?", a: "No. PDFBro never adds watermarks. Your transparent PNG is returned exactly as processed." },
    ],
  },
  "pdf-to-excel": {
    howTo: [
      { step: 1, title: "Upload your PDF", desc: "Upload the PDF file containing tables or data you want in Excel." },
      { step: 2, title: "Convert to Excel", desc: "Click Convert. PDFBro extracts tables and data from your PDF." },
      { step: 3, title: "Download your Excel file", desc: "Download your editable .xlsx spreadsheet with the extracted data." },
    ],
    faq: [
      { q: "How do I convert PDF to Excel online for free?", a: "Upload your PDF to PDFBro's PDF to Excel tool and click Convert. Your .xlsx spreadsheet downloads immediately — no signup required." },
      { q: "Does PDF to Excel preserve table formatting?", a: "PDFBro extracts tabular data and attempts to preserve column structure. Simple tables convert very well; complex multi-column layouts may need some manual cleanup in Excel." },
      { q: "Can I convert a scanned PDF table to Excel?", a: "For scanned PDFs, use PDFBro's OCR PDF tool first to make the text machine-readable, then convert to Excel." },
      { q: "What is the maximum PDF size for Excel conversion?", a: "PDFBro supports PDF files up to 50 MB for PDF to Excel conversion." },
    ],
  },
  "sign-pdf": {
    howTo: [
      { step: 1, title: "Upload your PDF", desc: "Upload the PDF you need to sign." },
      { step: 2, title: "Draw or upload your signature", desc: "Draw your signature on the canvas, type it, or upload an image of your signature." },
      { step: 3, title: "Place and download", desc: "Click where you want the signature on the PDF, then download the signed document." },
    ],
    faq: [
      { q: "How do I sign a PDF online for free?", a: "Upload your PDF to PDFBro's Sign PDF tool, draw or type your signature, place it on the document, and download the signed PDF — no signup, no Adobe Acrobat needed." },
      { q: "Is an electronic signature on PDFBro legally valid?", a: "Electronic signatures are legally recognized in many countries. However, legal validity depends on your jurisdiction and the context. For legally binding contracts, consult a legal professional." },
      { q: "Can I add a handwritten signature to a PDF?", a: "Yes. PDFBro lets you draw your handwritten signature with a mouse or touch screen, then place it anywhere on your PDF." },
      { q: "Does signing a PDF change its content?", a: "Only the signature image is added. The original text and content of your PDF are not altered." },
    ],
  },
  "protect-pdf": {
    faq: [
      { q: "How do I password protect a PDF online for free?", a: "Upload your PDF to PDFBro's Protect PDF tool, enter your desired password, and click Protect. Your password-protected PDF downloads immediately." },
      { q: "What type of password protection does PDFBro use?", a: "PDFBro applies AES-256 encryption to your PDF, which is the strongest PDF encryption standard available." },
      { q: "Can I protect a PDF without Adobe Acrobat?", a: "Yes. PDFBro protects PDFs directly in your browser without any software installation." },
      { q: "Is my PDF safe when I protect it online?", a: "Yes. The encryption process runs entirely in your browser. Your file and password are never sent to our servers." },
    ],
  },
  "unlock-pdf": {
    faq: [
      { q: "How do I remove a password from a PDF online for free?", a: "Upload your password-protected PDF to PDFBro's Unlock PDF tool, enter the current password, and download the unlocked PDF." },
      { q: "Can PDFBro crack a PDF password?", a: "No. PDFBro requires you to know and provide the current password. It removes the encryption restriction once the correct password is verified." },
      { q: "Is unlocking a PDF legal?", a: "Unlocking a PDF you own or have permission to unlock is legal. Do not use this tool to access documents without authorization." },
    ],
  },
  "rotate-pdf": {
    faq: [
      { q: "How do I rotate pages in a PDF online for free?", a: "Upload your PDF to PDFBro's Rotate PDF tool, choose which pages to rotate and by how much (90°, 180°, 270°), and download the corrected PDF." },
      { q: "Can I rotate only specific pages in a PDF?", a: "Yes. PDFBro lets you select individual pages to rotate, so you can fix only the pages that are sideways or upside down." },
      { q: "Will rotating a PDF affect its quality?", a: "No. Rotating a PDF only changes the page orientation metadata — it does not re-render or compress any content." },
    ],
  },
  "ocr-pdf": {
    faq: [
      { q: "What is OCR and why do I need it for PDFs?", a: "OCR (Optical Character Recognition) extracts text from scanned documents or image-based PDFs. Scanned PDFs look like documents but are actually just images — OCR makes their text searchable and copyable." },
      { q: "How do I extract text from a scanned PDF for free?", a: "Upload your scanned PDF to PDFBro's OCR PDF tool. The text is extracted and provided as a downloadable .txt file." },
      { q: "How accurate is PDFBro's OCR?", a: "Accuracy depends on the scan quality. Clear, high-resolution scans of typed text typically achieve 95%+ accuracy. Handwriting and low-quality scans have lower accuracy." },
    ],
  },
  "pdf-to-image": {
    faq: [
      { q: "How do I convert PDF pages to images online for free?", a: "Upload your PDF to PDFBro's PDF to Image tool. Each page is converted to a high-quality PNG or JPEG image and you can download them all as a ZIP file." },
      { q: "What image format does PDF to Image output?", a: "PDFBro can output PNG (lossless, best for text and graphics) or JPEG (smaller size, best for photos). You can choose your preferred format." },
      { q: "Can I convert just one page of a PDF to an image?", a: "Yes. After uploading, you can select specific pages to convert rather than converting all pages." },
    ],
  },
  "resize-image": {
    howTo: [
      { step: 1, title: "Upload your image", desc: "Upload the image you want to resize." },
      { step: 2, title: "Set dimensions", desc: "Enter the new width and height in pixels, or specify a percentage to scale by." },
      { step: 3, title: "Download resized image", desc: "Download your resized image in the same format as the original." },
    ],
    faq: [
      { q: "How do I resize an image online for free?", a: "Upload your image to PDFBro's Image Resizer, enter your target dimensions, and download the resized file — no signup, no watermarks." },
      { q: "Can I resize images without losing quality?", a: "Enlarging images can cause some quality loss (pixelation), as it adds new pixels. Reducing image size typically maintains good quality." },
      { q: "Can I resize multiple images at once?", a: "Yes. Upload multiple images and apply the same dimensions to resize them all in a batch." },
    ],
  },
  "crop-image": {
    faq: [
      { q: "How do I crop an image online for free?", a: "Upload your image to PDFBro's Crop Image tool, drag the crop handles to select the area you want to keep, and download the cropped image." },
      { q: "What aspect ratios does PDFBro support for cropping?", a: "PDFBro supports free-form cropping as well as locked aspect ratios like 1:1 (square), 16:9 (widescreen), 4:3, and 3:2." },
    ],
  },
  "passport-photo": {
    faq: [
      { q: "How do I make a passport photo online for free?", a: "Upload your photo to PDFBro's Passport Photo tool, select your country's standard size (US, UK, EU, etc.), and download a correctly formatted passport photo." },
      { q: "What sizes does the Passport Photo tool support?", a: "PDFBro supports common passport and ID photo standards including US (2x2 inch), EU (35x45mm), UK (35x45mm), and many other international standards." },
      { q: "Does my photo need a white background?", a: "Most passport standards require a white or off-white background. Use PDFBro's Remove Background tool first if your photo has a different background." },
    ],
  },
  "pdf-to-powerpoint": {
    howTo: [
      { step: 1, title: "Upload your PDF", desc: "Upload the PDF you want to convert to a PowerPoint presentation." },
      { step: 2, title: "Convert to PowerPoint", desc: "Click Convert. Each PDF page becomes a PowerPoint slide." },
      { step: 3, title: "Download your PPTX", desc: "Download your editable PowerPoint file, ready to present or edit in PowerPoint or Google Slides." },
    ],
    faq: [
      { q: "How do I convert PDF to PowerPoint online for free?", a: "Upload your PDF to PDFBro's PDF to PowerPoint converter. Each page becomes an editable slide and you download a .pptx file — no signup needed." },
      { q: "Can I edit the slides after converting PDF to PowerPoint?", a: "Yes. The output is a fully editable .pptx file that works in Microsoft PowerPoint, Google Slides, and LibreOffice Impress." },
      { q: "What happens to images in my PDF when converting to PowerPoint?", a: "Images from your PDF are preserved as image objects on the PowerPoint slides." },
    ],
  },
  "text-to-pdf": {
    faq: [
      { q: "How do I convert text to PDF online for free?", a: "Type or paste your text into PDFBro's Text to PDF tool, adjust font size and margins if needed, and click Convert to download your formatted PDF." },
      { q: "Can I customize the font and layout of my text PDF?", a: "Yes. PDFBro lets you set font size, page margins, line spacing, and page size (A4 or Letter)." },
      { q: "Can I convert a .txt file to PDF?", a: "Yes. You can either paste text directly into the editor or upload a .txt file to convert to PDF." },
    ],
  },
  "image-to-webp": {
    faq: [
      { q: "How do I convert images to WebP online for free?", a: "Upload your JPG, PNG, or GIF images to PDFBro's Image to WebP converter and download the optimized WebP files instantly — no signup required." },
      { q: "Why should I convert images to WebP?", a: "WebP images are 25-35% smaller than JPEG or PNG at the same visual quality. Using WebP on your website improves page speed and Core Web Vitals scores." },
      { q: "Are WebP images supported by all browsers?", a: "WebP is supported by all modern browsers including Chrome, Firefox, Safari (since 2020), and Edge. It is the recommended format for web images." },
    ],
  },
  "add-text-to-image": {
    faq: [
      { q: "How do I add text to an image online for free?", a: "Upload your image to PDFBro's Add Text to Image tool, type your text, customize font, size, color, and position, then download the result — no signup, no watermarks." },
      { q: "Can I add multiple lines of text to an image?", a: "Yes. PDFBro lets you add multiple text elements to a single image, each with its own font, size, color, and position." },
      { q: "What image formats can I add text to?", a: "PDFBro supports JPG, PNG, and WebP images for the Add Text to Image tool." },
    ],
  },
};

export function getToolSeoContent(slug: string): ToolSeoContent {
  return (
    TOOL_SEO[slug] ?? {
      faq: [
        { q: `Is ${slug.replace(/-/g, " ")} free to use?`, a: "Yes. This tool is completely free on PDFBro. No signup, no account, and no limits for standard use." },
        { q: "Are my files safe?", a: "Yes. PDFBro processes files in your browser whenever possible. Your files are never stored permanently on any server." },
        { q: "Do I need to install software?", a: "No. PDFBro tools run entirely in your web browser. No download or installation required." },
      ],
      howTo: DEFAULT_STEPS(slug.replace(/-/g, " ")),
    }
  );
}
