import type { APIRoute } from "astro";
import { Redis } from "@upstash/redis";

export const prerender = false;

const redis = import.meta.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: import.meta.env.UPSTASH_REDIS_REST_URL as string,
      token: import.meta.env.UPSTASH_REDIS_REST_TOKEN as string,
    })
  : null;

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;
  if (!redis || !slug) {
    return new Response(JSON.stringify({ views: null }), {
      headers: { "content-type": "application/json" },
    });
  }

  const views = await redis.incr(`views:${slug}`);
  return new Response(JSON.stringify({ views }), {
    headers: { "content-type": "application/json" },
  });
};
