import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode, isValidElement } from "react";
import { slugify as transliterate } from "transliteration";

import {
  Heading,
  Text,
  InlineCode,
  CodeBlock,
  TextProps,
  MediaProps,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  Line,
} from "@once-ui-system/core";

import { HeadingLink } from "@/components/HeadingLink";
import { Pt, En } from "@/components/mdx/LanguageWrapper";
import { Figure } from "@/components/mdx/Figure";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node) && (node.props as any)?.children) {
    return extractText((node.props as any).children);
  }
  return "";
}

function slugify(str: string): string {
  const strWithAnd = str.replace(/&/g, " and ");
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  const isExternal = href.startsWith("http");
  const isAnchor = href.startsWith("#");

  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (isAnchor) {
    return (
      <a href={href} style={{ cursor: "pointer" }} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    return null;
  }

  return (
    <Media
      marginTop="24"
      marginBottom="40"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const CustomHeading = ({ children, ...props }: any) => {
    const textContent = extractText(children);
    const slug = slugify(textContent);

    const margins =
      level === 2
        ? { marginTop: "40", marginBottom: "24" }
        : level === 3
        ? { marginTop: "32", marginBottom: "16" }
        : { marginTop: "24", marginBottom: "12" };

    return (
      <HeadingLink level={level} id={slug} {...margins} {...props}>
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `h${level}`;
  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      as="p"
      style={{ lineHeight: "1.6" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginBottom="24"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  if (
    props.children &&
    isValidElement(props.children) &&
    props.children.props.className
  ) {
    const { className, children } = props.children.props;
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="16"
        marginBottom="32"
        codes={[
          {
            code: String(children).replace(/\n$/, ""),
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }
  return <pre {...props} />;
}

function createList({
  children,
  as = "ul",
}: {
  children: ReactNode;
  as?: "ul" | "ol";
}) {
  return (
    <Column as={as} paddingLeft="24" marginBottom="24" gap="8">
      {children}
    </Column>
  );
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <Text
      as="li"
      variant="body-default-m"
      onBackground="neutral-medium"
      style={{ lineHeight: "1.6" }}
    >
      {children}
    </Text>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center" marginTop="40" marginBottom="40">
      <Line maxWidth="40" />
    </Row>
  );
}

function withMargin(Component: any) {
  return (props: any) => (
    <Column fillWidth marginBottom="32">
      <Component {...props} />
    </Column>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading(1) as any,
  h2: createHeading(2) as any,
  h3: createHeading(3) as any,
  h4: createHeading(4) as any,
  h5: createHeading(5) as any,
  h6: createHeading(6) as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: (props: any) => createList({ ...props, as: "ol" }),
  ul: (props: any) => createList({ ...props, as: "ul" }),
  li: createListItem as any,
  hr: createHR as any,
  Feedback: withMargin(Feedback),
  Table: withMargin(Table),
  CodeBlock: withMargin(CodeBlock),
  Accordion: withMargin(Accordion),
  AccordionGroup: withMargin(AccordionGroup),
  Heading,
  Text,
  InlineCode,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  Line,
  Pt,
  En,
  Figure,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        ...(props.options || {}),
        blockJS: false,
      } as any}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
