"use client";

import { Row, Text, Button } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";
import { useEffect, useState } from "react";

// Dicionário de bandeiras
const flagMap: Record<string, string> = {
  pt: "/images/flags/br.svg",
  en: "/images/flags/us.svg",
};

export const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {!mounted ? (
          <Text
            variant="body-default-s"
            aria-hidden="true"
            style={{ width: 18, textAlign: "center" }}
          >
            🌐
          </Text>
        ) : currentFlag ? (
          <Image
            src={currentFlag}
            alt={`${currentLanguage} flag`}
            width={18}
            height={18}
            style={{ borderRadius: "2px" }}
            priority
          />
        ) : (
          <Text variant="body-default-s" aria-hidden="true">
            🌐
          </Text>
        )}

        {/* Texto do idioma */}
        <Text variant="label-default-s" onBackground="neutral-strong">
          {mounted ? currentLanguage.toUpperCase() : "--"}
        </Text>
      </Row>
    </Button>
  );
};
