import { about, baseURL } from "@/resources";
import { Meta } from "@once-ui-system/core";
import AboutView from "@/views/AboutView";

const OG_IMAGE = "/images/og/about.webp";

export async function generateMetadata() {
  return Meta.generate({
    title: about.seoTitle,
    description: about.description,
    path: about.path,
    baseURL: baseURL,
    image: OG_IMAGE,
  });
}

export default function About() {
  return <AboutView />;
}
