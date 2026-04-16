import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: "Rose Kamal Love — Writing",
    description: "Essays and thoughts on building software, startups, and AI.",
    site: context.site ?? "https://rosekamal.com",
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/writing/${p.id}/`,
      categories: p.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
