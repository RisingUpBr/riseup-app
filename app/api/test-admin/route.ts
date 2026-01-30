import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // ✅ Pega a instância do Firestore primeiro
    const adminDb = await getAdminDb();
    
    // ✅ Agora pode usar normalmente
    const snap = await adminDb.collection("users").limit(1).get();

    return NextResponse.json({
      success: true,
      usersFound: snap.size,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
