import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Column,
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
import { ReadingTime } from "@/components/blog/ReadingTime";
import { DynamicTitle } from "@/components/mdx/DynamicTitle";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";
import { AdUnit } from "@/components/ads/AdUnit";
import { StickyAd } from "@/components/ads/StickyAd";
import { I18nHeadingNav } from "@/components/blog/I18nHeadingNav";
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
      date: post.metadata.publishedAt
        ? formatDate(post.metadata.publishedAt)
        : undefined,
      readTime: readingTime(post.content),
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

      <style>{`
        @media (max-width: 1023px) {
          .desktop-sidebar {
            display: none !important;
          }
        }
      `}</style>

      <Row maxWidth={12} className="desktop-sidebar" />

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
              <ReadingTime minutes={readingTime(post.content)} />
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

          {/* Ad placement 1 — between article and share section */}
          <AdUnit
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_POST ?? ""}
            format="horizontal"
          />

          <ShareSection
            title={post.metadata.title}
            url={`${baseURL}${blog.path}/${post.slug}`}
          />

          {/* Ad placement 2 — after share, before related posts */}
          <AdUnit
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? ""}
            format="auto"
          />

          <Column fillWidth gap="24" horizontal="center">
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
        className="desktop-sidebar"
        maxWidth={12}
        paddingLeft="40"
        position="sticky"
        top="80"
        style={{
          alignSelf: "flex-start",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          gap: "32px",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--neutral-alpha-medium) transparent",
        }}
      >
        <I18nHeadingNav />
        <StickyAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? ""} />
      </Column>
    </Row>
  );
}
