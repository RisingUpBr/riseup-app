import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, onSnapshot,
  serverTimestamp, Timestamp, getDocs,
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

export const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export interface RoutineBlock {
  id: string;
  title: string;
  emoji: string;
  startTime: string;
  endTime: string;
  category: CategoryType;
  repeat: RepeatType;
  repeatDays: number[];
  flexible: boolean;
  notes: string;
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
  scheduleDays: number[];
  isPreset: boolean;
  createdAt: Timestamp | null;
}

export const PRESET_TEMPLATES: Omit<RoutineTemplate, "id" | "userId" | "createdAt">[] = [
  {
    name: "Rotina Matinal",
    emoji: "🌅",
    isPreset: true,
    scheduleDays: [0,1,2,3,4,5,6],
    blocks: [
      { id: "m1", title: "Acordar e hidratar", emoji: "💧", startTime: "06:00", endTime: "06:10", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "m2", title: "Meditação ou respiração", emoji: "🧘", startTime: "06:10", endTime: "06:25", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "m3", title: "Exercício físico", emoji: "🏃", startTime: "06:30", endTime: "07:15", category: "health", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "m4", title: "Banho e higiene", emoji: "🚿", startTime: "07:15", endTime: "07:40", category: "personal", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#fb923c" },
      { id: "m5", title: "Café da manhã", emoji: "☕", startTime: "07:40", endTime: "08:00", category: "personal", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#fb923c" },
      { id: "m6", title: "Leitura matinal", emoji: "📖", startTime: "08:00", endTime: "08:20", category: "leisure", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#D4AF37" },
      { id: "m7", title: "Planejamento do dia", emoji: "📋", startTime: "08:20", endTime: "08:35", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#60a5fa" },
      { id: "m8", title: "Revisão de metas", emoji: "🎯", startTime: "08:35", endTime: "08:45", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "m9", title: "Jornada diária", emoji: "✍️", startTime: "08:45", endTime: "09:00", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "Escrever no diário", color: "#fb923c" },
    ],
  },
  {
    name: "Dia Produtivo",
    emoji: "⚡",
    isPreset: true,
    scheduleDays: [1,2,3,4,5],
    blocks: [
      { id: "d1", title: "Planejamento do dia", emoji: "📋", startTime: "08:00", endTime: "08:20", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#60a5fa" },
      { id: "d2", title: "Trabalho focado — bloco 1", emoji: "💻", startTime: "08:30", endTime: "10:30", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "Pomodoro 50/10", color: "#60a5fa" },
      { id: "d3", title: "Pausa ativa", emoji: "🚶", startTime: "10:30", endTime: "10:45", category: "health", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "d4", title: "Trabalho focado — bloco 2", emoji: "💻", startTime: "10:45", endTime: "12:30", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#60a5fa" },
      { id: "d5", title: "Almoço", emoji: "🥗", startTime: "12:30", endTime: "13:30", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "d6", title: "Trabalho focado — bloco 3", emoji: "💻", startTime: "14:00", endTime: "16:30", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#60a5fa" },
      { id: "d7", title: "Revisão e fechamento", emoji: "✅", startTime: "16:30", endTime: "17:00", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#60a5fa" },
      { id: "d8", title: "Exercício pós-trabalho", emoji: "🏋️", startTime: "17:30", endTime: "18:30", category: "health", repeat: "weekdays", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "d9", title: "Jantar", emoji: "🍽️", startTime: "19:00", endTime: "19:45", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "d10", title: "Descanso / lazer", emoji: "🎮", startTime: "20:00", endTime: "21:30", category: "leisure", repeat: "weekdays", repeatDays: [], flexible: true, notes: "", color: "#D4AF37" },
    ],
  },
  {
    name: "Foco em Estudos",
    emoji: "🎓",
    isPreset: true,
    scheduleDays: [0,1,2,3,4,5,6],
    blocks: [
      { id: "e1", title: "Café da manhã", emoji: "☕", startTime: "07:00", endTime: "07:20", category: "personal", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#fb923c" },
      { id: "e2", title: "Revisão do dia anterior", emoji: "🔄", startTime: "07:30", endTime: "08:00", category: "study", repeat: "daily", repeatDays: [], flexible: false, notes: "Rever anotações", color: "#c084fc" },
      { id: "e3", title: "Estudo focado — bloco 1", emoji: "📚", startTime: "08:00", endTime: "10:00", category: "study", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#c084fc" },
      { id: "e4", title: "Pausa + lanche", emoji: "🍎", startTime: "10:00", endTime: "10:20", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "e5", title: "Estudo focado — bloco 2", emoji: "📚", startTime: "10:20", endTime: "12:30", category: "study", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#c084fc" },
      { id: "e6", title: "Almoço", emoji: "🥗", startTime: "12:30", endTime: "13:30", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "e7", title: "Flashcards", emoji: "🎴", startTime: "14:00", endTime: "14:45", category: "study", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#c084fc" },
      { id: "e8", title: "Estudo focado — bloco 3", emoji: "📚", startTime: "15:00", endTime: "17:00", category: "study", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#c084fc" },
      { id: "e9", title: "Exercício", emoji: "🏃", startTime: "17:30", endTime: "18:15", category: "health", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "e10", title: "Jantar", emoji: "🍽️", startTime: "19:00", endTime: "19:45", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "e11", title: "Revisão noturna", emoji: "🌙", startTime: "21:00", endTime: "21:45", category: "study", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#c084fc" },
    ],
  },
  {
    name: "Equilíbrio Total",
    emoji: "🌿",
    isPreset: true,
    scheduleDays: [0,1,2,3,4,5,6],
    blocks: [
      { id: "q1", title: "Acordar e hidratar", emoji: "💧", startTime: "06:30", endTime: "06:40", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "q2", title: "Meditação", emoji: "🧘", startTime: "06:40", endTime: "07:10", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "q3", title: "Café da manhã", emoji: "☕", startTime: "07:15", endTime: "07:45", category: "personal", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#fb923c" },
      { id: "q4", title: "Trabalho / Estudo", emoji: "💻", startTime: "09:00", endTime: "12:30", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#60a5fa" },
      { id: "q5", title: "Almoço", emoji: "🥗", startTime: "12:30", endTime: "13:30", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "q6", title: "Trabalho / Estudo tarde", emoji: "💻", startTime: "14:00", endTime: "17:00", category: "work", repeat: "weekdays", repeatDays: [], flexible: false, notes: "", color: "#60a5fa" },
      { id: "q7", title: "Exercício", emoji: "🏋️", startTime: "17:30", endTime: "18:30", category: "health", repeat: "weekdays", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "q8", title: "Jantar", emoji: "🍽️", startTime: "19:00", endTime: "19:45", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "q9", title: "Família / Social", emoji: "👥", startTime: "20:00", endTime: "21:00", category: "social", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#f472b6" },
      { id: "q10", title: "Leitura", emoji: "📖", startTime: "21:15", endTime: "21:45", category: "leisure", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#D4AF37" },
      { id: "q11", title: "Gratidão / Diário", emoji: "✍️", startTime: "22:00", endTime: "22:15", category: "personal", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
    ],
  },
  {
    name: "Fim de Semana",
    emoji: "🌞",
    isPreset: true,
    scheduleDays: [0,6],
    blocks: [
      { id: "fs1", title: "Acordar tranquilo", emoji: "😴", startTime: "08:00", endTime: "08:30", category: "personal", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "fs2", title: "Café da manhã especial", emoji: "🥞", startTime: "08:30", endTime: "09:15", category: "personal", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "fs3", title: "Exercício ao ar livre", emoji: "🚴", startTime: "09:30", endTime: "10:30", category: "health", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "fs4", title: "Projeto pessoal", emoji: "🛠️", startTime: "11:00", endTime: "12:30", category: "leisure", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#D4AF37" },
      { id: "fs5", title: "Almoço em família", emoji: "🍖", startTime: "13:00", endTime: "14:30", category: "social", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#f472b6" },
      { id: "fs6", title: "Descanso / Leitura", emoji: "📚", startTime: "15:00", endTime: "16:30", category: "leisure", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#D4AF37" },
      { id: "fs7", title: "Atividade social", emoji: "🎉", startTime: "17:00", endTime: "19:00", category: "social", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#f472b6" },
      { id: "fs8", title: "Jantar", emoji: "🍽️", startTime: "19:30", endTime: "20:30", category: "personal", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#fb923c" },
      { id: "fs9", title: "Relaxamento noturno", emoji: "🌙", startTime: "21:00", endTime: "22:00", category: "leisure", repeat: "weekends", repeatDays: [], flexible: true, notes: "", color: "#D4AF37" },
    ],
  },
  {
    name: "Saúde e Bem-estar",
    emoji: "💚",
    isPreset: true,
    scheduleDays: [0,1,2,3,4,5,6],
    blocks: [
      { id: "s1", title: "Acordar e hidratar", emoji: "💧", startTime: "06:00", endTime: "06:10", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "500ml de água", color: "#4ade80" },
      { id: "s2", title: "Alongamento", emoji: "🤸", startTime: "06:10", endTime: "06:30", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "s3", title: "Treino principal", emoji: "🏋️", startTime: "06:30", endTime: "07:30", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "s4", title: "Café da manhã nutritivo", emoji: "🥣", startTime: "08:00", endTime: "08:30", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "Proteína + carboidrato complexo", color: "#4ade80" },
      { id: "s5", title: "Lanche da manhã", emoji: "🍌", startTime: "10:30", endTime: "10:45", category: "health", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "s6", title: "Almoço balanceado", emoji: "🥗", startTime: "12:30", endTime: "13:15", category: "health", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "s7", title: "Caminhada pós-almoço", emoji: "🚶", startTime: "13:15", endTime: "13:35", category: "health", repeat: "daily", repeatDays: [], flexible: true, notes: "10 min mínimo", color: "#4ade80" },
      { id: "s8", title: "Lanche da tarde", emoji: "🍎", startTime: "16:00", endTime: "16:15", category: "health", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "s9", title: "Jantar leve", emoji: "🍲", startTime: "19:00", endTime: "19:40", category: "health", repeat: "daily", repeatDays: [], flexible: true, notes: "", color: "#4ade80" },
      { id: "s10", title: "Meditação noturna", emoji: "🧘", startTime: "21:30", endTime: "22:00", category: "health", repeat: "daily", repeatDays: [], flexible: false, notes: "", color: "#4ade80" },
      { id: "s11", title: "Preparar para dormir", emoji: "😴", startTime: "22:00", endTime: "22:30", category: "personal", repeat: "daily", repeatDays: [], flexible: false, notes: "Sem telas", color: "#fb923c" },
    ],
  },
];

export function subscribeToTemplates(
  userId: string,
  callback: (templates: RoutineTemplate[]) => void
): () => void {
  const q = query(collection(db, "routineTemplates"), where("userId", "==", userId));
  return onSnapshot(q, snap => {
    callback(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() } as RoutineTemplate))
        .sort((a, b) => (b.createdAt?.toDate?.()?.getTime() ?? 0) - (a.createdAt?.toDate?.()?.getTime() ?? 0))
    );
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
  data: Partial<Pick<RoutineTemplate, "name" | "emoji" | "blocks" | "scheduleDays">>
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
  const payload = { userId, date, completedBlocks, mood: mood ?? null };
  if (snap.empty) {
    await addDoc(collection(db, "routineLogs"), payload);
  } else {
    await updateDoc(snap.docs[0].ref, payload);
  }
}

export function makeBlock(overrides: Partial<RoutineBlock> = {}): RoutineBlock {
  return {
    id: `b_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    title: "", emoji: "⭐", startTime: "08:00", endTime: "09:00",
    category: "personal", repeat: "daily", repeatDays: [],
    flexible: false, notes: "", color: "#fb923c",
    ...overrides,
  };
}

export function blockMatchesDate(block: RoutineBlock, dateStr: string): boolean {
  const dow = new Date(dateStr + "T12:00:00").getDay();
  if (block.repeat === "daily") return true;
  if (block.repeat === "weekdays") return dow >= 1 && dow <= 5;
  if (block.repeat === "weekends") return dow === 0 || dow === 6;
  if (block.repeat === "custom") return (block.repeatDays ?? []).includes(dow);
  if (block.repeat === "once") return true;
  return false;
}

export function getTemplatesForDate(templates: RoutineTemplate[], dateStr: string): RoutineTemplate[] {
  const dow = new Date(dateStr + "T12:00:00").getDay();
  return templates.filter(t => (t.scheduleDays ?? [0,1,2,3,4,5,6]).includes(dow));
}

export function getBlocksForDate(
  templates: RoutineTemplate[],
  dateStr: string
): { block: RoutineBlock; templateId: string; templateName: string; templateEmoji: string }[] {
  return getTemplatesForDate(templates, dateStr)
    .flatMap(t =>
      (t.blocks ?? [])
        .filter(b => blockMatchesDate(b, dateStr))
        .map(b => ({ block: b, templateId: t.id, templateName: t.name, templateEmoji: t.emoji }))
    )
    .sort((a, b) => a.block.startTime.localeCompare(b.block.startTime));
}

export function getWeekDates(): string[] {
  const today = new Date();
  const dow = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
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
  return new Date(dateStr + "T12:00:00")
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .replace(".", "");
}

export function minutesDiff(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

export function formatDuration(mins: number): string {
  if (mins <= 0) return "0min";
  if (mins < 60) return `${mins}min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function scheduleDaysLabel(days: number[]): string {
  const d = days ?? [0,1,2,3,4,5,6];
  if (d.length === 7) return "Todo dia";
  if (d.length === 5 && !d.includes(0) && !d.includes(6)) return "Dias úteis";
  if (d.length === 2 && d.includes(0) && d.includes(6)) return "Fim de semana";
  return d.map(x => WEEK_DAYS[x]).join(", ");
}
