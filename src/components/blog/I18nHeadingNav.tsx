"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./I18nHeadingNav.module.scss";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function I18nHeadingNav() {
  const { currentLanguage } = useLanguage();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const intersectionRef = useRef<IntersectionObserver | null>(null);
  const isAutoScrolling = useRef(false);

  const scanHeadings = useCallback(() => {
    const article =
      document.querySelector("article") ?? document.querySelector("main");
    if (!article) return;

    const els = Array.from(
      article.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id]"),
    );
    const parsed: Heading[] = els
      .map((el) => ({
        id: el.id,
        text: el.textContent?.trim() ?? "",
        level: parseInt(el.tagName[1], 10),
      }))
      .filter((h) => h.id && h.text);

    setHeadings(parsed);

    intersectionRef.current?.disconnect();
    if (parsed.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Se estivermos fazendo scroll por clique, ignora o observador
        if (isAutoScrolling.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    intersectionRef.current = io;
  }, []);

  useEffect(() => {
    const t = setTimeout(scanHeadings, 100);
    const mo = new MutationObserver(scanHeadings);
    const target = document.querySelector("article") ?? document.body;
    mo.observe(target, { childList: true, subtree: true });
    return () => {
      clearTimeout(t);
      mo.disconnect();
      intersectionRef.current?.disconnect();
    };
  }, [scanHeadings, currentLanguage]);

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    isAutoScrolling.current = true;
    setActiveId(id);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
    }

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 800);
  };

  if (headings.length === 0) return null;

  return (
    <nav ref={navRef} className={styles.nav}>
      <p className={styles.label}>
        {currentLanguage === "pt" ? "Nesta página" : "On this page"}
      </p>
      <ul className={styles.list}>
        {headings.map((h) => (
          <li
            key={h.id}
            className={`${styles.item} ${activeId === h.id ? styles.activeItem : ""}`}
          >
            <a
              href={`#${h.id}`}
              className={`${styles.link} ${activeId === h.id ? styles.activeLink : ""}`}
              style={{ paddingLeft: `${(h.level - 2) * 12 + 16}px` }}
              onClick={(e) => handleLinkClick(e, h.id)}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
