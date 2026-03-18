export interface TocEntry {
  depth: 2 | 3;
  text: string;
  slug: string;
}

/** Convert heading text to an id slug matching rehype-slug's output */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")   // strip punctuation
    .trim()
    .replace(/\s+/g, "-");       // spaces → hyphens
}

/** Extract h2 and h3 headings from raw MDX/markdown source */
export function extractToc(source: string): TocEntry[] {
  const lines = source.split("\n");
  const entries: TocEntry[] = [];

  for (const line of lines) {
    // Match ## or ### headings (not inside code fences)
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    // Strip any inline markdown (bold, italic, backticks, links)
    const text = m[2]
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .trim();
    entries.push({ depth, text, slug: toSlug(text) });
  }

  return entries;
}
