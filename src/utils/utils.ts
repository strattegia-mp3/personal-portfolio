import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type PostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  summary_pt?: string;
  summary_en?: string;
  image?: string;
  images: string[];
  slug: string;
  team: Team[];
  tag?: string;
  tag_pt?: string;
  tag_en?: string;
  draft?: boolean;
  [key: string]: any;
};

const getMDXFiles = (dir: string) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
};

const readMDXFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) return null;

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata = {
    ...data,
    title: data.title || "",
    summary: data.summary || "",
    publishedAt: data.publishedAt || new Date().toISOString(),
    images: data.images || [],
    team: data.team || [],
  };

  return { metadata, content };
};

const getMDXData = (dir: string) => {
  const mdxFiles = getMDXFiles(dir);

  const posts = mdxFiles.map((file) => {
    const fileData = readMDXFile(path.join(dir, file));
    if (!fileData) return null;

    const { metadata, content } = fileData;
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: { ...metadata, slug } as PostMetadata,
      slug,
      content,
    };
  });

  return posts.filter(
    (post): post is { metadata: PostMetadata; slug: string; content: string } =>
      post !== null && !post.metadata.draft,
  );
};

export const getPosts = cache(
  (customPath = ["src", "app", "work", "projects"]) => {
    const postsDir = path.join(process.cwd(), ...customPath);
    return getMDXData(postsDir);
  },
);
