import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function createUserIfNotExists(
  uid: string,
  email: string | null
) {
  if (!uid) return;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      email,
      name: "",
      role: "user",

      onboardingCompleted: false,

      // 🔑 planos padrão
      appPlan: "free",
      productPlan: "free",

      appPlanStartedAt: serverTimestamp(),
      appPlanExpiresAt: null,

      createdAt: serverTimestamp(),
    });
  }
}
