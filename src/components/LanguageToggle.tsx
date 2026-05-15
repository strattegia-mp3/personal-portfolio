"use client";

import { Row, Text, Button } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";

// Dicionário de bandeiras
const flagMap: Record<string, string> = {
  pt: "/images/flags/br.svg",
  en: "/images/flags/us.svg",
};

export const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  // Fallback
  const currentFlag = flagMap[currentLanguage];

  return (
    <Button
      onClick={toggleLanguage}
      variant="tertiary"
      size="s"
      weight="default"
      data-border="rounded"
      aria-label="Alternar idioma"
      title="Alternar idioma"
    >
      <Row vertical="center" gap="8">
        {/* Bandeira */}
        {currentFlag ? (
          <Image
            src={currentFlag}
            alt={`${currentLanguage} flag`}
            width={18}
            height={18}
            style={{ borderRadius: "2px" }}
          />
        ) : (
          <Text variant="body-default-s" aria-hidden="true">
            🌐
          </Text>
        )}

        {/* Texto */}
        <Text variant="label-default-s" onBackground="neutral-strong">
          {currentLanguage.toUpperCase()}
        </Text>
      </Row>
    </Button>
  );
};
