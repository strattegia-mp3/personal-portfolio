"use client";

// 1. Importe o RevealFx do @once-ui-system/core
import { Media, MasonryGrid, Schema, RevealFx } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import { baseURL } from "@/resources";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";

const OG_IMAGE = "/images/og/about.webp";

interface GalleryImage {
  src: string;
  alt: string;
  orientation: "horizontal" | "vertical" | "square" | string;
}

export default function GalleryView() {
  const { content } = useLanguage();
  const { gallery, person } = content;

  return (
    <>
      <DynamicTabTitle
        titlePt="Galeria | Victor Rocha"
        titleEn="Gallery | Victor Rocha"
        fallback="Victor Rocha"
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={OG_IMAGE}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <MasonryGrid columns={3} m={{ columns: 2 }} s={{ columns: 1 }}>
        {gallery.images.map((image: GalleryImage, index: number) => {
          let ratio = "3 / 4";
          if (image.orientation === "horizontal") ratio = "4 / 3";
          if (image.orientation === "square") ratio = "1 / 1";

          return (
            // 2. Envolva o Media com o RevealFx
            <RevealFx
              key={index}
              translateY="16" // Deslocamento de baixo para cima (GPU accelerated)
              delay={index * 0.1} // A mágica do stagger: cada imagem atrasa 50ms a mais
            >
              <Media
                enlarge
                priority={index < 8}
                sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 33vw"
                radius="l"
                aspectRatio={ratio}
                src={image.src}
                alt={image.alt}
              />
            </RevealFx>
          );
        })}
      </MasonryGrid>
    </>
  );
}
