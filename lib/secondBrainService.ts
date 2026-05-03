import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, onSnapshot,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type BrainItemSource = "note" | "flashcard" | "diary" | "goal" | "saved";

export interface BrainItem {
  id: string;
  userId: string;
  title: string;
  content: string;
  source: BrainItemSource;
  sourceId?: string;
  tags: string[];
  url?: string;
  emoji: string;
  color: string;
  connections: string[];
  createdAt: Timestamp | null;
}

export interface BrainConnection {
  id: string;
  userId: string;
  fromId: string;
  toId: string;
  label?: string;
  strength: number;
  auto: boolean;
  createdAt: Timestamp | null;
}

export const SOURCE_CONFIG: Record<BrainItemSource, { label: string; color: string; emoji: string }> = {
  note:      { label: "Nota",      color: "#D4AF37", emoji: "📝" },
  flashcard: { label: "Flashcard", color: "#60a5fa", emoji: "🎴" },
  diary:     { label: "Diário",    color: "#4ade80", emoji: "📔" },
  goal:      { label: "Meta",      color: "#c084fc", emoji: "🎯" },
  saved:     { label: "Salvo",     color: "#fb923c", emoji: "🌱" },
};

export function subscribeToItems(
  userId: string,
  callback: (items: BrainItem[]) => void
): () => void {
  const q = query(
    collection(db, "brainItems"),
    where("userId", "==", userId)
  );
  return onSnapshot(q, snap => {
    const items = snap.docs
      .map(d => ({ id: d.id, ...d.data() } as BrainItem))
      .sort((a, b) => {
        const at = a.createdAt?.toDate?.()?.getTime() ?? 0;
        const bt = b.createdAt?.toDate?.()?.getTime() ?? 0;
        return bt - at;
      });
    callback(items);
  }, err => {
    console.error("brainItems error:", err);
    callback([]);
  });
}

export function subscribeToConnections(
  userId: string,
  callback: (conns: BrainConnection[]) => void
): () => void {
  const q = query(collection(db, "brainConnections"), where("userId", "==", userId));
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as BrainConnection)));
  });
}

export async function saveItem(
  userId: string,
  data: { title: string; content: string; source: BrainItemSource; url?: string; tags: string[]; emoji?: string }
): Promise<string> {
  const cfg = SOURCE_CONFIG[data.source];
  const ref = await addDoc(collection(db, "brainItems"), {
    userId,
    title: data.title,
    content: data.content,
    source: data.source,
    url: data.url ?? null,
    tags: data.tags,
    emoji: data.emoji ?? cfg.emoji,
    color: cfg.color,
    connections: [],
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteItem(itemId: string): Promise<void> {
  await deleteDoc(doc(db, "brainItems", itemId));
}

export async function createConnection(
  userId: string,
  fromId: string,
  toId: string,
  label?: string
): Promise<void> {
  await addDoc(collection(db, "brainConnections"), {
    userId, fromId, toId,
    label: label ?? "",
    strength: 1,
    auto: false,
    createdAt: serverTimestamp(),
  });
}

export async function deleteConnection(connId: string): Promise<void> {
  await deleteDoc(doc(db, "brainConnections", connId));
}

export function findAutoConnections(
  items: BrainItem[]
): { fromId: string; toId: string; reason: string }[] {
  const connections: { fromId: string; toId: string; reason: string }[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      const sharedTags = a.tags.filter(t => b.tags.includes(t));
      if (sharedTags.length > 0) {
        connections.push({
          fromId: a.id, toId: b.id,
          reason: `Tags em comum: ${sharedTags.join(", ")}`,
        });
      }
      const aWords = a.title.toLowerCase().split(" ").filter(w => w.length > 4);
      const bWords = b.title.toLowerCase().split(" ").filter(w => w.length > 4);
      const sharedWords = aWords.filter(w => bWords.includes(w));
      if (sharedWords.length > 0 && sharedTags.length === 0) {
        connections.push({
          fromId: a.id, toId: b.id,
          reason: `Temas relacionados: ${sharedWords.slice(0, 2).join(", ")}`,
        });
      }
    }
  }
  return connections.slice(0, 10);
}

export function groupByTopic(items: BrainItem[]): Record<string, BrainItem[]> {
  const groups: Record<string, BrainItem[]> = {};
  items.forEach(item => {
    const topic = item.tags[0] ?? "Geral";
    if (!groups[topic]) groups[topic] = [];
    groups[topic].push(item);
  });
  return groups;
}

export const BRAIN_LIMITS = {
  free: { items: 10, connections: 5 },
  premium: { items: Infinity, connections: Infinity },
};

export function getAutoItemsFromNotes(
  notes: { id: string; title: string; content: string; tags?: string[] }[]
): Omit<BrainItem, "id" | "userId" | "createdAt" | "connections">[] {
  return notes.map(n => ({
    title: n.title || "Nota sem título",
    content: (n.content ?? "").slice(0, 300),
    source: "note" as BrainItemSource,
    sourceId: n.id,
    tags: n.tags ?? [],
    url: undefined,
    emoji: SOURCE_CONFIG.note.emoji,
    color: SOURCE_CONFIG.note.color,
  }));
}

export function getAutoItemsFromDiary(
  entries: { id: string; date: string; content: string; mood?: string }[]
): Omit<BrainItem, "id" | "userId" | "createdAt" | "connections">[] {
  return entries.map(e => ({
    title: `Diário — ${e.date}`,
    content: (e.content ?? "").slice(0, 300),
    source: "diary" as BrainItemSource,
    sourceId: e.id,
    tags: e.mood ? [e.mood] : [],
    url: undefined,
    emoji: SOURCE_CONFIG.diary.emoji,
    color: SOURCE_CONFIG.diary.color,
  }));
}

export function getAutoItemsFromGoals(
  goals: { id: string; title: string; description?: string; tags?: string[] }[]
): Omit<BrainItem, "id" | "userId" | "createdAt" | "connections">[] {
  return goals.map(g => ({
    title: g.title,
    content: (g.description ?? "").slice(0, 300),
    source: "goal" as BrainItemSource,
    sourceId: g.id,
    tags: g.tags ?? [],
    url: undefined,
    emoji: SOURCE_CONFIG.goal.emoji,
    color: SOURCE_CONFIG.goal.color,
  }));
}

export async function syncFromApp(
  userId: string,
  data: {
    notes?: Parameters<typeof getAutoItemsFromNotes>[0];
    diary?: Parameters<typeof getAutoItemsFromDiary>[0];
    goals?: Parameters<typeof getAutoItemsFromGoals>[0];
  }
): Promise<void> {
  const { getDocs, query: q, where: wh, collection: col } = await import("firebase/firestore");
  const existing = await getDocs(q(col(db, "brainItems"), wh("userId", "==", userId)));
  const existingSourceIds = new Set(
    existing.docs.map(d => d.data().sourceId).filter(Boolean)
  );

  const all = [
    ...(data.notes ? getAutoItemsFromNotes(data.notes) : []),
    ...(data.diary ? getAutoItemsFromDiary(data.diary) : []),
    ...(data.goals ? getAutoItemsFromGoals(data.goals) : []),
  ];

  for (const item of all) {
    if (item.sourceId && existingSourceIds.has(item.sourceId)) continue;
    await saveItem(userId, item);
  }
}
