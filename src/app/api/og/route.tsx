import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

// Inline SVG grid
const SVG_GRID = `data:image/svg+xml;charset=utf-8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h40v40H0z" fill="none"/><path d="M40 0H0v40" fill="none" stroke="%23ffffff" stroke-opacity="0.04" stroke-width="1"/></svg>`;

// Noise
const SVG_NOISE = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(%23n)" opacity="0.08"/></svg>`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Victor Rocha";
  const description = searchParams.get("description") ?? "";
  const type = (searchParams.get("type") ?? "page") as "blog" | "work" | "page";
  const tag = searchParams.get("tag") ?? "";
  const date = searchParams.get("date");
  const readTime = searchParams.get("readTime");

  const BG = "#09090E";
  const CARD_BG = "#12121A";
  const VIOLET = "#8B5CF6";
  const CYAN = "#00E5FF";
  const TEXT_STRONG = "#FFFFFF";
  const TEXT_WEAK = "#A1A1AA";

  const typeLabel: Record<string, string> = {
    blog: "Artigo",
    work: "Estudo de Caso",
    page: "Portfólio",
  };

  const ctaText: Record<string, string> = {
    blog: "Ler Artigo",
    work: "Ver Projeto",
    page: "Acessar Portfólio",
  };

  const titleFontSize =
    title.length > 60 ? "52px" : title.length > 35 ? "64px" : "76px";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        backgroundColor: BG,
        backgroundImage: `url('${SVG_GRID}')`,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Noise overlay (SVG, no decode) ──────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${SVG_NOISE}')`,
          backgroundRepeat: "repeat",
          opacity: 0.12,
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      {/* ── Top gradient bar ────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
        }}
      />

      {/* ── Violet glow orb (top-left) ──────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${VIOLET}40 0%, transparent 70%)`,
        }}
      />

      {/* ── Cyan glow orb (bottom-right) ────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-200px",
          width: "700px",
          height: "700px",
          background: `radial-gradient(circle, ${CYAN}30 0%, transparent 70%)`,
        }}
      />

      {/* ── Main card ───────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1080px",
          height: "540px",
          padding: "48px 56px",
          borderRadius: "32px",
          backgroundColor: CARD_BG,
          border: "1.5px solid rgba(255, 255, 255, 0.10)",
          outline: "1px solid rgba(255,255,255,0.04)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* ── Header row ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Left: type badge + tag + date/readtime */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: CYAN,
                  background: "rgba(0, 229, 255, 0.1)",
                  border: "1px solid rgba(0, 229, 255, 0.3)",
                  padding: "8px 20px",
                  borderRadius: "6px",
                }}
              >
                {typeLabel[type] || "Portfólio"}
              </span>

              {tag && (
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: VIOLET,
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    padding: "8px 20px",
                    borderRadius: "6px",
                  }}
                >
                  {tag}
                </span>
              )}
            </div>

            {(date || readTime) && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.15)",
                    fontSize: "22px",
                    fontWeight: 300,
                  }}
                >
                  |
                </span>
                {date && (
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: CYAN,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {date}
                  </span>
                )}
                {date && readTime && (
                  <span style={{ color: VIOLET, fontSize: "16px" }}>•</span>
                )}
                {readTime && (
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: TEXT_WEAK,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {readTime} min read
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right: language badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                color: TEXT_WEAK,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginRight: "4px",
              }}
            >
              EN / PT
            </span>
            {/* Flags badges */}
            {["🇺🇸", "🇧🇷"].map((flag) => (
              <div
                key={flag}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                {flag}
              </div>
            ))}
          </div>
        </div>

        {/* ── Middle: title + description ─────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1.15,
              color: TEXT_STRONG,
              letterSpacing: "-0.03em",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                fontSize: "26px",
                lineHeight: 1.5,
                color: TEXT_WEAK,
                fontWeight: 500,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* ── Footer row ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            width: "100%",
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${VIOLET}, ${CYAN})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
              }}
            >
              VR
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: TEXT_STRONG,
                }}
              >
                Victor Rocha
              </span>
              <span
                style={{ fontSize: "16px", color: TEXT_WEAK, fontWeight: 500 }}
              >
                strattegia.dev
              </span>
            </div>
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: `linear-gradient(135deg, ${VIOLET}, #3B82F6)`,
              padding: "16px 36px",
              borderRadius: "100px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
              }}
            >
              {ctaText[type]}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "4px" }}
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>,
    {
      ...SIZE,
      headers: {
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400",
      },
    },
  );
}
