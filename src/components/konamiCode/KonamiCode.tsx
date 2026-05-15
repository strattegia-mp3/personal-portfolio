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
import { Trophy, Gamepad2 } from "lucide-react";
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
        particleCount: 250,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#8B5CF6", "#FFD700", "#00E5FF", "#10B981", "#FF007F"],
        zIndex: 10005,
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const fluidEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="konami-overlay"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: fluidEase }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10000,
            // Overlay mais forte
            background:
              "radial-gradient(circle at center, rgba(40,10,80,0.85) 0%, rgba(5,0,15,0.98) 100%)",
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

          <motion.div
            key="konami-modal"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
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
              radius="l"
              gap="l"
              style={{
                maxWidth: "500px",
                width: "90%",
                textAlign: "center",
                backgroundColor: "#0D0415",
                border: "2px solid #8B5CF6",
                boxShadow:
                  "0 0 80px rgba(139, 92, 246, 0.5), 0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 40px rgba(139, 92, 246, 0.3)",
                pointerEvents: "auto",
              }}
            >
              <Flex
                padding="m"
                radius="full"
                style={{
                  marginBottom: "-1rem",
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.6) 0%, rgba(255,215,0,0.3) 100%)",
                  border: "2px solid rgba(255, 215, 0, 0.6)",
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)",
                }}
              >
                <Trophy
                  size={56}
                  color="#FFD700"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))",
                  }}
                />
              </Flex>

              <Heading variant="display-strong-s">
                <span
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 0 10px rgba(255,255,255,0.3)",
                  }}
                >
                  {t.titlePrefix}
                </span>{" "}
                <br />
                <span
                  style={{
                    color: "#FFD700",
                    textShadow:
                      "0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.3)",
                    letterSpacing: "2px",
                  }}
                >
                  {t.titleSuffix}
                </span>
              </Heading>

              <Text
                variant="body-default-l"
                style={{ color: "#E5E7EB", fontWeight: 500 }}
              >
                {t.description}
              </Text>

              <Flex
                padding="s"
                radius="m"
                gap="12"
                align="center"
                horizontal="center"
                style={{
                  background: "#05010A",
                  border: "1px solid #8B5CF6",
                  boxShadow:
                    "inset 0 0 15px rgba(139, 92, 246, 0.4), 0 0 15px rgba(139, 92, 246, 0.2)",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              >
                <Gamepad2
                  size={24}
                  color="#00E5FF"
                  style={{ filter: "drop-shadow(0 0 5px rgba(0,229,255,0.6))" }}
                />
                <Text
                  variant="code-default-m"
                  style={{
                    color: "#00E5FF",
                    textShadow: "0 0 10px rgba(0, 229, 255, 0.8)",
                  }}
                >
                  ↑ ↑ ↓ ↓ ← → ← → B A
                </Text>
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
