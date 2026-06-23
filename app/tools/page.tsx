import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

import { TOOLS } from "@/lib/toolRegistry";

export const metadata: Metadata = {
  title: `All Free PDF & Image Tools Online — No Signup | PDFBro`,
  description:
    `Browse ${TOOLS.length}+ free PDF and image tools. Merge PDF, split PDF, compress PDF, PDF to Word, PDF to Excel, compress image, HEIC to JPG, remove background, QR code generator and more. No signup, no watermarks.`,
  keywords: [
    "free PDF tools",
    "merge PDF free",
    "compress PDF online",
    "PDF to Word converter",
    "split PDF online",
    "online PDF editor free",
    "PDF converter free",
    "compress image online",
    "HEIC to JPG converter",
    "remove background from image",
    "QR code generator free",
    "resize image online",
    "free online tools no signup",
    "PDF tools no watermark",
    "all PDF tools online",
    "browser based PDF tools",
    "ilovepdf alternative free",
    "smallpdf alternative",
  ],
  alternates: { canonical: "https://pdfbro.tech/tools" },
  openGraph: {
    title: `All Free PDF & Image Tools Online — No Signup | PDFBro`,
    description: `Merge PDF, compress PDF, PDF to Word, compress images, remove backgrounds, HEIC to JPG and ${TOOLS.length}+ more free tools.`,
    url: "https://pdfbro.tech/tools",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
