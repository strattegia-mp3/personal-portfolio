"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./CommandPalette.module.scss";

interface SearchItem {
  type: "post" | "project";
  slug: string;
  title: string;
  summary: string;
  tag?: string;
  href: string;
}

interface CommandPaletteProps {
  posts: SearchItem[];
  projects: SearchItem[];
}

export function CommandPalette({ posts, projects }: CommandPaletteProps) {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const t =
    currentLanguage === "pt"
      ? {
          placeholder: "Buscar posts, projetos…",
          noResults: "Nenhum resultado encontrado.",
          hint: "navegar",
          enter: "abrir",
          esc: "fechar",
          posts: "Artigos",
          projects: "Projetos",
        }
      : {
          placeholder: "Search posts, projects…",
          noResults: "No results found.",
          hint: "navigate",
          enter: "open",
          esc: "close",
          posts: "Posts",
          projects: "Projects",
        };

  // Detecta plataforma e confirma montagem no cliente
  useEffect(() => {
    setIsMac(navigator.userAgent.toUpperCase().indexOf("MAC") >= 0);
    setMounted(true);
  }, []);

  const allItems = useMemo(() => [...posts, ...projects], [posts, projects]);

  const fuse = useMemo(
    () =>
      new Fuse(allItems, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "summary", weight: 0.3 },
          { name: "tag", weight: 0.1 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [allItems],
  );

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    return fuse
      .search(query)
      .map((r) => r.item)
      .slice(0, 10);
  }, [query, fuse, allItems]);

  // ── Listener único para ⌘K / Ctrl+K e open-search ──────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onCustomOpen() {
      setOpen((prev) => !prev);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onCustomOpen);
    };
  }, []); // array vazio — listeners registrados uma vez, nunca desmontam

  // ── Foca o input e limpa a query ao abrir ────────────────────────────
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // ── Navegação por teclado dentro da lista ───────────────────────────
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIdx]) {
        router.push(results[activeIdx].href);
        setOpen(false);
      }
    },
    [results, activeIdx, router],
  );

  // ── Scroll do item ativo para dentro da viewport ─────────────────────
  useEffect(() => {
    const el = listRef.current?.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const postResults = results.filter((r) => r.type === "post");
  const projectResults = results.filter((r) => r.type === "project");

  const shortcut = isMac ? "⌘K" : "Ctrl K";

  const palette = (
    <div
      className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      aria-hidden={!open}
      {...(!open && { inert: true })}
    >
      <div className={styles.panel}>
        {/* Input */}
        <div className={styles.inputRow}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className={styles.searchIcon}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder={t.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              className={styles.clearBtn}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear"
            >
              ×
            </button>
          )}
          <kbd className={styles.escKbd} onClick={() => setOpen(false)}>
            Esc
          </kbd>
        </div>

        {/* Results */}
        <ul ref={listRef} className={styles.results} role="listbox">
          {results.length === 0 && (
            <li className={styles.empty}>{t.noResults}</li>
          )}

          {postResults.length > 0 && (
            <>
              <li className={styles.groupLabel} role="presentation">
                {t.posts}
              </li>
              {postResults.map((item) => {
                const idx = results.indexOf(item);
                return (
                  <ResultItem
                    key={item.href}
                    item={item}
                    active={idx === activeIdx}
                    onHover={() => setActiveIdx(idx)}
                    onSelect={() => {
                      router.push(item.href);
                      setOpen(false);
                    }}
                  />
                );
              })}
            </>
          )}

          {projectResults.length > 0 && (
            <>
              <li className={styles.groupLabel} role="presentation">
                {t.projects}
              </li>
              {projectResults.map((item) => {
                const idx = results.indexOf(item);
                return (
                  <ResultItem
                    key={item.href}
                    item={item}
                    active={idx === activeIdx}
                    onHover={() => setActiveIdx(idx)}
                    onSelect={() => {
                      router.push(item.href);
                      setOpen(false);
                    }}
                  />
                );
              })}
            </>
          )}
        </ul>

        {/* Footer hints */}
        <div className={styles.footer}>
          <span>
            <kbd>↑↓</kbd> {t.hint}
          </span>
          <span>
            <kbd>↵</kbd> {t.enter}
          </span>
          <span>
            <kbd>Esc</kbd> {t.esc}
          </span>
          <span className={styles.shortcutHint}>{shortcut}</span>
        </div>
      </div>
    </div>
  );

  // Renderiza via portal no body para evitar problemas de z-index/overflow
  if (!mounted) return null;
  return createPortal(palette, document.body);
}

function ResultItem({
  item,
  active,
  onHover,
  onSelect,
}: {
  item: SearchItem;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <li
      className={`${styles.item} ${active ? styles.itemActive : ""}`}
      role="option"
      aria-selected={active}
      onMouseEnter={onHover}
      onClick={onSelect}
    >
      <span className={styles.itemIcon} aria-hidden="true">
        {item.type === "post" ? "✦" : "◆"}
      </span>
      <span className={styles.itemContent}>
        <span className={styles.itemTitle}>{item.title}</span>
        {item.tag && <span className={styles.itemTag}>{item.tag}</span>}
      </span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={styles.itemArrow}
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </li>
  );
}
