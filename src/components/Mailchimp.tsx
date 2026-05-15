"use client";

import { useLanguage } from "@/components/LanguageContext";
import {
  Button,
  Heading,
  Input,
  Text,
  Background,
  Column,
  Row,
  Flex,
  opacity,
  SpacingToken,
} from "@once-ui-system/core";
import { useState, useCallback, FormEvent, useId } from "react";
import { mailchimp } from "@/resources";

/* ─── i18n strings ───────────────────────────────────────── */
const i18n = {
  pt: {
    emailPlaceholder: "Seu melhor e-mail",
    firstNamePlaceholder: "Nome",
    lastNamePlaceholder: "Sobrenome",
    button: "Inscrever-se",
    buttonLoading: "Enviando…",
    successTitle: "Confirme seu e-mail! 🎉",
    successMsg:
      "Enviamos um link de confirmação. Verifique sua caixa de entrada (e o spam).",
    errorInvalid: "Insira um e-mail válido.",
    errorAlready: "Este e-mail já está inscrito.",
    errorForgotten:
      "Este e-mail foi removido anteriormente e não pode ser readicionado por aqui. Use outro e-mail.",
    errorProvider: "Serviço temporariamente indisponível. Tente novamente.",
    errorDefault: "Ocorreu um erro. Tente novamente.",
  },
  en: {
    emailPlaceholder: "Your best email",
    firstNamePlaceholder: "First name",
    lastNamePlaceholder: "Last name",
    button: "Subscribe",
    buttonLoading: "Sending…",
    successTitle: "Check your inbox! 🎉",
    successMsg:
      "We sent a confirmation link. Check your inbox (and spam folder).",
    errorInvalid: "Please enter a valid email address.",
    errorAlready: "This email is already subscribed.",
    errorForgotten:
      "This email was permanently deleted and cannot be re-added here. Please use another email.",
    errorProvider: "Service temporarily unavailable. Please try again.",
    errorDefault: "Something went wrong. Please try again.",
  },
} as const;

type Status = "idle" | "loading" | "success" | "error";

/* ─── Component ────────────────────────────────────────────── */
export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({
  ...flex
}) => {
  const { content, currentLanguage } = useLanguage();
  const { newsletter } = content;
  const t = i18n[currentLanguage];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Accessibility: unique IDs per instance
  const id = useId();

  const setError = useCallback((msg: string) => {
    setStatus("error");
    setErrorMsg(msg);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const trimmedEmail = email.trim();
      if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return setError(t.errorInvalid);
      }

      setStatus("loading");
      setErrorMsg("");

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmedEmail,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            language: currentLanguage,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          setStatus("success");
          setEmail("");
          setFirstName("");
          setLastName("");
          return;
        }

        switch (data.error) {
          case "already_subscribed":
            return setError(t.errorAlready);
          case "invalid_email":
            return setError(t.errorInvalid);
          case "forgotten_email": // CORREÇÃO: Captura do novo erro
            return setError(t.errorForgotten);
          case "provider_error":
          case "not_configured":
            return setError(t.errorProvider);
          default:
            return setError(t.errorDefault);
        }
      } catch {
        setError(t.errorProvider);
      }
    },
    [email, firstName, lastName, currentLanguage, t, setError],
  );

  if (newsletter.display === false) return null;

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />

      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {newsletter.title}
        </Heading>
        <Text
          wrap="balance"
          marginBottom="l"
          variant="body-default-l"
          onBackground="neutral-weak"
        >
          {newsletter.description}
        </Text>
      </Column>

      {status === "success" ? (
        <Flex
          fillWidth
          maxWidth={24}
          direction="column"
          align="center"
          padding="s"
          background="success-alpha-weak"
          radius="m"
          border="success-alpha-medium"
          gap="4"
        >
          <Text
            variant="heading-strong-xs"
            onBackground="success-strong"
            align="center"
          >
            {t.successTitle}
          </Text>
          <Text
            variant="body-default-s"
            onBackground="success-medium"
            align="center"
          >
            {t.successMsg}
          </Text>
        </Flex>
      ) : (
        <Flex
          as="form"
          fillWidth
          maxWidth={24}
          direction="column"
          gap="12"
          onSubmit={handleSubmit}
          horizontal="center"
          aria-label={
            currentLanguage === "pt"
              ? "Formulário de newsletter"
              : "Newsletter form"
          }
        >
          <Row fillWidth gap="12" s={{ direction: "column" }}>
            <Flex flex={1} fillWidth>
              <Input
                id={`${id}-fname`}
                name="FNAME"
                type="text"
                autoComplete="given-name"
                placeholder={t.firstNamePlaceholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={status === "loading"}
              />
            </Flex>
            <Flex flex={1} fillWidth>
              <Input
                id={`${id}-lname`}
                name="LNAME"
                type="text"
                autoComplete="family-name"
                placeholder={t.lastNamePlaceholder}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={status === "loading"}
              />
            </Flex>
          </Row>

          <Input
            id={`${id}-email`}
            name="EMAIL"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t.emailPlaceholder}
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setErrorMsg("");
              }
            }}
            disabled={status === "loading"}
            errorMessage={status === "error" ? errorMsg : undefined}
          />

          <Button
            type="submit"
            size="m"
            fillWidth
            loading={status === "loading"}
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? t.buttonLoading : t.button}
          </Button>
        </Flex>
      )}
    </Column>
  );
};
