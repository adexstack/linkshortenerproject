"use client";

import { Loader2, Pencil } from "lucide-react";
import { useState, useTransition } from "react";

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

import { updateLinkAction } from "./actions";

export function EditLinkDialog({
  id,
  originalUrl,
  shortCode,
}: {
  id: number;
  originalUrl: string;
  shortCode: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(originalUrl);
  const [slug, setSlug] = useState(shortCode);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await updateLinkAction({
        id,
        originalUrl: value,
        shortCode: slug,
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          setValue(originalUrl);
          setSlug(shortCode);
        } else {
          setError(null);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button variant="outline" size="icon-sm" aria-label="Edit link" />
        }
      >
        <Pencil />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
          <DialogDescription>
            Update the destination URL for this short link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`originalUrl-${id}`}>URL</Label>
            <Input
              id={`originalUrl-${id}`}
              type="url"
              placeholder="https://example.com/very-long-url"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`shortCode-${id}`}>Slug</Label>
            <Input
              id={`shortCode-${id}`}
              type="text"
              placeholder="my-custom-slug"
              pattern="[A-Za-z0-9_-]+"
              maxLength={16}
              value={slug}
              onChange={(event) =>
                setSlug(event.target.value.replace(/[^A-Za-z0-9_-]/g, ""))
              }
              required
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
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
