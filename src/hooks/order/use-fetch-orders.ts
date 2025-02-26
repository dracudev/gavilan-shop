import { useState, useEffect } from "react";
import { Order } from "@/interfaces";
import { getOrders } from "@/services/order-service";

export function useFetchOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const fetchedOrders = (await getOrders()) ?? [];
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return { orders, loading };
}
