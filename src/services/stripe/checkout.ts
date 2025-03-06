import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/interfaces";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error(
    "Stripe publishable key is not defined in environment variables"
  );
}

const stripePromise = loadStripe(stripePublishableKey);

export const handleCheckout = async (products: CartItem[], orderId: string) => {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error("Failed to load Stripe");
  }

  const response = await fetch("/api/checkout-sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItems: products,
      orderId: orderId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create checkout session");
  }

  const session = await response.json();

  if (!session.sessionId) {
    throw new Error("Session ID is missing in the response");
  }

  await stripe.redirectToCheckout({
    sessionId: session.sessionId,
  });
};
