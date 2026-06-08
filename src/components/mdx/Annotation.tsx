"use client";

import React, { useState, useId } from "react";
import { Text } from "@once-ui-system/core";
import styles from "./Annotation.module.scss";

interface AnnotationProps {
  /** The marker label shown inline (default: "†") */
  marker?: string;
  /** The annotation text revealed on click */
  children: React.ReactNode;
}

/**
 * <Annotation>
 *   Mike Portnoy cofundou o Dream Theater em 1985 e saiu em 2010 após
 *   desentendimentos critativos, retornando à formação clássica em 2023.
 * </Annotation>
 *
 * Renders a small superscript marker inline. On click/tap the annotation
 * expands below the current line without navigating away.
 */
export function Annotation({ marker = "†", children }: AnnotationProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <button
        type="button"
        className={styles.marker}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        title="Ver nota"
      >
        {marker}
      </button>

      {open && (
        <span id={id} className={styles.panel} role="note">
          <Text
            as="span"
            variant="body-default-s"
            onBackground="neutral-medium"
            className={styles.text}
          >
            {children}
          </Text>
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Fechar nota"
          >
            ×
          </button>
        </span>
      )}
    </>
  );
}
