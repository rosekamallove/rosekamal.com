import type { Metadata } from "next";
import "./globals.css";
import { content } from "../content";

const description = content.about.body.replace(/\n/g, " ");

export const metadata: Metadata = {
  title: `${content.header.name} — ${content.header.tagline}`,
  description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
