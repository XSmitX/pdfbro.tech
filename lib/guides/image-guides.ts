import type { GuideData } from "./types";

export const IMAGE_GUIDES: GuideData[] = [
  {
    slug: "how-to-compress-images-online",
    title: "How to Compress Images Online Without Losing Quality — Free",
    metaTitle: "How to Compress Images Online Free Without Losing Quality",
    metaDescription: "Compress JPG, PNG, and WebP images online free. Reduce image file size by up to 80% with no visible quality loss. No signup, no watermarks. Guide + tips.",
    category: "image",
    badge: "Image Guide",
    intro: "Large image files slow down websites, consume storage, and are annoying to share. Yet most people assume compression means visible quality loss — it doesn't have to. Modern compression algorithms reduce image file size by 50–80% with changes invisible to the human eye. PDFBro compresses images directly in your browser, free, with no watermarks.",
    toolSlug: "compress-image",
    sections: [
      {
        heading: "How to Compress Images in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your image(s)", body: "Upload one or multiple JPG, PNG, or WebP images. Batch compress up to 20 files at once." },
          { n: 2, title: "Set your quality level", body: "Drag the quality slider. 80% quality removes 40–60% of file size with differences invisible to most people. Lower for smaller files; higher for maximum quality." },
          { n: 3, title: "Download compressed images", body: "Download individual files or all as a ZIP. Each file shows before/after size comparison." },
        ],
      },
      {
        heading: "Understanding Image Quality vs File Size",
        body: "Image compression works by discarding visual information the human eye can't easily perceive. JPEG compression is 'lossy' — some data is permanently removed. PNG compression is 'lossless' for most color reduction techniques.\n\n**JPEG at 80% quality:** File size ~40% of original. Differences are invisible at normal viewing sizes (phone screens, web displays).\n\n**JPEG at 60% quality:** File size ~20% of original. Slight softness visible only at 200%+ zoom on a monitor.\n\n**PNG compression:** Reduces color palette and unused data. Typical reduction: 20–40% with zero quality loss.",
        callout: { type: "tip", text: "For web use, 80% JPEG quality is the industry standard. Google's own PageSpeed tools recommend this setting for web images." },
      },
      {
        heading: "When to Use Each Format",
        body: "Choosing the right format before compressing maximizes savings:\n\n**Use JPEG for:** Photos, real-world images, product photography. JPEG handles gradients and millions of colors efficiently.\n\n**Use PNG for:** Screenshots, graphics with text, logos, images needing transparency. PNG preserves sharp edges that JPEG blurs.\n\n**Use WebP for:** Website images (both photographic and graphics). WebP is 25–35% smaller than equivalent JPEG/PNG at the same quality. Use the Image to WebP tool to convert.",
      },
      {
        heading: "Batch Image Compression",
        body: "PDFBro's image compressor handles multiple files simultaneously:\n1. Upload all images at once\n2. Set a global quality level\n3. All files compress and become individually downloadable\n\nFor large batches, all files also package into a ZIP for one-click download.",
      },
    ],
    proTips: [
      "For website optimization, compress to 80% quality THEN convert to WebP — this gives the smallest file size with the best browser support.",
      "PNG screenshots with large solid-color areas compress dramatically — sometimes 60–70% reduction with no quality loss.",
      "Don't compress the same JPEG twice — each re-compression adds cumulative quality loss. Always compress from the original.",
    ],
    faq: [
      { q: "Does image compression reduce quality?", a: "At 80% quality setting, differences are invisible in normal use. The human eye can't detect the removed data at typical screen sizes." },
      { q: "What image formats can PDFBro compress?", a: "JPG/JPEG, PNG, and WebP. GIF compression is handled via the GIF to MP4 tool for animation size reduction." },
      { q: "Can I compress multiple images at once?", a: "Yes. Upload up to 20 images simultaneously for batch compression." },
      { q: "Will compressed images have a watermark?", a: "Never. PDFBro does not add watermarks to any processed files." },
      { q: "How much can I reduce an image's file size?", a: "JPEG photos typically compress 40–70%. PNGs with large uniform areas can compress 50–80%. Photos already saved at JPEG may compress only 10–20%." },
    ],
    relatedGuides: ["compress-image-for-web", "how-to-convert-image-to-webp", "how-to-resize-image-online", "how-to-convert-png-to-jpg"],
    relatedTools: ["compress-image", "image-to-webp", "resize-image"],
    keywords: ["compress image online free", "reduce image file size", "image compressor no watermark", "compress JPG PNG online", "optimize images free"],
  },

  {
    slug: "how-to-resize-image-online",
    title: "How to Resize an Image Online Free — Exact Pixels or Percentage",
    metaTitle: "How to Resize Image Online Free | Exact Pixels | PDFBro",
    metaDescription: "Resize images to exact pixel dimensions or by percentage. Free, no signup. Supports JPG, PNG, WebP. Batch resize multiple images. Instant download.",
    category: "image",
    badge: "Image Guide",
    intro: "Resizing images is necessary for profile pictures (which must be square), email signatures (limited pixel dimensions), website banners (specific aspect ratios), and attachment size limits. PDFBro resizes images to any dimension in seconds — no Photoshop, no GIMP, no installations.",
    toolSlug: "resize-image",
    sections: [
      {
        heading: "How to Resize an Image in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your image(s)", body: "Upload one or multiple images (JPG, PNG, WebP, etc.)." },
          { n: 2, title: "Set your target size", body: "Enter exact pixel dimensions (width × height), or set a percentage scale (e.g., 50% to halve the size). Toggle 'Lock aspect ratio' to prevent distortion." },
          { n: 3, title: "Download resized images", body: "Download individual images or all resized images as a ZIP file." },
        ],
      },
      {
        heading: "Aspect Ratio — The Most Important Setting",
        body: "Aspect ratio is the width-to-height proportion of an image. Changing it without care causes distortion — making people look stretched or squished.\n\n**Lock aspect ratio (recommended):** Enter just the width and the height calculates automatically. The image scales proportionally with no distortion.\n\n**Unlock aspect ratio:** Use only when the target container requires exact dimensions that differ from your image's natural proportions. This will distort the image — crop instead if possible.",
        callout: { type: "tip", text: "For social media profile pictures: LinkedIn uses 400×400px, Twitter/X uses 400×400px, Facebook uses 170×170px. Always lock aspect ratio and crop to 1:1 first." },
      },
      {
        heading: "Common Standard Sizes",
        body: "**Social media covers:** Facebook 820×312px, LinkedIn 1584×396px, Twitter/X 1500×500px\n\n**Social media posts:** Instagram 1080×1080px (square), 1080×1350px (portrait), 1080×566px (landscape)\n\n**Email signature images:** 200–300px wide, proportional height\n\n**Website hero images:** 1920×1080px (Full HD)\n\n**Thumbnails:** YouTube 1280×720px, blog post 800×450px\n\n**Print at 300 DPI:** A4 paper = 2480×3508px",
      },
      {
        heading: "Resizing vs Cropping — Which Should You Use?",
        body: "**Resize** scales the entire image to a new size. The full image content is preserved but at different dimensions.\n\n**Crop** cuts away portions of the image and keeps a specific area at its original resolution — or adjusts it to a new size.\n\nFor example: to fit a landscape photo into a square profile picture, don't resize (it'll distort) — crop to 1:1 aspect ratio instead. PDFBro's Crop Image tool handles this perfectly.",
      },
    ],
    proTips: [
      "When resizing for web, resize then compress — a 1920px wide image compressed at 80% JPEG is optimal for most websites.",
      "For batch resizing to the same dimensions, upload multiple images and apply identical settings to all at once.",
      "Enlarging images beyond their original size causes pixelation. Always resize down, not up, for quality results.",
    ],
    faq: [
      { q: "Can I resize without distorting the image?", a: "Yes. Lock the aspect ratio option preserves proportions. You enter one dimension and the other calculates automatically." },
      { q: "What's the maximum image size PDFBro can handle?", a: "PDFBro supports images up to 30 MB per file." },
      { q: "Can I resize multiple images at once?", a: "Yes. Upload up to 20 images and apply the same dimensions to all in one batch." },
      { q: "Does resizing reduce image quality?", a: "Reducing size maintains quality. Enlarging beyond the original can cause pixelation since new pixels are generated artificially." },
    ],
    relatedGuides: ["how-to-crop-image-online", "how-to-compress-images-online", "how-to-make-passport-photo", "compress-image-for-web"],
    relatedTools: ["resize-image", "crop-image", "compress-image"],
    keywords: ["resize image online free", "image resizer free", "change image dimensions online", "resize JPG online", "resize PNG free"],
  },

  {
    slug: "how-to-crop-image-online",
    title: "How to Crop an Image Online Free — Any Ratio or Size",
    metaTitle: "How to Crop Image Online Free | Any Aspect Ratio | PDFBro",
    metaDescription: "Crop images online free with an interactive cropper. Choose custom dimensions or standard ratios (1:1, 16:9, 4:3). No signup. Instant download.",
    category: "image",
    badge: "Image Guide",
    intro: "Cropping removes unwanted edges from photos and adjusts composition for social media, profile pictures, or print. The difference between a great social media post and an amateur one is often just better cropping. PDFBro's crop tool provides an interactive visual cropper with preset ratios and custom dimensions.",
    toolSlug: "crop-image",
    sections: [
      {
        heading: "How to Crop an Image in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your image", body: "Upload the image you want to crop." },
          { n: 2, title: "Set crop area", body: "Drag the crop handles to select the area to keep. Choose a preset aspect ratio (1:1 for square, 16:9 for widescreen, 4:3, 3:2, etc.) or use free-form cropping for custom dimensions." },
          { n: 3, title: "Download the cropped image", body: "Click Crop and download the resulting image in the same format as the original." },
        ],
      },
      {
        heading: "Standard Aspect Ratios and When to Use Each",
        body: "**1:1 (Square):** Perfect for Instagram posts, profile pictures, and product images on e-commerce platforms. The most versatile social media format.\n\n**16:9 (Widescreen):** YouTube thumbnails, website hero images, LinkedIn posts. The standard screen ratio for modern displays.\n\n**4:3:** Traditional photo ratio (older camera default), presentation slides, standard prints.\n\n**3:2:** Modern DSLR camera ratio, 6×4 inch print format.\n\n**9:16 (Vertical):** Instagram Stories, TikTok, YouTube Shorts. Portrait full-screen format.",
        callout: { type: "tip", text: "For Instagram, crop to 1:1 for feed posts and 9:16 for Stories. Using inconsistent ratios makes your grid look disorganized." },
      },
      {
        heading: "Composition Tips for Better Crops",
        body: "The rule of thirds: imagine dividing your image with a 3×3 grid. Place key subjects at the intersections of those lines rather than dead center. This creates more visually dynamic compositions.\n\nFor portraits: crop to include the subject's eyes at the upper third of the frame, with space in the direction they're looking.\n\nFor landscapes: decide whether the sky or the ground is more interesting — give 2/3 of the frame to the more compelling element.",
      },
    ],
    proTips: [
      "Crop before compressing — cropping removes pixels, which reduces file size naturally before you even apply compression.",
      "For passport photos, crop to the exact ratio specified by your country's standard, then resize to the required pixel dimensions.",
    ],
    faq: [
      { q: "Can I crop to an exact pixel size?", a: "Yes. PDFBro lets you enter exact output dimensions after setting the crop ratio." },
      { q: "Does cropping reduce image quality?", a: "No. Cropping only removes pixels at the edges. The remaining pixels are identical to the original." },
      { q: "What formats does the crop tool support?", a: "JPG, PNG, WebP, and most common image formats." },
    ],
    relatedGuides: ["how-to-resize-image-online", "how-to-make-passport-photo", "how-to-compress-images-online", "how-to-add-text-to-image"],
    relatedTools: ["crop-image", "resize-image", "passport-photo"],
    keywords: ["crop image online free", "image cropper online", "crop photo to aspect ratio", "crop JPG PNG online no signup"],
  },

  {
    slug: "how-to-remove-image-background",
    title: "How to Remove Background from Image Online Free",
    metaTitle: "How to Remove Image Background Free Online | PDFBro",
    metaDescription: "Remove backgrounds from photos automatically online for free. Get transparent PNG instantly. No Photoshop, no signup, no watermarks. Complete guide.",
    category: "image",
    badge: "Image Guide",
    intro: "Background removal used to require Photoshop expertise — manually selecting around hair, fur, and complex edges. AI-powered background removal has changed everything: upload a photo and the background is removed automatically in seconds. PDFBro removes backgrounds entirely in your browser with no file upload to external servers.",
    toolSlug: "remove-bg",
    sections: [
      {
        heading: "How to Remove Image Background in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your image", body: "Upload a JPG or PNG photo. Best results with photos that have a clear subject (person, product, animal) distinct from the background." },
          { n: 2, title: "Background is automatically removed", body: "The tool analyzes the image and removes the background, leaving the subject on a transparent layer." },
          { n: 3, title: "Download transparent PNG", body: "Download your image as a PNG with a transparent background — ready for use in presentations, websites, and designs." },
        ],
      },
      {
        heading: "What Makes Background Removal Work Well",
        body: "Background removal AI is remarkably good but not perfect. Results depend on several factors:\n\n**High contrast between subject and background:** A person in a dark jacket against a white wall = excellent results. A person in white clothing against a light wall = challenging.\n\n**Clear subject edges:** Smooth, well-defined edges remove cleanly. Detailed hair, fur, and feathers are harder for AI to isolate.\n\n**Image quality:** Higher resolution photos give the AI more detail to work with. Blurry images produce rough edges.\n\n**Background complexity:** Solid color or simple gradient backgrounds remove cleanly. Busy backgrounds with texture similar to the subject are harder.",
        callout: { type: "tip", text: "For portrait photos, natural lighting with the subject slightly separated from the background gives the best removal results." },
      },
      {
        heading: "What to Do With a Transparent Background",
        body: "Once you have a transparent PNG:\n\n**Product images for e-commerce:** Place the product on a white background for Amazon, Shopify, or Etsy product listings — the platform standard.\n\n**Presentations:** Drag the transparent PNG onto any colored slide without an unwanted white box around it.\n\n**Business headshots:** Remove a distracting background from a portrait and replace it with a professional solid color.\n\n**Stickers and logos:** Export as transparent PNG for use in messaging apps, overlays, or printed media.",
      },
      {
        heading: "Background Removal vs Manual Photoshop Selection",
        body: "AI background removal is 95% as good as manual selection for 95% of images — and takes 2 seconds instead of 20 minutes. The 5% where it falls short:\n\n- Complex fur/hair at the edges\n- Semi-transparent subjects (glass, smoke)\n- Subjects where background colors match foreground\n\nFor these edge cases, use AI removal as a starting point and refine manually in Photoshop's Select and Mask tool.",
      },
    ],
    proTips: [
      "For e-commerce product photos, a white background is Amazon's requirement. After removing background, place the image on a solid white canvas using a design tool.",
      "Batch multiple product photos in a folder before removing backgrounds — the consistent style improves your store's professionalism.",
      "For people photos, AI handles backgrounds better than complex hair. Consider asking your subject to stand against a plain wall if you plan to use background removal.",
    ],
    faq: [
      { q: "Is background removal free on PDFBro?", a: "Yes. PDFBro removes image backgrounds completely free with no signup and no watermarks." },
      { q: "Does background removal work on all image types?", a: "Best results with JPEG and PNG photos. The AI works on any image but performs best on photos of people, products, and animals with clear backgrounds." },
      { q: "What format is the output?", a: "Always PNG with a transparent background. PNG is the only common format that supports transparency." },
      { q: "Can I replace the background with a color instead of leaving it transparent?", a: "PDFBro provides the transparent PNG. Add a colored background using any image editor or design tool (Canva, Figma, etc.)." },
      { q: "Are there watermarks on free background removal?", a: "No. PDFBro never adds watermarks to any output images." },
    ],
    relatedGuides: ["how-to-compress-images-online", "how-to-make-passport-photo", "how-to-resize-image-online", "how-to-crop-image-online"],
    relatedTools: ["remove-bg", "crop-image", "compress-image"],
    keywords: ["remove background from image free", "background remover online", "transparent background maker", "remove image background no watermark"],
  },

  {
    slug: "how-to-convert-heic-to-jpg",
    title: "How to Convert HEIC to JPG — iPhone Photos on PC, Mac & Web",
    metaTitle: "How to Convert HEIC to JPG Free | iPhone Photos | PDFBro",
    metaDescription: "Convert iPhone HEIC photos to JPG free online. Works on PC and Mac without software. Batch convert up to 20 HEIC files instantly. Step-by-step guide.",
    category: "image",
    badge: "Image Guide",
    intro: "Every photo you take on an iPhone since iOS 11 is saved in HEIC format — a smaller, higher-quality format Apple invented. The problem: Windows, older Androids, and many websites don't support HEIC. Converting HEIC to JPG gives you universally compatible images. PDFBro converts HEIC to JPG instantly in your browser — no software needed.",
    toolSlug: "heic-to-jpg",
    sections: [
      {
        heading: "How to Convert HEIC to JPG in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your HEIC files", body: "Upload one or multiple .heic or .heif files from your computer or connected iPhone. Batch convert up to 20 files at once." },
          { n: 2, title: "Set output quality (optional)", body: "The default is high quality (90%). Reduce if you need smaller file sizes." },
          { n: 3, title: "Download JPG files", body: "Download individual JPG files or all as a ZIP. Images are universally compatible." },
        ],
      },
      {
        heading: "What is HEIC and Why iPhone Uses It",
        body: "HEIC (High Efficiency Image Container) is based on the HEIF standard, developed to replace JPEG. It stores photos at roughly half the file size of JPEG while maintaining equal or better visual quality. Apple adopted it in iOS 11 (2017) to help users store more photos.\n\nThe catch: HEIC uses H.265 video compression technology, which requires licensing. Many older operating systems and apps never implemented it.\n\n**Who can open HEIC natively:** iOS 11+, macOS High Sierra+, Windows 11 (with HEVC codec installed)\n**Who cannot:** Windows 10 (without extra codec), most Android apps, most web services (Facebook, Instagram, Google Forms)",
      },
      {
        heading: "How to Get HEIC Photos From iPhone to Computer",
        body: "The first challenge is often just getting the HEIC files off the iPhone:\n\n**USB cable (most reliable):** Connect iPhone to PC with a cable. Trust the computer on your iPhone prompt. Open File Explorer → This PC → iPhone → DCIM folder. Copy .HEIC files.\n\n**iCloud Photos:** If enabled, photos sync to iCloud. Access at iCloud.com or via iCloud for Windows. iCloud automatically converts to JPEG when downloading to non-Apple devices.\n\n**AirDrop to Mac:** AirDrop files stay as HEIC. Drag to your desktop, then upload to PDFBro.\n\n**Email to yourself:** Send photos via email. Most email apps auto-convert to JPEG.",
        callout: { type: "tip", text: "Prevent the problem entirely: on iPhone, go to Settings → Camera → Formats → select 'Most Compatible'. This saves photos as JPEG from the start, using slightly more storage." },
      },
      {
        heading: "HEIC on Windows — What the Error Means",
        body: "Windows 10 displays 'We can't open this file' for HEIC images. The fix is the HEVC Video Extensions codec from the Microsoft Store (it costs ~$0.99 — yes, really). Alternatively, install Apple's iCloud for Windows, which adds free HEIC support.\n\nBut for one-time conversions or occasional use, PDFBro's online converter is simpler than installing anything.",
      },
    ],
    proTips: [
      "Set iPhone to JPEG mode (Settings → Camera → Most Compatible) before an important event — concerts, weddings, travel — when you know photos will be widely shared.",
      "HEIC files from iPhone also contain Live Photo data (short video). The JPG output will be the static photo only.",
      "Converted JPGs from HEIC are nearly indistinguishable from native JPEGs. The HEIC-to-JPEG process is high quality at 90% setting.",
    ],
    faq: [
      { q: "What is a HEIC file?", a: "HEIC is Apple's photo format used on iPhone and iPad. It stores photos at smaller file sizes than JPEG while maintaining quality, but isn't supported on all devices." },
      { q: "Can I convert HEIC to JPG without installing software?", a: "Yes. PDFBro converts HEIC to JPG entirely in your browser with no software download." },
      { q: "Will the HEIC to JPG conversion lose quality?", a: "No visible quality loss at default settings (90% quality). The conversion is very high fidelity." },
      { q: "Can I convert multiple HEIC files at once?", a: "Yes. PDFBro supports batch conversion of up to 20 HEIC files simultaneously." },
      { q: "How do I prevent iPhone from saving photos as HEIC?", a: "Go to iPhone Settings → Camera → Formats → select 'Most Compatible'. Photos will be saved as JPEG going forward." },
    ],
    relatedGuides: ["how-to-compress-images-online", "how-to-convert-png-to-jpg", "how-to-convert-image-to-webp", "how-to-resize-image-online"],
    relatedTools: ["heic-to-jpg", "compress-image", "resize-image"],
    keywords: ["HEIC to JPG free", "convert HEIC to JPG online", "iPhone photos to JPEG", "HEIC converter online no signup"],
  },

  {
    slug: "how-to-convert-png-to-jpg",
    title: "How to Convert PNG to JPG Online Free — Batch Converter",
    metaTitle: "How to Convert PNG to JPG Free Online | PDFBro Guide",
    metaDescription: "Convert PNG to JPG online free. Adjust quality, handle transparency. Batch convert multiple PNGs at once. No signup, no watermarks. Instant download.",
    category: "image",
    badge: "Image Guide",
    intro: "PNG files are larger than JPEGs and unnecessary for photos and web images without transparency. Converting PNG to JPG can reduce file size by 60–80% with minimal visual difference. PDFBro converts PNG to JPG in bulk with adjustable quality settings.",
    toolSlug: "png-to-jpeg",
    sections: [
      {
        heading: "How to Convert PNG to JPG in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload PNG files", body: "Upload one or multiple PNG files. Batch conversion of up to 20 files is supported." },
          { n: 2, title: "Set JPEG quality", body: "Choose output quality (1–100%). 85–90% is optimal for photos. 70–80% for web images where size is a priority." },
          { n: 3, title: "Download JPG files", body: "Download individual JPGs or all as a ZIP archive." },
        ],
      },
      {
        heading: "PNG vs JPEG — When to Use Each",
        body: "**PNG is better for:**\n- Screenshots and UI captures (sharp text edges)\n- Graphics, logos, icons with transparency\n- Images that will be further edited\n- Illustrations with flat colors\n\n**JPEG is better for:**\n- Photographs and real-world images\n- Web images where page speed matters\n- Social media sharing\n- When file size is more important than preserving sharp edges",
        callout: { type: "warning", text: "PNG images with transparency (transparent backgrounds) will have that transparency replaced with white when converted to JPEG. JPEG doesn't support transparency." },
      },
      {
        heading: "Transparent PNG to JPG — Handling Transparency",
        body: "JPEG doesn't support transparency. When you convert a transparent PNG to JPEG:\n\n**Default:** PDFBro fills the transparent areas with white, the standard background for most use cases.\n\nIf you need a different background color:\n1. Open the PNG in any image editor\n2. Create a new layer below with your desired background color\n3. Flatten and export as JPEG\n\nOr: If you need to keep transparency, save as PNG or WebP instead of JPEG.",
      },
    ],
    proTips: [
      "For website optimization: screenshots and UI images → keep PNG and compress it. Photos → convert to JPEG or WebP.",
      "Don't double-compress: avoid saving a JPEG as PNG then converting back to JPEG. Each lossy encode cycle degrades quality.",
    ],
    faq: [
      { q: "Does converting PNG to JPG lose quality?", a: "JPEG is lossy, so some quality is lost. At 85–90% quality, differences are invisible in normal viewing. For graphics with text, stick to PNG." },
      { q: "What happens to transparent backgrounds when converting PNG to JPG?", a: "Transparent areas are filled with white (the standard default). JPEG doesn't support transparency." },
      { q: "Should I convert PNG to JPG for my website?", a: "For photos: yes, JPEG is significantly smaller. For logos, icons, and screenshots: keep PNG to preserve sharp edges." },
    ],
    relatedGuides: ["how-to-convert-heic-to-jpg", "how-to-convert-image-to-webp", "how-to-compress-images-online", "how-to-convert-webp-to-jpg"],
    relatedTools: ["png-to-jpeg", "compress-image", "image-to-webp"],
    keywords: ["PNG to JPG converter free", "convert PNG to JPEG online", "PNG to JPG no signup", "batch PNG to JPG"],
  },

  {
    slug: "how-to-convert-webp-to-jpg",
    title: "How to Convert WebP to JPG Online Free",
    metaTitle: "How to Convert WebP to JPG Free Online | PDFBro Guide",
    metaDescription: "Convert WebP images to JPG/JPEG online free. Batch convert multiple WebP files. No software, no signup. Universal JPG compatibility. Instant download.",
    category: "image",
    badge: "Image Guide",
    intro: "WebP is excellent for websites but not universally supported by apps and older software. If you've downloaded a .webp image and can't open it — or need to share it with someone using software that doesn't support WebP — converting to JPG makes it universally accessible.",
    toolSlug: "webp-to-jpg",
    sections: [
      {
        heading: "How to Convert WebP to JPG in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload WebP files", body: "Upload one or multiple .webp files. Batch convert up to 20 files at once." },
          { n: 2, title: "Convert", body: "PDFBro converts each WebP to a high-quality JPEG with preserved visual content." },
          { n: 3, title: "Download JPG files", body: "Download individual JPGs or all as a ZIP archive." },
        ],
      },
      {
        heading: "Why WebP Files Are Everywhere Now",
        body: "Google developed WebP to improve web performance. It's 25–35% smaller than equivalent JPEG or PNG files at the same visual quality. All major browsers support WebP (Chrome, Firefox, Safari, Edge). As a result, most websites — Google Images, Wikipedia, news sites, e-commerce platforms — serve images in WebP format.\n\nThe problem: save a WebP from a website and try to open it in older software (Photoshop pre-CC 2022, older Windows Photo Viewer, many Android apps) and it won't open.",
      },
      {
        heading: "WebP to JPG vs WebP to PNG",
        body: "**Convert to JPG when:** You need broad compatibility for sharing, printing, or using in photo editing apps. JPG is universally supported by every image tool on earth.\n\n**Convert to PNG when:** The WebP contains transparent areas you need to preserve. JPG doesn't support transparency. Use PDFBro's WebP to PNG tool instead.",
      },
    ],
    proTips: [
      "If you're saving images for a website, keep them as WebP. Convert to JPG only when you need to share outside the web context.",
      "Batch convert a whole collection of downloaded WebP images at once to save time.",
    ],
    faq: [
      { q: "Why can't I open a .webp file?", a: "WebP is a modern format not supported by all older software. Converting to JPG gives you a universally compatible file." },
      { q: "Does converting WebP to JPG lose quality?", a: "Minimal quality difference at high quality settings. WebP and JPEG both use lossy compression — converting preserves most visual detail." },
      { q: "What if my WebP has a transparent background?", a: "Use PDFBro's WebP to PNG tool instead — PNG preserves transparency." },
    ],
    relatedGuides: ["how-to-convert-png-to-jpg", "how-to-convert-heic-to-jpg", "how-to-compress-images-online", "how-to-convert-image-to-webp"],
    relatedTools: ["webp-to-jpg", "webp-to-png", "compress-image"],
    keywords: ["WebP to JPG converter free", "convert WebP to JPEG online", "open WebP file", "WebP to JPG no software"],
  },

  {
    slug: "how-to-add-text-to-image",
    title: "How to Add Text to an Image Online Free — No Design Skills Needed",
    metaTitle: "How to Add Text to Image Online Free | PDFBro Guide",
    metaDescription: "Add captions, labels, or watermarks to images online free. Control font, size, color, position, and opacity. No signup, no watermarks. Instant download.",
    category: "image",
    badge: "Image Guide",
    intro: "Adding text to images powers everything from simple photo captions and memes to professional product labels and branded social media graphics. PDFBro's Add Text to Image tool puts full control in your hands — font, size, color, position, and opacity — without requiring Canva or Photoshop.",
    toolSlug: "add-text-to-image",
    sections: [
      {
        heading: "How to Add Text to an Image in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your image", body: "Upload a JPG, PNG, or WebP image." },
          { n: 2, title: "Add and style your text", body: "Click the canvas to add a text element. Type your text, then set font, size, color, opacity, and position. Add multiple text layers if needed." },
          { n: 3, title: "Download the result", body: "Click Download to get the image with text permanently embedded." },
        ],
      },
      {
        heading: "Text Styling Options",
        body: "**Font choice:** Select from a range of fonts including serif (professional, formal), sans-serif (clean, modern), and display fonts (impactful, casual). Match font style to your image's mood.\n\n**Size:** Set in points or pixels. For social media posts, 32–48pt is typically readable. For captions, 18–24pt. For headlines, 60–80pt.\n\n**Color:** Choose any color. White text with a subtle dark shadow works on most backgrounds. Black text on bright images. Use the color picker for brand colors.\n\n**Opacity:** Reduce opacity for watermark-style overlay text or subtle branding.",
        callout: { type: "tip", text: "For social media graphics, use high contrast — white text on dark backgrounds or dark text on light backgrounds. Low-contrast text is hard to read on mobile screens." },
      },
      {
        heading: "Common Use Cases for Adding Text to Images",
        body: "**Memes:** Classic two-line format — setup at the top, punchline at the bottom. Impact font in white with black outline is the internet standard.\n\n**Product images:** Add price tags, product names, or promotional labels ('Sale', '20% Off') to product photos.\n\n**Social media graphics:** Add quotes, headlines, or calls-to-action over photos for Instagram, Facebook, or LinkedIn posts.\n\n**Watermarks:** Add a subtle logo or @handle at low opacity to claim ownership of your photos.\n\n**Photo captions:** Add a date, location, or description below a memory photo.",
      },
    ],
    proTips: [
      "Add a subtle drop shadow to text for readability against varied backgrounds — it creates contrast without needing a solid background box.",
      "For brand watermarks, use your brand color at 20–30% opacity positioned in a corner.",
      "Center-align text for quotes and headlines; left-align for captions and labels.",
    ],
    faq: [
      { q: "Can I add multiple text elements to one image?", a: "Yes. Add as many text layers as needed, each with independent font, size, color, and position settings." },
      { q: "Will the added text have a watermark?", a: "No. PDFBro never adds its own watermarks to your images." },
      { q: "Can I change the font?", a: "Yes. PDFBro provides multiple font options including serif, sans-serif, and display styles." },
      { q: "What image formats work?", a: "JPG, PNG, and WebP images are all supported." },
    ],
    relatedGuides: ["how-to-compress-images-online", "how-to-crop-image-online", "how-to-resize-image-online", "how-to-remove-image-background"],
    relatedTools: ["add-text-to-image", "crop-image", "compress-image"],
    keywords: ["add text to image online free", "text on photo no watermark", "image text overlay", "caption photo online free"],
  },

  {
    slug: "how-to-make-passport-photo",
    title: "How to Make a Passport Photo at Home Online Free",
    metaTitle: "How to Make Passport Photo at Home Free Online | PDFBro",
    metaDescription: "Create a professional passport photo at home free online. Supports US, UK, EU, and 50+ international standards. No signup. Print-ready output.",
    category: "image",
    badge: "Image Guide",
    intro: "Professional passport photo services charge $10–20. With a smartphone and PDFBro's free Passport Photo tool, you can create a print-ready, compliant passport photo at home in 2 minutes. The tool handles the exact sizing requirements for US, UK, EU, and 50+ other standards automatically.",
    toolSlug: "passport-photo",
    sections: [
      {
        heading: "How to Make a Passport Photo in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Take or upload your photo", body: "Take a new photo or upload an existing one. Requirements: neutral expression, face centered, plain white/light background, good even lighting, no glasses." },
          { n: 2, title: "Select your country standard", body: "Choose your country's passport standard (US 2×2 inch, UK 35×45mm, EU 35×45mm, etc.). PDFBro automatically crops and sizes to the exact specifications." },
          { n: 3, title: "Download and print", body: "Download a print-ready file with multiple photos arranged on a 4×6 inch sheet — the standard size at photo printing kiosks." },
        ],
      },
      {
        heading: "Passport Photo Requirements by Country",
        body: "Requirements vary significantly between countries:\n\n**United States (USCIS/DOS):**\n- Size: 2×2 inches (51×51 mm)\n- Face: 1–1⅜ inches from chin to crown\n- Background: White or off-white\n- Recent (within 6 months)\n\n**United Kingdom:**\n- Size: 35×45 mm\n- Face: 29–34 mm from chin to crown\n- Background: Light grey or cream\n\n**European Union (Schengen):**\n- Size: 35×45 mm\n- Face: 32–36 mm from chin to crown\n- Background: White\n\n**India:**\n- Size: 51×51 mm (same as US)\n- White background\n- Light-colored clothing recommended",
      },
      {
        heading: "Taking the Perfect Passport Photo at Home",
        body: "Government requirements are strict. Rejected photos cost you resubmission fees and time. Get it right the first time:\n\n**Lighting:** Stand facing a window for natural, even lighting from the front. Avoid harsh shadows on face or background. Avoid backlighting (window behind you).\n\n**Background:** Tape a large white poster board to a wall. A blank white wall works well. Shadows on the background cause rejection.\n\n**Expression:** Neutral expression, mouth closed. Open eyes looking directly at camera.\n\n**Glasses:** Most countries now require no glasses for biometric passports.\n\n**Camera position:** Camera should be at eye level, 1–2 meters away. Use the rear camera (better quality than selfie cam).",
        callout: { type: "warning", text: "Acceptance of passport photos is at the discretion of the issuing authority. Always check your specific country's current requirements before submitting." },
      },
    ],
    proTips: [
      "Shoot against a white door or refrigerator — flat, easily lit surfaces that work as backgrounds.",
      "Use a tripod or prop your phone against a book for a steady, straight-on shot.",
      "Take 5–10 shots with slightly different expressions and lighting — more options to choose from.",
    ],
    faq: [
      { q: "Is a home passport photo accepted by governments?", a: "Yes, if it meets all technical requirements. Many people successfully use home photos for passports and visas." },
      { q: "What background color do I need for a passport photo?", a: "US, EU, and most countries require white or off-white. UK allows light grey. Check your specific country's requirements." },
      { q: "Can I wear glasses in my passport photo?", a: "Most countries now require no glasses for biometric passports, including the US, UK, and EU. Check your country's current rules." },
      { q: "What if my passport photo is rejected?", a: "Retake with better lighting, a whiter background, and ensure exact face size requirements are met. Government offices list rejection reasons." },
    ],
    relatedGuides: ["how-to-remove-image-background", "how-to-crop-image-online", "how-to-resize-image-online"],
    relatedTools: ["passport-photo", "remove-bg", "crop-image"],
    keywords: ["passport photo online free", "make passport photo at home", "free passport photo maker", "US passport photo size free"],
  },

  {
    slug: "how-to-convert-image-to-pdf",
    title: "How to Convert Images to PDF Online Free — JPG, PNG, WebP",
    metaTitle: "How to Convert Image to PDF Free Online | PDFBro Guide",
    metaDescription: "Convert JPG, PNG, or WebP images to PDF free online. Combine multiple images into one PDF. Choose page size. No signup, no watermarks. Instant download.",
    category: "image",
    badge: "Image Guide",
    intro: "Converting images to PDF is essential for combining scanned documents, creating photo portfolios, or consolidating multiple JPGs into a single shareable file. PDFBro combines up to 30 images into a single PDF with each image on its own page — in whatever order you arrange them.",
    toolSlug: "image-to-pdf",
    sections: [
      {
        heading: "How to Convert Images to PDF in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your images", body: "Upload JPG, PNG, or WebP images. Upload up to 30 images at once for a multi-page PDF." },
          { n: 2, title: "Arrange the order", body: "Drag image thumbnails to set the page order in your PDF. First image becomes page 1, and so on." },
          { n: 3, title: "Convert and download", body: "Click Convert to PDF. Download the single PDF with each image on its own page." },
        ],
      },
      {
        heading: "Common Uses for Image to PDF",
        body: "**Scanned documents:** Scanners often save pages as individual JPEGs. Combine them into one PDF for filing.\n\n**Multi-page forms:** If you photographed a paper form with your phone (one photo per page), convert them all into a single PDF for submission.\n\n**Photo portfolios:** Create a PDF portfolio of work photos for emailing to clients.\n\n**ID document bundles:** Combine ID card front, back, and supporting documents into one PDF for visa or job applications.",
      },
      {
        heading: "Image Quality in the Output PDF",
        body: "Each image is embedded in the PDF at its original resolution and quality. No re-compression occurs during the image-to-PDF conversion.\n\nPage size: Each page is sized to exactly fit the image dimensions, so the PDF pages may be different sizes if your images have different aspect ratios. This is normal.\n\nFor uniform page sizes (e.g., all A4), resize all images to the same pixel dimensions before converting.",
      },
    ],
    proTips: [
      "Number your image files (01.jpg, 02.jpg) before uploading so they upload in the correct order automatically.",
      "For scanned documents, use the Compress PDF tool after conversion to reduce the file size if the images are large.",
    ],
    faq: [
      { q: "Can I combine images and PDFs into one document?", a: "Use Image to PDF to create a PDF from your images, then use Merge PDF to combine that with existing PDFs." },
      { q: "What's the maximum number of images per PDF?", a: "PDFBro supports up to 30 images in one conversion." },
      { q: "Will image quality be preserved in the PDF?", a: "Yes. Images are embedded at original quality with no re-compression." },
    ],
    relatedGuides: ["how-to-merge-pdf", "how-to-compress-pdf", "how-to-resize-image-online"],
    relatedTools: ["image-to-pdf", "merge-pdf", "compress-pdf"],
    keywords: ["convert image to PDF free", "JPG to PDF online", "PNG to PDF converter", "multiple images to PDF free"],
  },

  {
    slug: "how-to-convert-svg-to-png",
    title: "How to Convert SVG to PNG Online Free — Any Resolution",
    metaTitle: "How to Convert SVG to PNG Free Online | PDFBro Guide",
    metaDescription: "Convert SVG vector graphics to high-resolution PNG online free. Choose output size. No signup, no watermarks. Batch convert multiple SVG files.",
    category: "image",
    badge: "Image Guide",
    intro: "SVG is the vector format of choice for logos, icons, and illustrations — infinitely scalable without quality loss. But many platforms don't accept SVG: social media, email, many CMS platforms, and older software. Converting to PNG gives you a high-resolution image that works everywhere.",
    toolSlug: "svg-to-png",
    sections: [
      {
        heading: "How to Convert SVG to PNG in 3 Steps",
        body: "",
        steps: [
          { n: 1, title: "Upload your SVG files", body: "Upload one or multiple SVG files. Batch conversion supported." },
          { n: 2, title: "Set output resolution", body: "Choose the output PNG size. Since SVG is vector, you can render at any resolution — 1x (screen), 2x (retina), or custom pixel dimensions." },
          { n: 3, title: "Download PNG files", body: "Download your high-resolution PNG files, ready for use anywhere." },
        ],
      },
      {
        heading: "What Resolution to Export SVG to PNG",
        body: "The right resolution depends on where you'll use the PNG:\n\n**For web (standard displays):** Render at the actual display size or 1.5× for slight sharpness improvement.\n\n**For web (retina/HiDPI):** Render at 2× the display size. A button icon at 24px display size should export at 48px.\n\n**For social media:** Most platforms display at screen resolution but accept larger. Export at 1080px wide for safe quality.\n\n**For print:** Calculate based on DPI requirement. A 3-inch wide logo at 300 DPI = 900px wide.\n\n**For email signatures:** 200–400px wide is appropriate. Large images cause emails to load slowly.",
        callout: { type: "tip", text: "The biggest advantage of SVG: you can always re-export at a higher resolution if needed. Unlike raster images (JPG, PNG), SVG never gets pixelated regardless of export size." },
      },
    ],
    proTips: [
      "Export SVG to PNG at 2× your target display size for crisp retina rendering.",
      "Use SVG to PNG for social media profile photos and logos — upload the PNG, not the SVG, to ensure compatibility.",
    ],
    faq: [
      { q: "Why can't I just use SVG directly?", a: "Many platforms don't support SVG: Twitter/X, Facebook, Instagram, Microsoft Word, PowerPoint, and many CMS platforms require raster formats like PNG or JPEG." },
      { q: "What resolution should I export my SVG to?", a: "For web: 1x or 2x the display size. For print: calculate by multiplying physical inches × DPI (typically 300 DPI)." },
      { q: "Does SVG to PNG conversion preserve transparency?", a: "Yes. PNG supports transparency, and transparent areas in your SVG will be transparent in the PNG output." },
    ],
    relatedGuides: ["how-to-compress-images-online", "how-to-convert-png-to-jpg", "how-to-resize-image-online"],
    relatedTools: ["svg-to-png", "svg-to-jpg", "compress-image"],
    keywords: ["SVG to PNG converter free", "convert SVG to PNG online", "SVG to PNG high resolution", "vector to PNG free"],
  },

  {
    slug: "compress-image-for-web",
    title: "How to Compress Images for Websites — Speed Up Your Site",
    metaTitle: "How to Compress Images for Websites Free | PDFBro Guide",
    metaDescription: "Compress images for faster websites. Reduce image file size without quality loss. Convert to WebP, set optimal JPEG quality. Improve Core Web Vitals.",
    category: "image",
    badge: "Image Guide",
    intro: "Images account for 50–90% of the total weight of most websites. Unoptimized images are the single biggest cause of slow page load speeds — which directly hurts SEO rankings and user experience. This guide covers everything you need to compress and optimize website images properly.",
    toolSlug: "compress-image",
    sections: [
      {
        heading: "Why Image Optimization Matters for SEO",
        body: "Google uses page speed as a ranking factor. Core Web Vitals — specifically Largest Contentful Paint (LCP) — measures how fast your main content (usually a large image) loads. A poor LCP score suppresses rankings and increases bounce rates.\n\n**Impact of unoptimized images:**\n- A 3 MB hero image adds 3+ seconds to page load on mobile\n- Google penalizes pages that load in over 3 seconds\n- Users abandon pages after 3 seconds of waiting\n\n**Impact after optimization:**\n- Same image at 150 KB: loads in under 0.3 seconds on most connections\n- LCP scores improve dramatically\n- User engagement increases",
        callout: { type: "info", text: "Run your site through Google PageSpeed Insights (free). It will tell you exactly which images need optimization and how much you can save." },
      },
      {
        heading: "The Optimal Image Workflow for Websites",
        body: "For every image you add to a website, follow this process:\n\n**Step 1 — Resize to actual display size:** If a hero banner displays at 1440px max-width on desktop, resize to 1440px. Uploading a 4000px photo that displays at 1440px wastes 8× the bandwidth.\n\n**Step 2 — Choose the right format:**\n- Photos → WebP (or JPEG fallback)\n- Illustrations, logos, screenshots → WebP or PNG\n- Simple icons → SVG (vector, infinitely small)\n\n**Step 3 — Compress:** JPEG at 80–85% quality. WebP at 75–80% quality.\n\n**Step 4 — Use lazy loading:** Add `loading=\"lazy\"` to image HTML tags so images below the fold don't load until scrolled to.",
      },
      {
        heading: "WebP — The Best Format for Web Images",
        body: "WebP is 25–35% smaller than equivalent JPEG or PNG at the same visual quality. All modern browsers support WebP (since Safari 14, 2020).\n\n**Converting to WebP with PDFBro:**\n1. Upload your JPEG or PNG to the Image to WebP tool\n2. Set quality to 80%\n3. Download WebP files\n\nFor older browser compatibility, provide both WebP and JPEG using the HTML `<picture>` element with a JPEG fallback.",
      },
    ],
    proTips: [
      "Use Google's Squoosh tool alongside PDFBro for side-by-side quality comparison when setting compression levels.",
      "Automate image optimization in your CMS with plugins (WordPress: Smush, ShortPixel) for images uploaded by content editors.",
      "Set max-width in CSS so browsers don't display images larger than their container — prevents visual quality issues regardless of upload size.",
    ],
    faq: [
      { q: "What's the ideal image file size for a website?", a: "Hero images: under 200 KB. Regular content images: under 100 KB. Small thumbnails: under 30 KB. These are targets, not hard rules." },
      { q: "Should I use JPEG or WebP for web images?", a: "WebP if possible — it's 25-35% smaller. Include a JPEG fallback for the small percentage of older browsers." },
      { q: "Does image compression affect SEO?", a: "Indirectly yes. Faster-loading pages rank better in Google, and image size is the largest factor in page load speed." },
    ],
    relatedGuides: ["how-to-compress-images-online", "how-to-convert-image-to-webp", "how-to-resize-image-online", "how-to-convert-png-to-jpg"],
    relatedTools: ["compress-image", "image-to-webp", "resize-image"],
    keywords: ["compress images for website", "optimize images for web free", "reduce image size for web", "website image compression guide"],
  },
];
