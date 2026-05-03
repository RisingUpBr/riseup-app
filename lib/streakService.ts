import {
  doc, updateDoc, getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalDaysActive: number;
  weekActivity: boolean[];
  achievements: string[];
}

export const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  totalDaysActive: 0,
  weekActivity: [false, false, false, false, false, false, false],
  achievements: [],
};

export const ACHIEVEMENTS = [
  { id: "first_day",    label: "Primeiro passo",    emoji: "🌱", desc: "Primeiro dia ativo",       condition: (s: StreakData) => s.totalDaysActive >= 1 },
  { id: "week_streak",  label: "7 dias seguidos",   emoji: "🔥", desc: "7 dias consecutivos",      condition: (s: StreakData) => s.currentStreak >= 7 },
  { id: "month_streak", label: "30 dias seguidos",  emoji: "⚡", desc: "30 dias consecutivos",     condition: (s: StreakData) => s.currentStreak >= 30 },
  { id: "century",      label: "Centenário",        emoji: "💎", desc: "100 dias ativos no total", condition: (s: StreakData) => s.totalDaysActive >= 100 },
  { id: "consistent",   label: "Consistente",       emoji: "🎯", desc: "Semana perfeita",          condition: (s: StreakData) => s.weekActivity.every(Boolean) },
];

export function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export async function updateStreak(userId: string): Promise<StreakData> {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  const data = snap.data();
  const streak: StreakData = data?.streak ?? DEFAULT_STREAK;
  const today = getTodayStr();
  if (streak.lastActiveDate === today) return streak;
  const yesterday = getYesterdayStr();
  const isConsecutive = streak.lastActiveDate === yesterday;
  const newStreak = isConsecutive ? streak.currentStreak + 1 : 1;
  const newLongest = Math.max(newStreak, streak.longestStreak);
  const dayOfWeek = new Date().getDay();
  const newWeekActivity = [...(streak.weekActivity ?? [false, false, false, false, false, false, false])];
  if (dayOfWeek === 0) newWeekActivity.fill(false);
  newWeekActivity[dayOfWeek] = true;
  const newAchievements = [...(streak.achievements ?? [])];
  const updatedStreak: StreakData = {
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastActiveDate: today,
    totalDaysActive: (streak.totalDaysActive ?? 0) + 1,
    weekActivity: newWeekActivity,
    achievements: newAchievements,
  };
  ACHIEVEMENTS.forEach(a => {
    if (!newAchievements.includes(a.id) && a.condition(updatedStreak)) {
      newAchievements.push(a.id);
    }
  });
  updatedStreak.achievements = newAchievements;
  await updateDoc(ref, { streak: updatedStreak });
  return updatedStreak;
}

export async function getStreak(userId: string): Promise<StreakData> {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.data()?.streak ?? DEFAULT_STREAK;
}
