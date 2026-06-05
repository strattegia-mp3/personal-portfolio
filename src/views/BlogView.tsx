"use client";

import { Column, Heading, Schema, Text } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { useLanguage } from "@/components/LanguageContext";
import { Posts, PostData } from "@/components/blog/Posts";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";
import dynamic from "next/dynamic";

const RevealFx = dynamic(() =>
  import("@once-ui-system/core").then((mod) => mod.RevealFx),
);

const OG_IMAGE = "/images/og/about.webp";

interface BlogViewProps {
  posts: PostData[];
}

export default function BlogView({ posts }: BlogViewProps) {
  const { content } = useLanguage();
  const { blog, person } = content;

  return (
    <Column maxWidth="m" paddingTop="24" horizontal="center">
      <DynamicTabTitle
        titlePt="Blog | Victor Rocha"
        titleEn="Blog | Victor Rocha"
        fallback="Victor Rocha"
      />
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-title { animation: heroFadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both; }
        .hero-desc { animation: heroFadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 60ms both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-title, .hero-desc { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={blog.path}
        title={blog.title}
        description={blog.description}
        image={OG_IMAGE}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="m" align="center" marginBottom="xl">
        <Heading
          className="hero-title"
          variant="heading-strong-xl"
          align="center"
        >
          {blog.title}
        </Heading>
        {blog.description && (
          <Text
            className="hero-desc"
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
          >
            {blog.description}
          </Text>
        )}
      </Column>
      <RevealFx fillWidth translateY="20" delay={0.1}>
        <Column fillWidth>
          <Posts posts={posts} columns="2" />
        </Column>
      </RevealFx>
    </Column>
  );
}
