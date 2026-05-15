import GalleryView from "@/views/GalleryView";
import { baseURL, gallery } from "@/resources";
import { Meta } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.seoTitle,
    description: gallery.description,
    path: gallery.path,
    baseURL: baseURL,
    image: "/images/og/about.webp",
  });
}

export default function Gallery() {
  return <GalleryView />;
}
