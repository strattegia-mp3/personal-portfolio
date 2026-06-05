import { NextRequest, NextResponse } from "next/server";

/**
 * GET  /api/blog-views?slug=my-post  → { slug, views }
 * POST /api/blog-views               → { slug } in body → increments + returns { slug, views }
 *
 * Storage strategy (zero-dependency):
 *   - Vercel KV  →  set BLOG_VIEWS_STORE=kv and bind @vercel/kv
 *   - Default    →  in-memory Map (resets on cold start, fine for dev / low traffic)
 *
 * Para usar Vercel KV em produção:
 *   1. npm install @vercel/kv
 *   2. Adicione KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN no .env
 *   3. Descomente o bloco KV abaixo e comente o bloco memoryStore.
 */

/* ── In-memory store (default) ──────────────────────────────────── */
const memoryStore = new Map<string, number>();

async function getViews(slug: string): Promise<number> {
  return memoryStore.get(slug) ?? 0;
}

async function incrementViews(slug: string): Promise<number> {
  const current = memoryStore.get(slug) ?? 0;
  const next = current + 1;
  memoryStore.set(slug, next);
  return next;
}

/* ── KV store (uncomment to use Vercel KV) ──────────────────────
import { kv } from "@vercel/kv";
const KEY = (slug: string) => `blog:views:${slug}`;
async function getViews(slug: string) {
  return (await kv.get<number>(KEY(slug))) ?? 0;
}
async function incrementViews(slug: string) {
  return kv.incr(KEY(slug));
}
─────────────────────────────────────────────────────────────────── */

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const views = await getViews(slug);
  return NextResponse.json({ slug, views });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const slug = body.slug as string | undefined;
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const views = await incrementViews(slug);
  return NextResponse.json({ slug, views });
}
