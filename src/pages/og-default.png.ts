import type { APIRoute } from "astro";
import { renderOgPng } from "@/lib/og";

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgPng({
    title: "Rose Kamal Love",
    subtitle: "Founder, builder, product engineer.",
    kicker: "rkl",
  });

  return new Response(png as unknown as BodyInit, {
    headers: { "content-type": "image/png", "cache-control": "public, max-age=31536000, immutable" },
  });
};
