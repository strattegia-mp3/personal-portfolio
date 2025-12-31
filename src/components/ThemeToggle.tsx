"use client";

import React, { useEffect, useState } from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";
import { useLanguage } from "@/components/LanguageContext";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "light"
    );
  }, []);

  useEffect(() => {
    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "light"
    );
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  const label =
    currentLanguage === "pt"
      ? `Alterar para modo ${nextTheme === "dark" ? "escuro" : "claro"}`
      : `Switch to ${nextTheme} mode`;

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
    />
  );
};
