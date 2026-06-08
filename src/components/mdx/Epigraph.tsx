import React from "react";
import { Column, Text } from "@once-ui-system/core";
import styles from "./Epigraph.module.scss";

interface EpigraphProps {
  /** The quote or excerpt */
  quote: string;
  /** Author, source, or attribution */
  attribution?: string;
  /** Optional work title (e.g. "A Change of Seasons") */
  work?: string;
  /** Top margin token */
  marginTop?: string;
  /** Bottom margin token */
  marginBottom?: string;
}

/**
 * <Epigraph
 *   quote="The heart must bleed before it learns to beat."
 *   attribution="Dream Theater"
 *   work="A Change of Seasons"
 * />
 *
 * Renders a literary epigraph with a left-border accent, italic text
 * and an optional attribution line. Replaces bare `> blockquote` in MDX.
 */
export function Epigraph({
  quote,
  attribution,
  work,
  marginTop = "40",
  marginBottom = "40",
}: EpigraphProps) {
  return (
    <Column
      as="blockquote"
      className={styles.epigraph}
      style={{
        marginTop: `var(--static-space-${marginTop}, ${marginTop}px)`,
        marginBottom: `var(--static-space-${marginBottom}, ${marginBottom}px)`,
      }}
    >
      <Text
        as="p"
        variant="body-default-l"
        onBackground="neutral-medium"
        className={styles.quote}
      >
        {quote}
      </Text>

      {(attribution || work) && (
        <Text
          as="cite"
          variant="body-default-s"
          onBackground="neutral-weak"
          className={styles.attribution}
        >
          {attribution && <span className={styles.dash}>—</span>}
          {attribution && <span>{attribution}</span>}
          {work && (
            <span className={styles.work}>
              {attribution ? ", " : ""}
              <em>{work}</em>
            </span>
          )}
        </Text>
      )}
    </Column>
  );
}
