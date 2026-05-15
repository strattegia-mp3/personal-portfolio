"use client";

import { Column, Heading, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { useLanguage } from "@/components/LanguageContext";
import { Projects, ProjectData } from "@/components/work/Projects";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";

const OG_IMAGE = "/images/og/about.webp";

interface WorkViewProps {
  posts: ProjectData[];
}

export default function WorkView({ posts }: WorkViewProps) {
  const { content } = useLanguage();
  const { work, person, about } = content;

  return (
    <Column maxWidth="m" paddingTop="24" horizontal="center">
      <DynamicTabTitle 
        titlePt="Projetos | Victor Rocha" 
        titleEn="Projects | Victor Rocha" 
        fallback="Victor Rocha" 
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={OG_IMAGE}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects posts={posts} />
    </Column>
  );
}
