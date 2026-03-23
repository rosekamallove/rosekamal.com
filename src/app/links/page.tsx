import type { Metadata } from "next";
import {
  ArrowUpRight,
  Linkedin,
  Github,
  XTwitter,
  Instagram,
  YouTube,
  Mail,
} from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Links",
  description: "Find me around the internet.",
};

const SOCIAL_LINKS: {
  platform: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  span: number;
}[] = [
  {
    platform: "YouTube",
    handle: "@rosekamallove",
    href: "https://www.youtube.com/@rosekamallove",
    icon: YouTube,
    span: 2,
  },
  {
    platform: "X",
    handle: "@rosekamallove",
    href: "https://x.com/rosekamallove",
    icon: XTwitter,
    span: 1,
  },
  {
    platform: "GitHub",
    handle: "@rosekamallove",
    href: "https://github.com/rosekamallove",
    icon: Github,
    span: 1,
  },
  {
    platform: "LinkedIn",
    handle: "rose-kamal-love",
    href: "https://www.linkedin.com/in/rose-kamal-love-1146141b0/",
    icon: Linkedin,
    span: 1,
  },
  {
    platform: "Instagram",
    handle: "@rosekamallove",
    href: "https://instagram.com/rosekamallove",
    icon: Instagram,
    span: 1,
  },
  {
    platform: "Email",
    handle: "rosekamallove@gmail.com",
    href: "mailto:rosekamallove@gmail.com",
    icon: Mail,
    span: 3,
  },
];

export default function LinksPage() {
  return (
    <section>
      <SectionHeading label="links" />
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {SOCIAL_LINKS.map((link) => (
          <SocialCard key={link.platform} {...link} />
        ))}
      </div>
    </section>
  );
}

function SocialCard({
  platform,
  handle,
  href,
  icon: Icon,
  span,
}: {
  platform: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  span: number;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-between gap-4 overflow-hidden border border-border px-5 py-4 transition-all hover:border-border-hover hover:bg-bg-card sm:min-h-30 sm:flex-col sm:items-start sm:justify-between sm:gap-0 ${span === 3 ? 'sm:col-span-3' : span === 2 ? 'sm:col-span-2' : 'sm:col-span-1'}`}
    >
      <Icon
        size={128}
        className="absolute -bottom-8 -right-8 text-text-muted opacity-10"
      />
      <div className="relative z-10 flex items-center gap-3 sm:w-full sm:items-start sm:justify-between">
        <Icon size={16} className="text-text-muted" />
        <div className="sm:hidden">
          <p className="text-sm font-medium text-text-primary">{platform}</p>
          <p className="font-mono text-xs text-text-muted">{handle}</p>
        </div>
        <ArrowUpRight
          size={14}
          className="text-text-muted transition-colors group-hover:text-text-primary sm:ml-auto"
        />
      </div>
      <div className="relative z-10 hidden sm:block">
        <p className="text-sm font-medium text-text-primary">{platform}</p>
        <p className="font-mono text-xs text-text-muted">{handle}</p>
      </div>
    </a>
  );
}
