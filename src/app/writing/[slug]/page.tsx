import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMermaid from "@/lib/remark-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/posts";
import { getMDXComponents } from "@/components/MDXComponents";
import { ViewCounter } from "@/components/ViewCounter";

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://rosekamal.com/writing/${slug}`,
      siteName: "Rose Kamal Love",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Rose Kamal Love"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@rosekamallove",
    },
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: "Rose Kamal Love", url: "https://rosekamal.com" },
    publisher: { "@type": "Person", name: "Rose Kamal Love", url: "https://rosekamal.com" },
    url: `https://rosekamal.com/writing/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://rosekamal.com/writing/${post.slug}` },
    ...(post.tags?.length && { keywords: post.tags.join(", ") }),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
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
          <ViewCounter slug={slug} />
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
                    theme: {
                      light: "everforest-light",
                      dark: "everforest-dark",
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
  );
}
