import { getCollection } from "astro:content";

export interface SearchItem {
  title: string;
  href: string;
  kind: "page" | "writing" | "project";
  description?: string;
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const projects = await getCollection("projects", ({ data }) => !data.draft);

  const pages: SearchItem[] = [
    { title: "Home",         href: "/",         kind: "page" },
    { title: "Work",         href: "/work",     kind: "page", description: "experience & career" },
    { title: "Projects",     href: "/projects", kind: "page", description: "things i've built" },
    { title: "Writing",      href: "/writing",  kind: "page", description: "essays & thoughts" },
    { title: "Outside work", href: "/outside",  kind: "page", description: "guitar, piano, photography" },
    { title: "Socials",      href: "/links",    kind: "page", description: "find me around the internet" },
  ];

  const writing: SearchItem[] = posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((p) => ({
      title: p.data.title,
      href: `/writing/${p.id}`,
      kind: "writing",
      description: p.data.description,
    }));

  const projs: SearchItem[] = projects.map((p) => ({
    title: p.data.title,
    href: `/projects/${p.id}`,
    kind: "project",
    description: p.data.description,
  }));

  return [...pages, ...writing, ...projs];
}
