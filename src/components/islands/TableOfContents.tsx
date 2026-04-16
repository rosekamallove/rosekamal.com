import { useEffect, useRef, useState } from "react";

export interface TocEntry {
  depth: number;
  text: string;
  slug: string;
}

interface Props {
  entries: TocEntry[];
  title: string;
  slug: string;
  variant: "mobile" | "desktop";
}

function useActiveSlug(entries: TocEntry[]) {
  const [activeSlug, setActiveSlug] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;

    const headingEls = entries
      .map((e) => document.getElementById(e.slug))
      .filter(Boolean) as HTMLElement[];

    const visible = new Set<string>();

    observerRef.current = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = entries.find((e) => visible.has(e.slug));
        if (first) setActiveSlug(first.slug);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [entries]);

  return activeSlug;
}

function ShareLinks({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://rosekamal.com/writing/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5 pt-4 border-t border-border">
      <p className="mb-3 font-mono text-[0.7rem] font-medium tracking-[0.2em] text-text-muted uppercase">
        share
      </p>
      <div className="flex flex-col gap-2.5">
        <a
          href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-text-muted hover:text-accent transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          x
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-text-muted hover:text-accent transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 fill-current">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.126 2.062 2.062 0 0 1 0 4.126zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          linkedin
        </a>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-2.5 text-sm text-text-muted hover:text-accent transition-colors text-left cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          {copied ? "copied!" : "copy link"}
        </button>
      </div>
    </div>
  );
}

export default function TableOfContents({ entries, title, slug, variant }: Props) {
  if (entries.length === 0) return null;

  if (variant === "mobile") {
    return (
      <nav
        aria-label="Table of contents"
        className="mb-10 rounded border border-border bg-bg-elev px-5 py-4 lg:hidden"
      >
        <p className="mb-3 font-mono text-[0.7rem] font-medium tracking-[0.2em] text-text-muted uppercase">
          on this page
        </p>
        <ol className="space-y-1.5">
          {entries.map((e) => (
            <li key={e.slug} style={{ paddingLeft: e.depth === 3 ? "1rem" : 0 }}>
              <a
                href={`#${e.slug}`}
                className="text-sm text-text-secondary transition-colors hover:text-accent"
              >
                {e.text}
              </a>
            </li>
          ))}
        </ol>
        <ShareLinks title={title} slug={slug} />
      </nav>
    );
  }

  return <DesktopToc entries={entries} title={title} slug={slug} />;
}

function DesktopToc({
  entries, title, slug,
}: Omit<Props, "variant">) {
  const activeSlug = useActiveSlug(entries);
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    const el = document.getElementById("post-title");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTitleVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const top = titleVisible ? "11.625rem" : "1.5rem";

  return (
    <aside
      className="hidden xl:block fixed left-[calc(50%+24rem)] w-[220px]"
      style={{ top, transition: "top 0.3s ease" }}
    >
      <nav aria-label="Table of contents" className="max-h-[calc(100vh-3rem)] overflow-y-auto">
        <p className="mb-3 font-mono text-[0.7rem] font-medium tracking-[0.2em] text-text-muted uppercase">
          on this page
        </p>
        <ol className="space-y-2">
          {entries.map((e) => {
            const active = activeSlug === e.slug;
            return (
              <li key={e.slug} style={{ paddingLeft: e.depth === 3 ? "0.75rem" : 0 }}>
                <a
                  href={`#${e.slug}`}
                  className={`block text-sm leading-snug transition-colors hover:text-accent ${
                    active ? "font-medium text-accent" : "text-text-muted"
                  }`}
                >
                  {e.text}
                </a>
              </li>
            );
          })}
        </ol>
        <ShareLinks title={title} slug={slug} />
      </nav>
    </aside>
  );
}
