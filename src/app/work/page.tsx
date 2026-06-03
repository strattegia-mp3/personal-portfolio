import { getPosts } from "@/utils/utils";
import { baseURL, work } from "@/resources";
import { Meta } from "@once-ui-system/core";
import WorkView from "@/views/WorkView";
import { generateOGUrl } from "@/utils/generateOGUrl";

export async function generateMetadata() {
  return Meta.generate({
    title: work.seoTitle,
    description: work.description,
    baseURL: baseURL,
    path: work.path,
    image: generateOGUrl({
      baseURL,
      title: work.title,
      description: work.description,
      type: "page",
    }),
  });
}

export default function WorkPage() {
  const projectPosts = getPosts(["src", "app", "work", "projects"]);
  return <WorkView posts={projectPosts} />;
}
