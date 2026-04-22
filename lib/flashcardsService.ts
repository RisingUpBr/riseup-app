import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, onSnapshot,
  serverTimestamp, Timestamp, getDocs, writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { logActivity } from "./activityService";

export interface Deck {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  description: string;
  cardCount: number;
  reviewCount: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface Flashcard {
  id: string;
  deckId: string;
  userId: string;
  front: string;
  back: string;
  source: "manual" | "ai";
  difficulty: number;
  reviewedAt: Timestamp | null;
  createdAt: Timestamp | null;
}

export function subscribeToDecks(
  userId: string,
  callback: (decks: Deck[]) => void
): () => void {
  const q = query(
    collection(db, "decks"),
    where("userId", "==", userId)
  );
  return onSnapshot(q, (snap) => {
    const decks = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Deck))
      .sort((a, b) => {
        const at = a.updatedAt?.toDate?.()?.getTime() ?? 0;
        const bt = b.updatedAt?.toDate?.()?.getTime() ?? 0;
        return bt - at;
      });
    callback(decks);
  }, (error) => {
    console.error("subscribeToDecks error:", error);
  });
}

export function subscribeToCards(
  deckId: string,
  callback: (cards: Flashcard[]) => void
): () => void {
  const q = query(
    collection(db, "flashcards"),
    where("deckId", "==", deckId)
  );
  return onSnapshot(q, (snap) => {
    const cards = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Flashcard))
      .sort((a, b) => {
        const at = a.createdAt?.toDate?.()?.getTime() ?? 0;
        const bt = b.createdAt?.toDate?.()?.getTime() ?? 0;
        return at - bt;
      });
    callback(cards);
  }, (error) => {
    console.error("subscribeToCards error:", error);
  });
}

export async function createDeck(
  userId: string,
  data: { name: string; emoji: string; description: string }
): Promise<string> {
  const ref = await addDoc(collection(db, "decks"), {
    userId,
    name: data.name,
    emoji: data.emoji,
    description: data.description,
    cardCount: 0,
    reviewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateDeck(
  deckId: string,
  data: Partial<Pick<Deck, "name" | "emoji" | "description">>
): Promise<void> {
  await updateDoc(doc(db, "decks", deckId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDeck(deckId: string, userId: string): Promise<void> {
  const cardsSnap = await getDocs(
    query(collection(db, "flashcards"), where("deckId", "==", deckId))
  );
  const batch = writeBatch(db);
  cardsSnap.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(doc(db, "decks", deckId));
  await batch.commit();
}

export async function createCard(
  userId: string,
  deckId: string,
  front: string,
  back: string,
  source: "manual" | "ai" = "manual"
): Promise<void> {
  await addDoc(collection(db, "flashcards"), {
    userId,
    deckId,
    front: front.trim(),
    back: back.trim(),
    source,
    difficulty: 0,
    reviewedAt: null,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, "decks", deckId), {
    cardCount: (await getDocs(query(collection(db, "flashcards"), where("deckId", "==", deckId)))).size,
    updatedAt: serverTimestamp(),
  });
  await logActivity(userId, "flashcards", `Card adicionado`, "/flashcards/ai");
}

export async function updateCard(
  cardId: string,
  data: Partial<Pick<Flashcard, "front" | "back" | "difficulty">>
): Promise<void> {
  await updateDoc(doc(db, "flashcards", cardId), data);
}

export async function deleteCard(cardId: string, deckId: string): Promise<void> {
  await deleteDoc(doc(db, "flashcards", cardId));
  const remaining = await getDocs(
    query(collection(db, "flashcards"), where("deckId", "==", deckId))
  );
  await updateDoc(doc(db, "decks", deckId), {
    cardCount: remaining.size,
    updatedAt: serverTimestamp(),
  });
}

export async function reviewCard(
  cardId: string,
  deckId: string,
  correct: boolean
): Promise<void> {
  await updateDoc(doc(db, "flashcards", cardId), {
    difficulty: correct ? 1 : 2,
    reviewedAt: serverTimestamp(),
  });
  const allCards = await getDocs(
    query(collection(db, "flashcards"), where("deckId", "==", deckId))
  );
  const reviewed = allCards.docs.filter(
    (d) => d.data().reviewedAt !== null && d.data().difficulty === 1
  ).length;
  await updateDoc(doc(db, "decks", deckId), {
    reviewCount: reviewed,
    updatedAt: serverTimestamp(),
  });
}

export function getCardsToReview(cards: Flashcard[]): Flashcard[] {
  return cards.filter((c) => {
    if (!c.reviewedAt) return true;
    if (c.difficulty === 2) return true;
    return false;
  });
}

export const DECK_EMOJIS = ["📚", "⚖️", "💻", "🧬", "🎯", "🌍", "🎨", "🧮", "📖", "🔬", "🏛️", "💡", "🎵", "✈️", "🍎"];
