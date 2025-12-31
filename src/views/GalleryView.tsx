"use client";

import { Media, MasonryGrid, Schema } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import { baseURL } from "@/resources";
import { TitleManager } from "@/components/i18n/TitleManager";

export default function GalleryView() {
  const { content } = useLanguage();
  const { gallery, person } = content;

  return (
    <>
      <TitleManager
        titlePt="Galeria | Victor Rocha"
        titleEn="Gallery | Victor Rocha"
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <MasonryGrid columns={2} s={{ columns: 1 }}>
        {gallery.images.map((image, index) => (
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            key={index}
            radius="m"
            aspectRatio={
              image.orientation === "horizontal" ? "16 / 9" : "3 / 4"
            }
            src={image.src}
            alt={image.alt}
          />
        ))}
      </MasonryGrid>
    </>
  );
}
