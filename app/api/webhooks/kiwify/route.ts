import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { KIWIFY_PRODUCTS } from "@/lib/kiwifyProducts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /* 🔐 1️⃣ VALIDAR TOKEN DO WEBHOOK */
    const tokenEsperado = process.env.KIWIFY_WEBHOOK_TOKEN;

    if (!tokenEsperado || body.token !== tokenEsperado) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    /* 🔁 2️⃣ PROCESSAR SOMENTE COMPRA APROVADA */
    if (body.event !== "order_approved") {
      return NextResponse.json({ ok: true });
    }

    /* 📦 3️⃣ DADOS ESSENCIAIS */
    const email = body.customer?.email;
    const productId = body.product?.id;

    if (!email || !productId) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes" },
        { status: 400 }
      );
    }

    /* 🧠 4️⃣ MAPEAR PRODUTO → PLANO */
    const productConfig = KIWIFY_PRODUCTS[productId];

    if (!productConfig) {
      return NextResponse.json(
        { error: "Produto não mapeado" },
        { status: 400 }
      );
    }

    /* 👤 5️⃣ BUSCAR USUÁRIO PELO EMAIL */
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snap = await getDocs(q);

    let userId: string;

    if (snap.empty) {
      /* ➕ CRIA USUÁRIO SE NÃO EXISTIR */
      const newUserRef = doc(usersRef);
      await setDoc(newUserRef, {
        email,
        plan: productConfig.plan, // basico | essencial | avancado
        isPremium: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      userId = newUserRef.id;
    } else {
      /* ♻️ ATUALIZA USUÁRIO EXISTENTE */
      userId = snap.docs[0].id;
      await setDoc(
        doc(usersRef, userId),
        {
          plan: productConfig.plan,
          isPremium: true,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    /* ✅ SUCESSO */
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no webhook Kiwify:", error);
    return NextResponse.json(
      { error: "Erro interno no webhook" },
      { status: 500 }
    );
  }
}
