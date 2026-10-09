import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Link2 } from "lucide-react";

import { getLinksByUserId } from "@/data/links";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CopyLinkButton } from "./copy-link-button";
import { CreateLinkDialog } from "./create-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();

  const links = userId ? await getLinksByUserId(userId) : [];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link
            className="group flex items-center gap-2.5 font-semibold tracking-tight"
            href="/dashboard"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-300 ease-out-expo group-hover:rotate-[-8deg] group-hover:shadow-[0_0_24px_-2px_var(--primary)]">
              <Link2 aria-hidden="true" className="size-4" />
            </span>
            Shortly
          </Link>
          <div className="flex items-center gap-3">
            <CreateLinkDialog hotkey />
            <UserButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="animate-reveal">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your links
          </h1>
          <p className="mt-2 text-sm text-muted-foreground tabular-nums">
            {links.length === 0
              ? "Nothing here yet."
              : `${links.length} short ${links.length === 1 ? "link" : "links"}`}
          </p>
        </div>

        <div
          className="mt-8 animate-reveal overflow-hidden rounded-2xl border bg-card/60 shadow-2xl shadow-black/20 backdrop-blur-sm"
          style={{ animationDelay: "120ms" }}
        >
          {links.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-20 text-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Link2 aria-hidden="true" className="size-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold tracking-tight">
                Create your first short link
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Paste any long URL and get a short one you can share right
                away.
              </p>
              <div className="mt-6">
                <CreateLinkDialog />
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5">Short code</TableHead>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link, index) => (
                  <TableRow
                    className="animate-row-in transition-colors duration-200 hover:bg-primary/5"
                    key={link.id}
                    style={{ animationDelay: `${200 + index * 55}ms` }}
                  >
                    <TableCell className="pl-5 font-mono font-medium text-primary">
                      {link.shortCode}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-origin sm:max-w-md">
                      {link.originalUrl}
                    </TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {link.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="pr-5">
                      <div className="flex justify-end gap-2">
                        <CopyLinkButton shortCode={link.shortCode} />
                        <EditLinkDialog
                          id={link.id}
                          originalUrl={link.originalUrl}
                          shortCode={link.shortCode}
                        />
                        <DeleteLinkDialog
                          id={link.id}
                          shortCode={link.shortCode}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
