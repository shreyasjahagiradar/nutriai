import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { STORAGE_KEY, type Profile, type Activity, type Diet, type Gender, type Goal } from "@/lib/nutrition";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/questionnaire")({
  head: () => ({
    meta: [
      { title: "Your Profile — NutriAI" },
      { name: "description", content: "Tell us about yourself to get a custom plan." },
    ],
  }),
  component: QuestionnairePage,
});

const STEPS = ["Age", "Gender", "Body", "Body Fat", "Activity", "Goal", "Diet"] as const;

function QuestionnairePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Profile>({
    age: 25,
    gender: "male",
    height: 175,
    weight: 70,
    bodyFat: 18,
    activity: "moderate",
    goal: "maintain",
    diet: "nonveg",
  });

  const update = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setData((d) => ({ ...d, [k]: v }));

 const next = async () => {
  if (step === STEPS.length - 1) {

    console.log("Submitting to Supabase", data);

    const { error } = await supabase
      .from("nutrition_plans")
      .insert([
        
  {
  name: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).email.split("@")[0]
    : "Guest",

  age: data.age,
  weight: data.weight,
  goal: data.goal,
  calories: Math.round(
  data.goal === "lose"
    ? data.weight * 24
    : data.goal === "gain"
    ? data.weight * 36
    : data.weight * 30
),

protein: Math.round(
  data.goal === "gain"
    ? data.weight * 2.2
    : data.goal === "lose"
    ? data.weight * 2
    : data.weight * 1.8
),
},
      ]);

    if (error) {
  console.error("Supabase Error:", error);
  alert(JSON.stringify(error));
} else {
  console.log("Data saved successfully!");
  alert("Saved successfully!");
}
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    navigate({ to: "/dashboard" });

  } else {
    setStep(step + 1);
  }
};
  const back = () => (step === 0 ? navigate({ to: "/" }) : setStep(step - 1));

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8">
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <button onClick={back} className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-xs text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </span>
        <Link to="/dashboard" className="text-xs text-muted-foreground">Skip</Link>
      </div>

      <div className="relative z-10 mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
        <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div key={step} className="relative z-10 mt-10 animate-fade-up">
        <h2 className="text-2xl font-bold tracking-tight">{questionTitle(step)}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{questionSub(step)}</p>

        <div className="mt-8">
          {step === 0 && <NumberInput value={data.age} min={12} max={90} unit="years" onChange={(v) => update("age", v)} />}
          {step === 1 && (
            <OptionGrid
              value={data.gender}
              onChange={(v) => update("gender", v as Gender)}
              options={[
                { value: "male", label: "Male", icon: "♂" },
                { value: "female", label: "Female", icon: "♀" },
                { value: "other", label: "Other", icon: "⚧" },
              ]}
            />
          )}
          {step === 2 && (
            <div className="space-y-5">
              <NumberInput value={data.height} min={120} max={230} unit="cm" label="Height" onChange={(v) => update("height", v)} />
              <NumberInput value={data.weight} min={30} max={200} unit="kg" label="Weight" onChange={(v) => update("weight", v)} />
            </div>
          )}
          {step === 3 && <NumberInput value={data.bodyFat} min={5} max={50} unit="%" onChange={(v) => update("bodyFat", v)} />}
          {step === 4 && (
            <OptionList
              value={data.activity}
              onChange={(v) => update("activity", v as Activity)}
              options={[
                { value: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
                { value: "light", label: "Light", desc: "1-3 workouts/week" },
                { value: "moderate", label: "Moderate", desc: "3-5 workouts/week" },
                { value: "active", label: "Active", desc: "6-7 workouts/week" },
                { value: "very_active", label: "Very Active", desc: "Athlete level" },
              ]}
            />
          )}
          {step === 5 && (
            <OptionList
              value={data.goal}
              onChange={(v) => update("goal", v as Goal)}
              options={[
                { value: "lose", label: "Lose Fat", desc: "Cut weight, stay strong" },
                { value: "maintain", label: "Maintain", desc: "Recomposition" },
                { value: "gain", label: "Build Muscle", desc: "Lean bulk" },
              ]}
            />
          )}
          {step === 6 && (
            <OptionGrid
              value={data.diet}
              onChange={(v) => update("diet", v as Diet)}
              options={[
                { value: "veg", label: "Vegetarian", icon: "🥗" },
                { value: "nonveg", label: "Non-Veg", icon: "🍗" },
                { value: "vegan", label: "Vegan", icon: "🌱" },
              ]}
            />
          )}
        </div>
      </div>

      <div className="relative z-10 mt-10">
        <button
          onClick={next}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl gradient-primary text-base font-semibold text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
        >
          {step === STEPS.length - 1 ? "Generate plan" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

function questionTitle(step: number) {
  return ["How old are you?", "What's your gender?", "Your body metrics", "Body fat percentage", "Activity level", "What's your goal?", "Dietary preference"][step];
}
function questionSub(step: number) {
  return [
    "We use this to personalize your calorie needs.",
    "Helps us tailor your macros.",
    "Used to calculate BMR and lean mass.",
    "An estimate is fine — affects lean mass.",
    "How active are you on a typical week?",
    "We'll adjust calories accordingly.",
    "We'll plan meals you actually enjoy.",
  ][step];
}

function NumberInput({ value, min, max, unit, label, onChange }: { value: number; min: number; max: number; unit: string; label?: string; onChange: (v: number) => void }) {
  return (
    <div className="glass rounded-3xl p-6">
      {label && <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>}
      <div className="flex items-baseline justify-center gap-2">
        <span className="text-6xl font-bold text-gradient">{value}</span>
        <span className="text-base text-muted-foreground">{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-5 w-full accent-primary"
      />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function OptionGrid({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string; icon: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-2 rounded-2xl p-5 transition-all ${
              active ? "gradient-primary text-primary-foreground shadow-glow scale-[1.02]" : "glass"
            }`}
          >
            <span className="text-3xl">{opt.icon}</span>
            <span className="text-sm font-medium">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function OptionList({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string; desc: string }[] }) {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all ${
              active ? "glass-strong ring-2 ring-primary" : "glass"
            }`}
          >
            <div>
              <div className="font-semibold">{opt.label}</div>
              <div className="text-xs text-muted-foreground">{opt.desc}</div>
            </div>
            <div className={`flex h-7 w-7 items-center justify-center rounded-full ${active ? "gradient-primary" : "bg-muted/50"}`}>
              {active && <Check className="h-4 w-4 text-primary-foreground" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}