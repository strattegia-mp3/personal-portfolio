"use client";

import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

export interface ProjectData {
  slug: string;
  metadata: {
    title: string;
    title_pt?: string;
    title_en?: string;
    summary: string;
    summary_pt?: string;
    summary_en?: string;
    publishedAt: string;
    images: string[];
    team?: { avatar: string }[];
    link?: string;
    repository?: string;
    draft?: boolean;
    [key: string]: any;
  };
  content: string;
}

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  posts: ProjectData[];
}

export function Projects({ range, exclude, posts }: ProjectsProps) {
  // Filtra drafts e excluídos
  let displayedProjects = posts.filter(
    (post) => !post.metadata.draft && !(exclude && exclude.includes(post.slug)),
  );

  // Ordena por data de publicação (mais recente primeiro)
  displayedProjects = displayedProjects.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  if (range) {
    const start = range[0] - 1;
    const end = range[1] ?? displayedProjects.length;
    displayedProjects = displayedProjects.slice(start, end);
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
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
            post.metadata.team?.map((member) => ({ src: member.avatar })) || []
          }
          link={post.metadata.link || ""}
          repository={post.metadata.repository}
        />
      ))}
    </Column>
  );
}
