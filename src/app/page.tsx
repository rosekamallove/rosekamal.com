import Link from "next/link";
import { ArrowUpRight, MapPin } from "@/components/icons";

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
      <div className="animate-fade-in stagger-4 grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3">
        {PAGE_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center justify-between gap-4 border border-border px-5 py-4 transition-all hover:border-border-hover hover:bg-bg-card sm:flex-col sm:items-start sm:justify-start sm:gap-8 ${item.span === 2 ? 'sm:col-span-2' : 'sm:col-span-1'}`}
          >
            <span className="font-medium">{item.label}</span>
            <div className="flex items-center gap-2 sm:w-full sm:justify-between">
              <span className="hidden text-sm text-text-muted sm:block">{item.desc}</span>
              <ArrowUpRight
                size={15}
                className="text-text-muted transition-colors group-hover:text-text-primary"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Links button ── */}
      <Link
        href="/links"
        className="animate-fade-in stagger-5 group mt-3 flex items-center justify-between border border-border px-5 py-4 transition-all hover:border-border-hover hover:bg-bg-card"
      >
        <span className="font-medium">links</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted">
            find me around the internet
          </span>
          <ArrowUpRight
            size={15}
            className="text-text-muted transition-colors group-hover:text-text-primary"
          />
        </div>
      </Link>
    </>
  );
}
