import { getPosts } from "@/utils/utils";
import HomeView from "@/views/HomeView";
import { home, baseURL, person, about } from "@/resources";
import { Meta, Schema } from "@once-ui-system/core";
import { generateOGUrl } from "@/utils/generateOGUrl";

export async function generateMetadata() {
  return Meta.generate({
    title: home.seoTitle,
    description: home.description,
    baseURL,
    path: home.path,
    image: generateOGUrl({
      baseURL,
      title: home.title,
      description: home.description,
      type: "page",
    }),
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

  const ogImage = generateOGUrl({
    baseURL,
    title: home.title,
    description: home.description,
    type: "page",
  });

  const jsonLd = {
    as: "webPage" as "webPage",
    baseURL: baseURL,
    path: home.path,
    title: home.title,
    description: home.description,
    image: ogImage,
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
