import React from "react";
import { Column, Row, Text } from "@once-ui-system/core";
import styles from "./Movement.module.scss";

type RomanNumeral =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "VIII"
  | "IX"
  | "X";

interface MovementProps {
  /** Roman numeral (I–X). If omitted, no numeral is shown. */
  number?: RomanNumeral | string;
  /** Movement title */
  title: string;
  /** Optional subtitle / descriptor (e.g. "Allegro con fuoco") */
  subtitle?: string;
  /** Top spacing token */
  marginTop?: string;
}

/**
 * <Movement number="I" title="O Despertar de um Sonho" subtitle="Allegro moderato" />
 *
 * Renders a full-width section header styled like a movement in a musical score.
 * Replaces the <div style={{ marginBottom }}> ## Heading </div> pattern in MDX posts.
 * Automatically generates an `id` for HeadingNav / anchor links.
 */
export function Movement({
  number,
  title,
  subtitle,
  marginTop,
}: MovementProps) {
  const id = [number, title]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return (
    <Column
      as="section"
      id={id}
      fillWidth
      gap="0"
      style={{ marginTop: `var(--static-space-${marginTop}, ${marginTop}px)` }}
      className={styles.movement}
    >
      {/* Top rule */}
      <div className={styles.topRule} aria-hidden="true" />

      <Row fillWidth vertical="center" gap="20" paddingY="20">
        {number && (
          <div className={styles.numeral} aria-hidden="true">
            <Text
              as="span"
              variant="label-strong-s"
              className={styles.numeralText}
            >
              {number}
            </Text>
          </div>
        )}

        <Column gap="2" flex={1}>
          <Text
            as="h2"
            variant="heading-strong-xl"
            onBackground="neutral-strong"
            id={id}
            className={styles.title}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              as="p"
              variant="body-default-s"
              onBackground="neutral-weak"
              className={styles.subtitle}
            >
              {subtitle}
            </Text>
          )}
        </Column>
      </Row>

      {/* Bottom rule — thinner */}
      <div className={styles.bottomRule} aria-hidden="true" />
    </Column>
  );
}
