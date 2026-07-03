import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usecaret.app"),
  title: "Caret — Mark it up like paper. Keep the document.",
  description:
    "Caret lets you mark up Word documents with Apple Pencil red ink — strikes, carets, circles — and applies every edit back into the real .docx automatically.",
  keywords: [
    "Caret",
    "Caret app",
    "Apple Pencil markup",
    "mark up Word documents iPad",
    "edit docx with Apple Pencil",
    "iPad copy editing app",
    "handwritten document editing",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Caret — Mark it up like paper. Keep the document.",
    description:
      "All the benefits of marking up paper, none of the friction of copying red-pen marks back into the document.",
    url: "https://usecaret.app",
    siteName: "Caret",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caret — Mark it up like paper. Keep the document.",
    description:
      "Mark up Word docs with Apple Pencil. Every red-ink edit applied back into the real .docx, automatically.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Caret",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "iPadOS",
  url: "https://usecaret.app",
  description:
    "Caret lets you mark up Word documents with Apple Pencil red ink — strikes, carets, circles — and applies every edit back into the real .docx automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
