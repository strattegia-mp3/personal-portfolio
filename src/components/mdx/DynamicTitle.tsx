"use client";

import { Heading } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

interface DynamicTitleProps {
  titleEn: string;
  titlePt?: string;
  fallback: string;
}

export const DynamicTitle = ({
  titleEn,
  titlePt,
  fallback,
}: DynamicTitleProps) => {
  const { currentLanguage } = useLanguage();

  let displayTitle = fallback;

  if (currentLanguage === "pt" && titlePt) {
    displayTitle = titlePt;
  } else if (currentLanguage === "en" && titleEn) {
    displayTitle = titleEn;
  }

  return <Heading variant="display-strong-m">{displayTitle}</Heading>;
};
