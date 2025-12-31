"use client";

import { Heading } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

export const RelatedProjectTitle = () => {
  const { currentLanguage } = useLanguage();

  const text = {
    pt: "Projetos relacionados",
    en: "Related projects",
  };

  return (
    <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
      {text[currentLanguage]}
    </Heading>
  );
};
