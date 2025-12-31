import { Flex, Button } from "@once-ui-system/core";
import Link from "next/link";
import { Wand2 } from "lucide-react";
import GalleryView from "@/views/GalleryView";
import { baseURL, gallery, home } from "@/resources"; // Adicionei home para fallback de imagem
import { Meta } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    path: gallery.path,
    baseURL: baseURL,
    image: home.image,
  });
}

export default function Gallery() {
  return (
    <Flex maxWidth="l" fillWidth direction="column" gap="m">
      <GalleryView />
      <Flex fillWidth horizontal="center" paddingX="l" paddingTop="s">
        <Link href="/admin/generator">
          <Button variant="secondary" size="m">
            <Wand2 size={14} style={{ marginRight: "8px" }} />
            OG Generator
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
