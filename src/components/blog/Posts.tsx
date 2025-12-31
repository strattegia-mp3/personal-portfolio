"use client";

import { Grid } from "@once-ui-system/core";
import Post from "./Post";

export interface PostData {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
    title_pt?: string;
    title_en?: string;
    summary: string;
    image?: string;
    tag?: string;
    tag_pt?: string;
    tag_en?: string;
    [key: string]: any;
  };
  content?: string;
}

interface PostsProps {
  posts: PostData[];
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export function Posts({
  posts,
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  const safePosts = posts || [];

  let filteredBlogs = exclude.length
    ? safePosts.filter((post) => !exclude.includes(post.slug))
    : safePosts;

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : sortedBlogs.length
      )
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid
          columns={columns}
          s={{ columns: 1 }}
          fillWidth
          marginBottom="40"
          gap="16"
        >
          {displayedBlogs.map((post) => (
            <Post
              key={post.slug}
              post={post}
              thumbnail={thumbnail}
              direction={direction}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
