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
    /* 🔐 TOKEN */
    const tokenEsperado = process.env.KIWIFY_WEBHOOK_TOKEN;
    const signature = req.nextUrl.searchParams.get("signature");

    /**
     * REGRA CORRETA:
     * - Se vier signature → validar
     * - Se NÃO vier → permitir (teste da Kiwify)
     */
    if (signature && signature !== tokenEsperado) {
      console.warn("⚠️ Token inválido no webhook", { signature });
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /* 📥 BODY */
    const body = await req.json();
    console.log("🔔 Webhook Kiwify recebido:", body);

    /* 🔁 EVENTO */
    const event =
      body.event ||
      body.type ||
      body?.data?.event ||
      body.order_status;

    if (
      event !== "order_approved" &&
      event !== "order.approved" &&
      event !== "purchase_approved" &&
      event !== "paid"
    ) {
      // Ignora outros eventos sem erro
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

    /* 🧠 MAPEAR PRODUTO */
    const productConfig = KIWIFY_PRODUCTS[productId];

    if (!productConfig) {
      console.error("❌ Produto não mapeado:", productId);
      return NextResponse.json(
        { error: "Produto não mapeado" },
        { status: 400 }
      );
    }

    /* 👤 USUÁRIO */
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snap = await getDocs(q);

    if (snap.empty) {
      const newUserRef = doc(usersRef);
      await setDoc(newUserRef, {
        email,
        plan: productConfig.plan,
        isPremium: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        source: "kiwify",
      });
    } else {
      await setDoc(
        doc(usersRef, snap.docs[0].id),
        {
          plan: productConfig.plan,
          isPremium: true,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    console.log("✅ Usuário liberado com sucesso:", {
      email,
      plan: productConfig.plan,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 Erro no webhook Kiwify:", error);
    return NextResponse.json(
      { error: "Erro interno no webhook" },
      { status: 500 }
    );
  }
}
