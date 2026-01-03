import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_MAP: Record<string, string | undefined> = {
  mensal: process.env.STRIPE_PRICE_MENSAL,
  anual: process.env.STRIPE_PRICE_ANUAL,
  quinzenal: process.env.STRIPE_PRICE_QUINZENAL,
};

export async function POST(req: Request) {
  try {
    const { uid, email, plan } = await req.json();

    if (!uid || !email || !plan) {
      return NextResponse.json(
        { error: "uid, email e plan são obrigatórios" },
        { status: 400 }
      );
    }

    const priceId = PRICE_MAP[plan];

    if (!priceId) {
      return NextResponse.json(
        { error: "Plano inválido" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      metadata: {
        uid,
        plan,
      },

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erro no checkout:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

