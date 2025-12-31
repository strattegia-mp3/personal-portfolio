"use client";

import { Button, Column, Heading, Text } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import { TitleManager } from "@/components/i18n/TitleManager";

export default function NotFound() {
  const { currentLanguage } = useLanguage();

  const texts = {
    pt: {
      title: "Página não encontrada",
      desc: "Parece que você se perdeu no ciberespaço.",
      button: "Voltar ao Início",
    },
    en: {
      title: "Page not found",
      desc: "Seems like you got lost in cyberspace.",
      button: "Go to Home",
    },
  };

  const t = texts[currentLanguage];

  return (
    <Column
      as="section"
      fillWidth
      fillHeight
      horizontal="center"
      vertical="center"
      gap="l"
    >
      <TitleManager titlePt={`Error 404`} titleEn={`Error 404`} />
      <Heading variant="display-strong-xl">{t.title}</Heading>
      <Text variant="body-default-l" onBackground="neutral-weak">
        {t.desc}
      </Text>
      <Button href="/" size="l" variant="primary">
        {t.button}
      </Button>
    </Column>
  );
}
