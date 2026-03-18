import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!redis) return NextResponse.json({ views: null });

  const views = await redis.incr(`views:${slug}`);
  return NextResponse.json({ views });
}
