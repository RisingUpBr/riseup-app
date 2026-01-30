import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

let adminApp: App | null = null;
let adminAuthInstance: Auth | null = null;
let adminDbInstance: Firestore | null = null;

async function initializeAdmin() {
  if (adminApp) {
    return adminApp;
  }

  // Lazy import - só carrega quando chamado
  const { initializeApp, getApps, cert } = await import("firebase-admin/app");

  // Se já existe uma app
  const existingApps = getApps();
  if (existingApps.length > 0) {
    adminApp = existingApps[0];
    return adminApp;
  }

  // Credenciais
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("⚠️ Firebase Admin: Credenciais não encontradas");
    return null;
  }

  try {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
    console.log("✅ Firebase Admin inicializado");
    return adminApp;
  } catch (error) {
    console.error("❌ Erro Firebase Admin:", error);
    return null;
  }
}

export async function getAdminAuth(): Promise<Auth> {
  if (adminAuthInstance) {
    return adminAuthInstance;
  }

  const { getAuth } = await import("firebase-admin/auth");
  const app = await initializeAdmin();

  if (!app) {
    throw new Error("Firebase Admin não inicializado");
  }

  adminAuthInstance = getAuth(app);
  return adminAuthInstance;
}

export async function getAdminDb(): Promise<Firestore> {
  if (adminDbInstance) {
    return adminDbInstance;
  }

  const { getFirestore } = await import("firebase-admin/firestore");
  const app = await initializeAdmin();

  if (!app) {
    throw new Error("Firebase Admin não inicializado");
  }

  adminDbInstance = getFirestore(app);
  return adminDbInstance;
}

// Mantém exports antigos mas agora como funções
export const adminAuth = getAdminAuth;
export const adminDb = getAdminDb;