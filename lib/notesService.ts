import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, onSnapshot,
  serverTimestamp, Timestamp, getCountFromServer,
} from "firebase/firestore";
import { db } from "./firebase";
import { logActivity } from "./activityService";

export interface NoteBlock {
  type: "p" | "h2" | "h3" | "li" | "check" | "quote" | "divider";
  content: string;
  done?: boolean;
}

export interface Note {
  id: string;
  title: string;
  blocks: NoteBlock[];
  userId: string;
  favorite?: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

function sanitizeBlocks(blocks: NoteBlock[]): NoteBlock[] {
  return blocks.map((b) => {
    const block: NoteBlock = { type: b.type, content: b.content ?? "" };
    if (b.type === "check") block.done = b.done === true;
    return block;
  });
}

export async function getNotesCount(userId: string): Promise<number> {
  const q = query(collection(db, "notes"), where("userId", "==", userId));
  const snap = await getCountFromServer(q);
  return snap.data().count;
}

export function subscribeToNotes(
  userId: string,
  callback: (notes: Note[]) => void
): () => void {
  const q = query(
    collection(db, "notes"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Note)));
  });
}

export async function createNote(userId: string): Promise<string> {
  const ref = await addDoc(collection(db, "notes"), {
    userId,
    title: "",
    blocks: [{ type: "p", content: "" }],
    favorite: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await logActivity(userId, "notes", "Nova nota criada", "/notes/simple");
  return ref.id;
}

export async function updateNote(
  noteId: string,
  data: { title?: string; blocks?: NoteBlock[] },
  userId?: string
): Promise<void> {
  const payload: any = { updatedAt: serverTimestamp() };
  if (data.title !== undefined) payload.title = data.title;
  if (data.blocks !== undefined) payload.blocks = sanitizeBlocks(data.blocks);
  await updateDoc(doc(db, "notes", noteId), payload);
  if (userId && data.title) {
    await logActivity(
      userId,
      "notes",
      data.title.trim() || "Nota sem título",
      "/notes/simple"
    );
  }
}

export async function toggleFavorite(noteId: string, current: boolean): Promise<void> {
  await updateDoc(doc(db, "notes", noteId), { favorite: !current });
}

export async function deleteNote(noteId: string): Promise<void> {
  await deleteDoc(doc(db, "notes", noteId));
}
