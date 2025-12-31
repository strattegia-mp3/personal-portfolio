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
import { Mailchimp } from "@/components";
import { Projects, ProjectData } from "@/components/work/Projects";
import { Posts, PostData } from "@/components/blog/Posts";
import { TitleManager } from "@/components/i18n/TitleManager";

interface HomeViewProps {
  blogPosts: PostData[];
  projectPosts: ProjectData[];
}

export default function HomeView({ blogPosts, projectPosts }: HomeViewProps) {
  const { content } = useLanguage();
  const { home, about, person, blog } = content;

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <TitleManager
        titlePt="Victor Rocha | Desenvolvedor de Software"
        titleEn="Victor Rocha | Software Developer"
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
            delay={0.2}
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
            delay={0.4}
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
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* Highlighted Project */}
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} posts={projectPosts} />
      </RevealFx>

      {/* Blog Section */}
      {routes["/blog"] && (
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
      )}

      {/* Other Projects */}
      <Projects range={[2]} posts={projectPosts} />

      {/* Newsletter*/}
      <Mailchimp />
    </Column>
  );
}
