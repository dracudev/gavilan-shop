import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateOrderStatus } from "@/services/order-service";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined in environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: NextRequest) {
  try {
    if (!webhookSecret) {
      console.error("Webhook secret is missing");
      return NextResponse.json(
        { error: "Webhook secret is not configured" },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("Missing stripe signature");
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      console.log(`Webhook received: ${event.type}`);
    } catch (err) {
      console.error(
        `Webhook signature verification failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      return NextResponse.json(
        { error: `Webhook signature verification failed` },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata?.orderId) {
        console.error("Missing orderId in session metadata");
        return NextResponse.json(
          { error: "Missing orderId in session metadata" },
          { status: 400 }
        );
      }

      const orderId = Number(session.metadata.orderId);

      try {
        await updateOrderStatus(orderId, true);
      } catch (error) {
        console.error(
          `Failed to update order status: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
        return NextResponse.json(
          { error: "Failed to update order status" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(
      `Webhook error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
