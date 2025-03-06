import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/services/order-service";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Base URL is not defined in environment variables");
}

// Handle GET request for updating order status via URL redirection
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const paid = searchParams.get("paid") === "true";

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId in query parameters" },
        { status: 400 }
      );
    }

    try {
      await updateOrderStatus(Number(orderId), paid);
      const origin = request.headers.get("origin") || baseUrl;
      return NextResponse.redirect(`${origin}/orders/${orderId}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to update order status: ${error.message}`);
        return NextResponse.json(
          { error: `Failed to update order status: ${error.message}` },
          { status: 500 }
        );
      } else {
        console.error("Failed to update order status: Unknown error");
        return NextResponse.json(
          { error: "Failed to update order status: Unknown error" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Server error: ${error.message}`);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    } else {
      console.error("Server error: Unknown error");
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
