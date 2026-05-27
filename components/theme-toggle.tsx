"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const ignoreClickRef = useRef(false);
  const startXRef = useRef(0);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = storedTheme ?? preferredTheme;

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function applyTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  }

  function toggleTheme() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  function getThemeFromPointer(clientX: number) {
    const rect = buttonRef.current?.getBoundingClientRect();

    if (!rect) {
      return theme;
    }

    return clientX - rect.left > rect.width / 2 ? "dark" : "light";
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    draggingRef.current = true;
    movedRef.current = false;
    startXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!draggingRef.current) {
      return;
    }

    if (Math.abs(event.clientX - startXRef.current) > 3) {
      movedRef.current = true;
      applyTheme(getThemeFromPointer(event.clientX));
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (!draggingRef.current) {
      return;
    }

    if (movedRef.current) {
      applyTheme(getThemeFromPointer(event.clientX));
      ignoreClickRef.current = true;
    }

    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleClick() {
    if (ignoreClickRef.current) {
      ignoreClickRef.current = false;
      return;
    }

    toggleTheme();
  }

  return (
    <button
      ref={buttonRef}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-checked={theme === "dark"}
      className="group relative inline-grid h-8 w-14 touch-none grid-cols-2 border border-line bg-line/70 p-0.5 text-ink transition hover:border-accent active:-translate-y-px"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="switch"
      type="button"
    >
      <span
        className={`absolute top-0.5 h-7 w-7 border border-line bg-white shadow-[0_6px_18px_-12px_rgba(24,24,23,0.55)] transition-transform duration-300 ease-out ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="relative z-[1] inline-flex items-center justify-center text-muted transition group-hover:text-accent">
        <Sun size={15} weight="regular" />
      </span>
      <span className="relative z-[1] inline-flex items-center justify-center text-muted transition group-hover:text-accent">
        <Moon size={15} weight="regular" />
      </span>
    </button>
  );
}
