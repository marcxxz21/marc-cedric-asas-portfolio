"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = storedTheme ?? preferredTheme;

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-8 w-12 items-center justify-center border border-line bg-white text-ink transition hover:border-accent hover:text-accent active:-translate-y-px"
      onClick={toggleTheme}
      type="button"
    >
      {theme === "dark" ? <Sun size={17} weight="regular" /> : <Moon size={17} weight="regular" />}
    </button>
  );
}
