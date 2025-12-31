import { getPosts } from "@/utils/utils";
import { baseURL, blog, home } from "@/resources";
import { Meta } from "@once-ui-system/core";
import BlogView from "@/views/BlogView";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    path: blog.path,
    image: home.image,
  });
}

export default function BlogPage() {
  const blogPosts = getPosts(["src", "app", "blog", "posts"]);
  return <BlogView posts={blogPosts} />;
}
