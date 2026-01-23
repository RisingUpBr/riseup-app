import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { canUseFeature } from "@/lib/canUseFeature";

export async function generateRoutine(
  userId: string,
  userData: any,
  input: any
) {
  if (!canUseFeature(userData, "aiRoutineGenerator")) {
    throw new Error("Limite mensal de geração de rotina atingido.");
  }

  // lógica IA futuramente

  await updateDoc(doc(db, "users", userId), {
    "usage.aiRoutineGenerator": increment(1),
  });
}
