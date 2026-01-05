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
    /* 📥 BODY */
    const body = await req.json();

    /* 🧪 LOG PARA DEBUG */
    console.log("🔔 Webhook Kiwify recebido:", body);

    /* 🔐 VALIDAR TOKEN (HEADER) */
    const tokenEsperado = process.env.KIWIFY_WEBHOOK_TOKEN;

    const authHeader =
      req.headers.get("authorization") ||
      req.headers.get("x-kiwify-token");

    const tokenRecebido = authHeader?.replace("Bearer ", "");

    if (!tokenEsperado || tokenRecebido !== tokenEsperado) {
      console.warn("⚠️ Token inválido no webhook");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* 🔁 NORMALIZAR EVENTO */
    const event =
      body.event ||
      body.type ||
      body?.data?.event;

    if (
      event !== "order_approved" &&
      event !== "order.approved" &&
      event !== "purchase_approved"
    ) {
      // Aceita outros eventos sem erro
      return NextResponse.json({ ok: true });
    }

    /* 📦 DADOS ESSENCIAIS */
    const email =
      body.customer?.email ||
      body.buyer?.email ||
      body.email;

    const productId =
      body.product?.id ||
      body.product_id ||
      body?.product?.product_id;

    if (!email || !productId) {
      console.error("❌ Email ou Product ID ausentes", {
        email,
        productId,
      });
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes" },
        { status: 400 }
      );
    }

    /* 🧠 MAPEAR PRODUTO → PLANO */
    const productConfig = KIWIFY_PRODUCTS[productId];

    if (!productConfig) {
      console.error("❌ Produto não mapeado:", productId);
      return NextResponse.json(
        { error: "Produto não mapeado" },
        { status: 400 }
      );
    }

    /* 👤 BUSCAR USUÁRIO PELO EMAIL */
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snap = await getDocs(q);

    let userId: string;

    if (snap.empty) {
      /* ➕ CRIAR USUÁRIO */
      const newUserRef = doc(usersRef);
      await setDoc(newUserRef, {
        email,
        plan: productConfig.plan,
        isPremium: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        source: "kiwify",
      });
      userId = newUserRef.id;
    } else {
      /* ♻️ ATUALIZAR USUÁRIO */
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

    console.log("✅ Usuário atualizado com sucesso:", {
      userId,
      email,
      plan: productConfig.plan,
    });

    /* ✅ SUCESSO */
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 Erro no webhook Kiwify:", error);
    return NextResponse.json(
      { error: "Erro interno no webhook" },
      { status: 500 }
    );
  }
}
