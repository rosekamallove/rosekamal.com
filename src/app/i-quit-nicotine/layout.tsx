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
  },
  twitter: {
    card: "summary",
    title: "I Quit Nicotine",
    description: "Live counter tracking how long it's been since I quit nicotine.",
    creator: "@rosekamallove",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
