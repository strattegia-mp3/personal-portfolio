"use client";

import {
  AvatarGroup,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./ProjectCard.module.scss";

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
  repository?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
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
  repository,
}) => {
  const { currentLanguage } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDragging = useRef(false);

  const labels = {
    pt: {
      readCase: "Ler estudo de caso",
      viewProject: "Visitar projeto",
      viewRepo: "Repositório",
    },
    en: {
      readCase: "Read case study",
      viewProject: "View project",
      viewRepo: "Repository",
    },
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

  const validImages = images.filter(Boolean);
  const count = validImages.length;

  const goTo = useCallback(
    (idx: number) => {
      const next = (idx + count) % count;
      setActiveIndex(next);
    },
    [count],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 40;
    if (touchDeltaX.current < -threshold) goTo(activeIndex + 1);
    else if (touchDeltaX.current > threshold) goTo(activeIndex - 1);
    touchDeltaX.current = 0;
  }, [activeIndex, goTo]);

  return (
    <Column fillWidth gap="m">
      {validImages.length > 0 && (
        <div className={styles.carousel}>
          <div
            ref={trackRef}
            className={styles.track}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {validImages.map((src, idx) => (
              <div
                key={src}
                className={styles.slide}
                aria-hidden={idx !== activeIndex}
                style={{
                  transform: `translateX(${(idx - activeIndex) * 100}%)`,
                }}
              >
                <Image
                  src={src}
                  alt={
                    idx === 0 ? displayTitle : `${displayTitle} — ${idx + 1}`
                  }
                  fill
                  quality={85}
                  sizes="(max-width: 560px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  priority={priority && idx === 0}
                  loading={priority && idx === 0 ? "eager" : "lazy"}
                  decoding={priority && idx === 0 ? "sync" : "async"}
                  className={styles.image}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                className={`${styles.arrow} ${styles.arrowLeft}`}
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Imagem anterior"
                tabIndex={0}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                className={`${styles.arrow} ${styles.arrowRight}`}
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Próxima imagem"
                tabIndex={0}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 5L12.5 10L7.5 15"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          {count > 1 && (
            <div className={styles.dots} role="tablist" aria-label="Slides">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Slide ${idx + 1}`}
                  className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ""}`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
          )}
        </div>
      )}

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
              {repository && (
                <SmartLink
                  suffixIcon="github"
                  style={{ margin: "0", width: "fit-content" }}
                  href={repository}
                >
                  <Text variant="body-default-s">{t.viewRepo}</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
