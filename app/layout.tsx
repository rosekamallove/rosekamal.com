import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Rose Kamal Love | Product Lead & Founder",
  description:
    "Product lead, founder, and builder of AI-first SaaS. Experience, highlights, and contact.",
  openGraph: {
    title: "Rose Kamal Love",
    description:
      "Product lead, founder, and builder of AI-first SaaS. Experience, highlights, and contact.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
