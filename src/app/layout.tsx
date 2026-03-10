import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rose Kamal Love",
  description:
    "Product Lead & IC @ OptimizeCX (InstantDocs). Exited Founder (Kroto, Acquired). AI & SaaS.",
  openGraph: {
    title: "Rose Kamal Love",
    description:
      "Product Lead & IC @ OptimizeCX (InstantDocs). Exited Founder (Kroto, Acquired). AI & SaaS.",
    type: "website",
    url: "https://rosekamal.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rose Kamal Love",
    description:
      "Product Lead & IC @ OptimizeCX (InstantDocs). Exited Founder (Kroto, Acquired). AI & SaaS.",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
