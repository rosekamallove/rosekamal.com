import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

type ProjectStatus = "active" | "shipped" | "archived" | "acquired";

type Project = {
  name: string;
  description: string;
  /** Internal /projects/[slug] path or external URL */
  url?: string;
  /** Slug for /projects/[slug] write-up page (takes priority over url for the card link) */
  slug?: string;
  status: ProjectStatus;
  /** "Mon YYYY" — e.g. "Jan 2023" */
  startDate: string;
  /** "Mon YYYY" or "Present" */
  endDate: string;
};

const PINNED: Project[] = [
  {
    name: "YouTube",
    description:
      "Videos about building with AI — agents, real systems, and what actually works in production.",
    url: "https://www.youtube.com/@rosekamallove",
    status: "active",
    startDate: "Jan 2026",
    endDate: "Present",
  },
];

const EXPERIMENTS: Project[] = [
  {
    name: "Autonomous Email Reply Agent",
    description:
      "Reads inbound cold outreach replies, classifies intent, drafts a response, has another model peer-review the draft, then sends — no human in the loop.",
    slug: "email-reply-agent",
    status: "active",
    startDate: "Mar 2026",
    endDate: "Present",
  },
  {
    name: "YouTube",
    description:
      "Videos about building with AI — agents, real systems, and what actually works in production.",
    url: "https://www.youtube.com/@rosekamallove",
    status: "active",
    startDate: "Jan 2026",
    endDate: "Present",
  },
];

const PAST: Project[] = [
  {
    name: "InstantDocs",
    description:
      "AI-powered platform that auto-generates professional video documentation and step-by-step guides from screen recordings. Launched on Product Hunt twice — ranked #4 and #1 for the day. 2,000+ guides created with ~100k views.",
    slug: "instantdocs",
    url: "https://app.instantdocs.com",
    status: "acquired",
    startDate: "Jun 2024",
    endDate: "Jan 2025",
  },
  {
    name: "Kroto",
    description:
      "AI course builder for creators — scaled to 500+ courses and 30 paying creators before pivoting to product documentation and getting acquired.",
    slug: "kroto",
    url: "https://www.youtube.com/watch?v=hIfsfV-pBBI",
    status: "archived",
    startDate: "May 2023",
    endDate: "Jun 2024",
  },
];

export default function ProjectsPage() {
  return (
    <section>
      <SectionHeading label="projects" />
      <div className="space-y-8">
        {PINNED.length > 0 && <Group projects={PINNED} />}
        <Group label="experiments" projects={EXPERIMENTS} />
        <Group label="past" projects={PAST} />
      </div>
    </section>
  );
}

function Group({ label, projects }: { label?: string; projects: Project[] }) {
  return (
    <div>
      {label && (
        <p className="mb-2 font-mono text-xs text-text-muted">{label}</p>
      )}
      <div className="space-y-1">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  name,
  description,
  url,
  slug,
  status,
  startDate,
  endDate,
}: Project) {
  const statusConfig: Record<
    ProjectStatus,
    { label: string; className: string }
  > = {
    active: { label: "active", className: "text-accent bg-accent/10" },
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

  // Slug write-up page takes priority; fall back to url
  const href = slug ? `/projects/${slug}` : url;
  const isExternal = !slug && url?.startsWith("http");

  const inner = (
    <div className="group border border-transparent px-5 py-4 transition-all hover:border-border hover:bg-bg-card">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-medium">{name}</h2>
          <span className={`px-2 py-0.5 font-mono text-xs ${statusClass}`}>
            {label}
          </span>
        </div>
        {href && (
          <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-text-muted" />
        )}
      </div>
      <p className="mt-0.5 font-mono text-xs text-text-muted">
        {startDate} – {endDate}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );

  if (href) {
    return isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}
