import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Column,
  HeadingNav,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { generateOGUrl } from "@/utils/generateOGUrl";
import { readingTime } from "@/utils/readingTime";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { PostViews } from "@/components/blog/PostViews";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import { DynamicTitle } from "@/components/mdx/DynamicTitle";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";
import {
  BlogLabel,
  NoMorePostsMessage,
  RecentPostsTitle,
} from "@/components/i18n/ClientLabels";

const OG_FALLBACK = "/images/og/about.webp";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: generateOGUrl({
      baseURL,
      title: post.metadata.title,
      description: post.metadata.summary,
      type: "blog",
      tag: post.metadata.tag,
    }),
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const allPosts = getPosts(["src", "app", "blog", "posts"]);
  const post = allPosts.find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  return (
    <Row fillWidth>
      <ReadingProgress />
      <DynamicTabTitle
        titlePt={post.metadata.title_pt}
        titleEn={post.metadata.title_en}
        fallback={post.metadata.title}
        suffixPt=" | Blog"
        suffixEn=" | Blog"
      />
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column
          as="section"
          maxWidth="m"
          horizontal="center"
          gap="l"
          paddingTop="24"
        >
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={post.metadata.image || OG_FALLBACK}
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <BlogLabel />
            </SmartLink>
            <Text
              variant="body-default-xs"
              onBackground="neutral-weak"
              marginBottom="12"
            >
              {post.metadata.publishedAt &&
                formatDate(post.metadata.publishedAt)}
            </Text>

            {/* Reading time + views */}
            <Row
              gap="16"
              horizontal="center"
              vertical="center"
              marginBottom="4"
            >
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {readingTime(post.content)} min read
              </Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                ·
              </Text>
              <PostViews slug={slugPath} track={true} />
            </Row>

            <DynamicTitle
              fallback={post.metadata.title}
              titlePt={post.metadata.title_pt}
              titleEn={post.metadata.title_en}
            />

            {post.metadata.subtitle && (
              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
                align="center"
                style={{ fontStyle: "italic" }}
              >
                {post.metadata.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} />
          </Column>

          <ShareSection
            title={post.metadata.title}
            url={`${baseURL}${blog.path}/${post.slug}`}
          />

          <Column fillWidth gap="24" horizontal="center">
            <Line maxWidth="48" />

            <RecentPostsTitle />

            {/* Verifica se existem outros posts para exibir */}
            {allPosts.filter((p) => p.slug !== post.slug).length > 0 ? (
              <Posts
                posts={allPosts}
                exclude={[post.slug]}
                range={[1, 2]}
                columns="2"
                thumbnail
                direction="column"
              />
            ) : (
              <NoMorePostsMessage />
            )}
          </Column>

          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
