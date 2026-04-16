import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => setViews(data.views ?? null))
      .catch(() => {});
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="font-mono text-xs text-text-muted tabular-nums">
      {views.toLocaleString()} views
    </span>
  );
}
