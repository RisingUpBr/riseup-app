// lib/incrementUsage.ts

import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { FeatureKey } from "./canUseFeature";

export async function incrementUsage(
  uid: string,
  feature: FeatureKey
): Promise<void> {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    [`usage.${feature}`]: increment(1),
    updatedAt: serverTimestamp(),
  });
}
