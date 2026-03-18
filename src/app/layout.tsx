import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

const siteUrl = "https://rosekamal.com";
const description =
  "Founder and product engineer. Product Lead at OptimizeCX (InstantDocs). Exited founder of Kroto — raised $160K, #1 on Product Hunt, acquired.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rose Kamal Love",
    template: "%s — Rose Kamal Love",
  },
  description,
  authors: [{ name: "Rose Kamal Love", url: siteUrl }],
  creator: "Rose Kamal Love",
  openGraph: {
    title: "Rose Kamal Love",
    description,
    type: "website",
    url: siteUrl,
    siteName: "Rose Kamal Love",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rose Kamal Love",
    description,
    creator: "@rosekamallove",
    site: "@rosekamallove",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rose Kamal Love",
  url: "https://rosekamal.com",
  jobTitle: "Product Lead",
  worksFor: { "@type": "Organization", name: "OptimizeCX" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  sameAs: [
    "https://x.com/rosekamallove",
    "https://github.com/rosekamallove",
    "https://www.linkedin.com/in/rose-kamal-love-1146141b0/",
    "https://www.youtube.com/@rosekamallove",
    "http://instagram.com/rosekamallove",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <div className="mx-auto max-w-2xl px-6 py-8 sm:py-16">
          <Nav />
          <main>{children}</main>
          <footer className="mt-20 border-t border-border pt-8 text-center">
            <p className="font-mono text-xs text-text-muted">
              Rose Kamal Love &middot; {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
