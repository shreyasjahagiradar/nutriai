import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Flame,
  Beef,
  Wheat,
  Droplet,
  Sunrise,
  Sun,
  Moon,
  Cookie,
  Dumbbell,
  Activity,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";

import { calculatePlan, STORAGE_KEY, type Profile } from "@/lib/nutrition";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Plan — NutriAI" },
      {
        name: "description",
        content: "Your personalized nutrition and workout plan.",
      },
    ],
  }),
  component: DashboardPage,
});

const DEFAULT_PROFILE: Profile = {
  age: 25,
  gender: "male",
  height: 175,
  weight: 70,
  bodyFat: 18,
  activity: "moderate",
  goal: "maintain",
  diet: "nonveg",
};

function DashboardPage() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const plan = calculatePlan(profile);
  const meals = mealsFor(profile.diet, plan.target);
  const workouts = workoutsFor(profile.goal);

  const bmi = (
    profile.weight /
    ((profile.height / 100) * (profile.height / 100))
  ).toFixed(1);

  return (
    <main className="relative min-h-screen overflow-hidden pb-16">

      {/* Background */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-8">

        <div>
          <div className="text-xs text-muted-foreground">
            {new Date().getHours() < 12
              ? "Good morning"
              : new Date().getHours() < 18
              ? "Good afternoon"
              : "Good evening"}
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Your daily plan
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <Link
            to="/questionnaire"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass"
          >
            <Settings className="h-4 w-4" />
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass"
          >
            <LogOut className="h-4 w-4" />
          </button>

        </div>
      </header>

      {/* Hero Card */}
      <section className="relative z-10 mt-6 px-6 animate-fade-up">

        <div className="glass-strong relative overflow-hidden rounded-3xl p-6">

          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full gradient-primary opacity-30 blur-2xl" />

          <div className="flex items-start justify-between">

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Target Calories
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gradient">
                  {plan.target.toLocaleString()}
                </span>

                <span className="text-sm text-muted-foreground">
                  kcal
                </span>
              </div>

              <div className="mt-1 text-xs text-muted-foreground">
                Maintenance: {plan.maintenance.toLocaleString()} kcal
              </div>
            </div>

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <Flame className="h-9 w-9 text-primary-foreground" />
            </div>

          </div>

          {/* Macro Pills */}
          <div className="mt-6 grid grid-cols-3 gap-3">

            <MacroPill
              icon={Beef}
              label="Protein"
              value={plan.protein}
              unit="g"
              color="oklch(0.78 0.18 150)"
            />

            <MacroPill
              icon={Wheat}
              label="Carbs"
              value={plan.carbs}
              unit="g"
              color="oklch(0.78 0.16 80)"
            />

            <MacroPill
              icon={Droplet}
              label="Fat"
              value={plan.fat}
              unit="g"
              color="oklch(0.72 0.18 320)"
            />

          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="relative z-10 mt-5 px-6 animate-fade-up">

        <div className="grid grid-cols-3 gap-3">

          <ProgressCard
            label="Calories"
            value={1420}
            target={plan.target}
            unit="kcal"
          />

          <ProgressCard
            label="Protein"
            value={Math.round(plan.protein * 0.55)}
            target={plan.protein}
            unit="g"
          />

          <ProgressCard
            label="Water"
            value={1.6}
            target={2.5}
            unit="L"
          />

        </div>

        {/* BMI */}
        <div className="mt-4 glass rounded-2xl p-5">

          <div className="text-xs text-muted-foreground">
            Body Mass Index
          </div>

          <div className="mt-1 text-3xl font-bold">
            {bmi}
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            Healthy range: 18.5 - 24.9
          </div>

        </div>
      </section>

      {/* Meals */}
      <section className="relative z-10 mt-8 px-6 animate-fade-up">

        <SectionHeader
          title="Meal Plan"
          subtitle={`${dietLabel(profile.diet)} • personalized`}
        />

        <div className="mt-4 space-y-3">
          {meals.map((m) => (
            <MealCard key={m.name} {...m} />
          ))}
        </div>

      </section>

      {/* Workouts */}
      <section className="relative z-10 mt-8 px-6 animate-fade-up">

        <SectionHeader
          title="Workout Plan"
          subtitle="Today's training"
        />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {workouts.map((w) => (
            <WorkoutCard key={w.title} {...w} />
          ))}
        </div>

      </section>

      {/* Macro Summary */}
      <section className="relative z-10 mt-8 px-6 animate-fade-up">

        <SectionHeader
          title="Macro Summary"
          subtitle="Daily distribution"
        />

        <div className="mt-4 glass rounded-3xl p-5">

          <MacroBar
            protein={plan.protein}
            carbs={plan.carbs}
            fat={plan.fat}
          />

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">

            <div>
              <div className="font-semibold text-base">
                {Math.round((plan.protein * 4 / plan.target) * 100)}%
              </div>

              <div className="text-muted-foreground">
                Protein
              </div>
            </div>

            <div>
              <div className="font-semibold text-base">
                {Math.round((plan.carbs * 4 / plan.target) * 100)}%
              </div>

              <div className="text-muted-foreground">
                Carbs
              </div>
            </div>

            <div>
              <div className="font-semibold text-base">
                {Math.round((plan.fat * 9 / plan.target) * 100)}%
              </div>

              <div className="text-muted-foreground">
                Fat
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Daily Tips */}
      <section className="relative z-10 mt-8 px-6 animate-fade-up">

        <SectionHeader
          title="Daily Tips"
          subtitle="Stay consistent"
        />

        <div className="mt-4 glass rounded-3xl p-5">

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>💧 Drink at least 2.5L water daily</li>
            <li>🥗 Eat protein in every meal</li>
            <li>😴 Aim for 7-8 hours sleep</li>
            <li>🏋 Progressive overload builds muscle faster</li>
          </ul>

        </div>
      </section>

    </main>
  );
}

