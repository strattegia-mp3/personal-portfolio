"use client";

import dynamic from "next/dynamic";

const KonamiCode = dynamic(
  () => import("@/components/konamiCode/KonamiCode").then((mod) => mod.KonamiCode),
  { ssr: false }
);

export default function KonamiWrapper() {
  return <KonamiCode />;
}
