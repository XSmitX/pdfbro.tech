import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2, Maximize2 } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

interface PlatformConfig {
  slug: string;
  name: string;
  width: number;
  height: number;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  useCases: string;
  faq: { q: string; a: string }[];
  keywords: string[];
  aspectRatio: string;
  maxFileSize: string;
}

const PLATFORMS: PlatformConfig[] = [
  {
    slug: "instagram-post",
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    aspectRatio: "1:1 (square)",
    maxFileSize: "8 MB",
    metaTitle: "Resize Image for Instagram Post — Free Online | PDFBro",
    metaDescription: "Resize images to perfect Instagram post dimensions 1080x1080 pixels online free. Square format, no signup, instant download. Optimize your Instagram feed.",
    h1: "Resize Image for Instagram Post — Free Online Tool",
    intro: "Instagram posts look best at 1080x1080 pixels — the platform's native square resolution. PDFBro resizes your images to exactly 1080x1080 pixels online for free, with no signup required. Upload any photo, set the dimensions, and download a perfectly sized square image that Instagram won't compress or crop.",
    useCases: "Feed posts, carousel slides, product showcases, quote graphics, photography portfolio posts, Instagram shop product images, and sponsored content. The 1:1 square format ensures your image fills the entire post space without awkward cropping.",
    keywords: ["resize image for instagram", "instagram post size 1080x1080", "resize photo for instagram free", "instagram image dimensions", "square image resizer online", "instagram crop tool free", "optimize images for instagram"],
    faq: [
      { q: "What is the best image size for Instagram posts?", a: "1080x1080 pixels is the optimal square resolution for Instagram feed posts. Instagram also supports 1080x1350 (portrait) and 1080x566 (landscape). Square 1:1 images display best across all devices and fill the most screen space in the feed. PDFBro resizes to exactly 1080x1080 so Instagram applies zero compression." },
      { q: "Will Instagram compress my image after uploading?", a: "Instagram compresses all uploads, but starting with the optimal 1080x1080 resolution minimizes quality loss. Uploads larger than 1080 pixels are downscaled (losing detail), while smaller images are upscaled (looking blurry). Resizing to exactly 1080x1080 before uploading gives you the crispest possible result on Instagram." },
      { q: "What file format should I use for Instagram posts?", a: "JPEG is the safest choice for Instagram — universally supported, small file size, and good quality at 1080x1080. PNG is also accepted and preserves transparency if your image has it. PDFBro resizes both formats and saves in the original format you choose." },
      { q: "Can I resize multiple images for an Instagram carousel?", a: "Yes. Process each image individually with PDFBro's resize tool set to 1080x1080. Each will be perfectly square for your carousel. There are no daily limits — resize as many images as your carousel needs." },
    ],
  },
  {
    slug: "instagram-story",
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    aspectRatio: "9:16 (vertical)",
    maxFileSize: "30 MB",
    metaTitle: "Resize Image for Instagram Story — 1080x1920 Free | PDFBro",
    metaDescription: "Resize images to Instagram Story dimensions 1080x1920 pixels online free. Vertical 9:16 format, no signup, instant download. Perfect for stories and reels.",
    h1: "Resize Image for Instagram Story — Free Online Tool",
    intro: "Instagram Stories display at 1080x1920 pixels — a full-screen 9:16 vertical format. PDFBro resizes your images to exact story dimensions online for free. Upload any photo, and download a perfectly sized vertical image ready for Instagram Stories, Reels cover photos, and Highlights covers.",
    useCases: "Instagram Stories, Reels cover thumbnails, Story Highlight covers, full-screen vertical announcements, product launches via stories, event countdowns, and swipe-up link graphics. The 9:16 format uses the entire phone screen for maximum impact.",
    keywords: ["resize image for instagram story", "instagram story size 1080x1920", "story dimensions instagram", "resize for instagram story free", "vertical image resizer online", "instagram story photo size", "9:16 image resizer"],
    faq: [
      { q: "What size should an Instagram Story image be?", a: "1080x1920 pixels is the native Story resolution. This 9:16 aspect ratio fills the entire phone screen without black bars. Images smaller than 1080x1920 look pixelated; larger images are downscaled by Instagram. PDFBro resizes to the exact native dimensions for crisp, full-screen Stories." },
      { q: "Can I use landscape photos for Instagram Stories?", a: "Landscape images (16:9 or 4:3) won't fill an Instagram Story. They'll have large black bars on top and bottom. Resize to 1080x1920 with PDFBro first — you can either crop the center or add a background to convert horizontal photos to the vertical Story format." },
      { q: "What file type works best for Instagram Stories?", a: "JPEG for photos (smaller file, faster upload). PNG if your Story graphic includes text, logos, or needs transparency. Both formats work perfectly at 1080x1920 in PDFBro's resizer." },
      { q: "How do I resize a portrait photo to exact Instagram Story size?", a: "Upload your portrait photo to PDFBro's resize tool at pdfbro.tech/tools/resize-image, enter 1080 width and 1920 height, and download. If your photo isn't exactly 9:16, the tool scales it to fit while maintaining the aspect ratio. For an exact fill, crop your photo to 9:16 first." },
    ],
  },
  {
    slug: "facebook-cover",
    name: "Facebook Cover",
    width: 851,
    height: 315,
    aspectRatio: "2.7:1 (wide)",
    maxFileSize: "10 MB",
    metaTitle: "Resize Image for Facebook Cover — 851x315 Free | PDFBro",
    metaDescription: "Resize images to Facebook cover photo dimensions 851x315 pixels online free. Wide banner format, no signup, instant download. Perfect cover photos.",
    h1: "Resize Image for Facebook Cover — Free Online Tool",
    intro: "Facebook cover photos display at 851x315 pixels on desktop — a wide panoramic banner. PDFBro resizes your image to these exact dimensions online for free, with no signup. Get a perfectly sized cover photo that displays correctly across both desktop and mobile Facebook without unexpected cropping.",
    useCases: "Facebook Page covers, personal profile banner images, event page headers, group cover graphics, business page branding, seasonal promotions, and portfolio headers. A well-sized cover makes your Facebook presence look professional and inviting.",
    keywords: ["resize image for facebook cover", "facebook cover photo size", "facebook banner resizer free", "851x315 image resizer", "facebook page cover dimensions", "resize photo for facebook banner", "facebook timeline cover size"],
    faq: [
      { q: "What is the correct Facebook cover photo size?", a: "851x315 pixels on desktop, but Facebook crops to roughly 640x360 on mobile. The safe area for text and logos is the center of the image (approximately the middle 560x315 pixels). PDFBro resizes to the full 851x315 desktop dimensions — position important elements in the center third." },
      { q: "Why does my Facebook cover look cropped on mobile?", a: "Facebook shows a narrower crop of your cover on mobile devices. Design your cover with a 3-5% margin on all sides — place logos and critical text in the center 60% of the image where it's visible on both desktop and mobile." },
      { q: "Should I use JPEG or PNG for Facebook covers?", a: "JPEG at 85-95% quality is ideal for photo-based covers — small file size under Facebook's 100 KB recommendation for fast loading. Use PNG only if your cover has text overlays or a logo that needs maximum sharpness. PDFBro handles both formats." },
      { q: "What file size should my Facebook cover be?", a: "Facebook recommends keeping cover photos under 100 KB for fast loading. PDFBro's resize tool can also compress your image after resizing. For 851x315, a JPEG at 80% quality typically stays under 100 KB and looks crisp on screen." },
    ],
  },
  {
    slug: "facebook-profile",
    name: "Facebook Profile",
    width: 720,
    height: 720,
    aspectRatio: "1:1 (square)",
    maxFileSize: "5 MB",
    metaTitle: "Resize Image for Facebook Profile — 720x720 Free | PDFBro",
    metaDescription: "Resize images to Facebook profile picture dimensions 720x720 pixels online free. Square format, no signup, instant download. Crisp profile photos.",
    h1: "Resize Image for Facebook Profile — Free Online Tool",
    intro: "Facebook profile pictures display at 720x720 pixels — upload at this resolution for crisp, clear profile photos. PDFBro resizes your photo to exactly 720x720 pixels online for free. A properly sized profile picture looks sharp on both desktop and mobile without Facebook's compression making it blurry.",
    useCases: "Personal profile pictures, business Page profile images, group avatars, marketplace seller photos, event host profile images, and messenger display pictures. The square format ensures your face or logo is centered and recognizable in the circular crop.",
    keywords: ["resize image for facebook profile", "facebook profile picture size", "720x720 photo resizer", "facebook dp size", "resize photo for facebook profile", "square profile picture resizer", "facebook avatar size"],
    faq: [
      { q: "What size should a Facebook profile picture be?", a: "Upload at 720x720 pixels for best quality. Facebook displays profile pictures as 176x176 on desktop, 196x196 on smartphones, and 36x36 on feature phones. Starting at 720x720 ensures the sharpest result at every display size." },
      { q: "Does Facebook crop profile pictures into a circle?", a: "Yes. Profile pictures are displayed as circles on Pages and profiles. The corners get cropped out. Make sure your face or logo is centered and occupies the middle 70% of the 720x720 square to avoid being cut off by the circular crop." },
      { q: "Should I use a different size for Facebook business pages?", a: "No. Business Pages use the same 720x720 profile picture dimensions as personal profiles. For best results on a business Page, use your company logo centered in the 720x720 square — it will be clearly visible at all display sizes." },
      { q: "Can I use the same 720x720 image for Instagram profile?", a: "Instagram recommends 320x320 for profile pictures, but 720x720 works well and looks sharper. Instagram displays profile images as 110x110 circles. You can use the same 720x720 image for both — it provides excellent quality on both platforms." },
    ],
  },
  {
    slug: "twitter-header",
    name: "Twitter Header",
    width: 1500,
    height: 500,
    aspectRatio: "3:1 (panoramic)",
    maxFileSize: "5 MB",
    metaTitle: "Resize Image for Twitter Header — 1500x500 Free | PDFBro",
    metaDescription: "Resize images to Twitter/X header dimensions 1500x500 pixels online free. Panoramic banner format, no signup, instant download. Professional Twitter banners.",
    h1: "Resize Image for Twitter Header — Free Online Tool",
    intro: "Twitter/X header photos display at 1500x500 pixels — a wide 3:1 panoramic banner. PDFBro resizes your header image to these exact dimensions for free online. Upload any photo, and get a perfectly sized Twitter header that looks professional and displays without unwanted cropping or stretching.",
    useCases: "Personal profile headers, business brand banners, product launch announcements, event promotion headers, portfolio showcases, seasonal branding, and link-in-bio promotional banners. The wide format gives you ample space for branding on the Twitter web interface and mobile app.",
    keywords: ["resize image for twitter header", "twitter header size 1500x500", "twitter banner resizer free", "x header dimensions", "twitter profile banner size", "resize photo for twitter header", "twitter header maker free"],
    faq: [
      { q: "What is the Twitter/X header photo size?", a: "1500x500 pixels is the recommended upload size. This 3:1 aspect ratio works across all Twitter interfaces. The header is responsive — different parts are visible on mobile vs desktop. Place important content in the center horizontal band (roughly 1500x300) that's visible everywhere." },
      { q: "Why does my Twitter header look different on mobile vs desktop?", a: "Twitter's responsive design shows different header crops on different devices. Mobile shows a taller center crop. Desktop shows more of the sides. Place critical information (logos, text, calls-to-action) in the center 60% of the 1500x500 image to ensure visibility on all devices." },
      { q: "What file format and size limit for Twitter headers?", a: "Twitter accepts JPEG and PNG up to 5 MB. At 1500x500 resolution, a JPEG at 85% quality stays well under 1 MB while looking excellent. PDFBro resizes your image to the exact dimensions and you can choose the output format that suits your needs." },
      { q: "Can I use the same banner image for Twitter and Facebook?", a: "No — Facebook covers are 851x315 (2.7:1) and Twitter headers are 1500x500 (3:1). They're different aspect ratios. Resize your banner separately for each platform using PDFBro's dedicated tools to avoid awkward cropping or stretching." },
    ],
  },
  {
    slug: "twitter-post",
    name: "Twitter Post",
    width: 1200,
    height: 675,
    aspectRatio: "16:9 (widescreen)",
    maxFileSize: "5 MB",
    metaTitle: "Resize Image for Twitter Post — 1200x675 Free | PDFBro",
    metaDescription: "Resize images to Twitter/X post dimensions 1200x675 pixels online free. 16:9 widescreen format for tweet images. No signup, instant download.",
    h1: "Resize Image for Twitter Post — Free Online Tool",
    intro: "Twitter/X displays in-feed images at 1200x675 pixels — a clean 16:9 aspect ratio that previews fully in the timeline. PDFBro resizes your post images to this exact resolution for free online. No signup needed — upload, resize, and download images that display in full without Twitter's automatic cropping.",
    useCases: "Tweet images that display in full without cropping, thread illustration graphics, product screenshots, chart and infographic sharing, announcement visuals, quote graphics, and photography posts. At 1200x675, images fill the timeline preview and expand to full width when tapped.",
    keywords: ["resize image for twitter post", "twitter image size 1200x675", "tweet image dimensions", "resize photo for twitter free", "x post image size", "twitter image resizer online", "1200x675 image converter"],
    faq: [
      { q: "What image size does Twitter use for in-feed posts?", a: "1200x675 pixels (16:9 aspect ratio) is the ideal size for tweet images. Twitter displays this without cropping and it fills the timeline preview. Other supported ratios are 1:1 (1200x1200) and 2:1 (1200x600). PDFBro sizes to the recommended 16:9 for maximum visibility." },
      { q: "Does Twitter still crop images in timelines?", a: "Twitter ended aggressive automatic cropping in 2021. Images now display naturally in the timeline based on their aspect ratio. 16:9 images show full-width previews. Tall images (4:5 or 9:16) may be shortened with a 'Show more' button. The 1200x675 size gives the best full-visible preview." },
      { q: "What's the maximum file size for Twitter images?", a: "Up to 5 MB for photos on twitter.com and mobile apps. At 1200x675 pixels, a JPEG at 85-90% quality stays around 200-400 KB — well within the limit and fast to load on mobile data. PDFBro can also compress after resizing if needed." },
      { q: "Can I post 4K images on Twitter?", a: "Twitter accepts images up to 4096x4096 pixels, but they'll be downscaled to fit the viewer's screen. Uploading at 1200x675 gives you the sharpest timeline preview without wasting upload time or mobile data. For photography posts where users may expand the image, 2400x1350 (retina 2x) preserves extra detail." },
    ],
  },
  {
    slug: "linkedin-banner",
    name: "LinkedIn Banner",
    width: 1584,
    height: 396,
    aspectRatio: "4:1 (ultra-wide)",
    maxFileSize: "8 MB",
    metaTitle: "Resize Image for LinkedIn Banner — 1584x396 Free | PDFBro",
    metaDescription: "Resize images to LinkedIn background banner dimensions 1584x396 pixels online free. Professional ultra-wide format, no signup. Stand out on LinkedIn.",
    h1: "Resize Image for LinkedIn Banner — Free Online Tool",
    intro: "LinkedIn profile background banners display at 1584x396 pixels — a 4:1 ultra-wide format. PDFBro resizes your banner image to these exact dimensions online for free. Create a professional background that makes your LinkedIn profile stand out to recruiters, clients, and connections.",
    useCases: "Professional branding banners, personal value proposition headers, skills & services showcases, job-seeking status banners, company brand reinforcement, thought leadership headers, and networking-focused profile backgrounds. A well-designed banner increases profile views and connection acceptance rates.",
    keywords: ["resize image for linkedin banner", "linkedin background photo size", "linkedin banner dimensions 1584x396", "linkedin profile banner resizer", "resize picture for linkedin", "linkedin cover image size", "professional linkedin banner size"],
    faq: [
      { q: "What size is a LinkedIn background banner?", a: "1584x396 pixels at 4:1 aspect ratio. This ultra-wide format spans the top of your LinkedIn profile. On mobile, LinkedIn shows a cropped center portion. Place important content — your name overlay, slogan, or brand elements — in the center 50% of the banner to ensure visibility on all devices." },
      { q: "How do I design a professional LinkedIn banner?", a: "Keep it simple and professional. Use your company colors, a subtle pattern or gradient, and a short value proposition (3-6 words). Avoid clutter — your profile photo and headline sit on top of the banner. PDFBro resizes to 1584x396 — use this as your canvas dimensions in any design tool before uploading." },
      { q: "What file size should my LinkedIn banner be?", a: "LinkedIn accepts up to 8 MB. A 1584x396 JPEG at 85% quality is typically 150-300 KB — fast-loading and professional-looking. LinkedIn compresses images slightly, so uploading at the exact 1584x396 resolution minimizes quality loss." },
      { q: "Can I use my LinkedIn banner for other platforms?", a: "LinkedIn's 4:1 ratio is unique — it won't fit Facebook (2.7:1) or Twitter (3:1) without cropping. Resize your banner image separately for each platform with PDFBro's specific tools. However, you can reuse the same design by cropping to each platform's dimensions." },
    ],
  },
  {
    slug: "linkedin-profile",
    name: "LinkedIn Profile",
    width: 400,
    height: 400,
    aspectRatio: "1:1 (square)",
    maxFileSize: "8 MB",
    metaTitle: "Resize Image for LinkedIn Profile — 400x400 Free | PDFBro",
    metaDescription: "Resize images to LinkedIn profile picture dimensions 400x400 pixels online free. Professional square format, no signup. Make a strong first impression.",
    h1: "Resize Image for LinkedIn Profile — Free Online Tool",
    intro: "LinkedIn profile photos display at 400x400 pixels — sized for professional headshots. PDFBro resizes your photo to these exact dimensions for free online. A properly sized, well-framed profile picture is the most important visual element on your LinkedIn profile — it's the first thing recruiters and connections see.",
    useCases: "Professional headshots, company Page logos, group profile images, speaker profile photos, and networking profile pictures. LinkedIn profiles with professional photos receive 14x more profile views and 36x more messages than profiles without photos.",
    keywords: ["resize image for linkedin profile", "linkedin profile picture size", "linkedin headshot dimensions", "resize photo for linkedin", "400x400 image resizer", "linkedin photo size", "professional headshot resizer"],
    faq: [
      { q: "What is the best LinkedIn profile photo size?", a: "400x400 pixels minimum, up to 7680x7680 maximum. PDFBro sizes to 400x400 which provides clean, sharp display on all screens. Your photo displays as a circle, so ensure your face is centered and occupies approximately 60% of the frame — LinkedIn guidelines recommend your face fills the middle of the image." },
      { q: "What makes a good LinkedIn profile picture?", a: "A professional headshot with a neutral background, good lighting, and your face clearly visible. Wear professional attire appropriate for your industry. LinkedIn recommends your face occupy 60% of the frame, you look directly at the camera, and you smile. PDFBro resizes your headshot to the perfect 400x400 dimensions." },
      { q: "Should I use the same photo for LinkedIn and other platforms?", a: "Yes, if it's a good professional headshot. Consistency across platforms builds recognition. However, resize separately — LinkedIn needs 400x400, Facebook 720x720, and Instagram 320x320. Each platform crops and displays differently. PDFBro has dedicated resize tools for each platform." },
      { q: "Why does my LinkedIn photo look blurry after uploading?", a: "LinkedIn compresses uploaded photos. Starting with a sharp 400x400 image minimizes compression artifacts. If your original photo is small (under 400px), LinkedIn will upscale it, causing blur. Always start with a high-resolution original and downsize to exactly 400x400 with PDFBro for the sharpest result." },
    ],
  },
  {
    slug: "youtube-thumbnail",
    name: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    aspectRatio: "16:9 (widescreen)",
    maxFileSize: "2 MB",
    metaTitle: "Resize Image for YouTube Thumbnail — 1280x720 Free | PDFBro",
    metaDescription: "Resize images to YouTube thumbnail dimensions 1280x720 pixels online free. 16:9 widescreen format. No signup, perfect for video thumbnails. Instant download.",
    h1: "Resize Image for YouTube Thumbnail — Free Online Tool",
    intro: "YouTube thumbnails display at 1280x720 pixels — the standard 16:9 HD resolution. PDFBro resizes your thumbnail to these exact dimensions online for free. A properly sized, eye-catching thumbnail is the single most important factor in getting your video clicked. Upload any image and get a perfectly sized 1280x720 YouTube thumbnail.",
    useCases: "YouTube video custom thumbnails, Shorts custom thumbnails (cropped from 16:9), video chapter markers, playlist thumbnails, channel trailer thumbnails, and livestream thumbnails. Thumbnails drive click-through rate — a well-sized, compelling thumbnail directly increases views.",
    keywords: ["resize image for youtube thumbnail", "youtube thumbnail size 1280x720", "thumbnail dimensions youtube", "resize photo for youtube", "1280x720 image converter", "youtube custom thumbnail size", "video thumbnail resizer"],
    faq: [
      { q: "What is the best size for a YouTube thumbnail?", a: "1280x720 pixels with a 16:9 aspect ratio. YouTube requires thumbnails to be under 2 MB. This resolution ensures your thumbnail looks sharp on all devices — from mobile phones to 4K TV screens. PDFBro resizes exactly to 1280x720 for the perfect YouTube thumbnail." },
      { q: "What makes a good YouTube thumbnail?", a: "High contrast, readable text (minimum 72pt bold font), a human face showing emotion, and a clear subject against a simple background. The 1280x720 canvas gives you room for all these elements. Remember thumbnails are often viewed at small sizes (mobile, sidebar) — bold, simple designs work best." },
      { q: "Why won't YouTube let me upload a custom thumbnail?", a: "YouTube requires phone verification to enable custom thumbnails. Also, your account must have no community guideline strikes. Once verified, upload your 1280x720 thumbnail via PDFBro — YouTube accepts JPEG, PNG, GIF (non-animated), and BMP under 2 MB." },
      { q: "Can I use the same thumbnail for YouTube and other platforms?", a: "YouTube's 1280x720 (16:9) matches Twitter's post size (1200x675, also 16:9) but different exact dimensions. For cross-platform use, create your thumbnail at 1280x720 and resize copies for Twitter (1200x675) and other platforms using PDFBro's dedicated tool presets." },
    ],
  },
  {
    slug: "youtube-banner",
    name: "YouTube Banner",
    width: 2560,
    height: 1440,
    aspectRatio: "16:9 (HD)",
    maxFileSize: "6 MB",
    metaTitle: "Resize Image for YouTube Banner — 2560x1440 Free | PDFBro",
    metaDescription: "Resize images to YouTube channel banner dimensions 2560x1440 pixels online free. Full HD channel art. No signup, instant download. Works on all devices.",
    h1: "Resize Image for YouTube Banner — Free Online Tool",
    intro: "YouTube channel banners display at 2560x1440 pixels on TV, but the visible area varies dramatically by device. PDFBro resizes your channel art to these exact dimensions online for free. The key is the safe area — a 1546x423 center rectangle that's visible on all devices from smartphones to smart TVs.",
    useCases: "Channel branding for TV display (2560x1440), desktop browser banners, mobile YouTube app channel headers, tablet display, and YouTube Music artist profiles. A well-sized banner establishes your channel's identity across every device your viewers use.",
    keywords: ["resize image for youtube banner", "youtube channel art size", "youtube banner dimensions 2560x1440", "youtube channel banner resizer", "resize photo for youtube channel", "youtube background image size", "2560x1440 banner maker"],
    faq: [
      { q: "What size should a YouTube channel banner be?", a: "Upload at 2560x1440 pixels for the best quality across all devices. YouTube recommends this resolution for TV display. The minimum is 2048x1152. The safe area — visible on all devices — is a 1546x423 rectangle in the center. Place your channel name, logo, and tagline within this center zone." },
      { q: "Why does my YouTube banner look different on mobile vs TV?", a: "YouTube shows different crops of your banner on different screens. Desktop shows a horizontal strip across the top (approximately 2560x350). Mobile shows a wider but shorter crop. TV shows nearly the full 2560x1440 image. Design with the 1546x423 safe area in mind — anything outside it may be invisible on some devices." },
      { q: "What file format and size for YouTube channel art?", a: "YouTube accepts JPEG, PNG, GIF (non-animated), and BMP files up to 6 MB. PDFBro sizes to 2560x1440 — a JPEG at 90% quality at this resolution is typically 500 KB to 1.5 MB, well within YouTube's limit. PNG works too but produces larger files." },
      { q: "Can I make a YouTube banner with text that's visible on all devices?", a: "Yes — keep all text, logos, and key visual elements within the center 1546x423 safe zone. Text outside this area will be cut off on mobile, tablet, or desktop views. Use large, bold fonts (at least 48pt at 2560x1440) for readability at smaller screen sizes." },
    ],
  },
  {
    slug: "tiktok-video",
    name: "TikTok Video",
    width: 1080,
    height: 1920,
    aspectRatio: "9:16 (vertical)",
    maxFileSize: "50 MB",
    metaTitle: "Resize Image for TikTok Video — 1080x1920 Free | PDFBro",
    metaDescription: "Resize images to TikTok video dimensions 1080x1920 pixels online free. 9:16 vertical format for TikTok posts. No signup, instant download. Optimized for For You Page.",
    h1: "Resize Image for TikTok Video — Free Online Tool",
    intro: "TikTok videos display at 1080x1920 pixels — the full-screen 9:16 vertical format. PDFBro resizes your cover images and photo slides to these exact dimensions online for free. Whether you're creating a TikTok photo slideshow, designing a video cover frame, or making image-based content, the right dimensions ensure your content fills the entire screen.",
    useCases: "TikTok photo mode slideshows, video cover/thumbnail images, TikTok carousel images, slideshow presentations, before-and-after reveal covers, and trending template cover photos. Full-screen 9:16 images perform best in the For You Page algorithm.",
    keywords: ["resize image for tiktok", "tiktok video size 1080x1920", "tiktok slideshow dimensions", "resize photo for tiktok", "tiktok image size requirements", "1080x1920 image resizer", "tiktok post dimensions"],
    faq: [
      { q: "What image size does TikTok use?", a: "1080x1920 pixels (9:16 vertical) is TikTok's native video and photo mode resolution. This fills the entire phone screen without letterbox (black bars). TikTok supports horizontal (16:9) content but vertical content performs significantly better because it matches how users hold their phones." },
      { q: "Can I post horizontal images on TikTok?", a: "Yes, but they won't fill the screen — large black bars appear on top and bottom, and engagement is typically lower. TikTok's algorithm favors full-screen 1080x1920 content. Resize horizontal photos to 1080x1920 with PDFBro, either by cropping or adding a background, for maximum engagement." },
      { q: "What resolution do TikTok photo slideshows need?", a: "1080x1920 pixels for each photo in the slideshow. Each image should be exactly 9:16 to avoid cropping. PDFBro can batch-resize all your slideshow images to uniform dimensions — process each image individually with the 1080x1920 preset." },
      { q: "Why is my TikTok image blurry after uploading?", a: "TikTok compresses uploads heavily. Starting with the native 1080x1920 resolution and a well-compressed JPEG (85-90% quality) gives you the best possible quality after TikTok's processing. Uploading smaller images or very large images (which TikTok downscales poorly) both result in blur." },
    ],
  },
  {
    slug: "whatsapp-dp",
    name: "WhatsApp DP",
    width: 500,
    height: 500,
    aspectRatio: "1:1 (square)",
    maxFileSize: "3 MB",
    metaTitle: "Resize Image for WhatsApp DP — 500x500 Free | PDFBro",
    metaDescription: "Resize images to WhatsApp display picture dimensions 500x500 pixels online free. Perfect square DP size. No signup, instant download. Crisp on all phones.",
    h1: "Resize Image for WhatsApp DP — Free Online Tool",
    intro: "WhatsApp display pictures are 500x500 pixels — resized to perfection with PDFBro's free online tool. Upload any photo, get a sharp 500x500 square DP that looks crisp on all phones — from small screens to large flagship displays. No signup, no app download, instant results.",
    useCases: "Personal WhatsApp profile picture, WhatsApp Business profile photo, group icon, broadcast list avatar, and status-linked profile images. A clear, well-sized DP makes you recognizable in group chats and contact lists. WhatsApp displays DPs as circles, so center your face or logo.",
    keywords: ["resize image for whatsapp dp", "whatsapp dp size 500x500", "whatsapp display picture dimensions", "resize photo for whatsapp profile", "whatsapp dp resizer online", "500x500 image converter", "whatsapp profile picture size"],
    faq: [
      { q: "What is the best WhatsApp DP size?", a: "500x500 pixels is WhatsApp's native display picture resolution. This square format is then displayed as a circle. Uploading at exactly 500x500 prevents WhatsApp from upscaling (which causes blur) or downscaling (which can introduce artifacts). PDFBro sizes to the exact 500x500 for optimal clarity." },
      { q: "Will my WhatsApp DP look good on all phones?", a: "Yes. 500x500 pixels provides enough resolution for crisp display on all phone screens, from budget Android devices to the latest iPhone. WhatsApp displays DPs at about 1-2 cm diameter on phone screens, so 500x500 resolution is more than sufficient for sharp rendering." },
      { q: "How do I make a 500x500 DP from a full-body photo?", a: "Upload your photo to PDFBro's resize tool, enter 500x500, and the tool scales your image to fit. For best results, crop your photo to a square first — focusing on your face in the center 60% of the frame. This ensures your face is clearly visible even in the small circular WhatsApp display." },
      { q: "Can I use the same 500x500 image for other messaging apps?", a: "Yes — 500x500 works well for WhatsApp, Telegram (also uses squares), and Signal. For platforms with different requirements (LinkedIn needs 400x400, Facebook needs 720x720), use PDFBro's dedicated presets. Each platform displays at slightly different sizes and crops, but 500x500 is universally sharp on all messaging apps." },
    ],
  },
];

