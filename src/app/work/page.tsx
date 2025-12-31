import { getPosts } from "@/utils/utils";
import { baseURL, work, home } from "@/resources"; // Adicionei 'work'
import { Meta } from "@once-ui-system/core";
import WorkView from "@/views/WorkView";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    path: work.path,
    image: home.image,
  });
}

export default function WorkPage() {
  const projectPosts = getPosts(["src", "app", "work", "projects"]);
  return <WorkView posts={projectPosts} />;
}
