import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CartItem } from "@/interfaces";
import { getProduct } from "@/services/product-service";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined in environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, orderId } = body;

    // Map cart items to the Stripe line_items format
    const line_items = await Promise.all(
      cartItems.map(async (item: CartItem) => {
        const product = await getProduct(item.id);
        if (!product) {
          throw new Error(`Product with ID ${item.id} not found`);
        }
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.title,
              images: [product.images[0]],
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/orders/${orderId}`,
      cancel_url: `${request.headers.get("origin")}/orders/${orderId}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
