import { doc, updateDoc, increment, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { canUseFeature } from "@/lib/canUseFeature";

export async function createMindmap({
  user,
  userData,
  title,
}: {
  user: any;
  userData: any;
  title: string;
}) {
  if (!canUseFeature(userData, "mindmaps")) {
    throw new Error("MINDMAP_LIMIT_REACHED");
  }

  // 🔹 Cria o mindmap
  await addDoc(collection(db, "mindmaps"), {
    uid: user.uid,
    title,
    nodes: [],
    createdAt: new Date(),
  });

  // 🔹 Incrementa uso
  await updateDoc(doc(db, "users", user.uid), {
    "usage.mindmaps": increment(1),
  });
}
