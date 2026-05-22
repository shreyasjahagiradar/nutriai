import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Sparkles, Apple, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriAI — Your Personal AI Nutritionist" },
      { name: "description", content: "AI-powered nutrition and fitness coaching tailored to your goals." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />

      <div className="z-10 mt-8 flex flex-col items-center animate-fade-up">
        <div className="flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI-powered nutrition
        </div>
      </div>

      <div className="z-10 flex flex-col items-center text-center animate-fade-up">
        <div className="relative mb-8 animate-float">
          <div className="absolute inset-0 rounded-3xl gradient-primary blur-2xl opacity-50" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl gradient-primary shadow-glow">
            <Apple className="h-12 w-12 text-primary-foreground" strokeWidth={2.2} />
          </div>
        </div>
        <h1 className="max-w-md text-5xl font-bold leading-tight tracking-tight">
          Your personal <span className="text-gradient">AI Nutritionist</span>
        </h1>
        <p className="mt-4 max-w-sm text-base text-muted-foreground">
          Custom meal plans, smart workouts, and progress tracking — designed around your body and goals.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
          {[
            { icon: Apple, label: "Meal Plans" },
            { icon: Dumbbell, label: "Workouts" },
            { icon: Sparkles, label: "AI Coach" },
          ].map((f) => (
            <div key={f.label} className="glass rounded-2xl px-3 py-3 flex flex-col items-center gap-1.5">
              <f.icon className="h-4 w-4 text-primary" />
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="z-10 flex w-full max-w-sm flex-col gap-3 animate-fade-up">
        <Link
          to="/login"
          className="flex h-14 items-center justify-center rounded-2xl gradient-primary text-base font-semibold text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
        >
          Login
        </Link>
        <Link
          to="/questionnaire"
          className="flex h-14 items-center justify-center rounded-2xl glass text-base font-semibold text-foreground transition-transform active:scale-[0.98]"
        >
          Skip for now
        </Link>
      </div>
    </main>
  );
}
