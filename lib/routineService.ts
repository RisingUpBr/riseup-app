import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, onSnapshot,
  serverTimestamp, Timestamp, getDocs, writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

export type RepeatType = "daily" | "weekdays" | "weekends" | "custom" | "once";
export type CategoryType = "health" | "work" | "study" | "leisure" | "social" | "personal";

export const CATEGORIES: { id: CategoryType; label: string; color: string; emoji: string }[] = [
  { id: "health",   label: "Saúde",    color: "#4ade80", emoji: "💪" },
  { id: "work",     label: "Trabalho", color: "#60a5fa", emoji: "💻" },
  { id: "study",    label: "Estudo",   color: "#c084fc", emoji: "📚" },
  { id: "leisure",  label: "Lazer",    color: "#D4AF37", emoji: "🎯" },
  { id: "social",   label: "Social",   color: "#f472b6", emoji: "👥" },
  { id: "personal", label: "Pessoal",  color: "#fb923c", emoji: "⭐" },
];

export interface RoutineBlock {
  id: string;
  title: string;
  emoji: string;
  startTime: string;
  endTime: string;
  category: CategoryType;
  repeat: RepeatType;
  repeatDays?: number[];
  flexible: boolean;
  notes?: string;
  color: string;
}

export interface DayLog {
  date: string;
  completedBlocks: string[];
  mood?: number;
}

export interface RoutineTemplate {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  blocks: RoutineBlock[];
  isPreset: boolean;
  createdAt: Timestamp | null;
}

export const PRESET_TEMPLATES: Omit<RoutineTemplate, "id" | "userId" | "createdAt">[] = [
  {
    name: "Rotina Matinal",
    emoji: "🌅",
    isPreset: true,
    blocks: [
      { id: "p1", title: "Acordar e hidratar", emoji: "💧", startTime: "06:00", endTime: "06:10", category: "health", repeat: "daily", flexible: false, color: "#4ade80" },
      { id: "p2", title: "Exercício", emoji: "🏃", startTime: "06:15", endTime: "07:00", category: "health", repeat: "weekdays", flexible: true, color: "#4ade80" },
      { id: "p3", title: "Banho e higiene", emoji: "🚿", startTime: "07:00", endTime: "07:30", category: "personal", repeat: "daily", flexible: false, color: "#fb923c" },
      { id: "p4", title: "Café da manhã", emoji: "☕", startTime: "07:30", endTime: "08:00", category: "personal", repeat: "daily", flexible: false, color: "#fb923c" },
    ],
  },
  {
    name: "Dia Produtivo",
    emoji: "⚡",
    isPreset: true,
    blocks: [
      { id: "p5", title: "Planejamento do dia", emoji: "📋", startTime: "08:00", endTime: "08:15", category: "work", repeat: "weekdays", flexible: false, color: "#60a5fa" },
      { id: "p6", title: "Trabalho focado", emoji: "💻", startTime: "08:30", endTime: "12:00", category: "work", repeat: "weekdays", flexible: false, color: "#60a5fa" },
      { id: "p7", title: "Almoço", emoji: "🥗", startTime: "12:00", endTime: "13:00", category: "personal", repeat: "daily", flexible: true, color: "#fb923c" },
      { id: "p8", title: "Trabalho tarde", emoji: "💻", startTime: "14:00", endTime: "18:00", category: "work", repeat: "weekdays", flexible: false, color: "#60a5fa" },
    ],
  },
  {
    name: "Foco em Estudos",
    emoji: "🎓",
    isPreset: true,
    blocks: [
      { id: "p9", title: "Revisão de notas", emoji: "📖", startTime: "07:00", endTime: "08:00", category: "study", repeat: "daily", flexible: false, color: "#c084fc" },
      { id: "p10", title: "Estudo focado", emoji: "📚", startTime: "09:00", endTime: "11:00", category: "study", repeat: "weekdays", flexible: false, color: "#c084fc" },
      { id: "p11", title: "Flashcards", emoji: "🎴", startTime: "14:00", endTime: "15:00", category: "study", repeat: "daily", flexible: true, color: "#c084fc" },
      { id: "p12", title: "Revisão noturna", emoji: "🌙", startTime: "21:00", endTime: "22:00", category: "study", repeat: "daily", flexible: false, color: "#c084fc" },
    ],
  },
  {
    name: "Equilíbrio Total",
    emoji: "☯️",
    isPreset: true,
    blocks: [
      { id: "p13", title: "Meditação", emoji: "🧘", startTime: "06:30", endTime: "07:00", category: "health", repeat: "daily", flexible: false, color: "#4ade80" },
      { id: "p14", title: "Trabalho", emoji: "💻", startTime: "09:00", endTime: "17:00", category: "work", repeat: "weekdays", flexible: false, color: "#60a5fa" },
      { id: "p15", title: "Exercício", emoji: "🏋️", startTime: "18:00", endTime: "19:00", category: "health", repeat: "weekdays", flexible: true, color: "#4ade80" },
      { id: "p16", title: "Família / Social", emoji: "👥", startTime: "19:30", endTime: "21:00", category: "social", repeat: "daily", flexible: true, color: "#f472b6" },
      { id: "p17", title: "Leitura", emoji: "📖", startTime: "21:30", endTime: "22:00", category: "leisure", repeat: "daily", flexible: false, color: "#D4AF37" },
    ],
  },
];

