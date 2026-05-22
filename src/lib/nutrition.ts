export type Gender = "male" | "female" | "other";
export type Activity = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "lose" | "maintain" | "gain";
export type Diet = "veg" | "nonveg" | "vegan";

export interface Profile {
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  bodyFat: number; // %
  activity: Activity;
  goal: Goal;
  diet: Diet;
}

const ACTIVITY_FACTOR: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculatePlan(p: Profile) {
  // Katch-McArdle using body fat %
  const leanMass = p.weight * (1 - p.bodyFat / 100);
  const bmr = 370 + 21.6 * leanMass;
  const maintenance = Math.round(bmr * ACTIVITY_FACTOR[p.activity]);
  const adjust = p.goal === "lose" ? -500 : p.goal === "gain" ? 400 : 0;
  const target = maintenance + adjust;
  const protein = Math.round(p.weight * (p.goal === "gain" ? 2.0 : 1.8));
  const fat = Math.round((target * 0.25) / 9);
  const carbs = Math.round((target - protein * 4 - fat * 9) / 4);
  return { maintenance, target, protein, fat, carbs };
}

export const STORAGE_KEY = "nutriai_profile";