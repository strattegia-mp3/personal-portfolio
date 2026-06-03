import { about, baseURL } from "@/resources";
import { Meta } from "@once-ui-system/core";
import AboutView from "@/views/AboutView";
import { generateOGUrl } from "@/utils/generateOGUrl";

export async function generateMetadata() {
  return Meta.generate({
    title: about.seoTitle,
    description: about.description,
    path: about.path,
    baseURL: baseURL,
    image: generateOGUrl({
      baseURL,
      title: about.title,
      description: about.description,
      type: "page",
    }),
  });
}

export default function About() {
  return <AboutView />;
}
