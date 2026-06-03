import React from "react";
import { Column, Media, Text } from "@once-ui-system/core";
import type { MediaProps } from "@once-ui-system/core";

type SpacingToken =
  | "0"
  | "1"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "20"
  | "24"
  | "32"
  | "40"
  | "48"
  | "56"
  | "64"
  | "80"
  | "104"
  | "128"
  | "160";

interface FigureProps extends Omit<MediaProps, "alt" | "src"> {
  /** Path or URL of the image */
  src: string;
  /** Alt text for accessibility (required for a11y) */
  alt: string;
  /** Caption text displayed beneath the image */
  caption?: string;
  /** Outer top margin (Once UI spacing token) */
  marginTop?: SpacingToken;
  /** Outer bottom margin (Once UI spacing token) */
  marginBottom?: SpacingToken;
  /** Space between image and caption (Once UI spacing token, default: "8") */
  captionGap?: SpacingToken;
}

/**
 * `Figure` — a composable MDX component that renders an image with an
 * optional centred caption. Use it in .mdx files like:
 *
 * ```mdx
 * <Figure
 *   src="/images/blog/image.webp"
 *   alt="Alt text for image"
 *   caption="Caption text for image."
 *   marginTop="24"
 *   marginBottom="40"
 *   radius="m"
 * />
 * ```
 *
 * All extra props (radius, border, sizes, aspectRatio, enlarge…) are
 * forwarded to the underlying Once UI `<Media>` component.
 */
export function Figure({
  src,
  alt,
  caption,
  marginTop = "24",
  marginBottom = "40",
  captionGap = "8",
  ...mediaProps
}: FigureProps) {
  return (
    <Column
      as="figure"
      fillWidth
      horizontal="center"
      gap={captionGap}
      marginTop={marginTop}
      // Only apply bottom margin on the wrapper; the caption will sit flush
      marginBottom={caption ? "0" : marginBottom}
      style={{ margin: 0 }} // reset browser default for <figure>
    >
      <Media
        src={src}
        alt={alt}
        enlarge
        sizes="(max-width: 960px) 100vw, 960px"
        border="neutral-alpha-medium"
        radius="m"
        {...mediaProps}
      />

      {caption && (
        <Text
          as="figcaption"
          variant="body-default-s"
          onBackground="neutral-weak"
          align="center"
          marginBottom={marginBottom}
          style={{ maxWidth: "80%", fontStyle: "italic" }}
        >
          {caption}
        </Text>
      )}
    </Column>
  );
}
