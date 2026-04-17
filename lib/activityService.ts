import {
  collection, addDoc, query, where,
  orderBy, limit, onSnapshot, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type ActivityType = "notes" | "diary" | "flashcards" | "routine" | "goals" | "biblioteca";

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  label: string;
  href: string;
  timestamp: Timestamp | null;
}

export async function logActivity(
  userId: string,
  type: ActivityType,
  label: string,
  href: string
): Promise<void> {
  try {
    await addDoc(collection(db, "activity"), {
      userId,
      type,
      label,
      href,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error("logActivity error:", err);
  }
}

export function subscribeToRecentActivity(
  userId: string,
  callback: (items: Activity[]) => void
): () => void {
  const q = query(
    collection(db, "activity"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc"),
    limit(3)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Activity)));
  });
}
