import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface SearchItem {
  title: string;
  href: string;
  kind: "page" | "writing" | "project";
  description?: string;
}

interface Props {
  items: SearchItem[];
}

function scoreMatch(query: string, item: SearchItem): number {
  if (!query) return 1; // show everything, preserve order
  const q = query.toLowerCase();
  const title = item.title.toLowerCase();
  const desc = (item.description ?? "").toLowerCase();

  // direct substring = strong match
  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 60;
  if (desc.includes(q)) return 30;

  // fuzzy: every char of q appears in title, in order
  let i = 0;
  for (const ch of title) {
    if (ch === q[i]) i++;
    if (i === q.length) return 15;
  }
  return 0;
}

export default function CommandPalette({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    return items
      .map((item) => ({ item, score: scoreMatch(query, item) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.item);
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !open && !isInputFocused()) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const item = results[active];
        if (item) navigate(item.href);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, active]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    // Let Astro's ClientRouter handle it if present; fall back to normal nav
    window.location.href = href;
  }, []);

  if (!open) return null;

  return (
    <div className="cmdk-backdrop" onClick={() => setOpen(false)}>
      <div className="cmdk-box" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Jump to anything…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {results.length === 0 ? (
          <div className="cmdk-empty">No results for "{query}"</div>
        ) : (
          <ul ref={listRef} className="cmdk-list" role="listbox">
            {results.map((item, i) => (
              <li
                key={item.href}
                role="option"
                aria-selected={i === active}
                className="cmdk-item"
                onMouseEnter={() => setActive(i)}
                onClick={() => navigate(item.href)}
              >
                <span className="cmdk-title">{item.title}</span>
                <span className="cmdk-meta">{item.kind}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="cmdk-footer">
          <span className="cmdk-kbd">↑</span>
          <span className="cmdk-kbd">↓</span>
          <span>navigate</span>
          <span className="cmdk-kbd">↵</span>
          <span>open</span>
          <span className="cmdk-kbd">esc</span>
          <span>close</span>
        </div>
      </div>
    </div>
  );
}

function isInputFocused(): boolean {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement).isContentEditable;
}
