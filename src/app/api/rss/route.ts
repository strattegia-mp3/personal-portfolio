import { getPosts } from "@/utils/utils";
import { baseURL, person } from "@/resources";
import { i18nContent } from "@/resources/content-i18n";
import { NextRequest, NextResponse } from "next/server";

/**
 * Bilingual RSS feeds.
 *
 * GET /api/rss        → English feed (default)
 * GET /api/rss?lang=pt → Portuguese feed
 * GET /api/rss?lang=en → English feed
 *
 * Canonical URLs in sitemaps / <link> tags:
 *   /api/rss          (EN)
 *   /api/rss?lang=pt  (PT)
 */
export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") ?? "en") as "pt" | "en";
  const content = lang === "pt" ? i18nContent.pt : i18nContent.en;
  const { blog } = content;

  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  const selfUrl =
    lang === "pt" ? `${baseURL}/api/rss?lang=pt` : `${baseURL}/api/rss`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/modules/content/">
  <channel>
    <title>${esc(blog.title)}</title>
    <link>${baseURL}/blog</link>
    <description>${esc(blog.description)}</description>
    <language>${lang === "pt" ? "pt-BR" : "en-US"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
    <managingEditor>${person.email} (${person.name})</managingEditor>
    <image>
      <url>${baseURL}${person.avatar}</url>
      <title>${esc(blog.title)}</title>
      <link>${baseURL}/blog</link>
    </image>
    ${posts
      .map((post) => {
        const title =
          lang === "pt"
            ? (post.metadata.title_pt ?? post.metadata.title)
            : (post.metadata.title_en ?? post.metadata.title);
        const summary =
          lang === "pt"
            ? (post.metadata.summary_pt ?? post.metadata.summary)
            : (post.metadata.summary_en ?? post.metadata.summary);
        const tag =
          lang === "pt"
            ? (post.metadata.tag_pt ?? post.metadata.tag)
            : (post.metadata.tag_en ?? post.metadata.tag);

        return `
    <item>
      <title>${esc(title)}</title>
      <link>${baseURL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseURL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${summary}]]></description>
      <author>${person.email} (${person.name})</author>
      ${post.metadata.image ? `<enclosure url="${baseURL}${post.metadata.image}" type="image/webp" />` : ""}
      ${tag ? `<category>${esc(tag)}</category>` : ""}
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

/** Escape XML special chars */
function esc(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
