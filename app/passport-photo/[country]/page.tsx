import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Camera, CheckCircle2, Image, Download } from "lucide-react";
import PageBackground from "@/components/PageBackground";

const BASE_URL = "https://pdfbro.tech";

interface CountryData {
  slug: string;
  name: string;
  flag: string;
  size: string;
  sizeMetric: string;
  background: string;
  format: string;
  headwear: string;
  glasses: string;
  faqs: { q: string; a: string }[];
}

const COUNTRIES: Record<string, CountryData> = {
  us: {
    slug: "us", name: "US", flag: "🇺🇸",
    size: "2x2 inches (51x51mm)", sizeMetric: "51x51mm",
    background: "plain white",
    format: "JPEG or PNG, 300 DPI resolution, file size under 240 KB",
    headwear: "Not allowed except for religious or medical reasons documented in writing",
    glasses: "Not allowed as of November 2016 unless medically necessary with a signed doctor's note",
    faqs: [
      { q: "What is the official US passport photo size?", a: "The official US passport photo size is 2x2 inches (51x51mm). The head must be between 1 inch and 1 3/8 inches (25–35mm) from chin to top of head. The photo must be in color, taken within the last 6 months, with a plain white or off-white background." },
      { q: "Can I wear glasses in my US passport photo?", a: "No. Since November 2016, the US Department of State no longer allows glasses in passport photos unless you have a signed medical statement from a doctor. Even then, glasses must not obscure the eyes or create glare." },
      { q: "Can I smile in a US passport photo?", a: "You must have a neutral facial expression with both eyes open. A natural, non-exaggerated smile is acceptable, but wide grins showing teeth may be rejected. The photo must clearly capture your full face." },
      { q: "What background color does the US require?", a: "Plain white or off-white background with no shadows, patterns, or textures. The background must contrast clearly with your face and clothing. PDFBro automatically removes backgrounds and adds the correct white background." },
    ],
  },
  uk: {
    slug: "uk", name: "UK", flag: "🇬🇧",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "light grey or cream",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Not allowed except for religious or medical reasons",
    glasses: "Allowed if eyes are clearly visible without glare or tint",
    faqs: [
      { q: "What size is a UK passport photo?", a: "UK passport photos must be 35mm wide by 45mm high. Your head must be between 29mm and 34mm from chin to crown. The photo must be sharp, in focus, and in color with a light grey or cream background." },
      { q: "Can I use a selfie for my UK passport photo?", a: "HM Passport Office strongly discourages selfies. Photos must be taken from at least 1.5 meters away, face directly toward the camera, with even lighting and no shadows. PDFBro's crop tools ensure the correct head proportions." },
      { q: "What is the UK digital photo requirements for online renewal?", a: "For online renewal, the digital photo must be at least 600 pixels wide by 750 pixels tall, in color JPEG format, with the subject's face clearly visible against a light grey or cream background. File size must not exceed 10 MB." },
      { q: "Are babies and children required to have passport photos?", a: "Yes. All UK passport applicants including newborns must submit a passport photo. Children under 1 can have closed eyes. Children under 6 do not need a neutral expression. No other person or supporting hand can be visible." },
    ],
  },
  canada: {
    slug: "canada", name: "Canada", flag: "🇨🇦",
    size: "50x70mm", sizeMetric: "50x70mm",
    background: "plain white",
    format: "JPEG or PNG, 300 DPI, file size under 4 MB",
    headwear: "Not allowed except for religious beliefs",
    glasses: "Allowed if eyes are clearly visible, no tint, no glare",
    faqs: [
      { q: "What is the size of a Canadian passport photo?", a: "Canadian passport photos must be 50mm wide by 70mm high. The face must be 31–36mm from chin to crown. Photos must be in color, on photographic quality paper, with a plain white background." },
      { q: "Can I wear glasses in a Canadian passport photo?", a: "Yes, prescription glasses are allowed if your eyes are clearly visible and the frames do not obscure any part of the eye. Sunglasses and tinted glasses are not permitted. Avoid glare on lenses from flash." },
      { q: "Do Canadian passport photos need a guarantor's signature?", a: "Yes. The back of one photo must include the photographer's name, address, and date, plus the guarantor's signature with 'I certify this to be a true likeness of [applicant name].' Your guarantor must have known you for at least 2 years." },
      { q: "What happens if my Canadian passport photo gets rejected?", a: "If your photo is rejected, IRCC will return your application with instructions. You'll need to retake and resubmit the photo, which adds 2–4 weeks to processing. Getting the photo right the first time is essential." },
    ],
  },
  australia: {
    slug: "australia", name: "Australia", flag: "🇦🇺",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Only for religious reasons, must not cast shadows",
    glasses: "Not recommended; if worn, eyes must be visible, no tint, no glare",
    faqs: [
      { q: "What is the Australian passport photo size?", a: "Australian passport photos must be 35–40mm wide by 45–50mm high. The head must be approximately 32–36mm from chin to top of skull. In practice, 35x45mm is the standard size accepted at all Post Offices." },
      { q: "Can I use a digital photo for my Australian passport?", a: "Yes. For online renewal, the digital photo must be 35mm wide, 45mm high, at least 300 dpi, in JPEG format. The background must be plain white/light grey with no shadows. PDFBro sizes photos to these exact specifications." },
      { q: "Can I take my own passport photo for Australia?", a: "Yes, you can take your own photo provided it meets all official requirements. Use PDFBro to crop to the exact 35x45mm dimensions, ensure a white background, and download the ready-to-print or digital file." },
      { q: "What are the lighting requirements for Australian passport photos?", a: "Lighting must be even, with no shadows on the face or background. The face must be clearly illuminated. Natural daylight near a window is best. Avoid flash that causes red-eye. PDFBro can adjust brightness and contrast." },
    ],
  },
  india: {
    slug: "india", name: "India", flag: "🇮🇳",
    size: "2x2 inches (51x51mm)", sizeMetric: "51x51mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 400 KB",
    headwear: "Not allowed except for religious reasons",
    glasses: "Allowed if not heavy-framed, no tint, eyes clearly visible",
    faqs: [
      { q: "What is the Indian passport photo size?", a: "Indian passport photos must be 51x51mm (2x2 inches). The face must cover 60–70% of the photo height. The photo must be in color, printed on semi-matte paper, with a plain white background and no border." },
      { q: "Are there special requirements for Indian passport photos of infants?", a: "Yes. Infants must be photographed lying on a plain white sheet with no toys or objects visible. The child's face must fill the frame. Hands/body of parent holding the infant must not be visible in the photo." },
      { q: "Can I wear a bindi or tilak in my Indian passport photo?", a: "Small religious marks like bindi, tilak, or sindoor are generally acceptable if they do not obscure facial features or cover a significant area of the face. They must not create shadows or reflections." },
      { q: "What format should the Indian passport photo be submitted in?", a: "For online applications, use JPEG format, 51x51mm dimensions, 200–300 DPI resolution, and file size under 400 KB. For physical submissions, print on high-quality semi-matte photo paper with no creases or marks." },
    ],
  },
  germany: {
    slug: "germany", name: "Germany", flag: "🇩🇪",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "light grey",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Only for religious reasons, face fully visible",
    glasses: "Allowed if eyes clearly visible, no reflections, no tint",
    faqs: [
      { q: "What is the German passport photo size?", a: "German passport photos (biometrisches Passbild) must be 35mm wide by 45mm high. The face must be 32–36mm from chin to hairline and centered. The background must be light grey with no shadows." },
      { q: "Are German passport photos different from other EU countries?", a: "Yes, German requirements are among the strictest in the EU. The background must be specifically light grey (not white), and the face must be exactly centered with specific measurements. PDFBro applies these specifications automatically." },
      { q: "Can I smile in a German passport photo?", a: "Neutral expression is required — no smile, mouth closed, eyes open and directed at the camera. This is a strict biometric requirement. Even a slight smile may cause rejection during the automated biometric check." },
      { q: "What is the biometric photo requirement for German passports?", a: "Germany requires biometric passport photos that meet ICAO 9303 standards. The photo must have a centered face, light grey background, no shadows, neutral expression, closed mouth, eyes visible, and correct facial proportions." },
    ],
  },
  france: {
    slug: "france", name: "France", flag: "🇫🇷",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "light grey",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Not allowed except religious covering, face must be fully visible",
    glasses: "Allowed if eyes clearly visible, no tint, no thick frames",
    faqs: [
      { q: "What is the French passport photo size?", a: "French passport photos must be 35mm wide by 45mm high. The face must occupy 70–80% of the photo height. The background must be light grey, uniform, with no shadows or patterns." },
      { q: "Can I use a photo booth for my French passport photo?", a: "Yes. Photo booths approved by the French government ('Photomaton agréé') produce compliant photos. PDFBro replicates these exact specifications online — crop your own photo to 35x45mm with light grey background." },
      { q: "What are French passport photo rules for facial expression?", a: "Neutral expression, mouth closed, eyes open and looking directly at the camera. The head must be straight, not tilted. Both ears should be visible if possible. This matches the strict EU biometric photo standard." },
      { q: "How recent must a French passport photo be?", a: "The photo must be less than 6 months old and reflect your current appearance. If you've changed significantly (weight loss, facial hair, cosmetic surgery), a new photo is required even if under 6 months." },
    ],
  },
  spain: {
    slug: "spain", name: "Spain", flag: "🇪🇸",
    size: "32x26mm", sizeMetric: "32x26mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Only religious, must not obscure the face",
    glasses: "Allowed if eyes are visible, no tint, no glare",
    faqs: [
      { q: "What is the Spanish passport photo size?", a: "Spanish passport (DNI/pasaporte) photos must be 32mm wide by 26mm high. The face must be centered and occupy approximately 70% of the photo. The background must be plain white, uniform, and shadow-free." },
      { q: "Can I wear sunglasses in a Spanish passport photo?", a: "No. Sunglasses, tinted glasses, and glasses with thick frames that obscure the eyes are not allowed. Prescription glasses are acceptable only if eyes are clearly visible without reflections or glare." },
      { q: "What is the difference between Spanish DNI and passport photo requirements?", a: "Both DNI (national ID) and passport use the same 32x26mm photo specification. The photo must be recent (within 6 months), in color, with a white background. The same photo can be used for both documents." },
      { q: "Are digital passport photos accepted for Spanish passport renewal?", a: "For online renewal via the Sede Electrónica, a digital photo in JPEG format is required. It must meet the same 32x26mm sizing with white background. PDFBro produces exactly these specifications digitally." },
    ],
  },
  italy: {
    slug: "italy", name: "Italy", flag: "🇮🇹",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Only religious, must not obscure the face",
    glasses: "Allowed if eyes clearly visible, no tint, no heavy frames",
    faqs: [
      { q: "What is the Italian passport photo size?", a: "Italian passport photos (foto tessera per passaporto) must be 35mm wide by 45mm high. The face must be centered, photographed frontally, and occupy at least 70% of the photo. The background must be plain white." },
      { q: "Can I submit digital photos for an Italian passport?", a: "For the electronic ID card (CIE), a digital photo can be submitted at the municipality office. For passports, printed photos are required. PDFBro prepares both — digital JPEG files and print-ready 35x45mm layouts." },
      { q: "What are Italy's requirements for children's passport photos?", a: "Children of all ages including newborns require their own passport photo. For infants, the head must be supported but the supporting hand must not be visible. The child must be awake with eyes open (under 1 year exception allowed)." },
      { q: "Can I wear makeup in an Italian passport photo?", a: "Light, natural makeup is acceptable. Heavy makeup that alters facial features or appearance is not allowed. The photo must accurately represent your everyday appearance for identification purposes." },
    ],
  },
  netherlands: {
    slug: "netherlands", name: "Netherlands", flag: "🇳🇱",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "light grey",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Only religious reasons, face fully visible",
    glasses: "Allowed if eyes clearly visible, no tint, no reflections",
    faqs: [
      { q: "What is the Dutch passport photo size?", a: "Dutch passport photos (pasfoto voor paspoort) must be 35mm wide by 45mm high. The face must be 26–30mm from chin to hairline. The background must be light grey (not white), uniform, and shadow-free." },
      { q: "What are the strict Dutch passport photo requirements?", a: "The Netherlands has some of the strictest photo requirements in the EU. Photo must be less than 6 months old. Ears visible if possible. Neutral expression. No teeth visible. Light grey background. Exact head positioning. PDFBro helps meet all specifications." },
      { q: "Can I take my own Dutch passport photo at home?", a: "Yes, but you must follow all official requirements precisely. Use natural daylight, a light grey wall or backdrop, and ensure the camera is at eye level 1–1.5 meters away. Use PDFBro to crop to exact 35x45mm dimensions." },
      { q: "Why are Dutch passport photos so strictly checked?", a: "The Netherlands uses facial recognition and biometric verification at border control. Non-compliant photos fail automated checks, causing delays. The strict requirements ensure reliable identification at e-gates and automated border systems." },
    ],
  },
  uae: {
    slug: "uae", name: "UAE", flag: "🇦🇪",
    size: "43x55mm", sizeMetric: "43x55mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Allowed for religious/cultural reasons (hijab/ghutra), face fully visible",
    glasses: "Allowed if eyes clearly visible, no tint, no thick frames",
    faqs: [
      { q: "What is the UAE passport photo size?", a: "UAE passport photos must be 43mm wide by 55mm high. The face must cover 60–75% of the photo. The background must be plain white. Photos must be in color, sharp, and taken within the last 6 months." },
      { q: "Can I wear a hijab in my UAE passport photo?", a: "Yes, the hijab or traditional head covering (ghutra) is permitted for religious and cultural reasons. However, the full face from chin to forehead including the hairline and both cheeks must be clearly visible without shadows." },
      { q: "What is the digital photo requirement for UAE online visa applications?", a: "For online visa applications and Emirates ID, a digital JPEG photo of 43x55mm is required. The file size should be 100–500 KB. PDFBro provides exact 43x55mm sizing with white background for UAE immigration compliance." },
      { q: "Are there any specific UAE passport photo requirements for women?", a: "Women may wear hijab provided the full face is visible from chin to forehead. No heavy makeup that alters appearance. Jewelry that causes reflections is discouraged. Eyes must be clearly visible without obstruction." },
    ],
  },
  singapore: {
    slug: "singapore", name: "Singapore", flag: "🇸🇬",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Only religious or medical reasons, face fully visible",
    glasses: "Allowed if eyes clearly visible, no tint, no reflections",
    faqs: [
      { q: "What is the Singapore passport photo size?", a: "Singapore passport photos must be 35mm wide by 45mm high. The face must be 25–35mm from chin to crown. The background must be white, uniform, and shadow-free. The photo must be in color, matte finish." },
      { q: "Can I wear headgear in a Singapore passport photo?", a: "Headgear is only allowed for religious, medical, or cultural reasons. The full facial features from chin to forehead must be visible. The headgear must not cast shadows on the face or cover any part of the facial features." },
      { q: "What are the digital photo specifications for Singapore's online passport application?", a: "Digital photos must be 400x514 pixels minimum, JPEG format, 35x45mm equivalent, white background. File size under 1 MB. The photo must be recent (within 3 months), with no digital enhancement or alteration of facial features." },
      { q: "Do Singapore passport photos require a physical photo studio stamp?", a: "For online application via ApplES, digital photos do not require a studio stamp. For paper applications, the photo must be affixed and the application includes a declaration. Digital submission via PDFBro meets the ICA specifications." },
    ],
  },
  japan: {
    slug: "japan", name: "Japan", flag: "🇯🇵",
    size: "45x35mm", sizeMetric: "45x35mm",
    background: "plain white, grey, or blue (light, uniform)",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Not allowed except for religious reasons",
    glasses: "Allowed if eyes clearly visible, no tint, no glare",
    faqs: [
      { q: "What is the Japanese passport photo size?", a: "Japanese passport photos must be 45mm wide by 35mm high (landscape orientation). The face must be 34±2mm from chin to hairline. The background must be plain (white, light grey, or light blue) with no shadows or patterns." },
      { q: "Does Japan accept digital passport photos?", a: "For the online application system (currently limited rollout), digital JPEG photos meeting the 45x35mm specifications are accepted. For standard counter applications, printed photos on high-quality paper are required. PDFBro prepares both formats." },
      { q: "What are the Japanese rules for facial expression in passport photos?", a: "Neutral expression required. Mouth closed, eyes open and looking directly at the camera. The face must be centered and directly facing the camera, not tilted or rotated. Natural hairline must be visible." },
      { q: "Can I use a photo with colored background for a Japanese passport?", a: "Plain white is the standard and most commonly accepted. Light grey and light blue backgrounds are also technically acceptable but white is recommended to avoid any risk of rejection. PDFBro defaults to plain white background." },
    ],
  },
  china: {
    slug: "china", name: "China", flag: "🇨🇳",
    size: "33x48mm", sizeMetric: "33x48mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Not allowed except for religious reasons, ears must be visible",
    glasses: "Not allowed. Heavy frames, tinted lenses, or glare cause rejection",
    faqs: [
      { q: "What is the Chinese passport photo size?", a: "Chinese passport photos must be 33mm wide by 48mm high. The head must be 28–33mm high and 21–24mm wide. The background must be pure white. Photos must be recent (within 6 months) and printed on glossy photo paper." },
      { q: "Can I wear glasses in a Chinese passport photo?", a: "No. Glasses are generally not allowed in Chinese passport photos. Contact lenses are acceptable if natural colored. The requirement for visible eyes without obstruction is strictly enforced at the Exit and Entry Administration." },
      { q: "What are the Chinese visa photo requirements vs. passport photos?", a: "Chinese visa photos also use the 33x48mm size with white background. Both are similar specifications, but visa photos must additionally have an unblemished white border. PDFBro provides both formats with correct sizing." },
      { q: "Do Chinese passport photos require a specific paper type?", a: "Photos must be printed on glossy, high-quality photo paper. Matte paper is not accepted. The printed photo must be clear, with accurate colors and no smudging. For digital applications, JPEG format is required." },
    ],
  },
  brazil: {
    slug: "brazil", name: "Brazil", flag: "🇧🇷",
    size: "50x70mm", sizeMetric: "50x70mm",
    background: "plain white",
    format: "JPEG or PNG, 300 DPI, file size under 2 MB",
    headwear: "Only religious, must not obscure any facial feature",
    glasses: "Allowed if eyes clearly visible, no tint, no glare, no thick frames",
    faqs: [
      { q: "What is the Brazilian passport photo size?", a: "Brazilian passport photos must be 50mm wide by 70mm high. The face must be centered and clearly visible. The background must be plain white, uniform, without shadows. Photos must be in color, recent, and high quality." },
      { q: "Can I take my own Brazilian passport photo?", a: "Yes, if it meets all requirements: 50x70mm, white background, centered face, neutral expression, recent (6 months). Use PDFBro to crop and resize to exact specifications, then download the file for printing or digital submission." },
      { q: "What is the Brazilian visa photo requirement?", a: "Brazilian visa photos follow the same 50x70mm specification as passport photos. They must have a white background, be recent (within 6 months), and show the applicant facing forward with a neutral expression. PDFBro prepares compliant photos." },
      { q: "Are there special photo requirements for Brazilian minors?", a: "Children of all ages need their own passport photo. Minors must have a neutral expression, eyes open, facing forward. No toys, pacifiers, or other objects visible. For infants, the photo may be taken lying down on a white sheet." },
    ],
  },
  mexico: {
    slug: "mexico", name: "Mexico", flag: "🇲🇽",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Only religious, face must be fully visible",
    glasses: "Allowed if eyes clearly visible, no tint, no reflections, frames not covering eyes",
    faqs: [
      { q: "What is the size of a Mexican passport photo?", a: "Mexican passport photos must be 35mm wide by 45mm high. The face must be 32–34mm in height, centered, with a white background. Photos must be recent (within 30 days for passports) and printed on matte photo paper." },
      { q: "How recent must a Mexican passport photo be?", a: "Mexico is stricter than most countries — the photo must be less than 30 days old at the time of application. It must accurately represent your current appearance including hairstyle, facial hair, and weight." },
      { q: "Can I take a Mexican passport photo at home?", a: "Yes. Take the photo in natural daylight against a white wall, ensure even lighting with no shadows, face the camera directly, neutral expression. Use PDFBro to crop to 35x45mm and download the compliant digital or print-ready version." },
      { q: "What are the digital submission requirements for Mexican passport photos?", a: "For online appointment registration, a digital JPEG photo may be required: 35x45mm, white background, 300 DPI, file size 100–500 KB. PDFBro sizes and compresses to these exact specifications." },
    ],
  },
  "south-africa": {
    slug: "south-africa", name: "South Africa", flag: "🇿🇦",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Only religious, must not obscure face",
    glasses: "Allowed if eyes clearly visible, no tint, no glare",
    faqs: [
      { q: "What is the South African passport photo size?", a: "South African passport photos must be 35mm wide by 45mm high. The head must be 25±5mm from chin to crown. The background must be plain white with no shadows. Photos must be in color and printed on high-quality paper." },
      { q: "Can I use a digital photo for my South African passport application?", a: "For online applications via eHomeAffairs, a digital photo in JPEG format meeting the 35x45mm specification is required. The system automatically checks compliance. PDFBro prepares photos that pass the automated validation." },
      { q: "What are the South African passport photo requirements for babies?", a: "Babies must have their own passport photo. The baby must be photographed lying on a plain white sheet. The face must fill the frame. No parent's hands, toys, or other objects visible. Eyes do not need to be open for newborns." },
      { q: "What happens if my South African passport photo fails the automated check?", a: "If the eHomeAffairs system rejects your digital photo, you'll receive a notification specifying the issue. Common rejections are incorrect head size, background issues, or shadows. Use PDFBro to fix and retry instantly." },
    ],
  },
  nigeria: {
    slug: "nigeria", name: "Nigeria", flag: "🇳🇬",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Only religious, face must be fully visible from chin to hairline",
    glasses: "Allowed if eyes clearly visible, no tint, no heavy frames",
    faqs: [
      { q: "What is the Nigerian passport photo size?", a: "Nigerian passport photos must be 35mm wide by 45mm high. The face must be centered and cover 60–70% of the photo. The background must be plain white with no shadows or patterns. Photos must be recent and in color." },
      { q: "Can I wear traditional headwear in my Nigerian passport photo?", a: "Traditional or religious headwear (gele, cap, hijab) is allowed provided the full face is visible from chin to hairline. The headwear must not cover any part of the face, cast shadows, or obscure the ears." },
      { q: "What is the digital photo requirement for the Nigerian online passport application?", a: "For the Nigeria Immigration Service online portal, a JPEG photo at 35x45mm is required. The file must be under 500 KB with white background. PDFBro provides photos meeting NIS digital application specifications." },
      { q: "How many passport photos does Nigeria require?", a: "The online application requires one digital photo. For counter submission, 2–3 identical printed passport photos are typically required, each 35x45mm on high-quality photo paper with a white background." },
    ],
  },
  philippines: {
    slug: "philippines", name: "Philippines", flag: "🇵🇭",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Only religious, face fully visible",
    glasses: "Allowed if eyes clearly visible, no tint, no reflections, no thick frames",
    faqs: [
      { q: "What is the Philippine passport photo size?", a: "Philippine passport photos must be 35mm wide by 45mm high. The head must be 25–35mm in height. The background must be plain white with no shadows. The photo must be clear, in color, and taken within 6 months." },
      { q: "Can I wear a collarless shirt in a Philippine passport photo?", a: "No. The DFA requires applicants to wear a decent clothing with a collar. Plunging necklines, sleeveless tops, and collarless shirts are not allowed. Clothing must contrast with the white background." },
      { q: "What is the Philippine ePassport photo requirement for online appointment?", a: "For the DFA online appointment system, a digital JPEG photo is required: 35x45mm, white background, recent (6 months). The photo will be verified at the appointment center. PDFBro prepares compliant digital photos." },
      { q: "Can I smile in a Philippine passport photo?", a: "A natural smile with mouth closed is acceptable. Eyes must be open and clearly visible. Avoid wide grins or exaggerated expressions. The face must be naturally relaxed with both ears visible if possible." },
    ],
  },
  malaysia: {
    slug: "malaysia", name: "Malaysia", flag: "🇲🇾",
    size: "35x50mm", sizeMetric: "35x50mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Religious headwear allowed, face fully visible from chin to forehead",
    glasses: "Not recommended; if worn, must not have tint or thick frames that obscure eyes",
    faqs: [
      { q: "What is the Malaysian passport photo size?", a: "Malaysian passport photos must be 35mm wide by 50mm high. The face must be 25–30mm from chin to hairline. The background must be plain white. Photos must be printed on matte or semi-gloss paper." },
      { q: "Can I wear a tudung/hijab in a Malaysian passport photo?", a: "Yes, the tudung or hijab is allowed. It must be a solid dark color (preferably black, navy, or dark blue) to contrast with the white background. The full face from chin to forehead must be clearly visible." },
      { q: "What is the dress code for Malaysian passport photos?", a: "Dark colored clothing is recommended to contrast with the white background. Avoid white or light clothes that blend into the background. For Muslims wearing hijab, dark solid colors are required. Shoulders must be covered." },
      { q: "Does Malaysia accept digital passport photos for online renewal?", a: "For the MyOnline Passport system, a digital JPEG photo is required: 35x50mm, white background, dark clothing. The file must be under 1 MB. PDFBro sizes photos for the exact Malaysian passport dimensions." },
    ],
  },
  "new-zealand": {
    slug: "new-zealand", name: "New Zealand", flag: "🇳🇿",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "light, plain (white or light grey recommended)",
    format: "JPEG, 300 DPI, file size under 5 MB",
    headwear: "Only religious, must not obscure facial features",
    glasses: "Allowed if eyes clearly visible, no tint, no glare on lenses",
    faqs: [
      { q: "What is the New Zealand passport photo size?", a: "New Zealand passport photos must be 35mm wide by 45mm high. The head must be 32–36mm in height. The background must be plain, light in color with no shadows. White or light grey backgrounds are accepted." },
      { q: "Can I take my own NZ passport photo?", a: "Yes, if you follow DIA requirements precisely. Use even lighting, a light background, neutral expression, and correct head proportions. PDFBro crops to 35x45mm and ensures the correct facial dimensions automatically." },
      { q: "What are the digital photo requirements for a New Zealand online passport application?", a: "Digital photos must be 900–4500 pixels wide by 1200–6000 pixels high, JPEG format, file size 250 KB–5 MB. The face must be clearly visible against a plain light background. PDFBro sizes and formats photos to meet DIA specifications." },
      { q: "Does New Zealand allow babies' eyes to be closed in passport photos?", a: "For babies under 12 months, eyes do not need to be open. The baby must be looking at the camera (or in that direction). The photo can be taken while the baby is in a car seat with a plain white cloth behind." },
    ],
  },
  ireland: {
    slug: "ireland", name: "Ireland", flag: "🇮🇪",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "white or light grey",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Only religious, face fully visible",
    glasses: "Allowed if eyes clearly visible, no tint, no glare, no reflections",
    faqs: [
      { q: "What is the Irish passport photo size?", a: "Irish passport photos must be 35mm wide by 45mm high. The face must be 32–36mm from chin to crown. The background must be white or light grey, plain, with no shadows. Photos must be sharp and in color." },
      { q: "Can I use my phone to take an Irish passport photo?", a: "Yes, mobile phone photos are accepted if they meet all quality standards: sharp focus, correct 35x45mm dimensions, white/light grey background, even lighting, no shadows. PDFBro crops and adjusts mobile photos to meet all requirements." },
      { q: "What are the Irish Passport Online digital photo specifications?", a: "Digital photos for Passport Online must be at least 715x951 pixels (35x45mm at 518 DPI), JPEG format. The photo must be recent, show current appearance, and pass the automated photo checker. PDFBro prepares compliant digital files." },
      { q: "How strict is the Irish Passport Online photo checker?", a: "Very strict. The automated system checks for correct head size, background quality, shadows, eye visibility, and expression. Photos failing the check require resubmission, delaying the application. Using PDFBro helps ensure first-time acceptance." },
    ],
  },
  switzerland: {
    slug: "switzerland", name: "Switzerland", flag: "🇨🇭",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Only religious, must not obscure face",
    glasses: "Allowed if eyes clearly visible, no tint, no thick frames",
    faqs: [
      { q: "What is the Swiss passport photo size?", a: "Swiss passport photos must be 35mm wide by 45mm high. The face must occupy 70–80% of the photo height. The background must be plain white, uniform, with no shadows. The photo must be sharp, in color, and recent." },
      { q: "Can I use a photo from a German photo booth for a Swiss passport?", a: "While German and Swiss photo sizes are both 35x45mm, Germany requires a light grey background and Switzerland requires white. This difference means German booth photos may not be accepted for Swiss applications. PDFBro provides the correct white background." },
      { q: "What are the Swiss biometric passport photo requirements?", a: "Swiss biometric passport photos must show a centered face, neutral expression, closed mouth, eyes open and directed at the camera. The head must be straight, not tilted. The photo must meet ICAO 9303 biometric standards." },
      { q: "How do I submit a digital photo for a Swiss passport?", a: "Digital photo submission is available through some cantonal passport offices. The photo must be JPEG, 35x45mm, 300 DPI, white background. PDFBro prepares photos meeting all Swiss federal requirements for both digital and printed submission." },
    ],
  },
  sweden: {
    slug: "sweden", name: "Sweden", flag: "🇸🇪",
    size: "35x45mm", sizeMetric: "35x45mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 1 MB",
    headwear: "Only religious or medical, must not obscure facial features",
    glasses: "Allowed if eyes clearly visible, no tint, no reflections",
    faqs: [
      { q: "What is the Swedish passport photo size?", a: "Swedish passport photos must be 35mm wide by 45mm high. The face must be centered and occupy the correct proportion. The background must be plain white with no shadows. Photos must be in color and printed on matte paper." },
      { q: "Can I apply for a Swedish passport with a digital photo?", a: "Yes, the Swedish Police Authority accepts digital photos at passport offices. Some offices also accept digitally submitted photos via the online booking system. The photo must be JPEG, 35x45mm, 300 DPI, white background." },
      { q: "What is the Swedish rule for children's passport photos?", a: "Children of all ages need their own passport. For infants, the photo can be taken lying down on a white surface. No one else may be visible in the photo. Children's eyes must be open (exception for newborns under 6 weeks)." },
      { q: "How long is a Swedish passport photo valid?", a: "The photo must represent your current appearance and be taken within the last 6 months. If your appearance has changed significantly, a new photo is required regardless of when the previous one was taken." },
    ],
  },
  "saudi-arabia": {
    slug: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦",
    size: "40x60mm", sizeMetric: "40x60mm",
    background: "plain white",
    format: "JPEG, 300 DPI, file size under 500 KB",
    headwear: "Religious headwear allowed, face must be fully visible",
    glasses: "Not recommended; if worn, must not obscure eyes or cause glare, no tinted lenses",
    faqs: [
      { q: "What is the Saudi passport photo size?", a: "Saudi passport photos must be 40mm wide by 60mm high. The face must be centered and clearly visible. The background must be plain white, uniform, with no shadows. Photos must be recent (within 6 months) and printed on high-quality paper." },
      { q: "Can I wear the traditional Saudi head covering in my passport photo?", a: "Yes, the ghutra/shemaagh and iqal are allowed for men, and the hijab for women. The full face must be visible from chin to forehead with no shadows. The head covering must not obscure any facial features." },
      { q: "What is the digital photo requirement for Absher and Saudi visa applications?", a: "For Absher and eVisa platforms, a digital JPEG photo of 40x60mm with white background is required. The photo must show the applicant facing forward with a neutral expression. PDFBro provides 40x60mm sizing for Saudi government systems." },
      { q: "Are there specific Saudi passport photo requirements for women?", a: "Women must have a plain white background, face fully visible. Hijab is permitted but must not cover the chin, forehead, or cheeks. Heavy makeup that changes facial features is not allowed. Jewelry should be minimal to avoid reflections." },
    ],
  },
};

