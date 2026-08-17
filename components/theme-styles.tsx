"use client";

import { useEffect, useState } from "react";
import { getActiveTheme, type ThemeConfig } from "@/lib/theme";
import themesData from "@/data/themes.json";

export function ThemeStyles() {
  const [theme, setTheme] = useState<ThemeConfig["default"] | null>(null);

  useEffect(() => {
    setTheme(getActiveTheme(themesData as ThemeConfig));
  }, []);

  if (!theme) return null;

  return (
    <style>{`
      :root {
        --color-primary: ${theme.colors.primary};
        --color-primary-dark: ${theme.colors.primaryDark};
        --color-secondary: ${theme.colors.secondary};
        --color-accent: ${theme.colors.accent};
        --font-heading: ${theme.fonts.heading}, ui-sans-serif, system-ui, sans-serif;
        --font-body: ${theme.fonts.body}, ui-sans-serif, system-ui, sans-serif;
      }
    `}</style>
  );
}

