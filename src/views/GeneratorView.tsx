"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Column,
  Text,
  Button,
  Input,
  Background,
  Line,
  Textarea,
} from "@once-ui-system/core";
import { Download, Link as LinkIcon, Monitor } from "lucide-react";
import { Inter } from "next/font/google";

import { OGTemplate } from "@/components/OGTemplate";
import { TitleManager } from "@/components/i18n/TitleManager";
import { useLanguage } from "@/components/LanguageContext";

// Configuração da fonte específica para este preview
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const translations = {
  pt: {
    pageTitle: "OG Generator",
    pageSubtitle: "Preview em tempo real. Download Server-Side.",
    labelTitle: "Título Principal",
    labelSubtitle: "Subtítulo",
    labelDesc: "Descrição",
    placeholderTitle: "Insira o título...",
    placeholderSubtitle: "Cargo ou subtítulo...",
    placeholderDesc: "Uma breve descrição...",
    btnHide: "Ocultar Imagem",
    labelUrl: "URL da Imagem",
    helperUrl: "* A imagem deve ser pública e HTTPS.",
    statusGen: "Gerando Alta Definição...",
    btnProcess: "Gerando PNG...",
    btnDownload: "Baixar (1920x1080)",
    btnCopy: "Copiar Link da API",
    labelScale: "Escala",
    labelDims: "Dimensões Reais",
    footerText:
      "Preview da imagem atual. O download buscará a versão de alta qualidade.",
    alertDownload: "Erro ao baixar.",
    alertCopy: "URL da API copiada!",
  },
  en: {
    pageTitle: "OG Generator",
    pageSubtitle: "Real-time preview. Server-Side Download.",
    labelTitle: "Main Title",
    labelSubtitle: "Subtitle",
    labelDesc: "Description",
    placeholderTitle: "Enter title...",
    placeholderSubtitle: "Role or subtitle...",
    placeholderDesc: "A brief description...",
    btnHide: "Hide Image",
    labelUrl: "Image URL",
    helperUrl: "* Image must be public and HTTPS.",
    statusGen: "Generating High Definition...",
    btnProcess: "Generating PNG...",
    btnDownload: "Download (1920x1080)",
    btnCopy: "Copy API Link",
    labelScale: "Scale",
    labelDims: "Real Dimensions",
    footerText:
      "Current image preview. Download will fetch high-quality version.",
    alertDownload: "Error downloading.",
    alertCopy: "API URL copied!",
  },
};

