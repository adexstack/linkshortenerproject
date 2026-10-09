"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export function CopyLinkButton({ shortCode }: { shortCode: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${shortCode}`
      );
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label={copied ? "Link copied" : "Copy short link"}
      onClick={handleCopy}
      className={copied ? "border-primary/50 text-primary" : undefined}
    >
      <span className="relative grid size-3.5 place-items-center">
        <Copy
          className={`absolute transition-all duration-200 ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
        />
        <Check
          className={`absolute transition-all duration-200 ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
        />
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </Button>
  );
}
