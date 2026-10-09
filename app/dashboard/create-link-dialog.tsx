"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createLinkAction } from "./actions";

export function CreateLinkDialog({ hotkey = false }: { hotkey?: boolean }) {
  const [open, setOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!hotkey) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "c") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      event.preventDefault();
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hotkey]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createLinkAction({ originalUrl, customSlug });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setOriginalUrl("");
      setCustomSlug("");
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setError(null);
        }
      }}
    >
      <DialogTrigger render={<Button />}>
        Create link
        {hotkey ? (
          <kbd className="ml-1 hidden rounded border border-primary-foreground/30 px-1.5 font-mono text-[10px] leading-4 font-medium opacity-70 sm:inline-block">
            C
          </kbd>
        ) : null}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a short link</DialogTitle>
          <DialogDescription>
            Paste a URL to generate a shortened link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="originalUrl">URL</Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com/very-long-url"
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customSlug">Custom slug (optional)</Label>
            <Input
              id="customSlug"
              type="text"
              placeholder="my-custom-slug"
              pattern="[A-Za-z0-9_-]+"
              maxLength={16}
              value={customSlug}
              onChange={(event) =>
                setCustomSlug(
                  event.target.value.replace(/[^A-Za-z0-9_-]/g, "")
                )
              }
            />
          </div>
          {error ? (
            <p
              className="animate-pop rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 aria-hidden="true" className="animate-spin" />
                  Creating…
                </>
              ) : (
                "Create link"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
