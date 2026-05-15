/**
 * content-i18n.tsx
 *
 * Entry point for i18n content. Re-exports from the split modules so that
 * all existing imports (`from "@/resources"`) continue to work without change.
 *
 * Structure:
 *   content/shared.tsx  — language-agnostic constants (person, social, images…)
 *   content/pt.tsx      — Portuguese translations
 *   content/en.tsx      — English translations
 */
export type { ContentTranslation } from "@/types";
export { pt } from "./content/pt";
export { en } from "./content/en";
export { PERSON, SOCIAL, PATHS, OG_IMAGE, GALLERY_IMAGES } from "./content/shared";

import { pt } from "./content/pt";
import { en } from "./content/en";

export const i18nContent = { pt, en } as const;
export type AvailableLanguages = keyof typeof i18nContent;
