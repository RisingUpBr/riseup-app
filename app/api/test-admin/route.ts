import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // teste simples: listar 1 usuário
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
