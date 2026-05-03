import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { APP_PLANS } from "./appPlans";
import { extractNameFromEmail } from "./extractName";

export async function ensureUserDocument(user: {
  uid: string;
  email?: string | null;
}) {
  try {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return;
    }

    await setDoc(ref, {
      uid: user.uid,
      email: user.email ?? null,
      name: user.email ? extractNameFromEmail(user.email) : "Você",
      role: "user",
      status: "active",
      appPlan: "free",
      plan: "free",
      createdAt: serverTimestamp(),
      entitlements: APP_PLANS.free.entitlements,
      limits: {
        simpleNotes: 10,
        dailyNotes: 5,
        mindmaps: 3,
        manualFlashcards: 20,
        aiFlashcards: 3,
        aiRoutineGenerator: 1,
        aiGoalsGenerator: 1,
        calendarRoutine: 0,
        exclusiveLibrary: 0,
      },
      usage: {
        notes: 0,
        flashcards: 0,
        routines: 0,
        treeNotes: 0,
        diaryNotes: 0,
        goalPlanner: 0,
        aiOrganizer: 0,
      },
    }, { merge: true });
  } catch (err) {
    console.error("ensureUserDocument error:", err);
  }
}