function dietLabel(d: Profile["diet"]) {
  return d === "veg"
    ? "Vegetarian"
    : d === "vegan"
    ? "Vegan"
    : "Non-Vegetarian";
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-lg font-bold">
          {title}
        </h2>

        <div className="text-xs text-muted-foreground">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function MacroPill({
  icon: Icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl bg-background/30 p-3">

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3 w-3" style={{ color }} />
        {label}
      </div>

      <div className="mt-1.5 text-lg font-bold">
        {value}
        <span className="ml-1 text-xs font-normal text-muted-foreground">
          {unit}
        </span>
      </div>

    </div>
  );
}

function ProgressCard({
  label,
  value,
  target,
  unit,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
}) {
  const pct = Math.min(100, Math.round((value / target) * 100));

  return (
    <div className="glass rounded-2xl p-4">

      <div className="text-xs text-muted-foreground">
        {label}
      </div>

      <div className="mt-1 text-base font-bold">
        {value}
        <span className="text-xs font-normal text-muted-foreground">
          {" "}
          /{target}
          {unit}
        </span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">

        <div
          className="h-full rounded-full gradient-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />

      </div>
    </div>
  );
}

function MealCard({
  icon: Icon,
  name,
  time,
  dish,
  kcal,
  protein,
}: {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  time: string;
  dish: string;
  kcal: number;
  protein: number;
}) {
  return (
    <button
      onClick={() => {
        window.location.href = "/meal-details";
      }}
      className="glass rounded-2xl p-4 flex items-center gap-4 transition-transform active:scale-[0.99] w-full text-left"
    >

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-accent">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>

      <div className="flex-1 min-w-0">

        <div className="flex items-center justify-between gap-2">

          <div className="font-semibold">
            {name}
          </div>

          <div className="text-xs text-muted-foreground">
            {time}
          </div>

        </div>

        <div className="text-xs text-muted-foreground truncate">
          {dish}
        </div>

      </div>

      <div className="text-right shrink-0">

        <div className="text-sm font-bold">
          {kcal}
          <span className="text-[10px] font-normal text-muted-foreground">
            kcal
          </span>
        </div>

        <div className="text-[10px] text-muted-foreground">
          {protein}g protein
        </div>

      </div>

    </button>
  );
}

function WorkoutCard({
  title,
  duration,
  kcal,
  type,
  icon: Icon,
}: {
  title: string;
  duration: string;
  kcal: number;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      onClick={() => {
        window.location.href = "/workout-details";
      }}
      className="glass rounded-2xl p-4 transition-transform active:scale-[0.99] w-full text-left"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>

        <span className="rounded-full bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
          {type}
        </span>

      </div>

      <div className="mt-3 font-semibold">
        {title}
      </div>

      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{duration}</span>
        <span>•</span>
        <span>~{kcal} kcal</span>
      </div>

    </button>
  );
}

function MacroBar({
  protein,
  carbs,
  fat,
}: {
  protein: number;
  carbs: number;
  fat: number;
}) {
  const total = protein * 4 + carbs * 4 + fat * 9;

  const p = (protein * 4 / total) * 100;
  const c = (carbs * 4 / total) * 100;
  const f = (fat * 9 / total) * 100;

  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted/40">

      <div
        style={{
          width: `${p}%`,
          background: "oklch(0.78 0.18 150)",
        }}
      />

      <div
        style={{
          width: `${c}%`,
          background: "oklch(0.78 0.16 80)",
        }}
      />

      <div
        style={{
          width: `${f}%`,
          background: "oklch(0.72 0.18 320)",
        }}
      />

    </div>
  );
}

