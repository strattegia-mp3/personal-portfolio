"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import {
  Flex,
  Text,
  Button,
  Heading,
  Background,
  opacity,
  SpacingToken,
} from "@once-ui-system/core";
import { X, Trophy, Gamepad2 } from "lucide-react";
import confetti from "canvas-confetti";
import { effects } from "@/resources";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const KonamiCode = () => {
  const { currentLanguage } = useLanguage();
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    pt: {
      titlePrefix: "System Override:",
      titleSuffix: "Desbloqueado",
      description: (
        <>
          Você encontrou o código secreto!
          <br />
          Como um verdadeiro duelista, você sabe que o jogo só acaba quando o
          último ponto de vida chega a zero.
        </>
      ),
      close: "Fechar Protocolo",
    },
    en: {
      titlePrefix: "System Override:",
      titleSuffix: "Unlocked",
      description: (
        <>
          You found the secret code!
          <br />
          As a true duelist, you know the game isn't over until the last life
          point hits zero.
        </>
      ),
      close: "Close Protocol",
    },
  }[currentLanguage];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      setInputHistory((prev) => {
        const newHistory = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (JSON.stringify(newHistory) === JSON.stringify(KONAMI_CODE)) {
          triggerEasterEgg();
          return [];
        }
        return newHistory;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    setIsOpen(true);
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7C3AED", "#ffffff", "#000000"],
        zIndex: 10005,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="konami-overlay"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10000,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </div>

          {/* Animated Wrapper for Modal/Card */}
          <motion.div
            key="konami-modal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 350,
              mass: 1,
              delay: 0.1,
            }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Flex
              direction="column"
              align="center"
              padding="xl"
              border="brand-medium"
              radius="l"
              background="surface"
              gap="l"
              style={{
                maxWidth: "500px",
                width: "90%",
                textAlign: "center",
                boxShadow:
                  "0 0 120px rgba(124, 58, 237, 0.4), 0 0 30px rgba(124, 58, 237, 0.2)",
                pointerEvents: "auto",
              }}
            >
              <Flex
                padding="m"
                radius="full"
                background="brand-alpha-medium"
                style={{ marginBottom: "-1rem" }}
              >
                <Trophy size={48} className="text-white" />
              </Flex>

              <Heading variant="display-strong-s">
                {t.titlePrefix} <br />{" "}
                <span style={{ color: "var(--brand-solid-strong)" }}>
                  {t.titleSuffix}
                </span>
              </Heading>

              <Text variant="body-default-l" onBackground="neutral-medium">
                {t.description}
              </Text>

              <Flex
                padding="s"
                border="neutral-medium"
                radius="m"
                background="neutral-alpha-weak"
                gap="8"
                align="center"
                horizontal="center"
              >
                <Gamepad2 size={20} />
                <Text variant="code-default-s">↑ ↑ ↓ ↓ ← → ← → B A</Text>
              </Flex>

              <Button
                variant="primary"
                fillWidth
                size="l"
                onClick={handleClose}
                prefixIcon="close"
              >
                {t.close}
              </Button>
            </Flex>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
