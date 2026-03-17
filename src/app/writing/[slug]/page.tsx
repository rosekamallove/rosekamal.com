import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMermaid from "@/lib/remark-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/posts";
import { getMDXComponents } from "@/components/MDXComponents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <div className="mb-8">
        <Link
          href="/writing"
          className="font-mono text-xs text-text-muted transition-colors hover:text-text-secondary"
        >
          ← writing
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
          {post.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <time className="font-mono text-xs text-text-muted">{formatted}</time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-bg-card px-2 py-0.5 font-mono text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkMermaid],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "gruvbox-dark-medium",
                  },
                ],
              ],
            },
          }}
          components={getMDXComponents()}
        />
      </div>
    </article>
  );
}
