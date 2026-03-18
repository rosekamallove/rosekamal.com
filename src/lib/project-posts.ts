import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  description: string;
  /** "Mon YYYY" — e.g. "Jan 2023" */
  startDate: string;
  /** "Mon YYYY" or "Present" */
  endDate: string;
  status: "active" | "shipped" | "archived" | "acquired";
  stack?: string[];
  /** Live URL for the project (external link shown in header) */
  url?: string;
  draft?: boolean;
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

export interface ProjectPost extends ProjectMeta {
  content: string;
}

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as ProjectFrontmatter) };
    })
    .filter((p) => !p.draft);
}

export function getProject(slug: string): ProjectPost | null {
  const mdx = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const md = path.join(PROJECTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...(data as ProjectFrontmatter), content };
}
