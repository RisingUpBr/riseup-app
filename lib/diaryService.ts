import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, onSnapshot,
  serverTimestamp, Timestamp, getDocs, deleteField,
} from "firebase/firestore";
import { db } from "./firebase";
import { logActivity } from "./activityService";

export interface DiaryEntry {
  id: string;
  userId: string;
  date: string;
  title: string;
  content: string;
  mood?: number | null;
  favorite: boolean;
  bookmarked: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export const MOOD_LABELS = ["Mal", "Regular", "Bem", "Ótimo", "Incrível"];
export const MOOD_EMOJIS = ["😔", "😐", "🙂", "😊", "🤩"];
export const MOOD_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#D4AF37"];

export const REFLECTION_PROMPTS = [
  "O que você aprendeu hoje que não sabia ontem?",
  "Qual foi o momento mais honesto do seu dia?",
  "O que você faria diferente se pudesse refazer hoje?",
  "Que pensamento não saiu da sua cabeça hoje?",
  "O que você está evitando pensar?",
  "Qual foi sua maior vitória de hoje, por menor que seja?",
  "O que você quer lembrar deste dia daqui a 5 anos?",
];

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function getDayPrompt(): string {
  return REFLECTION_PROMPTS[new Date().getDay() % REFLECTION_PROMPTS.length];
}

export function subscribeToEntries(
  userId: string,
  callback: (entries: DiaryEntry[]) => void
): () => void {
  const q = query(
    collection(db, "diary"),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as DiaryEntry)));
  });
}

export async function getOrCreateTodayEntry(userId: string): Promise<DiaryEntry> {
  const today = getTodayDate();
  const q = query(
    collection(db, "diary"),
    where("userId", "==", userId),
    where("date", "==", today)
  );
  const snap = await getDocs(q);
  if (!snap.empty) {
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as DiaryEntry;
  }
  const ref = await addDoc(collection(db, "diary"), {
    userId,
    date: today,
    title: "",
    content: "",
    favorite: false,
    bookmarked: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await logActivity(userId, "diary", "Nova entrada no diário", "/diario");
  return {
    id: ref.id, userId, date: today, title: "", content: "",
    mood: null, favorite: false, bookmarked: false,
    createdAt: null, updatedAt: null,
  };
}

export async function updateEntry(
  entryId: string,
  data: Partial<Pick<DiaryEntry, "title" | "content" | "favorite" | "bookmarked">> & { mood?: number | null },
  userId?: string
): Promise<void> {
  const payload: any = { updatedAt: serverTimestamp() };
  if (data.title !== undefined) payload.title = data.title;
  if (data.content !== undefined) payload.content = data.content;
  if (data.favorite !== undefined) payload.favorite = data.favorite;
  if (data.bookmarked !== undefined) payload.bookmarked = data.bookmarked;
  if ("mood" in data) {
    payload.mood = data.mood === null || data.mood === undefined
      ? deleteField()
      : data.mood;
  }
  await updateDoc(doc(db, "diary", entryId), payload);
  if (userId && data.content) {
    await logActivity(userId, "diary", data.title || "Entrada no diário", "/diario");
  }
}

export async function deleteEntry(entryId: string): Promise<void> {
  await deleteDoc(doc(db, "diary", entryId));
}

export function calculateStreak(entries: DiaryEntry[]): number {
  if (!entries.length) return 0;
  const dates = entries.map((e) => e.date).sort((a, b) => b.localeCompare(a));
  const today = getTodayDate();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  if (dates[0] !== today && dates[0] !== yesterdayStr) return 0;
  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}

export function getWeekDays(referenceDate: Date): { date: string; label: string; num: number }[] {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(referenceDate);
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      num: d.getDate(),
    });
  }
  return days;
}

export function getMonthGrid(year: number, month: number): (string | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (string | null)[][] = [];
  let week: (string | null)[] = new Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    week.push(dateStr);
    if (week.length === 7) { grid.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    grid.push(week);
  }
  return grid;
}
