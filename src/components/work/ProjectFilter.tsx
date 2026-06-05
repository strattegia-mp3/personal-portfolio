"use client";

import { useState, useMemo } from "react";
import { Row, Text } from "@once-ui-system/core";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components";
import { useLanguage } from "@/components/LanguageContext";
import type { ProjectData } from "./Projects";
import styles from "./ProjectFilter.module.scss";

interface ProjectFilterProps {
  posts: ProjectData[];
}

/** Normalises a tag for grouping — "Frontend Premium" and "Frontend" → "Frontend" etc. */
function normTag(tag: string) {
  if (!tag) return "Other";
  const t = tag.trim();
  if (/front[-\s]?end/i.test(t)) return "Frontend";
  if (/back[-\s]?end|api/i.test(t)) return "Backend";
  if (/full[\s-]?stack/i.test(t)) return "Full Stack";
  if (/e[\s-]?commerce/i.test(t)) return "E-commerce";
  return t;
}

export function ProjectFilter({ posts }: ProjectFilterProps) {
  const { currentLanguage } = useLanguage();

  // 👈 Mudamos para "*" para criar um estado neutro de idioma
  const [active, setActive] = useState<string>("*");

  const t = {
    pt: { all: "Todos" },
    en: { all: "All" },
  }[currentLanguage];

  const visiblePosts = posts
    .filter((p) => !p.metadata.draft)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );

  /* Collect unique normalised tags */
  const tags = useMemo(() => {
    const set = new Set<string>();
    visiblePosts.forEach((p) => {
      const raw =
        currentLanguage === "pt"
          ? p.metadata.tag_pt || p.metadata.tag
          : p.metadata.tag_en || p.metadata.tag;
      if (raw) set.add(normTag(raw));
    });
    // 👈 Inserimos o "*" como o primeiro item da lista de tags
    return ["*", ...Array.from(set).sort()];
  }, [visiblePosts, currentLanguage]);

  const filtered = useMemo(
    () =>
      active === "*" // 👈 A verificação agora é sempre com "*"
        ? visiblePosts
        : visiblePosts.filter((p) => {
            const raw =
              currentLanguage === "pt"
                ? p.metadata.tag_pt || p.metadata.tag
                : p.metadata.tag_en || p.metadata.tag;
            return normTag(raw ?? "") === active;
          }),
    [active, visiblePosts, currentLanguage],
  );

  return (
    <>
      {/* ── Pill filter bar ──────────────────────────────── */}
      <Row
        fillWidth
        gap="8"
        wrap
        horizontal="center"
        marginBottom="l"
        paddingX="l"
      >
        {tags.map((tag) => {
          // 👈 Aqui nós traduzimos o "*" visualmente para o usuário
          const displayLabel = tag === "*" ? t.all : tag;

          return (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`${styles.pill} ${active === tag ? styles.pillActive : ""}`}
              aria-pressed={active === tag}
            >
              {displayLabel}
              {active === tag && (
                <motion.span
                  className={styles.pillIndicator}
                  layoutId="pill-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </Row>

      {/* ── Animated project list ────────────────────────── */}
      <motion.div className={styles.projectList} layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((post, index) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{
                duration: 0.3,
                delay: index * 0.04,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ProjectCard
                priority={index < 2}
                href={`/work/${post.slug}`}
                images={post.metadata.images}
                title={post.metadata.title}
                titlePt={post.metadata.title_pt}
                titleEn={post.metadata.title_en}
                description={post.metadata.summary}
                descriptionPt={post.metadata.summary_pt}
                descriptionEn={post.metadata.summary_en}
                content={post.content}
                avatars={
                  post.metadata.team?.map((m: { avatar: string }) => ({
                    src: m.avatar,
                  })) || []
                }
                link={post.metadata.link || ""}
                repository={post.metadata.repository}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <Row fillWidth horizontal="center" paddingY="xl">
          <Text variant="body-default-m" onBackground="neutral-weak">
            {currentLanguage === "pt"
              ? "Nenhum projeto nesta categoria."
              : "No projects in this category."}
          </Text>
        </Row>
      )}
    </>
  );
}
