"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./AdUnit.module.scss";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdFormat = "auto" | "rectangle" | "horizontal" | "vertical";

interface AdUnitProps {
  /** AdSense ad slot ID from your AdSense dashboard */
  slot: string;
  /** Ad format (default: "auto") */
  format?: AdFormat;
  /** Additional className */
  className?: string;
  /** Aria label for accessibility */
  label?: string;
}

/**
 * Renders a single AdSense unit.
 *
 * Setup:
 * 1. Add your AdSense script to layout.tsx once:
 * <Script
 * src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXX"
 * strategy="afterInteractive"
 * crossOrigin="anonymous"
 * />
 * 2. Set NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXX in your env vars.
 * 3. Use <AdUnit slot="1234567890" /> in blog post pages.
 *
 * The component is a no-op in development (NODE_ENV !== "production")
 * so you never see broken ad slots locally.
 */
export function AdUnit({
  slot,
  format = "auto",
  className = "",
  label,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const { currentLanguage } = useLanguage();
  const resolvedLabel =
    label || (currentLanguage === "pt" ? "Publicidade" : "Advertisement");

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // ⚡ GATILHO DE SIMULAÇÃO VISUAL:
  // Ativado automaticamente se estiver rodando localmente ou sem credenciais de produção.
  const isFallbackMode = process.env.NODE_ENV !== "production" || !client;

  useEffect(() => {
    // Only push once and only in production with a real client ID
    if (pushed.current || isFallbackMode) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — fails silently
    }
  }, [client, isFallbackMode]);

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      aria-label={resolvedLabel}
    >
      <p className={styles.adLabel}>{resolvedLabel}</p>
      {isFallbackMode ? (
        /* Renderização do container de mock/preview para testes em ambiente local */
        <div className={`${styles.ins} ${styles.mockCard} ${styles[format]}`}>
          <span className={styles.mockTitle}>AdSense Sandbox</span>
          <span className={styles.mockMeta}>
            Slot: {slot} | Format: {format}
          </span>
        </div>
      ) : (
        <ins
          ref={adRef}
          className={`adsbygoogle ${styles.ins}`}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
