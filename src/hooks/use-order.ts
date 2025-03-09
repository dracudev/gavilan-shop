import { useState, useEffect } from "react";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/services/order-service";
import { Order, CartItem, ShipmentInfo } from "@/interfaces";

const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrder(orderId);
      setOrder(data);
    } catch {
      setError("Error fetching order");
    } finally {
      setLoading(false);
    }
  };

  const createNewOrder = async (
    userId: string,
    totalAmount: number,
    items: CartItem[],
    shipmentInfo: ShipmentInfo
  ) => {
    setLoading(true);
    setError(null);
    try {
      const orderId = await createOrder(
        userId,
        totalAmount,
        items,
        shipmentInfo
      );
      if (orderId) {
        await fetchOrders();
      }
    } catch {
      setError("Error creating order");
    } finally {
      setLoading(false);
    }
  };

  const updateExistingOrder = async (orderId: string, data: Order) => {
    setLoading(true);
    setError(null);
    try {
      await updateOrder(orderId, data);
      await fetchOrders();
    } catch {
      setError("Error updating order");
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingOrder = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteOrder(orderId);
      await fetchOrders();
    } catch {
      setError("Error deleting order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    order,
    loading,
    error,
    fetchOrders,
    fetchOrder,
    createNewOrder,
    updateExistingOrder,
    deleteExistingOrder,
  };
};

export default useOrder;
