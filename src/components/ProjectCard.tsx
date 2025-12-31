"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  titlePt?: string;
  titleEn?: string;
  content: string;
  description: string;
  descriptionPt?: string;
  descriptionEn?: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  titlePt,
  titleEn,
  content,
  description,
  descriptionPt,
  descriptionEn,
  avatars,
  link,
}) => {
  const { currentLanguage } = useLanguage();

  const labels = {
    pt: { readCase: "Ler estudo de caso", viewProject: "Visitar projeto" },
    en: { readCase: "Read case study", viewProject: "View project" },
  };

  const t = labels[currentLanguage];

  let displayTitle = title;
  if (currentLanguage === "pt" && titlePt) displayTitle = titlePt;
  if (currentLanguage === "en" && titleEn) displayTitle = titleEn;

  let displayDescription = description;
  if (currentLanguage === "pt" && descriptionPt)
    displayDescription = descriptionPt;
  if (currentLanguage === "en" && descriptionEn)
    displayDescription = descriptionEn;

  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: displayTitle,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {displayTitle && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {displayTitle}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 ||
          displayDescription?.trim() ||
          content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && (
              <AvatarGroup avatars={avatars} size="m" reverse />
            )}

            {displayDescription?.trim() && (
              <Text
                wrap="balance"
                variant="body-default-s"
                onBackground="neutral-weak"
              >
                {displayDescription}
              </Text>
            )}

            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">{t.readCase}</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">{t.viewProject}</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
