import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="grid gap-4 md:grid-cols-[120px_1fr]">
      <div className="text-xs uppercase tracking-[0.35em] text-heading/60">
        {title}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
