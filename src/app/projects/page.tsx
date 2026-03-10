import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

type ProjectStatus = "active" | "shipped" | "archived" | "acquired";

const PROJECTS: {
  name: string;
  description: string;
  url?: string;
  tech: string[];
  status: ProjectStatus;
}[] = [
  {
    name: "InstantDocs",
    description:
      "AI-powered video documentation for SaaS products. Auto-generates professional step-by-step guides from screen recordings in minutes.",
    url: "https://app.instantdocs.com",
    tech: ["Next.js", "TypeScript", "OpenAI", "FFmpeg"],
    status: "active",
  },
  {
    name: "Kroto",
    description:
      "AI course builder for creators — scaled to 500+ courses and 30 paying creators before pivoting to product documentation and getting acquired.",
    url: "https://kroto.one",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    status: "acquired",
  },
];

export default function ProjectsPage() {
  return (
    <section>
      <SectionHeading label="projects" />
      <div className="space-y-1">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  name,
  description,
  url,
  tech,
  status,
}: {
  name: string;
  description: string;
  url?: string;
  tech: string[];
  status: ProjectStatus;
}) {
  const statusConfig: Record<
    ProjectStatus,
    { label: string; className: string }
  > = {
    active: { label: "active", className: "text-yellow bg-yellow/10" },
    shipped: {
      label: "shipped",
      className: "text-text-secondary bg-bg-card-hover",
    },
    archived: {
      label: "archived",
      className: "text-text-muted bg-bg-card-hover",
    },
    acquired: {
      label: "acquired",
      className: "text-text-muted bg-bg-card-hover",
    },
  };
  const { label, className: statusClass } = statusConfig[status];

  const inner = (
    <div className="group rounded-xl border border-transparent px-5 py-4 transition-all hover:border-border hover:bg-bg-card">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{name}</h3>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-xs ${statusClass}`}
          >
            {label}
          </span>
        </div>
        {url && <ArrowUpRight size={15} />}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-bg-card px-2 py-0.5 font-mono text-xs text-text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}
