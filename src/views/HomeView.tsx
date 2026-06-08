"use client";

import {
  Heading,
  Text,
  Button,
  Avatar,
  Column,
  Badge,
  Row,
  Line,
} from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import { routes } from "@/resources";
import { DynamicTabTitle } from "@/components/i18n/DynamicTabTitle";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { PostData } from "@/components/blog/Posts";
import type { ProjectData } from "@/components/work/Projects";

// ─── Conteúdo não-crítico: carregado fora do caminho inicial ─────────────────
const Projects = dynamic(() =>
  import("@/components/work/Projects").then((mod) => mod.Projects),
);
const Posts = dynamic(() =>
  import("@/components/blog/Posts").then((mod) => mod.Posts),
);
const Mailchimp = dynamic(() =>
  import("@/components").then((mod) => mod.Mailchimp),
);

// ─── RevealFx abaixo da dobra: carregado de forma lazy ──────────────────────
const RevealFx = dynamic(() =>
  import("@once-ui-system/core").then((mod) => mod.RevealFx),
);

interface HomeViewProps {
  blogPosts: PostData[];
  projectPosts: ProjectData[];
}

export default function HomeView({ blogPosts, projectPosts }: HomeViewProps) {
  const { content, currentLanguage } = useLanguage();
  const { home, about, person, blog } = content;

  // ⚡ LÓGICA DE DESTAQUE: Garante que o post com "highlight: true"
  // seja o primeiro a aparecer na Home.
  const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    const aHighlight =
      a.metadata.highlight === "true" || a.metadata.highlight === true;
    const bHighlight =
      b.metadata.highlight === "true" || b.metadata.highlight === true;

    if (aHighlight && !bHighlight) return -1;
    if (!aHighlight && bHighlight) return 1;
    return 0;
  });

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <DynamicTabTitle
        titlePt="Victor Rocha | Desenvolvedor de Software"
        titleEn="Victor Rocha | Software Developer"
        fallback="Victor Rocha"
      />

      <style>{`
        /* Badge shine — GPU composited via transform */
        .cls-safe-badge [id="badge"]::before,
        .cls-safe-badge a::before,
        .cls-safe-badge::before {
          left: 0 !important;
          animation-name: gpuSafeShine !important;
          will-change: transform;
        }
        @keyframes gpuSafeShine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }

        /* Hero animations: composited (transform + opacity) */
        /* Sem RevealFx above-the-fold — evita CLS/reflow na hidratação */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-item {
          animation: heroFadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .hero-item-0 { animation-delay: 0ms; }
        .hero-item-1 { animation-delay: 60ms; }
        .hero-item-2 { animation-delay: 120ms; }
        .hero-item-3 { animation-delay: 180ms; }

        @media (prefers-reduced-motion: reduce) {
          .hero-item { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          {/* Headline */}
          <RevealFx fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx
            translateY="4"
            delay={0.08}
            fillWidth
            horizontal="center"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx
            paddingTop="12"
            delay={0.15}
            horizontal="center"
            paddingLeft="12"
          >
            <Row gap="12" wrap horizontal="center">
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                <Row gap="8" vertical="center" paddingRight="4">
                  {about.avatar.display && (
                    <Image
                      src={person.avatar}
                      alt="Victor Rocha"
                      width={32}
                      height={32}
                      priority
                      style={{
                        marginLeft: "-0.75rem",
                        marginRight: "8px",
                        borderRadius: "999px",
                      }}
                    />
                  )}

                  {currentLanguage === "pt" ? "Minha Jornada" : "My Journey"}
                </Row>
              </Button>

              {about.calendar.display && (
                <Button
                  id="schedule"
                  data-border="rounded"
                  href={about.calendar.link}
                  variant="tertiary"
                  size="m"
                  weight="default"
                  prefixIcon="calendar"
                >
                  {currentLanguage === "pt"
                    ? "Agendar conversa"
                    : "Schedule a call"}
                </Button>
              )}
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* ─── Conteúdo Abaixo da Dobra ─── */}
      <Column fillWidth gap="xl" style={{ display: "contents" }}>
        <RevealFx translateY="12" delay={0.2}>
          <Projects range={[1, 1]} posts={projectPosts} />
        </RevealFx>

        {routes["/blog"] && (
          <RevealFx translateY="12" delay={0.25}>
            <Column fillWidth gap="24" marginBottom="s">
              <Row fillWidth paddingRight="64">
                <Line maxWidth={48} />
              </Row>
              <Row fillWidth gap="24" s={{ direction: "column" }}>
                <Row flex={1} paddingLeft="l" paddingTop="24">
                  <Heading as="h2" variant="display-strong-xs" wrap="balance">
                    {blog.title}
                  </Heading>
                </Row>
                <Column flex={3} gap="24" paddingX="20">
                  {/* ⚡ Separação de Destaque na Home */}
                  {(() => {
                    const highlightedPosts = blogPosts.filter(
                      (p) =>
                        p.metadata.highlight === "true" ||
                        p.metadata.highlight === true,
                    );
                    const highlightedPost =
                      highlightedPosts.length > 0 ? highlightedPosts[0] : null;
                    const normalPosts = blogPosts.filter(
                      (p) => p.slug !== highlightedPost?.slug,
                    );

                    return highlightedPost ? (
                      <>
                        <Posts
                          range={[1, 1]}
                          posts={[highlightedPost]}
                          thumbnail
                          showDate={false}
                        />
                        {normalPosts.length > 0 && (
                          <Posts
                            range={[1, 2]}
                            posts={normalPosts}
                            columns="2"
                            showDate={false}
                          />
                        )}
                      </>
                    ) : (
                      <Posts
                        range={[1, 2]}
                        posts={normalPosts}
                        thumbnail
                        showDate={false}
                      />
                    );
                  })()}
                </Column>
              </Row>
              <Row fillWidth paddingLeft="64" horizontal="end">
                <Line maxWidth={48} />
              </Row>
            </Column>
          </RevealFx>
        )}

        {/* Projetos restantes */}
        <RevealFx translateY="12" delay={0.3}>
          <Projects range={[2]} posts={projectPosts} />
        </RevealFx>

        <RevealFx translateY="12" delay={0.35}>
          <Mailchimp />
        </RevealFx>
      </Column>
    </Column>
  );
}
