"use client";

import { Card, Column, Media, Row, Text } from "@once-ui-system/core";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { useLanguage } from "@/components/LanguageContext";
import { PostData } from "./Posts";

interface PostProps {
  post: PostData;
  thumbnail: boolean;
  direction?: "row" | "column";
  priority?: boolean;
  showDate?: boolean;
}

export default function Post({
  post,
  thumbnail,
  direction,
  priority = false,
  showDate = true,
}: PostProps) {
  const { content, currentLanguage } = useLanguage();
  const { person } = content;

  let displayTitle = post.metadata.title;

  if (currentLanguage === "pt" && post.metadata.title_pt) {
    displayTitle = post.metadata.title_pt;
  } else if (currentLanguage === "en" && post.metadata.title_en) {
    displayTitle = post.metadata.title_en;
  }

  const tagDefault = post.metadata.tag || "Blog";
  const tag =
    currentLanguage === "pt"
      ? post.metadata.tag_pt || tagDefault
      : post.metadata.tag_en || tagDefault;

  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.metadata.image && thumbnail && (
        <Media
          priority={priority}
          sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={post.metadata.image}
          alt={"Thumbnail of " + displayTitle}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column
          maxWidth={28}
          paddingY="24"
          paddingX="l"
          gap="20"
          vertical="center"
        >
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Image
                src={person.avatar}
                alt={person.name}
                width={32}
                height={32}
                style={{
                  borderRadius: "999px",
                  flexShrink: 0,
                  objectFit: "cover",
                }}
              />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>

            {showDate && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {formatDate(post.metadata.publishedAt, false)}
              </Text>
            )}

            {post.content && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {readingTime(post.content)} min
              </Text>
            )}
          </Row>

          <Text variant="heading-strong-l" wrap="balance">
            {displayTitle}
          </Text>

          {post.metadata.tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
