"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";

interface DynamicTabTitleProps {
  titlePt?: string;
  titleEn?: string;
  fallback: string;
  suffixPt?: string;
  suffixEn?: string;
}

export const DynamicTabTitle = ({ 
  titlePt, 
  titleEn, 
  fallback, 
  suffixPt = "", 
  suffixEn = "" 
}: DynamicTabTitleProps) => {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // Escolhe o título de acordo com o idioma, ou usa o padrão se não existir
    const activeTitle = currentLanguage === "pt" ? (titlePt || fallback) : (titleEn || fallback);
    const activeSuffix = currentLanguage === "pt" ? suffixPt : suffixEn;
    
    const newTitle = `${activeTitle}${activeSuffix}`;
    
    if (document.title !== newTitle) {
      document.title = newTitle;
    }
  }, [currentLanguage, titlePt, titleEn, fallback, suffixPt, suffixEn]);

  return null;
};