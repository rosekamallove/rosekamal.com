"use client";

import { useEffect, useRef, useId } from "react";

interface Props {
  chart: string;
}

export function MermaidDiagram({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains("dark")
          ? "dark"
          : "default",
      });

      if (cancelled || !ref.current) return;

      const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim());
      if (!cancelled && ref.current) {
        ref.current.innerHTML = svg;
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-x-auto rounded-lg border border-border bg-bg-card p-4"
    />
  );
}
