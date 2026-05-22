import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Dumbbell, Flame } from "lucide-react";

export const Route = createFileRoute("/workout-details")({
  component: WorkoutDetailsPage,
});

function WorkoutDetailsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8">

      <div className="pointer-events-none absolute -top-20 -right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
        className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-xl glass"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="relative z-10 glass rounded-3xl overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
          alt="Workout"
          className="h-64 w-full object-cover"
        />

        <div className="p-6">

          <h1 className="text-3xl font-bold">
            Upper Body Strength
          </h1>

          <p className="mt-2 text-muted-foreground">
            Build muscle and improve upper body power
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Dumbbell className="h-4 w-4 text-blue-400" />
                Duration
              </div>

              <div className="mt-2 text-2xl font-bold">
                45 min
              </div>
            </div>

            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="h-4 w-4 text-orange-400" />
                Calories Burn
              </div>

              <div className="mt-2 text-2xl font-bold">
                320 kcal
              </div>
            </div>

          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">
              Exercises
            </h2>

            <div className="mt-4 space-y-3">

              <div className="glass rounded-2xl p-4">
                💪 Bench Press — 4 sets × 10 reps
              </div>

              <div className="glass rounded-2xl p-4">
                🏋 Shoulder Press — 3 sets × 12 reps
              </div>

              <div className="glass rounded-2xl p-4">
                🔥 Push Ups — 3 sets × 15 reps
              </div>

              <div className="glass rounded-2xl p-4">
                🦾 Dumbbell Curls — 4 sets × 12 reps
              </div>

            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">
              Instructions
            </h2>

            <div className="mt-4 space-y-4">

              <div className="glass rounded-2xl p-4">
                <div className="text-lg font-bold text-gradient">
                  Step 1
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Start with 5 minutes warmup.
                </p>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-lg font-bold text-gradient">
                  Step 2
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Maintain proper form during all exercises.
                </p>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-lg font-bold text-gradient">
                  Step 3
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Rest 60 seconds between sets.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}