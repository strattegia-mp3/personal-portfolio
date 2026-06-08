import React from "react";
import { Column, Text } from "@once-ui-system/core";
import styles from "./Coda.module.scss";

interface CodaProps {
  /** Closing prose — the final paragraph of the suite */
  children: React.ReactNode;
  /** Optional label above the coda (default: "Coda") */
  label?: string;
  /** Top margin token */
  marginTop?: string;
}

/**
 * <Coda label="Coda">
 * E enquanto o último acorde ainda ecoa na minha mente...
 * </Coda>
 *
 * A typographically distinct closing block — larger text, centred,
 * with a decorative bracket. Use it as the very last element of a suite post.
 */
export function Coda({ children, label, marginTop }: CodaProps) {
  return (
    <Column
      as="section"
      fillWidth
      horizontal="center"
      gap="24"
      className={styles.coda}
      style={{ marginTop: `var(--static-space-${marginTop}, ${marginTop}px)` }}
    >
      {/* ornamental top */}
      <div className={styles.ornament} aria-hidden="true">
        <span className={styles.line} />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} />
      </div>

      <Text
        as="div"
        variant="body-default-l"
        onBackground="neutral-medium"
        align="center"
        className={styles.body}
      >
        {children}
      </Text>

      {/* ornamental bottom */}
      <div className={styles.bottomGlyph} aria-hidden="true">
        ✦
      </div>
    </Column>
  );
}
