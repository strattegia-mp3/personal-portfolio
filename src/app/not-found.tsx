"use client";

import { Button, Column, Heading, Text } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle"; // 👈 Importamos o novo componente

export default function NotFound() {
  const { currentLanguage } = useLanguage();

  const texts = {
    pt: {
      title: "Página não encontrada",
      desc: "Parece que você se perdeu no ciberespaço.",
      button: "Voltar ao Início",
      tab: "Erro 404 | Victor Rocha",
    },
    en: {
      title: "Page not found",
      desc: "Seems like you got lost in cyberspace.",
      button: "Go to Home",
      tab: "Error 404 | Victor Rocha",
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
      <DynamicTabTitle
        titlePt={texts.pt.tab}
        titleEn={texts.en.tab}
        fallback="Error 404"
      />

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
