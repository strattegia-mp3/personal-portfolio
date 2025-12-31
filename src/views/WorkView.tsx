"use client";

import { Column, Heading, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { useLanguage } from "@/components/LanguageContext";
import { Projects, ProjectData } from "@/components/work/Projects";
import { TitleManager } from "@/components/i18n/TitleManager";

interface WorkViewProps {
  posts: ProjectData[];
}

export default function WorkView({ posts }: WorkViewProps) {
  const { content } = useLanguage();
  const { work, person, about } = content;

  return (
    <Column maxWidth="m" paddingTop="24" horizontal="center">
        <TitleManager 
        titlePt={`Projetos | Victor Rocha`} 
        titleEn={`Projects | Victor Rocha`} 
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      {/* Agora passamos os posts recebidos via props */}
      <Projects posts={posts} />
    </Column>
  );
}
