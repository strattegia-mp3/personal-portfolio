"use client";

import { useEffect, useRef } from "react";
import styles from "./ReadingProgress.module.scss";

/**
 * Thin gradient progress bar fixed at the top of the viewport.
 * Uses a ref + direct DOM manipulation to avoid re-renders on every scroll tick.
 * Always renders the bar element immediately (no null return = no layout shift).
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      barRef.current.style.transform = `scaleX(${pct})`;
    }

    window.addEventListener("scroll", update, { passive: true });
    update(); // set initial value
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className={styles.bar}
      style={{ transform: "scaleX(0)" }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}
