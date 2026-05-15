"use client";

import { useCallback, useState } from "react";
import { Row, Text, useToast } from "@once-ui-system/core";
import { socialSharing } from "@/resources";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./ShareSection.module.scss";

// Importando os ícones diretamente do react-icons (conforme seu arquivo icons.ts)
import {
  FaXTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaReddit,
  FaFacebook,
} from "react-icons/fa6";
import { HiEnvelope } from "react-icons/hi2";
import { BiCopy, BiCheck, BiShareAlt } from "react-icons/bi";

interface ShareSectionProps {
  title: string;
  url: string;
}

const enc = encodeURIComponent;

/* ─── Platform config ──────────────────────────── */
const PLATFORMS = {
  x: {
    label: "X / Twitter",
    icon: FaXTwitter,
    url: (t: string, u: string) =>
      `https://twitter.com/intent/tweet?text=${enc(t)}&url=${enc(u)}`,
  },
  linkedin: {
    label: "LinkedIn",
    icon: FaLinkedin,
    url: (_: string, u: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`,
  },
  whatsapp: {
    label: "WhatsApp",
    icon: FaWhatsapp,
    url: (t: string, u: string) => `https://wa.me/?text=${enc(`${t} - ${u}`)}`,
  },
  telegram: {
    label: "Telegram",
    icon: FaTelegram,
    url: (t: string, u: string) =>
      `https://t.me/share/url?url=${enc(u)}&text=${enc(t)}`,
  },
  reddit: {
    label: "Reddit",
    icon: FaReddit,
    url: (t: string, u: string) =>
      `https://reddit.com/submit?url=${enc(u)}&title=${enc(t)}`,
  },
  facebook: {
    label: "Facebook",
    icon: FaFacebook,
    url: (_: string, u: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}`,
  },
  email: {
    label: "Email",
    icon: HiEnvelope,
    url: (t: string, u: string) =>
      `mailto:?subject=${enc(t)}&body=${enc(`Confira este post: ${u}`)}`,
  },
} as const;

/* ─── Main Component ─────────────────────────────── */
export function ShareSection({ title, url }: ShareSectionProps) {
  const { addToast } = useToast();
  const { currentLanguage } = useLanguage();
  const [copied, setCopied] = useState(false);

  const i18n = {
    pt: {
      label: "Compartilhar",
      copy: "Copiar link",
      copied: "Copiado!",
      nativeShare: "Compartilhar via sistema",
      error: "Erro ao copiar",
    },
    en: {
      label: "Share",
      copy: "Copy link",
      copied: "Copied!",
      nativeShare: "Share via system",
      error: "Failed to copy",
    },
  };
  const t = i18n[currentLanguage];

  if (!socialSharing.display) return null;

  /* Web Share API — Native OS sheet on mobile */
  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log("Compartilhamento cancelado ou não suportado.");
      }
    } else {
      addToast({ variant: "danger", message: t.error });
    }
  }, [title, url, t, addToast]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      addToast({ variant: "success", message: t.copied });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      addToast({ variant: "danger", message: t.error });
    }
  }, [url, t, addToast]);

  const enabledKeys = Object.entries(socialSharing.platforms)
    .filter(([k, v]) => v && k !== "copyLink" && k in PLATFORMS)
    .map(([k]) => k as keyof typeof PLATFORMS);

  return (
    <div className={styles.wrapper}>
      <Text
        variant="label-default-s"
        onBackground="neutral-weak"
        className={styles.label}
      >
        {t.label}
      </Text>

      <div className={styles.buttons}>
        {/* Botões das Redes Sociais */}
        {enabledKeys.map((key) => {
          const p = PLATFORMS[key];
          const Icon = p.icon;
          return (
            <a
              key={key}
              href={p.url(title, url)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
              aria-label={`Compartilhar no ${p.label}`}
              title={p.label}
            >
              <Icon size={20} />
            </a>
          );
        })}

        {/* Copiar Link */}
        {socialSharing.platforms.copyLink && (
          <button
            className={`${styles.btn} ${copied ? styles.btnCopied : ""}`}
            onClick={handleCopy}
            aria-label={copied ? t.copied : t.copy}
            title={copied ? t.copied : t.copy}
          >
            {copied ? <BiCheck size={22} /> : <BiCopy size={20} />}
          </button>
        )}

        {/* Compartilhamento Nativo (Mobile) */}
        <button
          className={`${styles.btn} ${styles.btnNative}`}
          onClick={handleNativeShare}
          aria-label={t.nativeShare}
          title={t.nativeShare}
        >
          <BiShareAlt size={20} />
        </button>
      </div>
    </div>
  );
}
