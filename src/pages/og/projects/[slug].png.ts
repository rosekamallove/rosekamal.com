import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgPng } from "@/lib/og";

export const prerender = true;

export async function getStaticPaths() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.map((p) => ({ params: { slug: p.id }, props: { project: p } }));
}

export const GET: APIRoute = async ({ props }) => {
  const project = (props as any).project;
  const dateRange = `${project.data.startDate} – ${project.data.endDate}`;
  const stack = project.data.stack?.slice(0, 5).join(" · ") ?? "";
  const subtitle = stack ? `${dateRange}   ${stack}` : dateRange;

  const png = await renderOgPng({
    title: project.data.title,
    subtitle,
    kicker: "projects",
    variant: "projects",
  });

  return new Response(png as unknown as BodyInit, {
    headers: { "content-type": "image/png", "cache-control": "public, max-age=31536000, immutable" },
  });
};
