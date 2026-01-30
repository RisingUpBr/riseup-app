import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { PRICE_ID_TO_PLAN } from "@/lib/stripe/plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    // ✅ Pega a instância do Firestore com await
    const adminDb = await getAdminDb();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session.subscription || !session.customer) break;

        const subscription = (await stripe.subscriptions.retrieve(
          session.subscription as string
        )) as any;

        const priceId = subscription.items.data[0].price.id;
        const plan = PRICE_ID_TO_PLAN[priceId];

        if (!plan) {
          console.error("Plano não encontrado:", priceId);
          break;
        }

        const uid = session.metadata?.uid;
        if (!uid) break;

        // ✅ Agora adminDb está definido corretamente
        await adminDb.doc(`users/${uid}`).set(
          {
            stripe: {
              customerId: session.customer,
              subscriptionId: subscription.id,
              status: subscription.status,
              plan,
              currentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ),
            },
            updatedAt: new Date(),
          },
          { merge: true }
        );

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;

        const priceId = subscription.items.data[0].price.id;
        const plan = PRICE_ID_TO_PLAN[priceId] ?? "free";

        // ✅ adminDb já foi definido no início do switch
        const snapshot = await adminDb
          .collection("users")
          .where("stripe.subscriptionId", "==", subscription.id)
          .limit(1)
          .get();

        if (snapshot.empty) break;

        await snapshot.docs[0].ref.update({
          stripe: {
            status: subscription.status,
            plan,
            currentPeriodEnd: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000)
              : null,
          },
          updatedAt: new Date(),
        });

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}