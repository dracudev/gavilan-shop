import { useState, useEffect } from "react";
import { Order } from "@/interfaces";
import { getOrder } from "@/services/order-service";

export function useFetchOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const fetchedOrder = await getOrder(orderId);
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  return { order, loading };
}