export function subscribeToTemplates(
  userId: string,
  callback: (templates: RoutineTemplate[]) => void
): () => void {
  const q = query(collection(db, "routineTemplates"), where("userId", "==", userId));
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as RoutineTemplate))
      .sort((a, b) => (b.createdAt?.toDate?.()?.getTime() ?? 0) - (a.createdAt?.toDate?.()?.getTime() ?? 0)));
  });
}

export function subscribeToLogs(
  userId: string,
  callback: (logs: DayLog[]) => void
): () => void {
  const q = query(collection(db, "routineLogs"), where("userId", "==", userId));
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => d.data() as DayLog));
  });
}

export async function createTemplate(
  userId: string,
  data: Omit<RoutineTemplate, "id" | "userId" | "createdAt">
): Promise<string> {
  const ref = await addDoc(collection(db, "routineTemplates"), {
    ...data, userId,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTemplate(
  templateId: string,
  data: Partial<Pick<RoutineTemplate, "name" | "emoji" | "blocks">>
): Promise<void> {
  await updateDoc(doc(db, "routineTemplates", templateId), data);
}

export async function deleteTemplate(templateId: string): Promise<void> {
  await deleteDoc(doc(db, "routineTemplates", templateId));
}

export async function logDay(
  userId: string,
  date: string,
  completedBlocks: string[],
  mood?: number
): Promise<void> {
  const q = query(
    collection(db, "routineLogs"),
    where("userId", "==", userId),
    where("date", "==", date)
  );
  const snap = await getDocs(q);
  if (snap.empty) {
    await addDoc(collection(db, "routineLogs"), { userId, date, completedBlocks, mood: mood ?? null });
  } else {
    await updateDoc(snap.docs[0].ref, { completedBlocks, mood: mood ?? null });
  }
}

export function getBlocksForDate(blocks: RoutineBlock[], dateStr: string): RoutineBlock[] {
  const date = new Date(dateStr + "T12:00:00");
  const dow = date.getDay();
  return blocks.filter(b => {
    if (b.repeat === "daily") return true;
    if (b.repeat === "weekdays") return dow >= 1 && dow <= 5;
    if (b.repeat === "weekends") return dow === 0 || dow === 6;
    if (b.repeat === "custom") return b.repeatDays?.includes(dow) ?? false;
    if (b.repeat === "once") return true;
    return false;
  }).sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getWeekDates(): string[] {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

export function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatDateLabel(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long",
  });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
}

export function minutesDiff(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

export function formatDuration(mins: number): string {
  if (mins < 60) return `${mins}min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}
