interface Props {
  chart: string;
}

export default function MermaidDiagram({ chart }: Props) {
  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded border border-border bg-bg-elev p-4"
      data-mermaid
      data-chart={chart}
    />
  );
}
