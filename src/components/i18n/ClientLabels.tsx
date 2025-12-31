"use client";

import { Text, Heading } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

// Label Breadcrumb for "Blog"
export const BlogLabel = () => {
  const { currentLanguage } = useLanguage();
  return (
    <Text variant="label-strong-m">
      {currentLanguage === "pt" ? "Blog" : "Blog"}
    </Text>
  );
};

// Label Breadcrumb for "Projects"
export const ProjectsLabel = () => {
  const { currentLanguage } = useLanguage();
  return (
    <Text variant="label-strong-m">
      {currentLanguage === "pt" ? "Projetos" : "Projects"}
    </Text>
  );
};

// Title "Recent posts"
export const RecentPostsTitle = () => {
  const { currentLanguage } = useLanguage();
  return (
    <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
      {currentLanguage === "pt" ? "Posts recentes" : "Recent posts"}
    </Heading>
  );
};

// Title "Related projects"
export const RelatedProjectsTitle = () => {
  const { currentLanguage } = useLanguage();
  return (
    <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
      {currentLanguage === "pt" ? "Projetos relacionados" : "Related projects"}
    </Heading>
  );
};
