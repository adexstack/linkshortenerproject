"use client";

import { ArrowDown, Check, Link2 } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const DOMAIN = "shortly.link/";

const samples = [
  {
    long: "https://www.example.com/guides/2026/10/how-to-plan-a-perfect-weekend-away?utm_source=newsletter&utm_medium=email&utm_campaign=autumn",
    slug: "weekend",
  },
  {
    long: "https://docs.example.org/projects/launch-checklist/final-review/shared-with-the-whole-team#section-4",
    slug: "launch",
  },
  {
    long: "https://store.example.net/collections/new-arrivals/products/limited-edition-poster?variant=48210937&ref=social",
    slug: "poster",
  },
];

type Phase = "typing" | "shortening" | "done";
type State = { index: number; typed: number; phase: Phase };

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

export function HeroDemo() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<State>({
    index: 0,
    typed: 0,
    phase: "typing",
  });

  useEffect(() => {
    if (reduced) return;
    const { long } = samples[state.index];
    let delay: number;
    let next: State;

    if (state.phase === "typing") {
      if (state.typed < long.length) {
        delay = 24;
        next = { ...state, typed: Math.min(state.typed + 3, long.length) };
      } else {
        delay = 450;
        next = { ...state, phase: "shortening" };
      }
    } else if (state.phase === "shortening") {
      delay = 750;
      next = { ...state, phase: "done" };
    } else {
      delay = 3200;
      next = {
        index: (state.index + 1) % samples.length,
        typed: 0,
        phase: "typing",
      };
    }

    const timer = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timer);
  }, [state, reduced]);

  const view: State = reduced
    ? { index: 0, typed: samples[0].long.length, phase: "done" }
    : state;
  const sample = samples[view.index];
  const shortUrl = `${DOMAIN}${sample.slug}`;
  const done = view.phase === "done";
  const shortening = view.phase === "shortening";

  return (
    <div className="relative w-full max-w-lg">
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-[1.4rem] bg-linear-to-br from-primary/40 via-border to-origin/30 opacity-70 blur-[1px]"
      />
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative rounded-3xl bg-card p-5 shadow-2xl shadow-black/40 sm:p-6">
        <p className="sr-only">
          Demo: a long link is pasted and becomes {shortUrl}.
        </p>

        <div aria-hidden="true">
          <div className="rounded-xl border border-input bg-background/60 p-4">
            <p className="h-[5.25rem] overflow-hidden break-all font-mono text-[13px] leading-[1.35rem] text-origin sm:h-[5.5rem]">
              {sample.long.slice(0, view.typed)}
              {view.phase === "typing" ? (
                <span className="ml-px inline-block h-4 w-[2px] translate-y-0.5 animate-caret bg-primary" />
              ) : null}
            </p>
          </div>

          <div className="relative my-3 flex h-8 items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px overflow-hidden bg-border">
              {shortening ? (
                <div className="h-full w-1/3 animate-scan bg-primary shadow-[0_0_12px_var(--primary)]" />
              ) : null}
            </div>
            <span
              className={`relative grid size-8 place-items-center rounded-full border bg-card transition-colors duration-300 ${
                done
                  ? "border-primary/60 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {done ? (
                <Check className="size-4" />
              ) : (
                <ArrowDown className="size-4" />
              )}
            </span>
          </div>

          <div
            className={`rounded-xl border p-4 transition-colors duration-500 ${
              done
                ? "border-primary/40 bg-primary/8"
                : "border-border bg-background/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-500 ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Link2 className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                {done ? (
                  <p
                    key={`${view.index}-${view.phase}`}
                    className="animate-pop truncate font-mono text-base text-primary sm:text-lg"
                  >
                    {shortUrl}
                  </p>
                ) : (
                  <p className="truncate font-mono text-base text-muted-foreground/50 sm:text-lg">
                    {DOMAIN}
                    <span className="inline-block h-3 w-16 translate-y-0.5 rounded-sm bg-muted" />
                  </p>
                )}
              </div>
            </div>
          </div>

          <p className="mt-4 h-4 text-xs text-muted-foreground tabular-nums">
            {done
              ? `${sample.long.length} characters down to ${shortUrl.length}`
              : " "}
          </p>
        </div>
      </div>
    </div>
  );
}
