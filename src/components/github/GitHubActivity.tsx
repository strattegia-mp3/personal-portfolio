"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Column, Row, Text, Heading, SmartLink } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";
import type { GitHubData, ContributionDay } from "@/types";
import styles from "./GitHubActivity.module.scss";

/* ── Heatmap cell colour ────────────────────────────────────────────── */
function cellLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/* ── Skeleton loaders ───────────────────────────────────────────────── */
function HeatmapSkeleton() {
  return (
    <div className={styles.heatmapCard}>
      <div className={styles.skeletonHeatmap}>
        {Array.from({ length: 52 }).map((_, i) => (
          <div key={i} className={styles.skeletonCol}>
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className={styles.skeletonCell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RepoSkeleton() {
  return (
    <div className={styles.repoGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.repoCardSkeleton} />
      ))}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */
export default function GitHubActivity() {
  const { content } = useLanguage();
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const heatmapRef = useRef<HTMLDivElement>(null);

  const t = content.about.github;

  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data && heatmapRef.current) {
      heatmapRef.current.scrollLeft = heatmapRef.current.scrollWidth;
    }
  }, [data]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const parent = e.currentTarget
        .closest(`.${styles.heatmapCard}`)
        ?.getBoundingClientRect();

      setTooltip({
        text: t.contribTooltip(day.contributionCount, day.date),
        x: rect.left - (parent?.left ?? 0) + rect.width / 2,
        y: rect.top - (parent?.top ?? 0), // O calc() no CSS fará o ajuste da distância
      });
    },
    [t],
  );

  if (error) {
    return (
      <Text variant="body-default-s" onBackground="neutral-weak">
        {t.error}
      </Text>
    );
  }

  return (
    <Column fillWidth gap="xl">
      {/* ── Section heading ─────────────────────────────── */}
      <Row fillWidth horizontal="between" vertical="center">
        <Heading as="h2" variant="display-strong-s">
          {t.title}
        </Heading>
        {data && (
          <Text variant="body-default-s" onBackground="neutral-weak">
            <Text
              as="span"
              variant="label-strong-s"
              onBackground="neutral-strong"
            >
              {data.totalContributions.toLocaleString()}
            </Text>{" "}
            {t.contributions}
          </Text>
        )}
      </Row>

      {/* ── Contribution heatmap ─────────────────────────── */}
      {loading ? (
        <HeatmapSkeleton />
      ) : (
        data && (
          <div className={styles.heatmapCard}>
            <div className={styles.heatmapScroll} ref={heatmapRef}>
              <div className={styles.heatmap}>
                {data.weeks.map((week, wi) => (
                  <div key={wi} className={styles.heatmapCol}>
                    {week.contributionDays.map((day, di) => (
                      <div
                        key={di}
                        className={`${styles.cell} ${styles[`level${cellLevel(day.contributionCount)}`]}`}
                        onMouseEnter={(e) => handleMouseEnter(e, day)}
                        onMouseLeave={() => setTooltip(null)}
                        aria-label={t.contribTooltip(
                          day.contributionCount,
                          day.date,
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Legenda de Cores (Estilo GitHub) ─────────── */}
            <div className={styles.legend}>
              <span className={styles.legendText}>{t.less}</span>
              <div className={`${styles.cell} ${styles.level0}`} />
              <div className={`${styles.cell} ${styles.level1}`} />
              <div className={`${styles.cell} ${styles.level2}`} />
              <div className={`${styles.cell} ${styles.level3}`} />
              <div className={`${styles.cell} ${styles.level4}`} />
              <span className={styles.legendText}>{t.more}</span>
            </div>

            {tooltip && (
              <div
                className={styles.tooltip}
                style={{ left: tooltip.x, top: tooltip.y }}
              >
                {tooltip.text}
              </div>
            )}
          </div>
        )
      )}

      {/* ── Repos ───────────────────────────────────────── */}
      <Column fillWidth gap="m">
        <Heading as="h3" variant="heading-strong-l">
          {t.repos}
        </Heading>

        {loading ? (
          <RepoSkeleton />
        ) : (
          data && (
            <div className={styles.repoGrid}>
              {data.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoCard}
                  aria-label={repo.name}
                >
                  <Column fillWidth gap="8" flex={1}>
                    <Text
                      variant="label-strong-m"
                      onBackground="neutral-strong"
                    >
                      {repo.name}
                    </Text>
                    <Text
                      variant="body-default-xs"
                      onBackground="neutral-weak"
                      style={{ flex: 1 }}
                    >
                      {repo.description || t.noDesc}
                    </Text>
                  </Column>

                  <Row fillWidth gap="16" vertical="center" marginTop="12">
                    {repo.primaryLanguage && (
                      <Row gap="4" vertical="center">
                        <span
                          className={styles.langDot}
                          style={{
                            background: repo.primaryLanguage.color ?? "#888",
                          }}
                        />
                        <Text
                          variant="body-default-xs"
                          onBackground="neutral-weak"
                        >
                          {repo.primaryLanguage.name}
                        </Text>
                      </Row>
                    )}

                    <Row gap="12" vertical="center">
                      {repo.stargazerCount > 0 && (
                        <Row gap="4" vertical="center">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                            style={{ opacity: 0.5 }}
                          >
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 11.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                          </svg>
                          <Text
                            variant="body-default-xs"
                            onBackground="neutral-weak"
                          >
                            {repo.stargazerCount}
                          </Text>
                        </Row>
                      )}
                      {repo.forkCount > 0 && (
                        <Row gap="4" vertical="center">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                            style={{ opacity: 0.5 }}
                          >
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                          </svg>
                          <Text
                            variant="body-default-xs"
                            onBackground="neutral-weak"
                          >
                            {repo.forkCount}
                          </Text>
                        </Row>
                      )}
                    </Row>
                  </Row>
                </a>
              ))}
            </div>
          )
        )}

        <SmartLink
          href={`https://github.com/${t.username}`}
          suffixIcon="arrowRight"
          className={styles.viewAllLink}
        >
          <Text variant="label-default-s" onBackground="brand-medium">
            {t.viewAll}
          </Text>
        </SmartLink>
      </Column>
    </Column>
  );
}
