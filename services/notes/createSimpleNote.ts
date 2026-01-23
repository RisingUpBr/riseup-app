import { addDoc, collection, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { canUseFeature } from "@/lib/canUseFeature";

export async function createSimpleNote(
  userId: string,
  userData: any,
  note: { title: string; content: string }
) {
  if (!canUseFeature(userData, "simpleNotes")) {
    throw new Error("Você atingiu o limite de notas simples do plano gratuito.");
  }

  await addDoc(collection(db, "notes"), {
    userId,
    type: "simple",
    ...note,
    createdAt: new Date(),
  });

  await updateDoc(doc(db, "users", userId), {
    "usage.simpleNotes": increment(1),
  });
}
