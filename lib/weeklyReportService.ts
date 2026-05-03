import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  diaryEntries: number;
  routineBlocks: number;
  routineCompleted: number;
  goalsUpdated: number;
  notesCreated: number;
  flashcardsStudied: number;
  streak: number;
  highlights: string[];
}

function getWeekRange(): { start: string; end: string } {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dow + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0],
  };
}

export async function generateWeeklyReport(userId: string): Promise<WeeklyReport> {
  const { start, end } = getWeekRange();
  let diaryEntries = 0;
  let notesCreated = 0;
  try {
    const diaryQ = query(
      collection(db, "diary"),
      where("userId", "==", userId),
      where("date", ">=", start),
      where("date", "<=", end)
    );
    const diarySnap = await getDocs(diaryQ);
    diaryEntries = diarySnap.size;
  } catch {}
  try {
    const notesQ = query(collection(db, "notes"), where("userId", "==", userId));
    const notesSnap = await getDocs(notesQ);
    notesCreated = notesSnap.docs.filter(d => {
      const created = d.data().createdAt as Timestamp;
      if (!created) return false;
      const dateStr = created.toDate().toISOString().split("T")[0];
      return dateStr >= start && dateStr <= end;
    }).length;
  } catch {}
  const highlights: string[] = [];
  if (diaryEntries >= 5) highlights.push(`${diaryEntries} entradas no diário essa semana 📔`);
  if (diaryEntries >= 7) highlights.push("Semana perfeita no diário! 🌟");
  if (notesCreated > 0) highlights.push(`${notesCreated} nota${notesCreated > 1 ? "s" : ""} criada${notesCreated > 1 ? "s" : ""} 📝`);
  return {
    weekStart: start,
    weekEnd: end,
    diaryEntries,
    routineBlocks: 0,
    routineCompleted: 0,
    goalsUpdated: 0,
    notesCreated,
    flashcardsStudied: 0,
    streak: 0,
    highlights,
  };
}
