import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

/**
 * Blog post view counter using Upstash Redis.
 */

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  try {
    if (!redis) {
      // Fallback para desenvolvimento local
      return NextResponse.json({ slug, views: 0 });
    }

    const views = (await redis.get<number>(`blog:views:${slug}`)) ?? 0;
    return NextResponse.json({ slug, views });
  } catch (error) {
    console.error("[Redis GET Error]:", error);
    return NextResponse.json({ slug, views: 0 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const slug = body.slug as string | undefined;

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  try {
    if (!redis) {
      // Fallback para desenvolvimento local
      return NextResponse.json({ slug, views: 1 });
    }

    // O comando 'incr' do Redis é atômico, o que garante que
    // visualizações simultâneas não se atropelem.
    const views = await redis.incr(`blog:views:${slug}`);
    return NextResponse.json({ slug, views });
  } catch (error) {
    console.error("[Redis POST Error]:", error);
    return NextResponse.json({ slug, views: 1 });
  }
}