export function generateStaticParams() {
  return PLATFORMS.map((p) => ({ platform: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform } = await params;
  const config = PLATFORMS.find((p) => p.slug === platform);
  if (!config) return { title: "Not Found" };

  const url = `${BASE_URL}/resize-image-for/${platform}`;
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
    },
  } as Metadata;
}

function PlatformJsonLd({ config }: { config: PlatformConfig }) {
  const url = `${BASE_URL}/resize-image-for/${config.slug}`;
  const modifyDate = "2026-06-23";

  return (
    <Script
      id={`jsonld-resize-${config.slug}`}
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
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
                { "@type": "ListItem", position: 2, name: "Image Tools", item: `${BASE_URL}/image-tools` },
                { "@type": "ListItem", position: 3, name: `Resize Image for ${config.name}`, item: url },
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
              name: `How to Resize an Image for ${config.name}`,
              description: `Resize images to exact ${config.name} dimensions of ${config.width}x${config.height} pixels online free.`,
              inLanguage: "en-US",
              totalTime: "PT1M",
              tool: [{ "@type": "HowToTool", name: "PDFBro", url: BASE_URL }],
              step: [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Upload your image",
                  text: `Click to upload or drag and drop your image into PDFBro's resize tool. Supports JPEG, PNG, WebP, and SVG formats up to 100 MB.`,
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: `Set dimensions to ${config.width}x${config.height}`,
                  text: `Enter ${config.width} for width and ${config.height} for height in the resize tool. This is the exact ${config.name} resolution for optimal display. Enable 'Maintain aspect ratio' to avoid stretching, or disable to force exact dimensions.`,
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Download your resized image",
                  text: `Click Resize and download instantly. Your image is now exactly ${config.width}x${config.height} pixels — ready to upload to ${config.name.split(" ")[0]}. No watermarks, no signup required.`,
                },
              ],
            },
          ],
        }),
      }}
    />
  );
}

