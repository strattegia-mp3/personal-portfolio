"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  i18nContent,
  AvailableLanguages,
  ContentTranslation,
} from "@/resources/content-i18n";

interface LanguageContextType {
  currentLanguage: AvailableLanguages;
  toggleLanguage: () => void;
  content: ContentTranslation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provider
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] =
    useState<AvailableLanguages>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "portfolio-language"
    ) as AvailableLanguages;
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "pt" : "en";
    setCurrentLanguage(newLanguage);
    localStorage.setItem("portfolio-language", newLanguage);
  };

  const content = i18nContent[currentLanguage];

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, toggleLanguage, content }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
