import Stripe from "stripe";
import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/services/order-service";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined in environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event;
    try {
      if (!webhookSecret) {
        throw new Error(
          "Stripe webhook secret is not defined in environment variables"
        );
      }
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error("Error verifying webhook signature:", err);
      return NextResponse.json(
        {
          error: `Webhook Error: ${
            err instanceof Error ? err.message : "Unknown error occurred"
          }`,
        },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!session.metadata || !session.metadata.orderId) {
        console.error("Missing orderId in session metadata");
        return NextResponse.json(
          { error: "Webhook Error: Missing orderId in session metadata" },
          { status: 400 }
        );
      }
      const orderId = session.metadata.orderId;

      try {
        await updateOrderStatus(orderId, true);
        console.log(`Order ${orderId} marked as paid`);
      } catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error handling webhook request:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
