"use client";

import { Column, Heading, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { useLanguage } from "@/components/LanguageContext";
import { ProjectFilter } from "@/components/work/ProjectFilter";
import type { ProjectData } from "@/components/work/Projects";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";
import dynamic from "next/dynamic";

const RevealFx = dynamic(() =>
  import("@once-ui-system/core").then((mod) => mod.RevealFx),
);

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
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-title { animation: heroFadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-title { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
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

      <Heading
        className="hero-title"
        marginBottom="l"
        variant="heading-strong-xl"
        align="center"
      >
        {work.title}
      </Heading>

      <RevealFx fillWidth translateY="20" delay={0.1}>
        <Column fillWidth>
          <ProjectFilter posts={posts} />
        </Column>
      </RevealFx>
    </Column>
  );
}
