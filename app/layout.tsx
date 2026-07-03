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
  title: "Caret — Mark it up like paper. Keep the document.",
  description:
    "Caret lets you mark up Word documents with Apple Pencil red ink — strikes, carets, circles — and applies every edit back into the real .docx automatically.",
  openGraph: {
    title: "Caret — Mark it up like paper. Keep the document.",
    description:
      "All the benefits of marking up paper, none of the friction of copying red-pen marks back into the document.",
    type: "website",
  },
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
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
