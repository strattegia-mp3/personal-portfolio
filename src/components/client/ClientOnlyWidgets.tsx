"use client";

import dynamic from "next/dynamic";
import type { PostData } from "@/components/blog/Posts";
import type { ProjectData } from "@/components/work/Projects";
import { CommandPaletteWrapper } from "@/components/search/CommandPaletteWrapper";

const KonamiWrapper = dynamic(
  () => import("@/components/konamiCode/KonamiWrapper"),
  { ssr: false, loading: () => null },
);

const ChatWrapper = dynamic(() => import("@/components/chat/ChatWrapper"), {
  ssr: false,
  loading: () => null,
});

interface ClientOnlyWidgetsProps {
  posts?: PostData[];
  projects?: ProjectData[];
}

export function ClientOnlyWidgets({
  posts = [],
  projects = [],
}: ClientOnlyWidgetsProps) {
  return (
    <>
      <KonamiWrapper />
      <ChatWrapper />
      <CommandPaletteWrapper posts={posts} projects={projects} />
    </>
  );
}
