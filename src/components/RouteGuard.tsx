"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import {
  Flex,
  Spinner,
  Button,
  Heading,
  Column,
  PasswordInput,
} from "@once-ui-system/core";
import NotFound from "@/app/not-found";
import { useLanguage } from "@/components/LanguageContext";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const { currentLanguage } = useLanguage();
  const t = {
    pt: {
      title: "Esta página é protegida por senha",
      label: "Senha",
      button: "Entrar",
      error: "Senha incorreta",
    },
    en: {
      title: "This page is password protected",
      label: "Password",
      button: "Submit",
      error: "Incorrect password",
    },
  }[currentLanguage];

  useEffect(() => {
    const performChecks = async () => {
      if (
        isAuthenticated &&
        protectedRoutes[pathname as keyof typeof protectedRoutes]
      ) {
        setIsRouteEnabled(true);
        return;
      }

      setLoading(true);
      setError(undefined);

      const isDynamicRoute = ["/blog", "/work"].some((route) =>
        pathname?.startsWith(route)
      );
      const routeExists =
        pathname in routes ||
        (isDynamicRoute &&
          routes[pathname as keyof typeof routes] !== undefined);

      const isValid = pathname in routes || isDynamicRoute;

      setIsRouteEnabled(isValid);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        try {
          const response = await fetch("/api/check-auth");
          if (response.ok) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Auth check failed", error);
        }
      }
      setLoading(false);
    };

    performChecks();
  }, [pathname, isAuthenticated]);

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setError(undefined);
      } else {
        setError(t.error);
      }
    } catch {
      setError(t.error);
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) return <NotFound />;

  if (
    protectedRoutes[pathname as keyof typeof protectedRoutes] &&
    !isAuthenticated
  ) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          {t.title}
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label={t.label}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>{t.button}</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
