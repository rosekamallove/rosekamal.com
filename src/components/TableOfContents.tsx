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

/** Inline card — shown on mobile only (lg:hidden on the parent) */
export function TableOfContentsMobile({ entries }: { entries: TocEntry[] }) {
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
    </nav>
  );
}

/** Sticky sidebar — shown on desktop only (hidden lg:block on the parent aside) */
export function TableOfContentsDesktop({ entries }: { entries: TocEntry[] }) {
  const activeSlug = useActiveSlug(entries);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="max-h-[calc(100vh-4rem)] overflow-y-auto">
      <p className="mb-3 font-mono text-xs font-medium tracking-widest text-text-muted">
        on this page
      </p>
      <ol className="space-y-1.5">
        {entries.map((entry) => {
          const isActive = activeSlug === entry.slug;
          return (
            <li
              key={entry.slug}
              style={{ paddingLeft: entry.depth === 3 ? "0.75rem" : "0" }}
            >
              <a
                href={`#${entry.slug}`}
                className={`block text-xs leading-snug transition-colors hover:text-accent ${
                  isActive ? "font-medium text-accent" : "text-text-muted"
                }`}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