export default async function ResizeImageForPlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  const config = PLATFORMS.find((p) => p.slug === platform);
  if (!config) notFound();

  const dimensions = `${config.width}x${config.height}`;
  const canonicalUrl = `${BASE_URL}/resize-image-for/${platform}`;

  return (
    <>
      <PlatformJsonLd config={config} />
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tool-page" accentColor="#8b5cf6" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/image-tools" className="hover:underline">Image Tools</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>Resize Image for {config.name}</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl mb-4" style={{ color: "var(--text-primary)" }}>
            {config.h1}
          </h1>
          <p className="text-base leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            {config.intro}
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.2)" }}>
              <Maximize2 className="h-3 w-3" /> {dimensions} px
            </span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(139,92,246,0.08)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.15)" }}>{config.aspectRatio}</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>Free</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(79,142,247,0.1)", color: "var(--accent-blue)", border: "1px solid rgba(79,142,247,0.2)" }}>No Signup</span>
          </div>

          <Link href="/tools/resize-image" className="group mb-8 flex items-center justify-between gap-4 rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.05))", border: "1px solid rgba(139,92,246,0.3)" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#8b5cf6" }}>Free Online Tool</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Resize Image</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Resize any image to exact dimensions — set custom width and height, maintain aspect ratio</p>
            </div>
            <div className="flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}>
              Resize Image Now →
            </div>
          </Link>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>How to Resize an Image for {config.name}</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload your image", desc: `Drag and drop any image into PDFBro's resize tool. Supports JPEG, PNG, WebP, and SVG formats up to 100 MB. Works on desktop, tablet, and mobile browsers.` },
                { step: 2, title: `Set dimensions to ${dimensions}`, desc: `Enter ${config.width} for width and ${config.height} for height. This is the exact ${config.name} resolution (${config.aspectRatio} aspect ratio). Enable 'Maintain aspect ratio' for proportional scaling, or disable it to force exact dimensions if your original aspect ratio differs.` },
                { step: 3, title: "Download your resized image", desc: `Click Resize and download your perfectly sized ${config.name} image. Zero watermarks, zero quality loss from the resize operation, instant download. Use it directly on ${config.name.split(" ")[0]}.` },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "rgba(139,92,246,0.15)", color: "#8b5cf6" }}>{s.step}</span>
                  <div><p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{s.title}</p><p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>Best Uses for {config.name} Images</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{config.useCases}</p>
          </section>

          <section className="rounded-2xl p-5 mb-6 space-y-3" style={{ backgroundColor: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>Why Use PDFBro to Resize Images</h2>
            {["100% Free — no subscription", "No signup required — instant use", "Browser-based — images stay on your device", "No watermarks on output", "No daily limits — resize unlimited images", "Works on desktop, tablet, and mobile"].map((feat) => (
              <div key={feat} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat}</span>
              </div>
            ))}
          </section>

          <section className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
            <div className="space-y-5">
              {config.faq.map((item, i) => (
                <div key={i} className="pb-5" style={{ borderBottom: i < config.faq.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>Resize Image for Other Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.filter((p) => p.slug !== config.slug).map((p) => (
                <Link
                  key={p.slug}
                  href={`/resize-image-for/${p.slug}`}
                  className="rounded-xl px-4 py-2 text-xs font-medium transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                >
                  Resize for {p.name} ({p.width}x{p.height}) →
                </Link>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/tools/resize-image" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              Resize Your Image Now — Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
