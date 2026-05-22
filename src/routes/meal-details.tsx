import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Flame, Beef } from "lucide-react";

export const Route = createFileRoute("/meal-details")({
  component: MealDetailsPage,
});

function MealDetailsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-20 -right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      {/* Back button */}
      <button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
        className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-xl glass"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      {/* Main card */}
      <div className="relative z-10 glass rounded-3xl overflow-hidden">

        {/* Food image */}
        <img
          src="https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop"
          alt="Healthy breakfast"
          className="h-64 w-full object-cover"
        />

        <div className="p-6">

          {/* Title */}
          <h1 className="text-3xl font-bold">
            High Protein Breakfast
          </h1>

          <p className="mt-2 text-muted-foreground">
            Perfect for muscle gain and recovery
          </p>

          {/* Nutrition cards */}
          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="h-4 w-4 text-orange-400" />
                Calories
              </div>

              <div className="mt-2 text-2xl font-bold">
                520 kcal
              </div>
            </div>

            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Beef className="h-4 w-4 text-green-400" />
                Protein
              </div>

              <div className="mt-2 text-2xl font-bold">
                38g
              </div>
            </div>

          </div>

          {/* Ingredients */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">
              Ingredients
            </h2>

            <div className="mt-4 space-y-3">

              <div className="glass rounded-2xl p-4">
                🥚 4 Whole Eggs
              </div>

              <div className="glass rounded-2xl p-4">
                🍞 2 Whole Wheat Bread Slices
              </div>

              <div className="glass rounded-2xl p-4">
                🥑 Half Avocado
              </div>

              <div className="glass rounded-2xl p-4">
                🧈 1 tsp Butter
              </div>

            </div>
          </div>

          {/* Recipe steps */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">
              Recipe Steps
            </h2>

            <div className="mt-4 space-y-4">

              <div className="glass rounded-2xl p-4">
                <div className="text-lg font-bold text-gradient">
                  Step 1
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Heat a pan and add butter.
                </p>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-lg font-bold text-gradient">
                  Step 2
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Cook eggs for 3-4 minutes.
                </p>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-lg font-bold text-gradient">
                  Step 3
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Toast the bread slices.
                </p>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-lg font-bold text-gradient">
                  Step 4
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Serve with avocado and enjoy.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}