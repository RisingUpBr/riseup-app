import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { canUseFeature } from "@/lib/canUseFeature";

export async function generateAIFlashcards(
  userId: string,
  userData: any,
  prompt: string
) {
  if (!canUseFeature(userData, "aiFlashcards")) {
    throw new Error("Limite mensal de flashcards por IA atingido.");
  }

  // 👉 aqui entra a chamada da IA futuramente

  await updateDoc(doc(db, "users", userId), {
    "usage.aiFlashcards": increment(1),
  });
}
