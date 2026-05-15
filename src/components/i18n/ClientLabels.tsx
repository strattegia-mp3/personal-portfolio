"use client";

import { Text, Heading, Column } from "@once-ui-system/core";
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
    <Heading
      id="recent-posts"
      as="h2"
      variant="heading-strong-xl"
      marginBottom="24"
    >
      {currentLanguage === "pt" ? "Posts recentes" : "Recent posts"}
    </Heading>
  );
};

// New component for message fallback
export const NoMorePostsMessage = () => {
  const { currentLanguage } = useLanguage();
  return (
    <Column
      align="center"
      gap="16"
      paddingX="24"
      paddingY="48"
      background="neutral-alpha-weak"
      border="neutral-alpha-weak"
      radius="l"
      fillWidth
    >
      <Column align="center" gap="4">
        <Heading
          id="more-posts-soon"
          as="h3"
          variant="heading-strong-m"
          onBackground="neutral-strong"
          align="center"
        >
          {currentLanguage === "pt"
            ? "Mais publicações em breve..."
            : "More posts coming soon..."}
        </Heading>
        <Text
          variant="body-default-s"
          onBackground="neutral-weak"
          align="center"
        >
          {currentLanguage === "pt"
            ? "Estou escrevendo novos artigos. Volte logo para conferir as novidades!"
            : "I'm writing new articles. Check back soon for updates!"}
        </Text>
      </Column>
    </Column>
  );
};

// Title "Related projects"
export const RelatedProjectsTitle = () => {
  const { currentLanguage } = useLanguage();
  return (
    <Heading
      id="related-projects"
      as="h2"
      variant="heading-strong-xl"
      marginBottom="24"
    >
      {currentLanguage === "pt" ? "Projetos relacionados" : "Related projects"}
    </Heading>
  );
};
