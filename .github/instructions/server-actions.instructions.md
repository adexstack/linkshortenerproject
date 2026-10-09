---
name: Server Actions
description: Read this before implementing or modifying any data mutation (create/update/delete) in the app. Instructions for writing and calling Next.js Server Actions.
---

# Server Actions

All data mutations in this app go through Next.js Server Actions. Never mutate data from a Route Handler, a client-side `fetch` to an API route, or directly inside a Server Component.

## File location and naming

- Server action files **must** be named `actions.ts` and colocated in the same directory as the client component that calls them — e.g. a mutation used by [app/dashboard/page.tsx](../app/dashboard/page.tsx) belongs in `app/dashboard/actions.ts`, not in a shared top-level `actions/` folder.
- Every exported function in an `actions.ts` file must start with the `"use server"` directive (file-level, at the top).
- Server actions are only ever called from **client components** (`"use client"`). Do not call a server action directly from a Server Component — if a Server Component needs to trigger a mutation, it must render a client component that does.

## Input types

- Every server action parameter must have an explicit, specific TypeScript type (e.g. a plain object type/interface for the fields being submitted). **Never type a server action parameter as `FormData`.**
- If the caller is a `<form>`, extract and type the individual fields on the client before calling the action — don't pass the raw `FormData` through.

## Validation

- Every server action must validate its input with [Zod](https://zod.dev) before doing anything else. Define a `zod` schema per action (or per input shape) and call `.parse()`/`.safeParse()` on the incoming data as the first step in the function body.
- Add `zod` as a dependency before using it (not yet installed — see [package.json](../package.json)).
- On validation failure, return an error result to the client rather than throwing — don't let a Zod error surface as an unhandled exception.

## Auth check

- Every server action must check for a signed-in user **before** any database operation, using `auth()` from `@clerk/nextjs/server` (same pattern as [app/dashboard/page.tsx](../app/dashboard/page.tsx)). If there's no `userId`, return early with an error — do not proceed to call a data helper.
- See [.github/instructions/authentication.instructions.md](./authentication.instructions.md) for the project's broader Clerk conventions.

## Database access

- Server actions must **never** call Drizzle (`db.insert`, `db.update`, `db.delete`, etc.) directly. All database operations go through helper functions in the [/data](../data) directory, following the same pattern as the read helpers (e.g. [data/links.ts](../data/links.ts)).
- Add a helper function per mutation (e.g. `createLink`, `deleteLink`) to the relevant file in `/data`, and have the server action call that helper instead of building queries inline.
- See [.github/instructions/data-fetching.instructions.md](./data-fetching.instructions.md) for the existing `/data` helper conventions this extends to writes.

## Summary Checklist

- [ ] Server action files must be named `actions.ts` and colocated with the client component that calls them.
- [ ] Every exported function in an `actions.ts` file must start with the `"use server"` directive.
- [ ] Server actions are only called from client components.
- [ ] Every server action parameter must have an explicit TypeScript type.
- [ ] Input must be validated with Zod before any other logic.
- [ ] Every server action must check for a signed-in user before any database operation with `auth()` from `@clerk/nextjs/server`.
- [ ] Server actions must never call Drizzle directly; use helper functions in `/data` instead.
- [ ] Uses helper functions in `/data` for all database operations.
- [ ] Uses explicit Typescript types (NOT FormData objects) for all server action parameters.