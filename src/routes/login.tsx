import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Mail,
  Lock,
  ArrowLeft,
  HeartPulse,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — NutriAI" },
      {
        name: "description",
        content: "Sign in to your NutriAI account.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // Normal Login
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        loggedIn: true,
      })
    );

    alert("Login successful!");

    navigate({ to: "/questionnaire" });
  };

  return (
    <main className="login-light min-h-screen w-full px-6 py-6 flex flex-col">
      <Link
        to="/"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#1F2937] shadow-sm hover:bg-[#F5F8FF]"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      <div className="mt-10 flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-[#3B82F6]/25 blur-2xl" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] shadow-[0_10px_24px_-10px_rgba(59,130,246,0.6)]">
            <HeartPulse className="h-8 w-8 text-white" strokeWidth={2.2} />
          </div>
        </div>

        <div className="mt-4 text-[13px] font-semibold tracking-tight text-[#1D4ED8]">
          NutriAI
        </div>

        <h1 className="mt-5 text-[26px] font-semibold tracking-tight text-[#0F172A]">
          Welcome back
        </h1>

        <p className="mt-1.5 text-sm text-[#6B7280]">
          Sign in to your AI-powered nutrition coach
        </p>
      </div>

      <form
        onSubmit={submit}
        className="mx-auto mt-8 w-full max-w-sm space-y-4"
      >
        {/* EMAIL */}
        <div>
          <label className="text-xs font-medium text-[#374151]">
            Email
          </label>

          <div className="mt-1.5 flex h-12 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-[#3B82F6]/12 transition">
            <Mail className="h-4 w-4 text-[#9CA3AF]" />

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[#374151]">
              Password
            </label>

            <button
              type="button"
              className="text-xs font-medium text-[#3B82F6] hover:underline"
            >
              Forgot?
            </button>
          </div>

          <div className="mt-1.5 flex h-12 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-[#3B82F6]/12 transition">
            <Lock className="h-4 w-4 text-[#9CA3AF]" />

            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#9CA3AF]"
            />

            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-[#9CA3AF] hover:text-[#374151]"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* KEEP SIGNED IN */}
        <label className="flex items-center gap-2 text-xs text-[#4B5563] select-none pt-1">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-[#D1D5DB] accent-[#3B82F6]"
          />

          Keep me signed in
        </label>

        {/* NORMAL LOGIN BUTTON */}
        <button
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-sm font-semibold text-white shadow-[0_10px_22px_-10px_rgba(29,78,216,0.6)] transition-transform active:scale-[0.99] hover:from-[#4C8FF7] hover:to-[#1E54C7]"
        >
          Sign in
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 py-2">
          <div className="h-px flex-1 bg-[#E2E8F0]" />

          <span className="text-[11px] uppercase tracking-wider text-[#9CA3AF]">
            or
          </span>

          <div className="h-px flex-1 bg-[#E2E8F0]" />
        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: "http://localhost:8080/questionnaire",
                queryParams: {
                  access_type: "offline",
                  prompt: "select_account",
                },
              },
            });

            if (error) {
              console.error(error);
              alert("Google login failed");
            }
          }}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E2E8F0] bg-white text-sm font-medium text-[#1F2937] shadow-sm hover:bg-[#F5F8FF] transition"
        >
          <GoogleIcon className="h-4 w-4" />

          Continue with Google
        </button>

        {/* SECURITY TEXT */}
        <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-[#94A3B8]">
          <ShieldCheck className="h-3.5 w-3.5" />

          Secured with end-to-end encryption
        </div>
      </form>

      <p className="mt-auto pt-8 text-center text-xs text-[#6B7280]">
        Don't have an account?{" "}
        <span className="font-semibold text-[#1D4ED8]">
          Sign up
        </span>
      </p>
    </main>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
      />

      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.68l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />

      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.94l3.66-2.84z"
      />

      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}