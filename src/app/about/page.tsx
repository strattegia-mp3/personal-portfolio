import { about, baseURL, home } from "@/resources";
import { Meta } from "@once-ui-system/core";
import AboutView from "@/views/AboutView";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    path: about.path,
    baseURL: baseURL,
    image: home.image,
  });
}

export default function About() {
  return <AboutView />;
}
