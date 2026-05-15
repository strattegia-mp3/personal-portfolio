import { getPosts } from "@/utils/utils";
import HomeView from "@/views/HomeView";
import { home, baseURL, person, about } from "@/resources";
import { Meta, Schema } from "@once-ui-system/core";

const OG_IMAGE = "/images/og/about.webp";

export async function generateMetadata() {
  return Meta.generate({
    title: home.seoTitle,
    description: home.description,
    baseURL,
    path: home.path,
    image: OG_IMAGE,
  });
}

export default function Home() {
  const rawProjectPosts = getPosts(["src", "app", "work", "projects"]);
  const rawBlogPosts = getPosts(["src", "app", "blog", "posts"]);

  const sortedProjects = rawProjectPosts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  const sortedBlogPosts = rawBlogPosts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  const jsonLd = {
    as: "webPage" as "webPage",
    baseURL: baseURL,
    path: home.path,
    title: home.title,
    description: home.description,
    image: OG_IMAGE,
    author: {
      name: person.name,
      url: `${baseURL}${about.path}`,
      image: `${baseURL}${person.avatar}`,
    },
  };

  return (
    <>
      <Schema {...jsonLd} />
      <HomeView blogPosts={sortedBlogPosts} projectPosts={sortedProjects} />
    </>
  );
}