function mealsFor(
  diet: Profile["diet"],
  target: number
) {
  const dishes: Record<Profile["diet"], string[]> = {
    veg: [
      "Oats with berries & almonds",
      "Paneer bowl with quinoa",
      "Lentil curry & brown rice",
      "Greek yogurt & nuts",
    ],

    nonveg: [
      "Egg omelet with avocado toast",
      "Grilled chicken & sweet potato",
      "Salmon, rice & broccoli",
      "Protein shake & banana",
    ],

    vegan: [
      "Tofu scramble & sourdough",
      "Chickpea Buddha bowl",
      "Tempeh stir-fry & quinoa",
      "Almond butter & oats",
    ],
  };

  const ds = dishes[diet];

  return [
    {
      name: "Breakfast",
      time: "8:00 AM",
      dish: ds[0],
      kcal: Math.round(target * 0.28),
      protein: 32,
      icon: Sunrise,
    },

    {
      name: "Lunch",
      time: "1:00 PM",
      dish: ds[1],
      kcal: Math.round(target * 0.32),
      protein: 45,
      icon: Sun,
    },

    {
      name: "Dinner",
      time: "7:30 PM",
      dish: ds[2],
      kcal: Math.round(target * 0.28),
      protein: 40,
      icon: Moon,
    },

    {
      name: "Snacks",
      time: "Anytime",
      dish: ds[3],
      kcal: Math.round(target * 0.12),
      protein: 18,
      icon: Cookie,
    },
  ];
}

function workoutsFor(goal: Profile["goal"]) {
  if (goal === "gain") {
    return [
      {
        title: "Push Day",
        duration: "60 min",
        kcal: 420,
        type: "Strength",
        icon: Dumbbell,
      },

      {
        title: "Pull Day",
        duration: "50 min",
        kcal: 380,
        type: "Strength",
        icon: TrendingUp,
      },

      {
        title: "Leg Day",
        duration: "70 min",
        kcal: 500,
        type: "Power",
        icon: Activity,
      },

      {
        title: "Recovery Walk",
        duration: "25 min",
        kcal: 140,
        type: "Recovery",
        icon: Activity,
      },
    ];
  }

  if (goal === "lose") {
    return [
      {
        title: "HIIT Cardio",
        duration: "25 min",
        kcal: 350,
        type: "Fat Burn",
        icon: Activity,
      },

      {
        title: "Incline Walking",
        duration: "40 min",
        kcal: 220,
        type: "Cardio",
        icon: TrendingUp,
      },

      {
        title: "Core Circuit",
        duration: "20 min",
        kcal: 180,
        type: "Core",
        icon: Dumbbell,
      },

      {
        title: "Mobility Flow",
        duration: "15 min",
        kcal: 90,
        type: "Recovery",
        icon: Activity,
      },
    ];
  }

  return [
    {
      title: "Full Body Workout",
      duration: "45 min",
      kcal: 300,
      type: "Balanced",
      icon: Dumbbell,
    },

    {
      title: "Light Cardio",
      duration: "30 min",
      kcal: 180,
      type: "Cardio",
      icon: Activity,
    },

    {
      title: "Stretch & Mobility",
      duration: "20 min",
      kcal: 80,
      type: "Recovery",
      icon: TrendingUp,
    },

    {
      title: "Evening Walk",
      duration: "30 min",
      kcal: 140,
      type: "Active",
      icon: Activity,
    },
  ];
}