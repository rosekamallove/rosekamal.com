import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMermaid from "@/lib/remark-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { getAllProjects, getProject } from "@/lib/project-posts";
import { getMDXComponents } from "@/components/MDXComponents";
import { TableOfContentsMobile, TableOfContentsDesktop } from "@/components/TableOfContents";
import { extractToc } from "@/lib/toc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `https://rosekamal.com/projects/${slug}`,
      siteName: "Rose Kamal Love",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      creator: "@rosekamallove",
    },
  };
}

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  active:   { label: "active",   className: "text-accent bg-accent/10" },
  shipped:  { label: "shipped",  className: "text-text-secondary bg-bg-card-hover" },
  archived: { label: "archived", className: "text-text-muted bg-bg-card-hover" },
  acquired: { label: "acquired", className: "text-text-muted bg-bg-card-hover" },
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.shipped;
  const toc = extractToc(project.content);

  return (
    <div className="relative">
      {/* ── Fixed TOC sidebar — desktop only ── */}
      <TableOfContentsDesktop entries={toc} title={project.title} slug={slug} />

      {/* ── Article column ── */}
      <article>
          <div className="mb-8">
            <Link
              href="/projects"
              className="font-mono text-xs text-text-muted transition-colors hover:text-text-secondary"
            >
              ← projects
            </Link>

            <h1 id="post-title" className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
              {project.title}
            </h1>

            {/* Meta row: dates + status + live link */}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-text-muted">
                {project.startDate} – {project.endDate}
              </span>

              <span
                className={`rounded-full px-2 py-0.5 font-mono text-xs ${status.className}`}
              >
                {status.label}
              </span>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-accent"
                >
                  live <ArrowUpRight size={11} />
                </a>
              )}
            </div>

            {/* Stack tags */}
            {project.stack && project.stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-bg-card px-2 py-0.5 font-mono text-xs text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Mobile TOC — inline, above the article */}
          <TableOfContentsMobile entries={toc} title={project.title} slug={slug} />

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote
              source={project.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMermaid],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: {
                          light: "github-light",
                          dark: "github-dark",
                        },
                      },
                    ],
                  ],
                },
              }}
              components={getMDXComponents()}
            />
          </div>
      </article>
    </div>
  );
}
