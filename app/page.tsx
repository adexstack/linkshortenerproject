import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Link2, MousePointer2, WandSparkles } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Link2,
    title: "Short links, instantly!",
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

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#10120f] text-white">
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link className="flex items-center gap-2.5 font-semibold tracking-tight" href="/">
          <span className="flex size-9 items-center justify-center rounded-xl bg-lime-300 text-[#10120f]">
            <Link2 aria-hidden="true" className="size-5" />
          </span>
          <span>Shortly</span>
        </Link>
        <nav className="flex items-center gap-3" aria-label="Main navigation">
          <Link
            className="hidden px-3 py-2 text-sm text-white/65 transition hover:text-white sm:inline-flex"
            href="#features"
          >
            Features
          </Link>
          <SignInButton mode="modal">
            <Button
              className="text-white hover:bg-white/10 hover:text-white"
              variant="ghost"
            >
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-lime-300 text-[#10120f] hover:bg-lime-200">
              Get started
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </SignUpButton>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-16 sm:px-10 sm:pb-32 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-28">
          <div className="pointer-events-none absolute -left-56 top-8 size-[34rem] rounded-full bg-lime-300/10 blur-[120px]" />
          <div className="relative z-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium tracking-wide text-lime-200">
              <span className="size-1.5 rounded-full bg-lime-300" />
              A simpler way to share
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Big links,
              <br />
              <span className="text-lime-300">meet small links.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Make long URLs short, clear, and ready to go. Keep the links you
              share in one simple place with Shortly.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <SignUpButton mode="modal">
                <Button
                  className="h-11 bg-lime-300 px-5 text-sm font-semibold text-[#10120f] hover:bg-lime-200"
                  size="lg"
                >
                  Create your first link
                  <ArrowRight aria-hidden="true" />
                </Button>
              </SignUpButton>
              <Link
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                href="#features"
              >
                See how it works
                <ArrowDown aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-white/45">
              <Check aria-hidden="true" className="size-4 text-lime-300" />
              Free to get started
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -inset-6 rounded-[2rem] bg-lime-300/[0.07] blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#191c18] p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm font-medium">Your links</p>
                  <p className="mt-1 text-xs text-white/45">A little less, a lot easier</p>
                </div>
                <span className="rounded-full border border-lime-300/20 bg-lime-300/10 px-2.5 py-1 text-[11px] font-medium text-lime-200">
                  Link workspace
                </span>
              </div>
              <div className="mt-5 rounded-xl border border-white/10 bg-[#10120f] p-4 sm:p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
                  Your short link
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-base text-lime-200 sm:text-lg">
                    shortly.link/weekend
                  </p>
                  <span className="rounded-lg bg-lime-300 px-3 py-2 text-xs font-semibold text-[#10120f]">
                    Copy link
                  </span>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] text-white/65">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white/80">Destination</p>
                    <p className="mt-1 truncate text-xs text-white/40">
                      example.com/guides/your-next-weekend
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
                <span className="size-1.5 rounded-full bg-lime-300" />
                One clean link, ready to share
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#20231e] px-4 py-3 text-xs text-white/75 shadow-lg sm:flex">
              <Check aria-hidden="true" className="size-4 text-lime-300" />
              Less clutter. More sharing.
            </div>
          </div>
        </section>

        <section
          className="border-y border-white/[0.08] bg-white/[0.02]"
          id="features"
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">
                The essentials, made easy
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Every link has somewhere to go.
              </h2>
              <p className="mt-4 leading-7 text-white/55">
                A straightforward toolkit for making your links easier to use
                and easier to share.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {features.map(({ description, icon: Icon, title }) => (
                <article
                  className="rounded-2xl border border-white/10 bg-[#151713] p-6 sm:p-7"
                  key={title}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-lime-300/10 text-lime-200">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
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
            <p className="mt-2 text-sm text-white/55">
              Get started and share something shorter.
            </p>
          </div>
          <SignUpButton mode="modal">
            <Button className="bg-lime-300 px-5 text-[#10120f] hover:bg-lime-200">
              Get started
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </SignUpButton>
        </section>
      </main>

      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <Link className="font-medium text-white/70" href="/">
            Shortly
          </Link>
          <p>Short links, made simple.</p>
        </div>
      </footer>
    </div>
  );
}
