import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Quit Nicotine — Rose Kamal Love",
  description: "Live counter tracking how long it's been since I quit nicotine.",
  openGraph: {
    title: "I Quit Nicotine — Rose Kamal Love",
    description: "Live counter tracking how long it's been since I quit nicotine.",
    url: "https://rosekamal.com/i-quit-nicotine",
    type: "website",
    siteName: "Rose Kamal Love",
    images: [{ url: "/i-quit-nicotine/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Quit Nicotine",
    description: "Live counter tracking how long it's been since I quit nicotine.",
    creator: "@rosekamallove",
    images: ["/i-quit-nicotine/opengraph-image"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
