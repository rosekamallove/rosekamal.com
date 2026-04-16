import type { APIRoute } from "astro";
import { renderOgPng } from "@/lib/og";

export const prerender = true;

const QUIT_DATE = new Date("2026-03-20T02:00:00+05:30");

export const GET: APIRoute = async () => {
  const total = Math.floor((Date.now() - QUIT_DATE.getTime()) / 1000);
  const days = Math.floor(total / 86400);

  const png = await renderOgPng({
    title: `${days} days cigarette free`,
    subtitle: "since mar 20, 2026 · 2:00 am — rosekamal.com",
    kicker: "quit",
    variant: "quit",
  });

  return new Response(png as unknown as BodyInit, {
    headers: { "content-type": "image/png", "cache-control": "public, max-age=86400" },
  });
};
