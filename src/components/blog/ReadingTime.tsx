"use client";

import { Text } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

export function ReadingTime({ minutes }: { minutes: number }) {
  const { currentLanguage } = useLanguage();

  const label = currentLanguage === "pt" ? "min de leitura" : "min read";

  return (
    <Text variant="body-default-xs" onBackground="neutral-weak">
      {minutes} {label}
    </Text>
  );
}
