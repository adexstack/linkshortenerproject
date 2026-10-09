import Link from "next/link";
import { ArrowRight, Link2, MousePointer2, WandSparkles } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

import { HeroDemo } from "./hero-demo";

const features = [
  {
    icon: Link2,
    title: "Short links, instantly",
    description:
      "Turn long, unwieldy URLs into clean links that are easy to share anywhere.",
  },
  {
    icon: WandSparkles,
    title: "Simple by design",
    description:
      "Skip the clutter. Create and manage the links you need from one straightforward workspace.",
  },
  {
    icon: MousePointer2,
    title: "Ready for anywhere",
    description:
      "Keep your links neat in a message, a post, or wherever you connect with people.",
  },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
          href="/"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-300 ease-out-expo group-hover:rotate-[-8deg] group-hover:shadow-[0_0_24px_-2px_var(--primary)]">
            <Link2 aria-hidden="true" className="size-5" />
          </span>
          <span>Shortly</span>
        </Link>
        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <Link
            className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:inline-flex"
            href="#features"
          >
            Features
          </Link>
          <SignInButton mode="modal">
            <Button variant="ghost" size="lg">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="lg">Get started</Button>
          </SignUpButton>
        </nav>
      </header>

      <main className="relative z-10 flex-1">
        <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-14 sm:px-10 sm:pb-32 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-28">
          <div>
            <h1
              className="max-w-2xl animate-reveal text-5xl leading-[1.04] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
              style={delay(60)}
            >
              Big links, meet small links.
            </h1>
            <p
              className="mt-6 max-w-xl animate-reveal text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
              style={delay(180)}
            >
              Make long URLs short, clear, and ready to go. Keep the links you
              share in one simple place with Shortly.
            </p>
            <div
              className="mt-9 flex animate-reveal flex-col gap-3 sm:flex-row"
              style={delay(300)}
            >
              <SignUpButton mode="modal">
                <Button className="h-11 px-5 text-sm" size="lg">
                  Create your first link
                  <ArrowRight aria-hidden="true" />
                </Button>
              </SignUpButton>
              <Button
                className="h-11 px-5 text-sm"
                nativeButton={false}
                render={<Link href="#features" />}
                size="lg"
                variant="ghost"
              >
                See how it works
              </Button>
            </div>
            <p
              className="mt-6 animate-reveal text-sm text-muted-foreground"
              style={delay(400)}
            >
              Free to get started.
            </p>
          </div>

          <div
            className="mx-auto w-full max-w-lg animate-reveal lg:ml-auto"
            style={delay(280)}
          >
            <HeroDemo />
          </div>
        </section>

        <section className="border-y" id="features">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Every link has somewhere to go.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              A straightforward toolkit for making your links easier to use and
              easier to share.
            </p>
            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
              {features.map(({ description, icon: Icon, title }) => (
                <article
                  className="group md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
                  key={title}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-6 text-primary transition-transform duration-300 ease-out-expo group-hover:-translate-y-1"
                  />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-7 px-6 py-16 sm:flex-row sm:items-center sm:px-10 sm:py-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to make links a little lighter?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Get started and share something shorter.
            </p>
          </div>
          <SignUpButton mode="modal">
            <Button className="h-11 px-5 text-sm" size="lg">
              Get started
              <ArrowRight aria-hidden="true" />
            </Button>
          </SignUpButton>
        </section>
      </main>

      <footer className="relative z-10 border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <Link className="font-medium text-foreground/80" href="/">
            Shortly
          </Link>
          <p>Short links, made simple.</p>
        </div>
      </footer>
    </div>
  );
}