const COUNTRY_NAMES: Record<string, string> = {
  us: "United States", uk: "United Kingdom", canada: "Canada",
  australia: "Australia", india: "India", germany: "Germany",
  france: "France", spain: "Spain", italy: "Italy",
  netherlands: "Netherlands", uae: "United Arab Emirates",
  singapore: "Singapore", japan: "Japan", china: "China",
  brazil: "Brazil", mexico: "Mexico", "south-africa": "South Africa",
  nigeria: "Nigeria", philippines: "Philippines", malaysia: "Malaysia",
  "new-zealand": "New Zealand", ireland: "Ireland",
  switzerland: "Switzerland", sweden: "Sweden",
  "saudi-arabia": "Saudi Arabia",
};

interface PageProps {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((country) => ({ country }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const data = COUNTRIES[country];
  if (!data) return { title: "Page Not Found" };

  const countryName = COUNTRY_NAMES[country] ?? data.name;
  const url = `${BASE_URL}/passport-photo/${country}`;

  return {
    title: `Free ${data.name} Passport Photo Maker Online — ${data.size} | PDFBro`,
    description: `Create ${countryName} passport/visa photos online free. Official ${data.size} size. No signup, instant download. Meets ${countryName} requirements. White/Light background.`,
    keywords: [
      `${data.name.toLowerCase()} passport photo maker free`,
      `${data.name.toLowerCase()} passport photo online`,
      `free ${data.name.toLowerCase()} passport size photo`,
      `${countryName.toLowerCase()} visa photo free online`,
      `${data.name.toLowerCase()} passport photo ${data.size}`,
      `create ${data.name.toLowerCase()} passport photo free`,
      `online ${data.name.toLowerCase()} passport photo tool`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `Free ${data.name} Passport Photo Maker Online — ${data.size} | PDFBro`,
      description: `Create ${countryName} passport and visa photos online free. Official ${data.size}. No signup, instant download.`,
      url,
      type: "website",
    },
  };
}

export default async function PassportPhotoCountryPage({ params }: PageProps) {
  const { country } = await params;
  const data = COUNTRIES[country];
  if (!data) {
    return (
      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />
        <section className="py-20 text-center">
          <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Country Not Found</h1>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            We don&apos;t have passport photo information for this country yet.
          </p>
          <Link href="/tools/passport-photo" className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
            Go to Passport Photo Tool →
          </Link>
        </section>
      </div>
    );
  }

  const countryName = COUNTRY_NAMES[country] ?? data.name;
  const url = `${BASE_URL}/passport-photo/${country}`;
  const modifyDate = new Date().toISOString().split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `Free ${data.name} Passport Photo Maker Online — ${data.size} | PDFBro`,
        description: `Create ${countryName} passport/visa photos online free. Official ${data.size} size. No signup, instant download.`,
        inLanguage: "en-US",
        datePublished: "2025-06-01",
        dateModified: modifyDate,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Passport Photo", item: `${BASE_URL}/tools/passport-photo` },
          { "@type": "ListItem", position: 3, name: `${data.name} Passport Photo`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <Script id={`jsonld-passport-${country}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen relative" style={{ zIndex: 1 }}>
        <PageBackground variant="tools" />

        {/* Hero */}
        <section className="relative py-16" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
              <Link href="/" className="hover:underline">Home</Link> / <Link href="/tools/passport-photo" className="hover:underline">Passport Photo Maker</Link> / <span>{data.name} Passport Photo</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{data.flag}</span>
              <h1 className="text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                {data.name} Passport Photo Maker — Free Online Tool
              </h1>
            </div>

            <p className="text-base max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
              Create professional {countryName} passport and visa photos online for free. Our tool automatically crops your photo to the official <strong style={{ color: "var(--text-primary)" }}>{data.size}</strong> dimensions with the correct {data.background} background — no signup, no fees, instant download.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {["No signup required", "Official size: " + data.size, "Instant download", data.background + " background", "Meets " + data.name + " requirements"].map((badge) => (
                <span key={badge} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "var(--accent-green)", border: "1px solid rgba(52,211,153,0.2)" }}>{badge}</span>
              ))}
            </div>

            <Link href="/tools/passport-photo" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
              <Camera className="h-4 w-4" /> Make Your {data.name} Passport Photo Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Official Size Highlight */}
        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Official {data.name} Passport Photo Size</p>
              <p className="text-3xl font-extrabold mb-2" style={{ color: "var(--text-primary)" }}>{data.size}</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {data.background} background &middot; {data.format} &middot; Meets all {countryName} government requirements
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: "var(--text-primary)" }}>
              How to Make a {data.name} Passport Photo in 3 Steps
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: Camera, title: "1. Upload Your Photo", desc: `Take a photo against a plain ${data.background} wall using your phone or webcam. Ensure even lighting, no shadows, and a neutral expression facing forward. Upload it to our free tool.` },
                { icon: Image, title: "2. Auto-Crop to " + data.name + " Specs", desc: `Our tool automatically crops your photo to the exact ${data.size} dimensions. We remove the background and replace it with the correct ${data.background} color required by ${countryName} authorities. Adjust positioning if needed.` },
                { icon: Download, title: "3. Download & Submit", desc: `Download your perfectly sized ${data.name} passport photo instantly. Use the digital JPEG for online applications or print at any photo store. No watermarks, no signup, 100% free.` },
              ].map((step) => (
                <div key={step.title} className="rounded-xl p-5 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <step.icon className="h-8 w-8 mx-auto mb-3" style={{ color: "var(--accent-blue)" }} />
                  <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Requirements for {data.name} Passport Photos
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              All {countryName} passport and visa photo specifications in one place. Make sure your photo meets every requirement before submission.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Photo Size", value: data.size, icon: "📏" },
                { label: "Background", value: data.background, icon: "🎨" },
                { label: "Format", value: data.format, icon: "📄" },
                { label: "Headwear Policy", value: data.headwear, icon: "🧢" },
                { label: "Glasses Policy", value: data.glasses, icon: "👓" },
                { label: "Photo Age", value: "Taken within the last 6 months", icon: "📅" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</p>
                    <p className="text-sm" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why PDFBro */}
        <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Why Use PDFBro for {data.name} Passport Photos</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: "💰", title: "100% Free", desc: `Create ${data.name} passport photos completely free. No paid downloads, no hidden fees, no subscription. Every other passport photo site charges $5–15 per photo — we charge nothing.` },
                { icon: "🎯", title: "Official Sizes Guaranteed", desc: `Every dimension is pre-configured to the exact ${data.size} specification required by ${countryName} authorities. We stay updated with each country's latest official requirements.` },
                { icon: "🔒", title: "Private & Secure", desc: "Your photo never leaves your device — all processing happens in your browser. No uploads to servers, no storage of your personal photo. Government ID photos deserve the highest privacy standards." },
                { icon: "⚡", title: "Instant Results", desc: "No waiting for a photo booth, no trip to the store. Upload your photo now and download a compliant passport photo in seconds. Works on any device — phone, tablet, or desktop." },
                { icon: "🌍", title: "25+ Countries Supported", desc: `PDFBro supports passport and visa photo specifications for the ${data.name} and 24+ other countries including US, UK, Canada, Australia, India, Japan, and EU nations — all with the same free tool.` },
                { icon: "✅", title: "No Signup Required", desc: "Unlike other tools that require email registration to download your photo, PDFBro gives you instant access. Upload, crop, download — done in 30 seconds with zero personal information collected." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              {data.name} Passport Photo FAQ
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {data.faqs.map((faq) => (
                <div key={faq.q}>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{faq.q}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Ready to make your {data.name} passport photo?</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Free, no signup, official dimensions. Instant download.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/tools/passport-photo" className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))" }}>
                <Camera className="h-4 w-4" /> Make Your {data.name} Photo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tools" className="rounded-xl px-5 py-2.5 text-sm font-semibold"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                Browse All Tools →
              </Link>
            </div>
          </div>
        </section>

        {/* Other Countries */}
        <section className="py-10" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Passport Photo Sizes for Other Countries</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(COUNTRIES)
                .filter(([slug]) => slug !== country)
                .map(([slug, c]) => (
                  <Link key={slug} href={`/passport-photo/${slug}`} className="rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:scale-105"
                    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                    {c.flag} {c.name} ({c.size})
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
