/**
 * Builds the URL for the dynamic `/api/og` route.
 *
 * @example
 * generateOGUrl({
 *   baseURL: "https://yoursite.com",
 *   title: "My Blog Post",
 *   description: "Short summary here.",
 *   type: "blog",
 *   tag: "Science",
 * })
 * // → "https://yoursite.com/api/og?title=My+Blog+Post&description=...&type=blog&tag=Science"
 */
export function generateOGUrl({
  baseURL,
  title,
  description,
  type,
  tag,
}: {
  baseURL: string;
  title: string;
  description?: string;
  type?: "blog" | "work" | "page";
  tag?: string;
}): string {
  const url = new URL("/api/og", baseURL);

  url.searchParams.set("title", title);
  if (description) url.searchParams.set("description", description);
  if (type) url.searchParams.set("type", type);
  if (tag) url.searchParams.set("tag", tag);

  return url.toString();
}
