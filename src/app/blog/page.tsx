import { getPosts } from "@/utils/utils";
import { baseURL, blog } from "@/resources";
import { Meta } from "@once-ui-system/core";
import BlogView from "@/views/BlogView";
import { generateOGUrl } from "@/utils/generateOGUrl";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.seoTitle,
    description: blog.description,
    baseURL: baseURL,
    path: blog.path,
    image: generateOGUrl({
      baseURL,
      title: blog.title,
      description: blog.description,
      type: "page",
    }),
  });
}

export default function BlogPage() {
  const blogPosts = getPosts(["src", "app", "blog", "posts"]);
  return <BlogView posts={blogPosts} />;
}
