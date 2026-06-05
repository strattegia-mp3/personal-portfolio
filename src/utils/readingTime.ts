/**
 * Estimates reading time for a given markdown/MDX string.
 * Average reading speed: 200 words per minute (conservative for tech content).
 *
 * @returns number of minutes (minimum 1)
 */
export function readingTime(content: string): number {
  // Strip MDX tags, code blocks, frontmatter markers and URLs before counting
  const clean = content
    .replace(/---[\s\S]*?---/, "") // frontmatter
    .replace(/```[\s\S]*?```/g, "") // fenced code blocks
    .replace(/`[^`]+`/g, "") // inline code
    .replace(/<[^>]+>/g, " ") // HTML/JSX tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown links → text
    .replace(/[#*_~>|]/g, "") // markdown symbols
    .replace(/\s+/g, " ")
    .trim();

  const words = clean.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
