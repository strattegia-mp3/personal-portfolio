import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import classNames from "classnames";
import {
  Background,
  Column,
  Flex,
  Meta,
  opacity,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { LanguageProvider } from "@/components/LanguageContext";
import {
  baseURL,
  effects,
  person,
  fonts,
  style,
  dataStyle,
  home,
} from "@/resources";
import KonamiWrapper from "@/components/konamiCode/KonamiWrapper";
import { Viewport } from "next";

const OG_IMAGE = "/images/og/about.webp";

const themeScript = `
  (function() {
    try {
      const root = document.documentElement;
      const config = ${JSON.stringify({
        brand: style.brand,
        accent: style.accent,
        neutral: style.neutral,
        solid: style.solid,
        "solid-style": style.solidStyle,
        border: style.border,
        surface: style.surface,
        transition: style.transition,
        scaling: style.scaling,
        "viz-style": dataStyle.variant,
      })};
      Object.entries(config).forEach(([key, value]) => {
        root.setAttribute('data-' + key, value);
      });
      const resolveTheme = (themeValue) => {
        if (!themeValue || themeValue === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return themeValue;
      };
      const savedTheme = localStorage.getItem('data-theme');
      const resolvedTheme = resolveTheme(savedTheme);
      root.setAttribute('data-theme', resolvedTheme);
      const styleKeys = Object.keys(config);
      styleKeys.forEach(key => {
        const value = localStorage.getItem('data-' + key);
        if (value) root.setAttribute('data-' + key, value);
      });
    } catch (e) {
      console.error('Failed to initialize theme:', e);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

// Movendo o theme-color para o objeto Viewport nativo do Next.js
export const viewport: Viewport = {
  themeColor: "#7c3aed",
};

export async function generateMetadata() {
  const baseMeta = Meta.generate({
    title: home.seoTitle,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: OG_IMAGE,
  });

  // Estendendo os metadados gerados pelo OnceUI com os seus ícones e manifest
  return {
    ...baseMeta,
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.ico" }, // Fallback para navegadores muito antigos
        { url: "/images/icons/favicon.svg", type: "image/svg+xml" }, // Melhor para navegadores modernos
        {
          url: "/images/icons/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
      apple: [{ url: "/images/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="pt-BR"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        {/* Preconnects for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* OG image preload for crawlers */}
        <link rel="preload" href={OG_IMAGE} as="image" type="image/webp" />

        <link
          rel="preload"
          href={person.avatar}
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <Providers>
        <LanguageProvider>
          <Column
            as="body"
            background="page"
            fillWidth
            style={{ minHeight: "100vh" }}
            margin="0"
            padding="0"
            horizontal="center"
          >
            <RevealFx fill position="absolute">
              <Background
                mask={{
                  x: effects.mask.x,
                  y: effects.mask.y,
                  radius: effects.mask.radius,
                  cursor: effects.mask.cursor,
                }}
                gradient={{
                  display: effects.gradient.display,
                  opacity: effects.gradient.opacity as opacity,
                  x: effects.gradient.x,
                  y: effects.gradient.y,
                  width: effects.gradient.width,
                  height: effects.gradient.height,
                  tilt: effects.gradient.tilt,
                  colorStart: effects.gradient.colorStart,
                  colorEnd: effects.gradient.colorEnd,
                }}
                dots={{
                  display: effects.dots.display,
                  opacity: effects.dots.opacity as opacity,
                  size: effects.dots.size as SpacingToken,
                  color: effects.dots.color,
                }}
                grid={{
                  display: effects.grid.display,
                  opacity: effects.grid.opacity as opacity,
                  color: effects.grid.color,
                  width: effects.grid.width,
                  height: effects.grid.height,
                }}
                lines={{
                  display: effects.lines.display,
                  opacity: effects.lines.opacity as opacity,
                  size: effects.lines.size as SpacingToken,
                  thickness: effects.lines.thickness,
                  angle: effects.lines.angle,
                  color: effects.lines.color,
                }}
              />
            </RevealFx>
            <Flex fillWidth minHeight="16" s={{ hide: true }} />
            <Header />
            <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
              <Flex horizontal="center" fillWidth minHeight="0">
                <RouteGuard>{children}</RouteGuard>
              </Flex>
            </Flex>
            <Footer />
            <KonamiWrapper />
            <Analytics />
            <SpeedInsights />
          </Column>
        </LanguageProvider>
      </Providers>
    </Flex>
  );
}
