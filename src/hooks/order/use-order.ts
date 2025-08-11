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

export default function useOrder(
  addToast?: (toast: {
    title: string;
    description?: string;
    type: "success" | "error" | "warning" | "info";
  }) => void
) {
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
    shipmentInfo: ShipmentInfo,
    paid: boolean = false
  ) => {
    try {
      const orderId = await createOrder(
        userId,
        totalAmount,
        items,
        shipmentInfo,
        paid
      );

      if (orderId) {
        fetchOrders();
        addToast?.({
          title: "Order created",
          description: `Order #${orderId} has been successfully created`,
          type: "success",
        });
        return orderId;
      }

      addToast?.({
        title: "Order creation failed",
        description: "There was an error creating the order",
        type: "error",
      });
      return null;
    } catch (error) {
      console.error("Error creating order:", error);
      addToast?.({
        title: "Order creation failed",
        description: "An unexpected error occurred while creating the order",
        type: "error",
      });
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
      addToast?.({
        title: "Payment status updated",
        description: `Order #${orderId} payment status has been updated`,
        type: "success",
      });
      return true;
    } catch (error) {
      console.error("Error updating order payment status:", error);
      addToast?.({
        title: "Update failed",
        description: "There was an error updating the payment status",
        type: "error",
      });
      return false;
    }
  };

  const updateExistingOrder = async (orderId: string, data: Order) => {
    try {
      await updateOrder(orderId, data);
      fetchOrders();
      addToast?.({
        title: "Order updated",
        description: `Order #${orderId} has been successfully updated`,
        type: "success",
      });
      return true;
    } catch (error) {
      console.error("Error updating order:", error);
      addToast?.({
        title: "Update failed",
        description: "There was an error updating the order",
        type: "error",
      });
      return false;
    }
  };

  const deleteExistingOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.order_id !== orderId)
      );
      addToast?.({
        title: "Order deleted",
        description: `Order #${orderId} has been successfully removed`,
        type: "success",
      });
      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      addToast?.({
        title: "Deletion failed",
        description: "There was an error deleting the order",
        type: "error",
      });
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
