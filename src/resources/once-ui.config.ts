import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";

import { i18nContent } from "./content-i18n";
export const { person, home, social, about, blog, work, gallery, newsletter } =
  i18nContent.en;

// 1. Base URL
const baseURL: string =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// 2. Routes
const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
};

// 3. Protected Routes
const protectedRoutes: ProtectedRoutesConfig = {};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// 4. Styles
const style: StyleConfig = {
  theme: "dark",
  neutral: "gray",
  brand: "violet",
  accent: "cyan",
  solid: "contrast",
  solidStyle: "flat",
  border: "playful",
  surface: "translucent",
  transition: "all",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 40,
    x: 50,
    y: 0,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

// 5. Mailchimp
const mailchimp: MailchimpConfig = {
  action:
    "https://gmail.us20.list-manage.com/subscribe/post?u=f63c9e5427ecdf1a3090d8552&amp;id=4b02934f97&amp;f_id=001cc2e1f0",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: person.name,
  description: home.description,
  email: person.email,
};

const sameAs: SameAsConfig = {
  threads: "",
  linkedin: social.find((s) => s.name === "LinkedIn")?.link || "",
  discord: "",
};

const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: true,
    reddit: true,
    telegram: true,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
