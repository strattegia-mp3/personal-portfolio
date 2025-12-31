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
import { useState, FormEvent } from "react";
import { mailchimp } from "@/resources";

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({
  ...flex
}) => {
  const { content, currentLanguage } = useLanguage();
  const { newsletter } = content;

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const i18n = {
    pt: {
      placeholderEmail: "Seu melhor e-mail",
      placeholderFirstName: "Nome",
      placeholderLastName: "Sobrenome",
      button: "Inscrever-se",
      buttonLoading: "Enviando...",
      errorInvalid: "Por favor, insira um e-mail válido.",
      errorDefault: "Ocorreu um erro ao inscrever-se.",
      successTitle: "Inscrição confirmada!",
      successMsg: "Verifique sua caixa de entrada.",
    },
    en: {
      placeholderEmail: "Email address",
      placeholderFirstName: "First Name",
      placeholderLastName: "Last Name",
      button: "Subscribe",
      buttonLoading: "Sending...",
      errorInvalid: "Please enter a valid email address.",
      errorDefault: "An error occurred while subscribing.",
      successTitle: "Subscription confirmed!",
      successMsg: "Please check your inbox.",
    },
  };
  const t = i18n[currentLanguage];

  const validateEmail = (email: string): boolean => {
    if (email === "") return true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus("error");
      setMessage(t.errorInvalid);
      return;
    }
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          language: currentLanguage,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t.errorDefault);

      setStatus("success");
      setMessage(t.successMsg);
      setEmail("");
      setFirstName("");
      setLastName("");
    } catch (error: any) {
      setStatus("error");
      const cleanMsg = (error.message || t.errorDefault).replace(
        /<[^>]*>?/gm,
        ""
      );
      if (cleanMsg.includes("Member already exists")) {
        setMessage(
          currentLanguage === "pt"
            ? "Este e-mail já está cadastrado."
            : "This email is already subscribed."
        );
      } else {
        setMessage(cleanMsg);
      }
    }
  };

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
            {message}
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
        >
          <Row fillWidth gap="12" s={{ direction: "column" }}>
            <Flex flex={1} fillWidth>
              <Input
                id="FNAME"
                name="FNAME"
                type="text"
                placeholder={t.placeholderFirstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={status === "loading"}
              />
            </Flex>
            <Flex flex={1} fillWidth>
              <Input
                id="LNAME"
                name="LNAME"
                type="text"
                placeholder={t.placeholderLastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={status === "loading"}
              />
            </Flex>
          </Row>

          <Input
            id="mce-EMAIL"
            name="EMAIL"
            type="email"
            placeholder={t.placeholderEmail}
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "loading"}
            errorMessage={status === "error" ? message : undefined}
          />

          <Button
            id="mc-embedded-subscribe"
            type="submit"
            size="m"
            fillWidth
            loading={status === "loading"}
            disabled={status === "loading"}
          >
            {status === "loading" ? t.buttonLoading : t.button}
          </Button>
        </Flex>
      )}
    </Column>
  );
};
