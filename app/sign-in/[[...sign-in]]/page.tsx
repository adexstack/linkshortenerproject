import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0"
      />
      <div className="relative z-10 animate-reveal">
        <SignIn />
      </div>
    </div>
  );
}
