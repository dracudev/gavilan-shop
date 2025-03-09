"use client";

import { useState, useEffect, useCallback } from "react";
import { CartItem, Order, ShipmentInfo } from "@/interfaces";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
} from "@/services/order-service";

export default function useOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createNewOrder = async (
    userId: string,
    totalAmount: number,
    items: CartItem[],
    shipmentInfo: ShipmentInfo
  ) => {
    try {
      const orderId = await createOrder(
        userId,
        totalAmount,
        items,
        shipmentInfo
      );

      if (orderId) {
        fetchOrders();
        return orderId;
      }

      return null;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  const updateOrderPaymentStatus = async (orderId: string, isPaid: boolean) => {
    try {
      await updateOrderStatus(Number(orderId), isPaid);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, paid: isPaid } : order
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating order payment status:", error);
      return false;
    }
  };

  const updateExistingOrder = async (orderId: string, data: Order) => {
    try {
      await updateOrder(orderId, data);
      fetchOrders();
      return true;
    } catch (error) {
      console.error("Error updating order:", error);
      return false;
    }
  };

  const deleteExistingOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.order_id !== orderId)
      );
      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      return false;
    }
  };

  return {
    orders,
    loading,
    createNewOrder,
    updateOrderPaymentStatus,
    updateExistingOrder,
    deleteExistingOrder,
    refreshOrders: fetchOrders,
  };
}
