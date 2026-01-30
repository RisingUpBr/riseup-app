import { getAdminDb } from "./firebaseAdmin";
import admin from "firebase-admin";
import { stripe } from "./stripe";

export async function createUserIfNotExists(
  uid: string,
  email: string
) {
  // ✅ Pega a instância do Firestore
  const db = await getAdminDb();
  
  const userRef = db.collection("users").doc(uid);
  const snap = await userRef.get();

  if (snap.exists) {
    return snap.data();
  }

  // 🔹 Cria Customer na Stripe
  const customer = await stripe.customers.create({
    email,
    metadata: {
      uid,
    },
  });

  const userData = {
    email,
    stripeCustomerId: customer.id,
    subscriptionStatus: "free",
    plan: "free",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await userRef.set(userData);

  return userData;
}