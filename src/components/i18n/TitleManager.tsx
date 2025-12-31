"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";

interface TitleManagerProps {
  titlePt: string;
  titleEn: string;
}

export const TitleManager = ({ titlePt, titleEn }: TitleManagerProps) => {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const newTitle = currentLanguage === "pt" ? titlePt : titleEn;
    if (document.title !== newTitle) {
      document.title = newTitle;
    }
  }, [currentLanguage, titlePt, titleEn]);

  return null;
};
