import { NextResponse } from "next/server";
import { createUserIfNotExists } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { uid, email } = await request.json();

    if (!uid || !email) {
      return NextResponse.json(
        { error: "uid e email são obrigatórios" },
        { status: 400 }
      );
    }

    const userData = await createUserIfNotExists(uid, email);

    return NextResponse.json({ success: true, user: userData });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}