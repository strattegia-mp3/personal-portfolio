"use client";

import { useEffect, useState, useRef } from "react";
import { Text, Row } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import type { PostViewsProps } from "@/types";

export function PostViews({ slug, track = false }: PostViewsProps) {
  const [views, setViews] = useState<number | null>(null);
  const { currentLanguage } = useLanguage();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!track) {
      fetch(`/api/blog-views?slug=${encodeURIComponent(slug)}`)
        .then((r) => r.json())
        .then((d) => setViews(d.views))
        .catch(() => {});
      return;
    }

    // --- Lógica de Rastreamento (Incremento) ---
    if (hasTracked.current) return;
    hasTracked.current = true;

    const viewedKey = `viewed_${slug}`;
    const hasViewedSession = sessionStorage.getItem(viewedKey);

    if (hasViewedSession) {
      fetch(`/api/blog-views?slug=${encodeURIComponent(slug)}`)
        .then((r) => r.json())
        .then((d) => setViews(d.views))
        .catch(() => {});
    } else {
      fetch("/api/blog-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
        .then((r) => r.json())
        .then((d) => {
          setViews(d.views);
          sessionStorage.setItem(viewedKey, "true"); 
        })
        .catch(() => {});
    }
  }, [slug, track]);

  if (views === null) return null;

  const label =
    currentLanguage === "pt"
      ? `${views.toLocaleString("pt-BR")} visualizaç${views === 1 ? "ão" : "ões"}`
      : `${views.toLocaleString("en-US")} view${views !== 1 ? "s" : ""}`;

  return (
    <Row gap="4" vertical="center">
      {/* Eye icon inline SVG */}
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
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {label}
      </Text>
    </Row>
  );
}
