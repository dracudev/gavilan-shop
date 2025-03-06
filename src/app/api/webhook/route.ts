import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { updateOrderStatus } from "@/services/order-service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let event;

    try {
      const rawBody = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
        req.on("error", reject);
      });

      const signature = req.headers["stripe-signature"]!;
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret!
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error verifying webhook signature:", err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      } else {
        console.error("Unknown error:", err);
        return res.status(400).send("Webhook Error: Unknown error occurred");
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!session.metadata || !session.metadata.orderId) {
        console.error("Missing orderId in session metadata");
        return res
          .status(400)
          .send("Webhook Error: Missing orderId in session metadata");
      }
      const orderId = session.metadata.orderId;

      try {
        await updateOrderStatus(orderId, true);
        console.log(`Order ${orderId} marked as paid`);
      } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).send("Internal Server Error");
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
