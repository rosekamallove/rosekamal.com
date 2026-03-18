import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Mail,
  Linkedin,
  Github,
  XTwitter,
  Instagram,
  YouTube,
} from "@/components/icons";

const PAGE_LINKS = [
  { href: "/work", label: "work", desc: "experience & career", span: 1 },
  { href: "/projects", label: "projects", desc: "things i've built", span: 2 },
  { href: "/writing", label: "writing", desc: "essays & thoughts", span: 2 },
  {
    href: "/outside",
    label: "outside work",
    desc: "guitar, piano, photography",
    span: 1,
  },
];

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
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <header className="mb-12">
        <div className="animate-fade-in mb-4 flex items-center gap-2 text-sm text-text-secondary">
          <MapPin />
          <span>Bengaluru, India</span>
          <span className="mx-1 text-text-muted">/</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            available
          </span>
        </div>

        <h1 className="animate-fade-in stagger-1 mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Rose Kamal Love
        </h1>

        <p className="animate-fade-in stagger-2 mb-4 font-mono text-sm text-text-muted">
          Founder, builder.
        </p>

        <p className="animate-fade-in stagger-3 max-w-lg text-base leading-relaxed text-text-secondary">
          Product Lead at <span className="text-text-primary">OptimizeCX</span>,
          working on InstantDocs. Previously co-founded{" "}
          <span className="text-text-primary">Kroto</span> — raised $160K,
          launched #1 on Product Hunt, and got acquired. I build software people
          actually use.
        </p>
      </header>

      {/* ── Page navigation bento ── */}
      <div className="animate-fade-in stagger-4 grid grid-cols-3 gap-3">
        {PAGE_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ gridColumn: `span ${item.span}` }}
            className="group flex flex-col gap-8 rounded-xl border border-border px-5 py-4 transition-all hover:border-border-hover hover:bg-bg-card"
          >
            <span className="font-medium">{item.label}</span>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{item.desc}</span>
              <ArrowUpRight
                size={15}
                className="text-text-muted transition-colors group-hover:text-text-primary"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="animate-fade-in stagger-5 my-6 h-px bg-border" />

      {/* ── Social links bento ── */}
      <div className="animate-fade-in stagger-6 grid grid-cols-3 gap-3">
        {SOCIAL_LINKS.map((link) => (
          <SocialCard key={link.platform} {...link} />
        ))}
      </div>
    </>
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
      style={{ gridColumn: `span ${span}` }}
      className="group relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-xl border border-transparent bg-bg-card px-5 py-4 transition-all hover:border-border hover:bg-bg-card-hover"
    >
      {/* Large watermark icon */}
      <Icon
        size={64}
        className="absolute -bottom-2 -right-2 text-text-muted opacity-10"
      />

      {/* Top: small icon + arrow */}
      <div className="relative z-10 flex items-start justify-between">
        <Icon size={16} className="text-accent" />
        <ArrowUpRight
          size={14}
          className="text-text-muted transition-colors group-hover:text-text-primary"
        />
      </div>

      {/* Bottom: name + handle */}
      <div className="relative z-10">
        <p className="text-sm font-medium text-text-primary">{platform}</p>
        <p className="font-mono text-xs text-text-muted">{handle}</p>
      </div>
    </a>
  );
}
