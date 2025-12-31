"use client";

import { Row, Text, Button, useToast } from "@once-ui-system/core";
import { socialSharing } from "@/resources";
import { useLanguage } from "@/components/LanguageContext";

interface ShareSectionProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: "x",
    label: "X",
    generateUrl: (title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (title, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
  },
  facebook: {
    name: "facebook",
    icon: "facebook",
    label: "Facebook",
    generateUrl: (title, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  pinterest: {
    name: "pinterest",
    icon: "pinterest",
    label: "Pinterest",
    generateUrl: (title, url) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url
      )}&description=${encodeURIComponent(title)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    generateUrl: (title, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  reddit: {
    name: "reddit",
    icon: "reddit",
    label: "Reddit",
    generateUrl: (title, url) =>
      `https://reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "Email",
    generateUrl: (title, url) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        `Check out this post: ${url}`
      )}`,
  },
};

export function ShareSection({ title, url }: ShareSectionProps) {
  const { addToast } = useToast();
  const { currentLanguage } = useLanguage();

  const i18n = {
    pt: {
      label: "Compartilhar:",
      success: "Link copiado!",
      error: "Erro ao copiar link",
    },
    en: {
      label: "Share this post:",
      success: "Link copied to clipboard",
      error: "Failed to copy link",
    },
  };
  const t = i18n[currentLanguage];

  // Don't render if sharing is disabled
  if (!socialSharing.display) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        variant: "success",
        message: t.success,
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      addToast({
        variant: "danger",
        message: t.error,
      });
    }
  };

  // Get enabled platforms
  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([key, enabled]) => enabled && key !== "copyLink")
    .map(([platformKey]) => {
      const platform = socialPlatforms[platformKey];
      return platform ? { key: platformKey, ...platform } : null;
    })
    .filter((p): p is SocialPlatform & { key: string } => p !== null);

  return (
    <Row fillWidth center gap="16" marginTop="32" marginBottom="16">
      <Text variant="label-default-m" onBackground="neutral-weak">
        {t.label}
      </Text>
      <Row data-border="rounded" gap="16" horizontal="center" wrap>
        {enabledPlatforms.map((platform, index) => (
          <Button
            key={index}
            variant="secondary"
            size="s"
            href={platform.generateUrl(title, url)}
            prefixIcon={platform.icon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.label}`}
          />
        ))}

        {socialSharing.platforms.copyLink && (
          <Button
            variant="secondary"
            size="s"
            onClick={handleCopy}
            prefixIcon="openLink"
            aria-label="Copy Link"
          />
        )}
      </Row>
    </Row>
  );
}
