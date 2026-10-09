# Agent Instructions

Coding standards for this project (a Next.js link shortener on Neon + Drizzle + Clerk). This file is the entry point — keep it short and link out rather than duplicating detail.

## Non-negotiables

- Never commit secrets or print `.env.local` values. `CLERK_SECRET_KEY` and `DATABASE_URL*` are server-only.
- Schema changes go through Drizzle Kit (`npm run db:generate` → `npm run db:migrate`); never hand-edit generated SQL in [drizzle/](./drizzle) or the DB directly.
- Use the shared `db` client from [src/db/index.ts](./src/db/index.ts); never create a second Drizzle client.
- Auth/routing protection lives in [proxy.ts](./proxy.ts) (Next.js 16's renamed middleware file) — don't add a `middleware.ts`.
- Validate and parameterize all external input before it reaches a DB query; never interpolate user input into SQL.
- Run `npm run lint` and ensure `tsc`/strict typing pass before considering a change done.
- Keep changes scoped to what's requested — no speculative abstractions, no unrelated reformatting.

## Commands

- `npm run dev` — start the dev server.
- `npm run lint` — ESLint (flat config, `eslint-config-next`).
- `npm run db:generate` / `npm run db:migrate` — Drizzle schema migrations.
- `npm run build` — production build.
