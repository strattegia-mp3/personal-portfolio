"use client";

import { useLanguage } from "@/components/LanguageContext";
import { ReactNode } from "react";

interface LanguageWrapperProps {
  children: ReactNode;
}

export const Pt = ({ children }: LanguageWrapperProps) => {
  const { currentLanguage } = useLanguage();

  if (currentLanguage !== "pt") return null;
  return <>{children}</>;
};

export const En = ({ children }: LanguageWrapperProps) => {
  const { currentLanguage } = useLanguage();

  if (currentLanguage !== "en") return null;
  return <>{children}</>;
};
