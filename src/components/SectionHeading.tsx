export function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="font-mono text-xs font-medium tracking-widest text-text-muted">
        {label}
      </h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
