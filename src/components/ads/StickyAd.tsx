"use client";

import { useEffect, useRef, useState } from "react";
import { AdUnit } from "./AdUnit";
import styles from "./StickyAd.module.scss";

interface StickyAdProps {
  /** AdSense slot for the sticky sidebar ad */
  slot: string;
  /** Percentage of page scrolled before the ad appears (default: 30) */
  triggerPercent?: number;
}

/**
 * Desktop-only sticky sidebar ad.
 * Hidden on mobile via CSS. Fades in after the user has scrolled
 * `triggerPercent`% of the page — avoiding intrusion above the fold.
 *
 * Place this inside the HeadingNav column in the blog post layout.
 */
export function StickyAd({ slot, triggerPercent = 30 }: StickyAdProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger =
      (document.documentElement.scrollHeight - window.innerHeight) *
      (triggerPercent / 100);

    function check() {
      if (!visible && window.scrollY >= trigger) {
        setVisible(true);
      }
    }

    window.addEventListener("scroll", check, { passive: true });
    check();

    return () => window.removeEventListener("scroll", check);
  }, [triggerPercent, visible]);

  return (
    <div className={`${styles.container} ${visible ? styles.visible : ""}`}>
      <AdUnit slot={slot} format="vertical" />
    </div>
  );
}
