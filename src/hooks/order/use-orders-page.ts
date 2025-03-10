import { useState } from "react";
import { CartItem, Order, ShipmentInfo } from "@/interfaces";
import useOrder from "@/hooks/order/use-order";

export const useOrdersPage = () => {
  const {
    orders,
    loading,
    createNewOrder,
    updateExistingOrder,
    deleteExistingOrder,
  } = useOrder();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [modalTitle, setModalTitle] = useState("Create New Order");

  const handleCreateOrderClick = () => {
    setCurrentOrder(null);
    setModalTitle("Create New Order");
    setIsModalOpen(true);
  };

  const handleEditOrderClick = (order: Order) => {
    setCurrentOrder(order);
    setModalTitle(`Edit Order #${order.order_id}`);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (orderData: {
    userId: string;
    totalAmount: number;
    items: CartItem[];
    shipmentInfo: ShipmentInfo;
    paid?: boolean;
  }) => {
    if (currentOrder) {
      // Update existing order
      const updatedOrder: Order = {
        order_id: currentOrder.order_id,
        user_id: orderData.userId,
        total_amount: orderData.totalAmount,
        paid: orderData.paid || false,
        order_items: orderData.items.map((item) => ({
          product_id: item.id,
          title: item.title,
          image: item.image,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        })),
        order_shipment: [
          {
            name: orderData.shipmentInfo.name,
            surname: orderData.shipmentInfo.surname,
            address: orderData.shipmentInfo.address,
            address_2: orderData.shipmentInfo.address2 || "",
            postal_code: orderData.shipmentInfo.postalCode,
            city: orderData.shipmentInfo.city,
            country: orderData.shipmentInfo.country,
            telephone: orderData.shipmentInfo.telephone,
          },
        ],
      };

      await updateExistingOrder(currentOrder.order_id, updatedOrder);
    } else {
      // Create new order
      await createNewOrder(
        orderData.userId,
        orderData.totalAmount,
        orderData.items,
        orderData.shipmentInfo,
        orderData.paid
      );
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteExistingOrder(orderId);
    }
  };

  return {
    orders,
    loading,
    isModalOpen,
    setIsModalOpen,
    currentOrder,
    setCurrentOrder,
    modalTitle,
    setModalTitle,
    handleCreateOrderClick,
    handleEditOrderClick,
    handleModalSubmit,
    handleDeleteOrder,
  };
};
