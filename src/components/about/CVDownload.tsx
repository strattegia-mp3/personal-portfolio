"use client";

import { useState, useCallback } from "react";
import { Row, Button, Text } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./CVDownload.module.scss";

/**
 * CV Download button with PT/EN toggle and GA4 event tracking.
 *
 * Place your CV files at:
 * /public/cv/cv-pt.pdf
 * /public/cv/cv-en.pdf
 *
 * The component fires a `download_cv` GA4 event on every click with the
 * selected language as a parameter.
 */

export function CVDownload() {
  const { currentLanguage } = useLanguage();
  const [cvLang, setCvLang] = useState<"pt" | "en">(
    currentLanguage as "pt" | "en",
  );

  const t = {
    pt: {
      download: "Baixar CV",
      toggle: "Ver em inglês",
      hint: "PDF · PT/EN",
    },
    en: {
      download: "Download CV",
      toggle: "See in Portuguese",
      hint: "PDF · PT/EN",
    },
  }[currentLanguage as "pt" | "en"];

  const cvUrl =
    cvLang === "pt"
      ? "/cv/Victor_Rocha-CV-PT.pdf"
      : "/cv/Victor_Rocha-CV-EN.pdf";

  const handleDownload = useCallback(() => {
    // GA4 event — works if @next/third-parties GoogleAnalytics is loaded
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "download_cv", {
        event_category: "engagement",
        event_label: `CV ${cvLang.toUpperCase()}`,
        language: cvLang,
      });
    }
  }, [cvLang]);

  return (
    <Row gap="12" vertical="center" wrap>
      <Button
        className={styles.downloadBtn}
        href={cvUrl}
        download
        variant="primary"
        size="m"
        prefixIcon="download"
        data-border="rounded"
        onClick={handleDownload}
      >
        {t.download} ({cvLang.toUpperCase()})
      </Button>

      {/* Language toggle pill */}
      <Button
        className={styles.toggleBtn}
        variant="tertiary"
        size="s"
        data-border="rounded"
        onClick={() => setCvLang((prev) => (prev === "pt" ? "en" : "pt"))}
        prefixIcon="language"
      >
        {cvLang === "pt" ? "EN" : "PT"}
      </Button>

      <Text variant="body-default-xs" onBackground="neutral-weak">
        {t.hint}
      </Text>
    </Row>
  );
}
