import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and thoughts on building software, startups, and AI.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <section>
      <SectionHeading label="writing" />

      {posts.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <p className="text-sm leading-relaxed text-text-secondary">
            No posts yet — but this is where they&apos;ll live. I&apos;m
            working on it.
          </p>
        </div>
      ) : (
        <div className="space-y-px">
          {posts.map((post) => {
            const formatted = new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="group flex items-start justify-between gap-4 rounded-lg border border-transparent px-1 py-3 transition-colors hover:border-border hover:bg-bg-card"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary transition-colors group-hover:text-yellow">
                    {post.title}
                  </p>
                  {post.description && (
                    <p className="mt-0.5 truncate text-xs text-text-muted">
                      {post.description}
                    </p>
                  )}
                </div>
                <time className="shrink-0 font-mono text-xs text-text-muted">
                  {formatted}
                </time>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
