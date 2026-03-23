"use client";

import { useEffect, useRef, useState } from "react";
import type { TocEntry } from "@/lib/toc";

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5 pt-4 border-t border-border">
      <p className="mb-3 font-mono text-xs font-medium tracking-widest text-text-muted">share</p>
      <div className="flex flex-col gap-2.5">
        <a
          href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-text-muted hover:text-accent transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X / Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-text-muted hover:text-accent transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0 fill-current">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-text-muted hover:text-accent transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0 fill-current">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2.5 text-sm text-text-muted hover:text-accent transition-colors text-left cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

interface TocProps {
  entries: TocEntry[];
  title: string;
  slug: string;
}

/** Inline card — shown on mobile only */
export function TableOfContentsMobile({ entries, title, slug }: TocProps) {
  if (entries.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-xl border border-border bg-bg-card px-5 py-4 lg:hidden"
    >
      <p className="mb-3 font-mono text-xs font-medium tracking-widest text-text-muted">
        on this page
      </p>
      <ol className="space-y-1.5">
        {entries.map((entry) => (
          <li
            key={entry.slug}
            style={{ paddingLeft: entry.depth === 3 ? "1rem" : "0" }}
          >
            <a
              href={`#${entry.slug}`}
              className="text-sm text-text-secondary transition-colors hover:text-accent"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
      <ShareLinks title={title} slug={slug} />
    </nav>
  );
}

/** Fixed sidebar — shown on desktop only */
export function TableOfContentsDesktop({ entries, title, slug }: TocProps) {
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

  if (entries.length === 0) return null;

  const top = titleVisible ? "11.625rem" : "1.5rem";

  return (
    <aside
      className="hidden xl:block fixed left-[calc(50%+24rem)] w-[220px]"
      style={{ top, transition: "top 0.3s ease" }}
    >
      <nav aria-label="Table of contents" className="max-h-[calc(100vh-3rem)] overflow-y-auto">
        <p className="mb-3 font-mono text-xs font-medium tracking-widest text-text-muted">
          on this page
        </p>
        <ol className="space-y-2">
          {entries.map((entry) => {
            const isActive = activeSlug === entry.slug;
            return (
              <li
                key={entry.slug}
                style={{ paddingLeft: entry.depth === 3 ? "0.75rem" : "0" }}
              >
                <a
                  href={`#${entry.slug}`}
                  className={`block text-sm leading-snug transition-colors hover:text-accent ${
                    isActive ? "font-medium text-accent" : "text-text-muted"
                  }`}
                >
                  {entry.text}
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
