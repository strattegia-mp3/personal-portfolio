import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const priorityMap: Record<string, number> = {
    "/": 1.0,
    "/about": 0.9,
    "/work": 0.8,
    "/blog": 0.8,
    "/gallery": 0.5,
  };

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) =>
      routesConfig[route as keyof typeof routesConfig] &&
      !route.startsWith("/admin"),
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: (route === "/" ? "daily" : "weekly") as "daily" | "weekly",
    priority: priorityMap[route] ?? 0.6,
  }));

  return [...routes, ...blogs, ...works];
}
