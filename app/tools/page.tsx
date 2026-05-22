import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "100+ Free PDF & Image Tools Online — No Signup | PDFBro",
  description:
    "Browse 100+ free PDF and image tools. Merge PDF, split PDF, compress PDF, PDF to Word, PDF to Excel, compress image, HEIC to JPG, remove background, QR code generator and more. No signup, no watermarks.",
  keywords: [
    // Core high-traffic
    "free PDF tools",
    "merge PDF free",
    "compress PDF online",
    "PDF to Word converter",
    "split PDF online",
    "online PDF editor free",
    "PDF converter free",
    // Image tools
    "compress image online",
    "HEIC to JPG converter",
    "remove background from image",
    "QR code generator free",
    "resize image online",
    // Intent keywords
    "free online tools no signup",
    "PDF tools no watermark",
    "100 free PDF tools",
    "all PDF tools online",
    "browser based PDF tools",
    // Alt keywords
    "ilovepdf alternative free",
    "smallpdf alternative",
  ],
  alternates: { canonical: "https://pdfbro.tech/tools" },
  openGraph: {
    title: "100+ Free PDF & Image Tools Online — No Signup | PDFBro",
    description: "Merge PDF, compress PDF, PDF to Word, compress images, remove backgrounds, HEIC to JPG and 100+ more free tools.",
    url: "https://pdfbro.tech/tools",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
