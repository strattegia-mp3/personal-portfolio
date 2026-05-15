import { baseURL } from "@/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
