# Authentication

All authentication in this app is handled by [Clerk](https://clerk.com) via `@clerk/nextjs`. Do not add another auth library, custom session/JWT handling, or a second identity provider.

## Route protection

- Auth runs in [proxy.ts](../proxy.ts) via `clerkMiddleware()` — this is Next.js 16's renamed middleware file. Do not add a `middleware.ts`; see the matcher config there for which paths Clerk runs on.
- `/dashboard` is a protected route: it must require a signed-in user. Protect it in [proxy.ts](../proxy.ts) with `auth.protect()` (or equivalent per-route check), not with client-side redirects alone.
- Signed-in users visiting the homepage (`/`, [app/page.tsx](../app/page.tsx)) must be redirected to `/dashboard`. Check auth state server-side (e.g. `auth()` from `@clerk/nextjs/server`) before rendering the signed-out marketing content.

## Sign in / sign up

- Sign in and sign up must always launch as a **modal**, never a redirect to a full page. Use `mode="modal"` on `<SignInButton>` / `<SignUpButton>` (see usage in [app/page.tsx](../app/page.tsx), which currently needs to be switched from `mode="redirect"`).
- The dedicated [app/sign-in/[[...sign-in]]/page.tsx](../app/sign-in/%5B%5B...sign-in%5D%5D/page.tsx) and [app/sign-up/[[...sign-up]]/page.tsx](../app/sign-up/%5B%5B...sign-up%5D%5D/page.tsx) catch-all routes exist only as fallback destinations for Clerk's internal navigation — don't link to them directly from UI; trigger auth via the modal buttons instead.

## Provider setup

- `ClerkProvider` wraps the whole app in [app/layout.tsx](../app/layout.tsx) with the shared `shadcn` appearance theme from `@clerk/ui/themes` — keep all Clerk-themed UI consistent with this theme rather than overriding styles per-component.
- Use Clerk's `<Show when="signed-in">` / `<Show when="signed-out">` components (see [app/page.tsx](../app/page.tsx)) to conditionally render UI based on auth state instead of hand-rolled `useUser()`/`useAuth()` checks where a declarative show/hide is sufficient.
