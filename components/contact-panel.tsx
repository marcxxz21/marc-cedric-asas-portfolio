"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChatCircleText,
  EnvelopeSimple,
  WarningCircle,
  X
} from "@phosphor-icons/react";
import { profile } from "@/lib/portfolio-data";

type FormState = "idle" | "loading" | "sent" | "error";

export function ContactPanel() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setState("error");
      return;
    }

    setState("loading");
    timer.current = setTimeout(() => {
      setState("sent");
    }, 720);
  }

  if (!open) {
    return (
      <button
        className="fixed bottom-5 right-5 inline-flex items-center gap-2 bg-ink px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accent active:-translate-y-px"
        onClick={() => setOpen(true)}
        type="button"
      >
        <ChatCircleText size={18} />
        Contact Marc
      </button>
    );
  }

  return (
    <aside className="fixed bottom-5 right-5 w-[calc(100vw-2.5rem)] max-w-sm border border-line bg-paper/92 p-4 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-paper/76">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <span className="relative flex size-7 items-center justify-center border border-ink/10 bg-white">
          <ChatCircleText size={17} weight="regular" />
          <span className="absolute -right-1 -top-1 size-2 animate-breathe rounded-full bg-accent" />
        </span>
        <span className="mr-auto">Contact Marc</span>
        <button
          aria-label="Close contact panel"
          className="inline-flex size-8 items-center justify-center border border-line bg-white text-ink transition hover:border-accent hover:text-accent active:-translate-y-px"
          onClick={() => setOpen(false)}
          type="button"
        >
          <X size={15} />
        </button>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-muted" htmlFor="contact-email">
            Your email
          </label>
          <input
            id="contact-email"
            className="w-full border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (state !== "idle") {
                setState("idle");
              }
            }}
          />
          <p className="text-xs text-muted">Share a return address for project notes, collaborations, or speaking invites.</p>
        </div>

        {state === "error" ? (
          <p className="flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            <WarningCircle size={15} />
            Enter a valid email before sending.
          </p>
        ) : null}

        {state === "sent" ? (
          <p className="border border-accent/20 bg-accent/10 px-3 py-2 text-xs text-accent">
            Thanks. Your message draft is ready for a direct follow-up.
          </p>
        ) : null}

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <button
            className="group inline-flex items-center justify-center gap-2 bg-ink px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent active:-translate-y-px disabled:cursor-wait disabled:opacity-70"
            disabled={state === "loading"}
            type="submit"
          >
            {state === "loading" ? (
              <span className="relative h-4 w-24 overflow-hidden bg-white/15">
                <span className="absolute inset-y-0 w-1/2 animate-scan bg-white/30" />
              </span>
            ) : (
              <>
                Start thread
                <ArrowRight className="transition group-hover:translate-x-0.5" size={15} />
              </>
            )}
          </button>
          <a
            aria-label="Send email"
            className="inline-flex size-10 items-center justify-center border border-line bg-white transition hover:border-accent hover:text-accent active:-translate-y-px"
            href={`mailto:${profile.email}`}
          >
            <EnvelopeSimple size={18} />
          </a>
        </div>
      </form>
    </aside>
  );
}
