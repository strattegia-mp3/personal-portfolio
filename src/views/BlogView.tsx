"use client";

import { Column, Heading, Schema, Text } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { useLanguage } from "@/components/LanguageContext";
import { Posts, PostData } from "@/components/blog/Posts";
import { TitleManager } from "@/components/i18n/TitleManager";

interface BlogViewProps {
  posts: PostData[];
}

export default function BlogView({ posts }: BlogViewProps) {
  const { content } = useLanguage();
  const { blog, person } = content;

  return (
    <Column maxWidth="m" paddingTop="24" horizontal="center">
      <TitleManager
        titlePt={`Blog | Victor Rocha`}
        titleEn={`Blog | Victor Rocha`}
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={blog.path}
        title={blog.title}
        description={blog.description}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth gap="m" align="center" marginBottom="xl">
        <Heading variant="heading-strong-xl" align="center">
          {blog.title}
        </Heading>
        {blog.description && (
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
          >
            {blog.description}
          </Text>
        )}
      </Column>
      <Posts posts={posts} columns="2" />
    </Column>
  );
}
