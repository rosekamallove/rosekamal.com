import type { Metadata } from "next";
import {
  ArrowUpRight,
  Github,
  XTwitter,
  Instagram,
  YouTube,
  Linkedin,
  Mail,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Links",
  description: "All the places you can find me online.",
};

const LINKS: {
  platform: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  background: string;
  bgImage?: string;
  span: number;
}[] = [
  {
    platform: "YouTube",
    handle: "@rosekamallove",
    href: "https://www.youtube.com/@rosekamallove",
    icon: YouTube,
    background: "linear-gradient(135deg, #0d0d0d 0%, #1a0000 100%)",
    span: 2,
  },
  {
    platform: "X",
    handle: "@rosekamallove",
    href: "https://x.com/rosekamallove",
    icon: XTwitter,
    background: "linear-gradient(135deg, #000000 0%, #0f0f0f 100%)",
    span: 1,
  },
  {
    platform: "Instagram",
    handle: "@rosekamallove",
    href: "https://instagram.com/rosekamallove",
    icon: Instagram,
    background:
      "linear-gradient(135deg, #833ab4 0%, #e1306c 50%, #f77737 100%)",
    span: 1,
  },
  {
    platform: "GitHub",
    handle: "@rosekamallove",
    href: "https://github.com/rosekamallove",
    icon: Github,
    background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
    bgImage: "https://opengraph.githubassets.com/1/rosekamallove",
    span: 2,
  },
  {
    platform: "LinkedIn",
    handle: "rose-kamal-love",
    href: "https://www.linkedin.com/in/rose-kamal-love-1146141b0/",
    icon: Linkedin,
    background: "linear-gradient(135deg, #003f72 0%, #0077b5 100%)",
    span: 1,
  },
  {
    platform: "Email",
    handle: "rosekamallove@gmail.com",
    href: "mailto:rosekamallove@gmail.com",
    icon: Mail,
    background: "linear-gradient(135deg, #111111 0%, #1c1c1c 100%)",
    span: 2,
  },
];

export default function LinksPage() {
  return (
    <section>
      <div className="grid grid-cols-3 gap-3">
        {LINKS.map((link) => (
          <LinkCard key={link.platform} {...link} />
        ))}
      </div>
    </section>
  );
}

function LinkCard({
  platform,
  handle,
  href,
  icon: Icon,
  background,
  bgImage,
  span,
}: {
  platform: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  background: string;
  bgImage?: string;
  span: number;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{ gridColumn: `span ${span}` }}
      className="group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-xl p-5 transition-all hover:scale-[1.02]"
    >
      {/* Background image or gradient */}
      {bgImage ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background }} />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: bgImage
            ? "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Large icon watermark */}
      <Icon
        size={72}
        className="absolute -bottom-3 -right-3 opacity-10 text-white"
      />

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <Icon size={18} className="text-white/80" />
        <ArrowUpRight
          size={15}
          className="text-white/40 transition-colors group-hover:text-white/80"
        />
      </div>

      <div className="relative z-10">
        <p className="font-medium text-white">{platform}</p>
        <p className="font-mono text-xs text-white/50">{handle}</p>
      </div>
    </a>
  );
}
