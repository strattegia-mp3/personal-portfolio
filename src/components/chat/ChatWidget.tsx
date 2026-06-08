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

/* ─── Chips de Sugestões ──────────────────────────────── */
interface ChipsProps {
  onSelect: (q: string) => void;
  suggestions: string[];
}

const Chips = memo(function Chips({ onSelect, suggestions }: ChipsProps) {
  return (
    <div className={styles.chips} role="list" aria-label="Perguntas sugeridas">
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
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const { content } = useLanguage();
  const t = content.chat;

  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  // ── Swipe-to-dismiss (apenas no drag handle/header) ──────────────────
  const swipeStartY = useRef<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const isDraggingHandle = useRef(false);

  const handleDragStart = (e: React.TouchEvent) => {
    swipeStartY.current = e.touches[0].clientY;
    isDraggingHandle.current = true;
    setSwipeOffset(0);
  };

  const handleDragMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingHandle.current || swipeStartY.current === null) return;
    const diff = e.touches[0].clientY - swipeStartY.current;
    if (diff > 0) {
      // Só permite arrastar para baixo
      e.preventDefault();
      setSwipeOffset(diff);
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (swipeOffset > 100) {
      setOpen(false);
    }
    setSwipeOffset(0);
    swipeStartY.current = null;
    isDraggingHandle.current = false;
  }, [swipeOffset]);

  // ── Auto-dismiss tooltip após 5.5s ──
  useEffect(() => {
    const timer = setTimeout(() => setTooltipDismissed(true), 5500);
    return () => clearTimeout(timer);
  }, []);

  // ── Portal root ───────────────────────────────────────────────────────
  useEffect(() => {
    const rootNode = document.createElement("div");
    rootNode.id = "tori-chat-root";
    rootNode.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      z-index: 2147483647 !important;
      pointer-events: none !important;
    `;
    document.body.appendChild(rootNode);
    setPortalNode(rootNode);
    return () => {
      if (rootNode.parentNode) rootNode.parentNode.removeChild(rootNode);
    };
  }, []);

  // ── Sugestões aleatórias ao abrir ────────────────────────────────────
  useEffect(() => {
    if (open && t.suggestions) {
      const shuffled = [...t.suggestions].sort(() => 0.5 - Math.random());
      setCurrentSuggestions(shuffled.slice(0, 3));
    }
  }, [open, t.suggestions]);

  // ── Bloqueio de scroll da página quando o chat está aberto (mobile) ──
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ── Ajuste para teclado virtual no mobile ────────────────────────────
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const onViewportChange = () => {
      if (window.innerWidth > 768) {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
        return;
      }
      const kbHeight = window.innerHeight - vv.height - vv.offsetTop;
      const visible = kbHeight > 60;
      setKeyboardVisible(visible);
      setKeyboardHeight(visible ? Math.max(0, kbHeight) : 0);
    };

    vv.addEventListener("resize", onViewportChange, { passive: true });
    return () => vv.removeEventListener("resize", onViewportChange);
  }, []);

  // ── AI SDK ────────────────────────────────────────────────────────────
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
    onFinish: () =>
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }),
  });

  // ── Scroll para o fim quando mensagens mudam ──────────────────────────
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages, open]);

  // ── Focus no input ao abrir ───────────────────────────────────────────
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      if (!announced) setAnnounced(true);
      return () => clearTimeout(timer);
    }
  }, [open, announced]);

  // ── Fechar com Escape ──────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const sendSuggestion = useCallback(
    (q: string) => {
      setInput(q);
      setTimeout(() => inputRef.current?.form?.requestSubmit(), 50);
    },
    [setInput],
  );

  const handleOpen = useCallback(() => setOpen((v) => !v), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const isEmpty = messages.length === 0;

  // ── Estilos de swipe inline ────────────────────────────────────────────
  const panelStyle =
    swipeOffset > 0
      ? {
          transform: `translateY(${swipeOffset}px)`,
          transition: "none",
          opacity: Math.max(1 - swipeOffset / 300, 0.3),
        }
      : undefined;

  const backdropOpacity =
    swipeOffset > 0 ? Math.max(1 - swipeOffset / 250, 0) : undefined;

  if (!portalNode) return null;

  const chatContent = (
    <>
      {/* ── FAB Button ── */}
      <div
        className={`${styles.fabContainer} ${open ? styles.fabContainerHidden : ""}`}
        style={{ pointerEvents: "auto" }}
      >
        {!open && !tooltipDismissed && (
          <div className={styles.tooltipBubble}>{t.fabTooltip}</div>
        )}
        <button
          className={styles.fab}
          onClick={handleOpen}
          aria-label={open ? t.close : t.fab}
          aria-expanded={open}
          aria-controls="chat-panel"
          type="button"
        >
          <div className={styles.avatarWrapper}>
            <DogAvatar size="large" />
            <div className={styles.pulseDot} />
          </div>
        </button>
      </div>

      {/* ── Mobile Backdrop ── */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        style={{
          opacity: backdropOpacity,
          transition:
            swipeOffset > 0
              ? "none"
              : "opacity 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── Chat Panel ── */}
      <div
        id="chat-panel"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        style={{
          pointerEvents: open ? "auto" : "none",
          ...panelStyle,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        aria-hidden={!open}
        {...(!open && { inert: true })}
      >
        {/* Header com drag handle */}
        <div
          className={styles.header}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className={styles.dragHandle} aria-hidden="true" />
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
              onClick={handleClose}
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
          ref={messagesRef}
          className={styles.messages}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          style={{
            paddingBottom: keyboardVisible
              ? `calc(${keyboardHeight}px + 80px)`
              : undefined,
          }}
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
                className={`${styles.message} ${
                  m.role === "user" ? styles.user : styles.bot
                }`}
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
          <div ref={bottomRef} aria-hidden="true" />
        </div>

        {/* Input */}
        <div
          className={styles.inputWrapper}
          style={
            keyboardVisible
              ? { position: "relative", bottom: "auto" }
              : undefined
          }
        >
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
              enterKeyHint="send"
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
      </div>
    </>
  );

  return createPortal(chatContent, portalNode);
}
