import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiMongodb,
} from "react-icons/si";

import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaX,
  FaThreads,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaReddit,
  FaTelegram,
} from "react-icons/fa6";
import {
  BiChart,
  BiChat,
  BiCloud,
  BiCode,
  BiLock,
  BiLogoGithub,
  BiLogoJavascript,
  BiLogoTypescript,
  BiServer,
  BiUser,
  BiWifi,
} from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import { HiLightningBolt, HiOutlineLightningBolt } from "react-icons/hi";

export const iconLibrary: Record<string, IconType> = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  githubAlt: BiLogoGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  javascript: BiLogoJavascript,
  typescript: BiLogoTypescript,
  cloud: BiCloud,
  code: BiCode,
  server: BiServer,
  database: BsDatabase,
  linux: FaLinux,
  react: SiReact,
  tailwind: SiTailwindcss,
  nodedotjs: SiNodedotjs,
  python: SiPython,
  mongodb: SiMongodb,
  lock: BiLock,
  wifi: BiWifi,
  user: BiUser,
  chart: BiChart,
  lightning: HiOutlineLightningBolt,
  chat: BiChat,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
  instagram: FaInstagram,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
