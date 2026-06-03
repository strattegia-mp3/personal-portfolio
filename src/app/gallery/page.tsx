import GalleryView from "@/views/GalleryView";
import { baseURL, gallery } from "@/resources";
import { Meta } from "@once-ui-system/core";
import { generateOGUrl } from "@/utils/generateOGUrl";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.seoTitle,
    description: gallery.description,
    path: gallery.path,
    baseURL: baseURL,
    image: generateOGUrl({
      baseURL,
      title: gallery.title,
      description: gallery.description,
      type: "page",
    }),
  });
}

export default function Gallery() {
  return <GalleryView />;
}
