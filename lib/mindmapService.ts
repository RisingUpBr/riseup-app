import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, onSnapshot,
  serverTimestamp, Timestamp, getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export interface MindmapNode {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  bg: string;
  type: "default" | "note" | "flashcard";
  refId?: string;
}

export interface MindmapConnection {
  id: string;
  fromId: string;
  toId: string;
}

export interface Mindmap {
  id: string;
  userId: string;
  name: string;
  nodes: MindmapNode[];
  connections: MindmapConnection[];
  canvasDark: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export function subscribeToMindmaps(
  userId: string,
  callback: (maps: Mindmap[]) => void
): () => void {
  const q = query(collection(db, "mindmaps"), where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    const maps = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Mindmap))
      .sort((a, b) => {
        const at = a.updatedAt?.toDate?.()?.getTime() ?? 0;
        const bt = b.updatedAt?.toDate?.()?.getTime() ?? 0;
        return bt - at;
      });
    callback(maps);
  });
}

export async function createMindmap(userId: string, name: string): Promise<string> {
  const ref = await addDoc(collection(db, "mindmaps"), {
    userId,
    name,
    nodes: [],
    connections: [],
    canvasDark: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function saveMindmap(
  mapId: string,
  data: {
    name?: string;
    nodes?: MindmapNode[];
    connections?: MindmapConnection[];
    canvasDark?: boolean;
  }
): Promise<void> {
  await updateDoc(doc(db, "mindmaps", mapId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteMindmap(mapId: string): Promise<void> {
  await deleteDoc(doc(db, "mindmaps", mapId));
}

export const NODE_COLORS = [
  { color: "#D4AF37", bg: "#1a1700", bgLight: "#fdf8e0", label: "Dourado" },
  { color: "#60a5fa", bg: "#0d1520", bgLight: "#eff6ff", label: "Azul" },
  { color: "#4ade80", bg: "#0d1a0d", bgLight: "#f0fdf4", label: "Verde" },
  { color: "#f472b6", bg: "#1a0d15", bgLight: "#fdf2f8", label: "Rosa" },
  { color: "#c084fc", bg: "#150d1a", bgLight: "#faf5ff", label: "Roxo" },
  { color: "#fb923c", bg: "#1a1008", bgLight: "#fff7ed", label: "Laranja" },
  { color: "#888", bg: "#111", bgLight: "#f5f5f5", label: "Neutro" },
];
