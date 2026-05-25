"use client";

import dynamic from "next/dynamic";

const KonamiWrapper = dynamic(
  () => import("@/components/konamiCode/KonamiWrapper"),
  {
    ssr: false,
    loading: () => null,
  },
);

const ChatWrapper = dynamic(() => import("@/components/chat/ChatWrapper"), {
  ssr: false,
  loading: () => null,
});

export function ClientOnlyWidgets() {
  return (
    <>
      <KonamiWrapper />
      <ChatWrapper />
    </>
  );
}
