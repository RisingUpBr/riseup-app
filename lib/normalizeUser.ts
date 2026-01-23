import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function normalizeUser(uid: string, data: any) {
  const ref = doc(db, "users", uid);

  const isPremium = data?.stripe?.status === "active";

  const limits = isPremium
    ? {
        simpleNotes: Infinity,
        dailyNotes: Infinity,
        mindmaps: Infinity,
        manualFlashcards: Infinity,
        aiFlashcards: Infinity,
        aiRoutineGenerator: Infinity,
        aiGoalsGenerator: Infinity,
        calendarRoutine: Infinity,
        exclusiveLibrary: Infinity,
      }
    : {
        simpleNotes: 20,
        dailyNotes: 5,
        mindmaps: 0, // 🔒 BLOQUEADO
        manualFlashcards: 20,
        aiFlashcards: 3,
        aiRoutineGenerator: 1,
        aiGoalsGenerator: 1,
        calendarRoutine: 0, // 🔒 BLOQUEADO
        exclusiveLibrary: 0, // 🔒 BLOQUEADO
      };

  const usage = data?.usage ?? {
    simpleNotes: 0,
    dailyNotes: 0,
    manualFlashcards: 0,
    aiFlashcards: 0,
    aiRoutineGenerator: 0,
    aiGoalsGenerator: 0,
  };

  const resetAt =
    data?.usageResetAt ??
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await setDoc(
    ref,
    {
      plan: isPremium ? "premium" : "free",
      limits,
      usage,
      usageResetAt: resetAt,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
