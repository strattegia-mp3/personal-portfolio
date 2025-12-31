import { ImageResponse } from "next/og";
import { OGTemplate } from "@/components/OGTemplate";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Victor Rocha";
  const role = searchParams.get("role") || "Founder";
  const imageSrc = searchParams.get("image") || undefined;
  const description =
    searchParams.get("desc") ||
    "Soluções digitais com estética futurista e performance de ponta.";
  const noImage = searchParams.get("noImage") === "true";

  const fontData = await fetch(
    new URL(
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-600-normal.woff"
    ),
    { cache: "force-cache" }
  ).then((res) => {
    if (!res.ok) throw new Error("Falha ao carregar a fonte");
    return res.arrayBuffer();
  });

  return new ImageResponse(
    (
      <OGTemplate
        title={title}
        role={role}
        description={description}
        imageSrc={imageSrc}
        noImage={noImage}
      />
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );
}
