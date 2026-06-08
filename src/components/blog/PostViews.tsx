"use client";

import { useEffect, useState, useRef } from "react";
import { Text, Row } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import type { PostViewsProps } from "@/types";

const EyeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ opacity: 0.5, flexShrink: 0 }}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/**
 * Displays view count for a blog post.
 *
 * - Always renders a placeholder immediately (no layout shift / null flash).
 * - With `track={true}`: increments once per browser session via sessionStorage,
 *   then shows the live count.
 * - With `track={false}`: only fetches and displays the count (for listing cards).
 */
export function PostViews({ slug, track = false }: PostViewsProps) {
  const [views, setViews] = useState<number | null>(null);
  const { currentLanguage } = useLanguage();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!track) {
      fetch(`/api/blog-views?slug=${encodeURIComponent(slug)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => setViews(d.views))
        .catch(() => setViews(0));
      return;
    }

    // Guard against StrictMode double-invoke
    if (hasTracked.current) return;
    hasTracked.current = true;

    const viewedKey = `viewed_${slug}`;
    const alreadySeen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(viewedKey) === "true";

    if (alreadySeen) {
      fetch(`/api/blog-views?slug=${encodeURIComponent(slug)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => setViews(d.views))
        .catch(() => setViews(0));
    } else {
      fetch("/api/blog-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => {
          setViews(d.views);
          try {
            sessionStorage.setItem(viewedKey, "true");
          } catch {
            /* private browsing — ignore */
          }
        })
        .catch(() => setViews(0));
    }
  }, [slug, track]);

  const label =
    views === null
      ? "··· views"
      : currentLanguage === "pt"
        ? `${views.toLocaleString("pt-BR")} visualizaç${views === 1 ? "ão" : "ões"}`
        : `${views.toLocaleString("en-US")} view${views !== 1 ? "s" : ""}`;

  return (
    <Row gap="4" vertical="center">
      <EyeIcon />
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {label}
      </Text>
    </Row>
  );
}
