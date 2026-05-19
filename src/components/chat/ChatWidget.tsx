"use client";

import { useEffect, useRef, useState, useCallback, useId, memo } from "react";
import { createPortal } from "react-dom";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import styles from "./ChatWidget.module.scss";
import { useLanguage } from "@/components/LanguageContext";

/* ─── Avatar do Cachorrinho Flutuante 🐶 ───────────────────────── */
const DogAvatar = memo(function DogAvatar({
  size = "small",
  animated = true,
}: {
  size?: "small" | "header" | "large";
  animated?: boolean;
}) {
  let sizeClass = styles.avatarSmall;
  if (size === "large") sizeClass = styles.avatarLarge;
  if (size === "header") sizeClass = styles.avatarHeader;

  return (
    <div className={`${styles.dogAvatarContainer} ${sizeClass}`} aria-hidden>
      <span className={animated ? styles.floatingDog : styles.staticDog}>
        🐶
      </span>
    </div>
  );
});

/* ─── Typing indicator ───────────────────────────────────────────────── */
const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div
      className={`${styles.message} ${styles.bot}`}
      aria-live="polite"
      aria-label="Tori está digitando"
    >
      <DogAvatar size="small" animated={false} />
      <div className={styles.bubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
});

/* ─── Sugestões Dinâmicas ──────────────────────────────── */
interface ChipsProps {
  onSelect: (q: string) => void;
  suggestions: string[];
}

const Chips = memo(function Chips({ onSelect, suggestions }: ChipsProps) {
  return (
    <div className={styles.chips} role="list" aria-label="Suggested questions">
      {suggestions.map((q) => (
        <button
          key={q}
          role="listitem"
          className={styles.chip}
          onClick={() => onSelect(q)}
          type="button"
        >
          {q}
        </button>
      ))}
    </div>
  );
});

/* ─── Main ChatWidget ────────────────────────────────────────────────── */
export default function ChatWidget() {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [announced, setAnnounced] = useState(false);


  const { content } = useLanguage();
  const t = content.chat;

  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const [startY, setStartY] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > 0) {
      setSwipeOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (swipeOffset > 100) {
      setOpen(false);
    }
    setSwipeOffset(0);
    setStartY(null);
  };

  useEffect(() => {
    const rootNode = document.createElement("div");
    rootNode.id = "tori-chat-ultimate-root";

    rootNode.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 2147483647 !important;
      pointer-events: none !important;
    `;

    document.body.appendChild(rootNode);
    setPortalNode(rootNode);

    return () => {
      if (rootNode.parentNode) {
        rootNode.parentNode.removeChild(rootNode);
      }
    };
  }, []);

  // Sugestões Dinâmicas
  useEffect(() => {
    if (open && t.suggestions) {
      const pool = t.suggestions;
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      setCurrentSuggestions(shuffled.slice(0, 3));
    }
  }, [open, t.suggestions]);

  // Block Scroll para Chat Vazio
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !open) return;

    const preventUnwantedScroll = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const messagesDiv = panel.querySelector('[role="log"]');
      if (messagesDiv && messagesDiv.contains(target)) {
        if (messagesDiv.scrollHeight <= messagesDiv.clientHeight) {
          e.preventDefault();
        }
        return;
      }

      e.preventDefault();
    };

    panel.addEventListener("wheel", preventUnwantedScroll, { passive: false });
    panel.addEventListener("touchmove", preventUnwantedScroll, {
      passive: false,
    });

    return () => {
      panel.removeEventListener("wheel", preventUnwantedScroll);
      panel.removeEventListener("touchmove", preventUnwantedScroll);
    };
  }, [open]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
  } = useChat({
    api: "/api/chat",
    onError: (err) => console.error("Erro do AI SDK:", err.message),
    onFinish: () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
  });

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
      if (!announced) setAnnounced(true);
    }
  }, [open, announced]);

  const sendSuggestion = useCallback(
    (q: string) => {
      setInput(q);
      setTimeout(() => inputRef.current?.form?.requestSubmit(), 50);
    },
    [setInput],
  );

  const isEmpty = messages.length === 0;

  if (!portalNode) return null;

  const chatContent = (
    <>
      <div
        className={`${styles.fabContainer} ${open ? styles.fabContainerOpen : ""}`}
        style={{ pointerEvents: "auto" }}
      >
        {!open && <div className={styles.tooltipBubble}>{t.fabTooltip}</div>}
        <button
          className={`${styles.fab} ${open ? styles.fabOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.close : t.fab}
          aria-expanded={open}
          aria-controls="chat-panel"
          type="button"
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <div className={styles.avatarWrapper}>
              <DogAvatar size="large" />
              <div className={styles.pulseDot}></div>
            </div>
          )}
        </button>
      </div>

      {/* ── Chat Panel ── */}
      <div
        id="chat-panel"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        style={{
          pointerEvents: "auto",
          transform:
            swipeOffset > 0 ? `translateY(${swipeOffset}px)` : undefined,
          opacity:
            swipeOffset > 0 ? Math.max(1 - swipeOffset / 250, 0.4) : undefined,
          transition:
            swipeOffset > 0
              ? "none"
              : "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        aria-hidden={!open}
        {...(!open && { inert: true })}
      >
        {/* Header */}
        <div
          className={styles.header}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.dragHandle} />
          <div className={styles.headerInner}>
            <div className={styles.headerInfo}>
              <div className={styles.headerAvatar} aria-hidden>
                <DogAvatar size="header" animated={false} />
                <span className={styles.onlineDot} aria-hidden />
              </div>
              <div>
                <p id={labelId} className={styles.headerTitle}>
                  {t.title}
                </p>
                <p className={styles.headerSub}>{t.subtitle}</p>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label={t.close}
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className={styles.messages}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {isEmpty ? (
            <>
              <div className={styles.welcome}>
                <div className={styles.welcomeAvatar} aria-hidden>
                  <DogAvatar size="large" />
                </div>
                <p className={styles.welcomeTitle}>{t.welcomeTitle}</p>
                <p className={styles.welcomeSubtitle}>{t.welcomeSubtitle}</p>
              </div>
              <Chips
                onSelect={sendSuggestion}
                suggestions={currentSuggestions}
              />
            </>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.message} ${m.role === "user" ? styles.user : styles.bot}`}
              >
                {m.role === "assistant" && (
                  <DogAvatar size="small" animated={false} />
                )}
                <div className={styles.bubble}>
                  <div className={styles.markdown}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}

          {isLoading && <TypingIndicator />}
          {error && (
            <div className={`${styles.message} ${styles.bot}`}>
              <DogAvatar size="small" animated={false} />
              <div className={`${styles.bubble} ${styles.errorBubble}`}>
                {t.error}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form className={styles.inputRow} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={handleInputChange}
            placeholder={t.placeholder}
            disabled={isLoading}
            maxLength={500}
            autoComplete="off"
            spellCheck="false"
          />
          <button
            className={styles.sendBtn}
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label={t.send}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <p className={styles.disclaimer}>{t.poweredBy}</p>
      </div>
    </>
  );

  return createPortal(chatContent, portalNode);
}
