import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, onSnapshot,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type GoalCategory = "career" | "health" | "finance" | "study" | "personal" | "social" | "custom";
export type GoalStatus = "active" | "completed" | "paused";
export type GoalPriority = 1 | 2 | 3;

export const GOAL_CATEGORIES: { id: GoalCategory; label: string; color: string; emoji: string }[] = [
  { id: "career",   label: "Carreira",        color: "#378ADD", emoji: "💼" },
  { id: "health",   label: "Saúde",           color: "#1D9E75", emoji: "💪" },
  { id: "finance",  label: "Financeiro",      color: "#BA7517", emoji: "💰" },
  { id: "study",    label: "Estudos",         color: "#7F77DD", emoji: "📚" },
  { id: "personal", label: "Pessoal",         color: "#D85A30", emoji: "⭐" },
  { id: "social",   label: "Relacionamentos", color: "#D4537E", emoji: "👥" },
  { id: "custom",   label: "Personalizado",   color: "#888",    emoji: "🎯" },
];

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  targetDate?: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  emoji: string;
  category: GoalCategory;
  customCategory?: string;
  why?: string;
  vision?: string;
  deadline: string;
  status: GoalStatus;
  priority: GoalPriority;
  milestones: Milestone[];
  color: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export function subscribeToGoals(
  userId: string,
  callback: (goals: Goal[]) => void
): () => void {
  const q = query(collection(db, "goals"), where("userId", "==", userId));
  return onSnapshot(q, snap => {
    callback(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() } as Goal))
        .sort((a, b) => (b.createdAt?.toDate?.()?.getTime() ?? 0) - (a.createdAt?.toDate?.()?.getTime() ?? 0))
    );
  });
}

export async function createGoal(
  userId: string,
  data: Omit<Goal, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db, "goals"), {
    ...data, userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateGoal(
  goalId: string,
  data: Partial<Omit<Goal, "id" | "userId" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, "goals", goalId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGoal(goalId: string): Promise<void> {
  await deleteDoc(doc(db, "goals", goalId));
}

export function calcProgress(goal: Goal): number {
  if (!goal.milestones.length) return 0;
  const done = goal.milestones.filter(m => m.completed).length;
  return Math.round((done / goal.milestones.length) * 100);
}

export function genMilestoneId(): string {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function daysUntilDeadline(deadline: string): number {
  const d = new Date(deadline + "T12:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - today.getTime()) / 86400000);
}

export function formatDeadline(deadline: string): string {
  return new Date(deadline + "T12:00:00").toLocaleDateString("pt-BR", {
    month: "long", year: "numeric",
  });
}

export function overallProgress(goals: Goal[]): number {
  if (!goals.length) return 0;
  return Math.round(goals.reduce((s, g) => s + calcProgress(g), 0) / goals.length);
}