export default function GeneratorView() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const [title, setTitle] = useState("Victor Rocha");
  const [role, setRole] = useState("Software Engineer");
  const [description, setDescription] = useState(
    "Soluções digitais com estética futurista e performance de ponta."
  );
  const [imageUrl, setImageUrl] = useState("");
  const [noImage, setNoImage] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(0.5);

  const availableSpaceRef = useRef<HTMLDivElement>(null);

  // Lógica de redimensionamento do preview
  useEffect(() => {
    if (!availableSpaceRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;

        const widthRatio = width / 1920;
        const heightRatio = height / 1080;

        const newScale = Math.min(widthRatio, heightRatio) * 0.95;
        setScale(newScale);
      }
    });

    observer.observe(availableSpaceRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(10);
    try {
      const params = new URLSearchParams();
      if (title) params.set("title", title);
      if (role) params.set("role", role);
      if (imageUrl) params.set("image", imageUrl);
      if (description) params.set("desc", description);
      if (noImage) params.set("noImage", "true");

      const apiUrl = `/api/og/generate?${params.toString()}`;

      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? prev : prev + 5));
      }, 200);

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Erro na geração");
      const blob = await response.blob();

      clearInterval(progressInterval);
      setProgress(100);
      await new Promise((r) => setTimeout(r, 200));

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `og-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      alert(t.alertDownload);
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  const handleCopyUrl = () => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (role) params.set("role", role);
    if (imageUrl) params.set("image", imageUrl);
    if (description) params.set("desc", description);
    if (noImage) params.set("noImage", "true");

    const fullUrl = `${
      window.location.origin
    }/api/og/generate?${params.toString()}`;
    navigator.clipboard.writeText(fullUrl);
    alert(t.alertCopy);
  };

  return (
    <Flex
      fillWidth
      className={`flex-col lg:flex-row ${inter.variable} font-sans`}
      style={{
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      {/* TitleManager lida com a tradução dinâmica do título da aba */}
      <TitleManager
        titlePt="Gerador OG | Admin"
        titleEn="OG Generator | Admin"
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Background
          gradient={{ display: true, opacity: 30, x: 100, y: 0 }}
          dots={{ display: true, opacity: 20 }}
        />
      </div>

      {/* Sidebar de Controles */}
      <Flex
        direction="column"
        padding="l"
        gap="l"
        border="neutral-medium"
        background="surface"
        className="w-full lg:w-[400px] h-auto lg:h-screen lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10 z-20 shadow-xl shrink-0 custom-scrollbar order-2 lg:order-1"
      >
        <Column gap="8">
          <Text variant="heading-strong-m">{t.pageTitle}</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {t.pageSubtitle}
          </Text>
        </Column>

        <Line background="neutral-alpha-medium" />

        <Column gap="m" fillWidth>
          <Input
            id="title"
            label={t.labelTitle}
            placeholder={t.placeholderTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="role"
            label={t.labelSubtitle}
            placeholder={t.placeholderSubtitle}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <Textarea
            id="description"
            label={t.labelDesc}
            placeholder={t.placeholderDesc}
            value={description}
            lines={3}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Toggle Hide Image */}
          <Flex
            padding="16"
            border={noImage ? "brand-medium" : "neutral-medium"}
            radius="m"
            style={{
              backgroundColor: noImage
                ? "var(--brand-alpha-weak)"
                : "var(--surface-background)",
              transition: "all 0.2s ease",
            }}
            align="center"
            horizontal="between"
            className="cursor-pointer hover:opacity-90"
            onClick={() => setNoImage(!noImage)}
          >
            <Text
              variant="label-default-s"
              onBackground={noImage ? "brand-strong" : "neutral-strong"}
            >
              {t.btnHide}
            </Text>
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                noImage
                  ? "bg-brand-medium border-brand-medium"
                  : "border-neutral-500"
              }`}
            >
              {noImage && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </Flex>

          <Column
            gap="4"
            style={{
              opacity: noImage ? 0.3 : 1,
              pointerEvents: noImage ? "none" : "auto",
              transition: "opacity 0.2s",
            }}
          >
            <Input
              id="image"
              label={t.labelUrl}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Text
              variant="body-default-xs"
              onBackground="neutral-weak"
              size="xs"
            >
              {t.helperUrl}
            </Text>
          </Column>
        </Column>

        <Flex fillHeight className="min-h-[2rem]" />

        <Column gap="s" paddingBottom="xl">
          {isDownloading && (
            <Column gap="4" marginBottom="16">
              <Flex fillWidth horizontal="between">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {t.statusGen}
                </Text>
                <Text variant="code-default-xs">{Math.round(progress)}%</Text>
              </Flex>
              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-medium transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </Column>
          )}

          <Button
            variant="primary"
            size="l"
            fillWidth
            onClick={handleDownload}
            disabled={isDownloading}
            loading={isDownloading}
          >
            {!isDownloading && (
              <Download size={18} style={{ marginRight: 8 }} />
            )}
            {isDownloading ? t.btnProcess : t.btnDownload}
          </Button>

          <Button
            variant="secondary"
            size="m"
            fillWidth
            onClick={handleCopyUrl}
          >
            <LinkIcon size={16} style={{ marginRight: 8 }} />
            {t.btnCopy}
          </Button>
        </Column>
      </Flex>

      {/* Preview Area */}
      <Flex
        flex={1}
        center
        align="center"
        padding="l"
        className="relative bg-[#030305] lg:h-screen lg:overflow-hidden min-h-[50vh] order-1 lg:order-2"
      >
        <Flex
          ref={availableSpaceRef}
          direction="column"
          align="center"
          center
          gap="24"
          className="z-10 w-full h-full"
        >
          {/* Visual Container */}
          <div
            className="relative rounded-2xl border border-white/10 shadow-2xl bg-black overflow-hidden group transition-all duration-300 ease-out"
            style={{
              width: 1920 * scale,
              height: 1080 * scale,
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                width: 1920,
                height: 1080,
                position: "absolute",
                top: 0,
                left: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                willChange: "transform",
              }}
            >
              <OGTemplate
                title={title}
                role={role}
                description={description}
                imageSrc={imageUrl}
                noImage={noImage}
              />
            </div>

            {/* LIVE Badge */}
            <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-[10px] lg:text-xs text-white/90 font-mono font-medium flex items-center gap-2 z-50 pointer-events-none shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-medium opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-strong"></span>
              </span>
              LIVE PREVIEW
            </div>
          </div>

          {/* Footer Info */}
          <Flex
            gap="16"
            align="center"
            className="bg-neutral-900/50 border border-white/5 px-4 py-2 lg:px-6 lg:py-3 rounded-full backdrop-blur-sm shadow-lg shrink-0"
          >
            <Flex align="center" gap="8">
              <Monitor size={14} className="text-neutral-400" />
              <Text variant="body-default-xs" onBackground="neutral-medium">
                {t.labelScale}:{" "}
                <span className="text-white font-mono">
                  {Math.round(scale * 100)}%
                </span>
              </Text>
            </Flex>
            <div className="w-px h-4 bg-white/10 hidden lg:block" />
            <Text
              variant="body-default-xs"
              onBackground="neutral-medium"
              className="hidden lg:block"
            >
              {t.labelDims}:{" "}
              <span className="text-white font-mono">1920 x 1080</span>
            </Text>
          </Flex>

          <Text
            variant="body-default-s"
            onBackground="neutral-weak"
            align="center"
            className="max-w-md text-center text-xs lg:text-sm px-4"
          >
            {t.footerText}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
