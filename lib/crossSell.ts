// Cross-sell recommendations shown after tool processing
export interface CrossSellSuggestion {
  slug: string;
  name: string;
  reason: string;
}

export const CROSS_SELL: Record<string, CrossSellSuggestion[]> = {
  "merge-pdf": [
    { slug: "compress-pdf", name: "Compress PDF", reason: "Make your merged PDF smaller?" },
    { slug: "split-pdf", name: "Split PDF", reason: "Need to extract specific pages instead?" },
    { slug: "protect-pdf", name: "Protect PDF", reason: "Add a password to your merged document?" },
  ],
  "split-pdf": [
    { slug: "merge-pdf", name: "Merge PDF", reason: "Need to combine other files?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Compress those extracted pages?" },
    { slug: "extract-pdf-pages", name: "Extract PDF Pages", reason: "Pull out just a few pages?" },
  ],
  "compress-pdf": [
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine compressed files into one?" },
    { slug: "split-pdf", name: "Split PDF", reason: "Need to compress only part of the file?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress images before adding to PDF?" },
  ],
  "pdf-to-word": [
    { slug: "word-to-pdf", name: "Word to PDF", reason: "Convert back after editing?" },
    { slug: "ocr-pdf", name: "OCR PDF", reason: "If the PDF was scanned, extract text first?" },
    { slug: "pdf-to-text", name: "PDF to Text", reason: "Just need plain text instead of Word?" },
  ],
  "word-to-pdf": [
    { slug: "pdf-to-word", name: "PDF to Word", reason: "Need to extract from PDF instead?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Make the output PDF smaller?" },
    { slug: "protect-pdf", name: "Protect PDF", reason: "Password protect the PDF?" },
  ],
  "sign-pdf": [
    { slug: "fill-pdf-form", name: "Fill PDF Form", reason: "Need to fill form fields too?" },
    { slug: "protect-pdf", name: "Protect PDF", reason: "Password protect the signed document?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Make the signed file smaller to email?" },
  ],
  "edit-pdf": [
    { slug: "sign-pdf", name: "Sign PDF", reason: "Add your signature after editing?" },
    { slug: "ocr-pdf", name: "OCR PDF", reason: "Extract text from scanned pages?" },
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine your edited file with others?" },
  ],
  "ocr-pdf": [
    { slug: "pdf-to-word", name: "PDF to Word", reason: "Convert the extracted text to editable Word?" },
    { slug: "pdf-to-text", name: "PDF to Text", reason: "Just need the plain text output?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Compress the scanned original?" },
  ],
  "remove-bg": [
    { slug: "compress-image", name: "Compress Image", reason: "Compress the transparent PNG?" },
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Add your cutout image to a PDF?" },
    { slug: "resize-image", name: "Resize Image", reason: "Resize the output to exact dimensions?" },
  ],
  "heic-to-jpg": [
    { slug: "compress-image", name: "Compress Image", reason: "Compress the converted photos?" },
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Convert multiple photos to a PDF?" },
    { slug: "resize-image", name: "Resize Image", reason: "Resize the JPGs for sharing?" },
  ],
  "compress-image": [
    { slug: "resize-image", name: "Resize Image", reason: "Need exact pixel dimensions?" },
    { slug: "image-to-webp", name: "Image to WebP", reason: "Convert to WebP for even smaller files?" },
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Put compressed images into a PDF?" },
  ],
  "resize-image": [
    { slug: "compress-image", name: "Compress Image", reason: "Reduce file size after resizing?" },
    { slug: "crop-image", name: "Crop Image", reason: "Need a specific aspect ratio instead?" },
    { slug: "image-to-webp", name: "Image to WebP", reason: "Convert to modern WebP format?" },
  ],
  "crop-image": [
    { slug: "resize-image", name: "Resize Image", reason: "Set exact pixel size after cropping?" },
    { slug: "compress-image", name: "Compress Image", reason: "Reduce file size of the cropped result?" },
    { slug: "remove-bg", name: "Remove Background", reason: "Remove background from your crop?" },
  ],
  "protect-pdf": [
    { slug: "unlock-pdf", name: "Unlock PDF", reason: "Need to remove a password instead?" },
    { slug: "sign-pdf", name: "Sign PDF", reason: "Sign the protected document?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Make it smaller before protecting?" },
  ],
  "unlock-pdf": [
    { slug: "protect-pdf", name: "Protect PDF", reason: "Add a new password after unlocking?" },
    { slug: "pdf-to-word", name: "PDF to Word", reason: "Convert the unlocked PDF to Word?" },
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine the unlocked PDF with others?" },
  ],
  "rotate-pdf": [
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine the fixed PDF with others?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Compress after fixing orientation?" },
    { slug: "extract-pdf-pages", name: "Extract Pages", reason: "Extract the corrected pages?" },
  ],
  "add-watermark": [
    { slug: "protect-pdf", name: "Protect PDF", reason: "Add a password for extra security?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Reduce size after watermarking?" },
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine watermarked file with others?" },
  ],
  "pdf-page-numbers": [
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine the numbered PDF with others?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Compress the numbered document?" },
    { slug: "protect-pdf", name: "Protect PDF", reason: "Password protect the finished document?" },
  ],
  "extract-pdf-pages": [
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine extracted pages with another file?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Compress the extracted pages?" },
    { slug: "split-pdf", name: "Split PDF", reason: "Split by range instead of extracting?" },
  ],
  "reorder-pdf-pages": [
    { slug: "merge-pdf", name: "Merge PDF", reason: "Add more pages to the reordered file?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Compress the reorganized PDF?" },
    { slug: "pdf-page-numbers", name: "PDF Page Numbers", reason: "Add page numbers after reordering?" },
  ],
  "fill-pdf-form": [
    { slug: "sign-pdf", name: "Sign PDF", reason: "Sign the completed form?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Compress before submission?" },
    { slug: "protect-pdf", name: "Protect PDF", reason: "Password protect the filled form?" },
  ],
  "pdf-to-excel": [
    { slug: "pdf-to-word", name: "PDF to Word", reason: "Need text instead of spreadsheet?" },
    { slug: "ocr-pdf", name: "OCR PDF", reason: "For scanned tables, OCR first?" },
    { slug: "word-to-pdf", name: "Word to PDF", reason: "Convert your Excel edits back to PDF?" },
  ],
  "pdf-to-powerpoint": [
    { slug: "pdf-to-word", name: "PDF to Word", reason: "Need text document instead of slides?" },
    { slug: "pdf-to-image", name: "PDF to Image", reason: "Extract pages as images for slides?" },
    { slug: "word-to-pdf", name: "Word to PDF", reason: "Convert back after editing?" },
  ],
  "image-to-pdf": [
    { slug: "compress-pdf", name: "Compress PDF", reason: "Reduce the output PDF size?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress images before converting?" },
    { slug: "pdf-to-image", name: "PDF to Image", reason: "Need to do the reverse conversion?" },
  ],
  "pdf-to-image": [
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Convert the images back to PDF?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress the output images?" },
    { slug: "resize-image", name: "Resize Image", reason: "Resize the extracted images?" },
  ],
  "text-to-pdf": [
    { slug: "pdf-to-text", name: "PDF to Text", reason: "Need to extract text from a PDF instead?" },
    { slug: "compress-pdf", name: "Compress PDF", reason: "Make the output PDF smaller?" },
    { slug: "merge-pdf", name: "Merge PDF", reason: "Combine with existing PDFs?" },
  ],
  "pdf-to-text": [
    { slug: "text-to-pdf", name: "Text to PDF", reason: "Convert text back to formatted PDF?" },
    { slug: "ocr-pdf", name: "OCR PDF", reason: "For scanned PDFs, try OCR instead?" },
    { slug: "pdf-to-word", name: "PDF to Word", reason: "Need editable format with formatting?" },
  ],
  "image-to-webp": [
    { slug: "compress-image", name: "Compress Image", reason: "Already small? Compress further?" },
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Put WebP images into a PDF?" },
    { slug: "remove-bg", name: "Remove Background", reason: "Remove background before converting?" },
  ],
  "passport-photo": [
    { slug: "compress-image", name: "Compress Image", reason: "Compress the photo to meet upload limits?" },
    { slug: "remove-bg", name: "Remove Background", reason: "Need a plain white background?" },
    { slug: "resize-image", name: "Resize Image", reason: "Fine-tune the dimensions?" },
  ],
  "qr-code-generator": [
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Put the QR code into a PDF document?" },
    { slug: "add-text-to-image", name: "Add Text to Image", reason: "Add a label above the QR code?" },
    { slug: "compress-image", name: "Compress Image", reason: "Optimize the QR code PNG for web?" },
  ],
  "add-text-to-image": [
    { slug: "remove-bg", name: "Remove Background", reason: "Clean up the image first?" },
    { slug: "compress-image", name: "Compress Image", reason: "Optimize after adding text?" },
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Convert the edited image to PDF?" },
  ],
  "flip-image": [
    { slug: "resize-image", name: "Resize Image", reason: "Resize the mirrored image?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress after flipping?" },
    { slug: "crop-image", name: "Crop Image", reason: "Crop the flipped result?" },
  ],
  "gif-to-mp4": [
    { slug: "mp4-to-gif", name: "MP4 to GIF", reason: "Need to convert back to GIF?" },
    { slug: "compress-image", name: "Compress Image", reason: "Optimize the source GIF first?" },
  ],
  "mp4-to-gif": [
    { slug: "gif-to-mp4", name: "GIF to MP4", reason: "Need to convert back to MP4?" },
    { slug: "compress-image", name: "Compress Image", reason: "Optimize other image files?" },
  ],
  "jpg-to-png": [
    { slug: "png-to-jpeg", name: "PNG to JPEG", reason: "Need JPEG instead of PNG?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress the converted PNG?" },
    { slug: "image-to-webp", name: "Image to WebP", reason: "Convert to WebP instead?" },
  ],
  "png-to-jpeg": [
    { slug: "jpg-to-png", name: "JPG to PNG", reason: "Need lossless PNG instead?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress the JPEG further?" },
    { slug: "image-to-webp", name: "Image to WebP", reason: "Try WebP for better compression?" },
  ],
  "webp-to-jpg": [
    { slug: "compress-image", name: "Compress Image", reason: "Compress the new JPEG files?" },
    { slug: "image-to-pdf", name: "Image to PDF", reason: "Put converted images into a PDF?" },
    { slug: "webp-to-png", name: "WebP to PNG", reason: "Need lossless PNG instead?" },
  ],
  "webp-to-png": [
    { slug: "webp-to-jpg", name: "WebP to JPG", reason: "Need smaller JPEG instead?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress the PNG output?" },
    { slug: "image-to-webp", name: "Image to WebP", reason: "Convert other formats to WebP?" },
  ],
  "svg-to-png": [
    { slug: "svg-to-jpg", name: "SVG to JPG", reason: "Need JPEG instead of PNG?" },
    { slug: "resize-image", name: "Resize Image", reason: "Resize the output PNG?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress the rendered PNG?" },
  ],
  "svg-to-jpg": [
    { slug: "svg-to-png", name: "SVG to PNG", reason: "Need lossless PNG instead?" },
    { slug: "compress-image", name: "Compress Image", reason: "Compress the JPG output?" },
  ],
  "edit-word": [
    { slug: "word-to-pdf", name: "Word to PDF", reason: "Convert edited document to PDF?" },
    { slug: "pdf-to-word", name: "PDF to Word", reason: "Need to convert a PDF to Word first?" },
    { slug: "text-to-pdf", name: "Text to PDF", reason: "Just need plain text to PDF?" },
  ],
  "word-counter": [
    { slug: "text-to-pdf", name: "Text to PDF", reason: "Convert your text to a PDF?" },
    { slug: "markdown-to-html", name: "Markdown to HTML", reason: "Convert Markdown with word count?" },
  ],
  "json-formatter": [
    { slug: "base64-encoder", name: "Base64 Encoder", reason: "Encode JSON to Base64?" },
    { slug: "hash-generator", name: "Hash Generator", reason: "Generate a hash of your JSON?" },
  ],
  "password-generator": [
    { slug: "protect-pdf", name: "Protect PDF", reason: "Use your new password on a PDF?" },
    { slug: "hash-generator", name: "Hash Generator", reason: "Hash your new password?" },
  ],
  "url-encoder": [
    { slug: "qr-code-generator", name: "QR Code Generator", reason: "Create a QR code from your URL?" },
    { slug: "json-formatter", name: "JSON Formatter", reason: "Format URL-encoded JSON?" },
  ],
  "markdown-to-html": [
    { slug: "text-to-pdf", name: "Text to PDF", reason: "Convert your rendered HTML to PDF?" },
    { slug: "json-formatter", name: "JSON Formatter", reason: "Working with data formats?" },
  ],
  "base64-encoder": [
    { slug: "json-formatter", name: "JSON Formatter", reason: "Decode Base64 JSON data?" },
    { slug: "hash-generator", name: "Hash Generator", reason: "Hash the encoded output?" },
  ],
  "color-contrast-checker": [
    { slug: "compress-image", name: "Compress Image", reason: "Optimize images for your website?" },
    { slug: "image-to-webp", name: "Image to WebP", reason: "Convert images for better web perf?" },
  ],
  "hash-generator": [
    { slug: "password-generator", name: "Password Generator", reason: "Generate a password to hash?" },
    { slug: "base64-encoder", name: "Base64 Encoder", reason: "Encode your hash in Base64?" },
  ],
  "lorem-ipsum": [
    { slug: "text-to-pdf", name: "Text to PDF", reason: "Convert placeholder text to PDF?" },
    { slug: "markdown-to-html", name: "Markdown to HTML", reason: "Generate HTML placeholder content?" },
  ],
  "uuid-generator": [
    { slug: "json-formatter", name: "JSON Formatter", reason: "Add UUIDs to your JSON data?" },
    { slug: "hash-generator", name: "Hash Generator", reason: "Hash your generated UUID?" },
  ],
};

export function getCrossSell(slug: string): CrossSellSuggestion[] {
  return CROSS_SELL[slug] ?? [];
}
