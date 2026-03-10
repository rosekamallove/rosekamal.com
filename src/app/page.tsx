import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Instagram,
  YouTube,
  XTwitter,
} from "@/components/icons";

const SOCIAL_LINKS = [
  { label: "Email", href: "mailto:rosekamallove@gmail.com", icon: Mail },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rose-kamal-love-1146141b0/",
    icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/rosekamallove", icon: Github },
  { label: "X", href: "https://x.com/rosekamallove", icon: XTwitter },
  {
    label: "Instagram",
    href: "http://instagram.com/rosekamallove",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@rosekamallove",
    icon: YouTube,
  },
];

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

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <header className="mb-20">
        <div className="animate-fade-in mb-4 flex items-center gap-2 text-sm text-text-secondary">
          <MapPin />
          <span>Bengaluru, India</span>
          <span className="mx-1 text-text-muted">/</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow" />
            </span>
            available
          </span>
        </div>

        <h1 className="animate-fade-in stagger-1 mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Rose Kamal Love
        </h1>

        <p className="animate-fade-in stagger-2 mb-4 font-mono text-sm text-text-muted">
          Founder, builder, product engineer.
        </p>

        <p className="animate-fade-in stagger-3 mb-8 max-w-lg text-base leading-relaxed text-text-secondary">
          Product Lead at <span className="text-text-primary">OptimizeCX</span>,
          working on InstantDocs. Previously co-founded{" "}
          <span className="text-text-primary">Kroto</span> — raised $160K,
          launched #1 on Product Hunt, and got acquired. I build software people
          actually use.
        </p>

        <div className="animate-fade-in stagger-4">
          <Link
            href="/links"
            className="group inline-flex items-center gap-1 font-mono text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            all links
            <ArrowUpRight size={14} className="transition-colors group-hover:text-text-primary" />
          </Link>
        </div>
      </header>

      {/* ── Page links ── */}
      <div className="animate-fade-in stagger-5 grid grid-cols-3 gap-3">
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
    </>
  );
}
