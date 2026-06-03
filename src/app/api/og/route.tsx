import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

/**
 * Generates highly stylized, Glassmorphism Open Graph images dynamically.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Victor Rocha";
  const description = searchParams.get("description") ?? "";
  const type = (searchParams.get("type") ?? "page") as "blog" | "work" | "page";
  const tag = searchParams.get("tag") ?? "";

  // ── Paleta de Cores Premium (Neon/Dark Glass) ──────────
  const BG = "#05050A";
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
    page: "Acessar",
  };

  const titleFontSize =
    title.length > 50 ? "56px" : title.length > 30 ? "68px" : "80px";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        backgroundColor: BG,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── BARRA NEON SUPERIOR FULL-BLEED ───────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          display: "flex",
          background: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
          zIndex: 20, // Garante que fique acima de todos os efeitos
        }}
      />

      {/* ── 1. Luzes Volumétricas de Fundo (Orbs) ────────────── */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${VIOLET}44 0%, transparent 60%)`,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-150px",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CYAN}33 0%, transparent 60%)`,
          display: "flex",
        }}
      />

      {/* ── 2. Overlay Estilo "Dot Matrix" ────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── 3. CARD GLASSMORPHISM PRINCIPAL ─────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1080px",
          height: "510px",
          padding: "56px 64px",
          borderRadius: "32px",
          backgroundColor: "rgba(20, 20, 25, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            "0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(24px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Barra de destaque colorida sutil interna no topo do card */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "64px",
            right: "64px",
            height: "2px",
            display: "flex",
            background: `linear-gradient(90deg, transparent, ${VIOLET}, ${CYAN}, transparent)`,
            opacity: 0.8,
          }}
        />

        {/* Topo: Badges de Categoria */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: CYAN,
              background: "rgba(0, 229, 255, 0.1)",
              border: `1px solid rgba(0, 229, 255, 0.3)`,
              padding: "8px 20px",
              borderRadius: "6px",
              display: "flex",
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
                border: `1px solid rgba(139, 92, 246, 0.3)`,
                padding: "8px 20px",
                borderRadius: "6px",
                display: "flex",
              }}
            >
              {tag}
            </span>
          )}
        </div>

        {/* Meio: Título Gigante e Descrição */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1.1,
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
                maxWidth: "850px",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Rodapé: Autor e CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "32px",
            borderTop: `1px solid rgba(255,255,255,0.1)`,
            width: "100%",
          }}
        >
          {/* Info do Autor */}
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
                boxShadow: `0 0 20px rgba(139, 92, 246, 0.4)`,
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

          {/* CTA VIBRANTE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: `linear-gradient(135deg, ${VIOLET}, ${CYAN})`,
              padding: "16px 36px",
              borderRadius: "100px",
              boxShadow: `0 8px 24px rgba(0, 229, 255, 0.3)`,
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
              {ctaText[type] || "Acessar"}
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
              style={{ display: "flex" }}
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
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
