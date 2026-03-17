import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as PostFrontmatter) };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPost(slug: string): Post | null {
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const md = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...(data as PostFrontmatter), content };
}
