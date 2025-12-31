import React from "react";

// Noise Texture (Base64 para performance)
const noiseBase64 = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+`;

interface OGTemplateProps {
  title: string;
  role: string;
  description: string;
  imageSrc?: string;
  noImage?: boolean;
}

export const OGTemplate: React.FC<OGTemplateProps> = ({
  title,
  role,
  description,
  imageSrc,
  noImage,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambience */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-10%",
          width: "90%",
          height: "90%",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, rgba(76, 29, 149, 0.3) 50%, transparent 80%)",
          filter: "blur(80px)",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50%",
          right: "-10%",
          width: "75%",
          height: "75%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(8, 145, 178, 0.3) 50%, transparent 80%)",
          filter: "blur(80px)",
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${noiseBase64}")`,
          opacity: 0.08,
          mixBlendMode: "overlay",
          zIndex: 2,
        }}
      />

      {/* Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "92%",
          height: "88%",
          zIndex: 10,
          background:
            "linear-gradient(120deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(255, 255, 255, 0.04) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "32px",
          boxShadow: `
              inset 0 0 20px rgba(255, 255, 255, 0.05),
              0 0 0 1px rgba(0, 0, 0, 0.2),
              0 20px 50px -10px rgba(0, 0, 0, 0.9),
              0 0 80px rgba(139, 92, 246, 0.15)
            `,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 60px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              opacity: 0.9,
              fontSize: "18px",
              color: "white",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: "#c4b5fd" }}>Victor Rocha</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>Portfolio</span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.3)",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
        </div>

        {/* Principal Content */}
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "60px",
            gap: noImage ? "0px" : "60px",
            alignItems: "center",
            justifyContent: noImage ? "center" : "space-between",
            position: "relative",
            textAlign: noImage ? "center" : "left",
          }}
        >
          {/* Left Side: Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: noImage ? "center" : "flex-start",
              flex: noImage ? 1 : 0.9,
              maxWidth: noImage ? "80%" : "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.5)",
                padding: "10px 20px",
                borderRadius: "100px",
                marginBottom: "30px",
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.25)",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  color: "#ddd6fe",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {role}
              </span>
            </div>

            <h1
              style={{
                fontSize: noImage ? "130px" : "110px",
                fontWeight: "800",
                lineHeight: "0.9",
                margin: "0 0 30px 0",
                color: "white",
                textShadow:
                  "0 2px 5px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.3)",
                letterSpacing: "-0.02em",
                textAlign: noImage ? "center" : "left",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "30px",
                color: "#e2e8f0",
                lineHeight: "1.5",
                maxWidth: "95%",
                fontWeight: 400,
                opacity: 0.9,
                textAlign: noImage ? "center" : "left",
              }}
            >
              {description}
            </p>
          </div>

          {/* Right Side: Image Container */}
          {!noImage && (
            <div
              style={{
                flex: 1.1,
                height: "100%",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.3), 0 20px 40px rgba(0,0,0,0.4)",
                padding: "12px",
                display: "flex",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#0a0a0a",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)",
                }}
              >
                {imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageSrc}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.9,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        border: "2px dashed #444",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    />
                    <span
                      style={{
                        color: "#555",
                        fontSize: "22px",
                        fontWeight: 500,
                      }}
                    >
                      Sem Imagem
                    </span>
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top right, rgba(124, 58, 237, 0.1), transparent 60%)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
