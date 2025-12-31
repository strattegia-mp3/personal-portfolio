"use client";

import { Row, Text, Button } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

export const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="tertiary"
      size="s"
      weight="default"
      data-border="rounded"
    >
      <Row vertical="center" gap="8">
        <Text variant="label-default-s" onBackground="neutral-strong">
          {currentLanguage.toUpperCase()}
        </Text>
      </Row>
    </Button>
  );
};
