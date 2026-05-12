"use client";

import { Row, SmartLink, Text } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

interface ProjectLinksProps {
  link?: string;
  repository?: string;
}

export function ProjectLinks({ link, repository }: ProjectLinksProps) {
  const { currentLanguage } = useLanguage();

  const labels = {
    pt: { viewProject: "Visitar projeto", viewRepo: "Repositório" },
    en: { viewProject: "View project", viewRepo: "Repository" },
  };

  const t = labels[currentLanguage];

  if (!link && !repository) return null;

  return (
    <Row gap="24" horizontal="center" marginBottom="32" wrap>
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
    </Row>
  );
}
