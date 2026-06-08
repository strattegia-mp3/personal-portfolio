"use client";

import { Heading } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

interface DynamicTitleProps {
  /** The canonical (raw frontmatter) title — used as last-resort fallback */
  fallback: string;
  /** Portuguese title from frontmatter title_pt */
  titlePt?: string;
  /** English title from frontmatter title_en */
  titleEn?: string;
}

/**
 * Renders the blog-post heading in the user's current language.
 * Priority: language-specific field → `fallback` (the canonical `title`).
 *
 * NOTE: The canonical `title` field in the frontmatter is intentionally
 * ignored as the display value — it serves only as a last-resort fallback
 * when neither titlePt nor titleEn are provided.
 */
export const DynamicTitle = ({
  fallback,
  titlePt,
  titleEn,
}: DynamicTitleProps) => {
  const { currentLanguage } = useLanguage();

  const displayTitle =
    currentLanguage === "pt"
      ? (titlePt ?? titleEn ?? fallback)
      : (titleEn ?? titlePt ?? fallback);

  return <Heading variant="display-strong-m">{displayTitle}</Heading>;
};
