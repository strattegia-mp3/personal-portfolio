"use client";

import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Line,
} from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import { routes } from "@/resources";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";
import dynamic from "next/dynamic";
import type { PostData } from "@/components/blog/Posts";
import type { ProjectData } from "@/components/work/Projects";

// ─── Otimização de Performance: Dynamic Imports ──────────────────────────────
const Projects = dynamic(() =>
  import("@/components/work/Projects").then((mod) => mod.Projects),
);
const Posts = dynamic(() =>
  import("@/components/blog/Posts").then((mod) => mod.Posts),
);
const Mailchimp = dynamic(() =>
  import("@/components").then((mod) => mod.Mailchimp),
);

interface HomeViewProps {
  blogPosts: PostData[];
  projectPosts: ProjectData[];
}

export default function HomeView({ blogPosts, projectPosts }: HomeViewProps) {
  const { content, currentLanguage } = useLanguage();
  const { home, about, person, blog } = content;

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <DynamicTabTitle
        titlePt="Victor Rocha | Desenvolvedor de Software"
        titleEn="Victor Rocha | Software Developer"
        fallback="Victor Rocha"
      />
      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          <RevealFx
            translateY="4"
            fillWidth
            horizontal="center"
            paddingBottom="16"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx
            translateY="8"
            delay={0.15}
            fillWidth
            horizontal="center"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx
            paddingTop="12"
            delay={0.25}
            horizontal="center"
            paddingLeft="12"
          >
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem", width: 32, height: 32 }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {currentLanguage === "pt" ? "Minha Jornada" : "My Journey"}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* ─── Conteúdo Abaixo da Dobra ─── */}
      <Column fillWidth gap="xl" style={{ display: "contents" }}>
        <RevealFx translateY="12" delay={0.4}>
          <Projects range={[1, 1]} posts={projectPosts} />
        </RevealFx>

        {routes["/blog"] && (
          <RevealFx translateY="12" delay={0.5}>
            <Column fillWidth gap="24" marginBottom="s">
              <Row fillWidth paddingRight="64">
                <Line maxWidth={48} />
              </Row>
              <Row fillWidth gap="24" s={{ direction: "column" }}>
                <Row flex={1} paddingLeft="l" paddingTop="24">
                  <Heading as="h2" variant="display-strong-xs" wrap="balance">
                    {blog.title}
                  </Heading>
                </Row>
                <Row flex={3} paddingX="20">
                  <Posts range={[1, 2]} posts={blogPosts} thumbnail />
                </Row>
              </Row>
              <Row fillWidth paddingLeft="64" horizontal="end">
                <Line maxWidth={48} />
              </Row>
            </Column>
          </RevealFx>
        )}

        {/* Projetos restantes */}
        <RevealFx translateY="12" delay={0.6}>
          <Projects range={[2]} posts={projectPosts} />
        </RevealFx>

        <RevealFx translateY="12" delay={0.7}>
          <Mailchimp />
        </RevealFx>
      </Column>
    </Column>
  );
}
