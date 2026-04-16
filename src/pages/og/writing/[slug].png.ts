import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgPng } from "@/lib/og";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((p) => ({ params: { slug: p.id }, props: { post: p } }));
}

export const GET: APIRoute = async ({ props }) => {
  const post = (props as any).post;
  const date = post.data.date.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const png = await renderOgPng({
    title: post.data.title,
    subtitle: `${date} · rosekamal.com`,
    kicker: "writing",
    variant: "writing",
  });

  return new Response(png as unknown as BodyInit, {
    headers: { "content-type": "image/png", "cache-control": "public, max-age=31536000, immutable" },
  });
};
