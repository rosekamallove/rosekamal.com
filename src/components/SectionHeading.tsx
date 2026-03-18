export function SectionHeading({
  label,
  level = 1,
}: {
  label: string;
  level?: 1 | 2;
}) {
  const Tag = `h${level}` as "h1" | "h2";
  return (
    <div className="mb-4 flex items-center gap-3">
      <Tag className="font-mono text-xs font-medium tracking-widest text-text-muted">
        {label}
      </Tag>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
