import * as admin from "firebase-admin";

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("⚠️ Firebase Admin: Credenciais não encontradas");
    return null;
  }

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
    console.log("✅ Firebase Admin inicializado");
    return app;
  } catch (error) {
    console.error("❌ Erro Firebase Admin:", error);
    return null;
  }
}

initializeFirebaseAdmin();

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();