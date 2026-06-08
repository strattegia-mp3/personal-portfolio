import React from "react";
import styles from "./Interlude.module.scss";

type OrnamentType = "star" | "wave" | "diamond" | "note" | "infinity";

interface InterludeProps {
  /** Visual ornament style */
  ornament?: OrnamentType;
  /** Top margin token (default "32") */
  marginTop?: string;
  /** Bottom margin token (default "32") */
  marginBottom?: string;
}

const ORNAMENTS: Record<OrnamentType, string> = {
  star: "✦ ✦ ✦",
  wave: "〜 〜 〜",
  diamond: "◆ ◇ ◆",
  note: "♩ ♪ ♩",
  infinity: "∞",
};

/**
 * <Interlude ornament="note" />
 *
 * Decorative separator between movements — more expressive than a plain `---`.
 * Default ornament is "star".
 */
export function Interlude({
  ornament = "star",
  marginTop = "32",
  marginBottom = "32",
}: InterludeProps) {
  return (
    <div
      className={styles.interlude}
      aria-hidden="true"
      style={{
        marginTop: `var(--static-space-${marginTop},    ${marginTop}px)`,
        marginBottom: `var(--static-space-${marginBottom}, ${marginBottom}px)`,
      }}
    >
      <span className={styles.line} />
      <span className={styles.ornament}>{ORNAMENTS[ornament]}</span>
      <span className={styles.line} />
    </div>
  );
}
