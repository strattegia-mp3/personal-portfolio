"use client";

import type { PostData } from "@/components/blog/Posts";
import type { ProjectData } from "@/components/work/Projects";
import { useLanguage } from "@/components/LanguageContext";
import { CommandPalette } from "./CommandPalette";

interface CommandPaletteWrapperProps {
  posts: PostData[];
  projects: ProjectData[];
}

export function CommandPaletteWrapper({
  posts,
  projects,
}: CommandPaletteWrapperProps) {
  const { currentLanguage } = useLanguage();

  const postItems = posts
    .filter((p) => !p.metadata.draft)
    .map((p) => ({
      type: "post" as const,
      slug: p.slug,
      title:
        currentLanguage === "pt"
          ? (p.metadata.title_pt ?? p.metadata.title)
          : (p.metadata.title_en ?? p.metadata.title),
      summary:
        currentLanguage === "pt"
          ? (p.metadata.summary_pt ?? p.metadata.summary)
          : (p.metadata.summary_en ?? p.metadata.summary),
      tag:
        currentLanguage === "pt"
          ? (p.metadata.tag_pt ?? p.metadata.tag)
          : (p.metadata.tag_en ?? p.metadata.tag),
      href: `/blog/${p.slug}`,
    }));

  const projectItems = projects
    .filter((p) => !p.metadata.draft)
    .map((p) => ({
      type: "project" as const,
      slug: p.slug,
      title:
        currentLanguage === "pt"
          ? (p.metadata.title_pt ?? p.metadata.title)
          : (p.metadata.title_en ?? p.metadata.title),
      summary:
        currentLanguage === "pt"
          ? (p.metadata.summary_pt ?? p.metadata.summary)
          : (p.metadata.summary_en ?? p.metadata.summary),
      tag:
        currentLanguage === "pt"
          ? (p.metadata.tag_pt ?? p.metadata.tag)
          : (p.metadata.tag_en ?? p.metadata.tag),
      href: `/work/${p.slug}`,
    }));

  return <CommandPalette posts={postItems} projects={projectItems} />;
}
