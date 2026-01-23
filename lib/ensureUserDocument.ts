import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { APP_PLANS } from "./appPlans";

export async function ensureUserDocument(user: {
  uid: string;
  email?: string | null;
}) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) return;

  await setDoc(ref, {
    uid: user.uid,
    email: user.email ?? null,
    role: "user",
    status: "active",
    appPlan: "free",
    createdAt: serverTimestamp(),

    entitlements: APP_PLANS.free.entitlements,

    usage: {
      notes: 0,
      flashcards: 0,
      routines: 0,
      treeNotes: 0,
      diaryNotes: 0,
      goalPlanner: 0,
      aiOrganizer: 0,
    },
  });
}
