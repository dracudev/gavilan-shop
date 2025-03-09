"use client";

import { Title } from "@/components";
import Loading from "@/components/ui/loading/loading";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useOrder from "@/hooks/use-order";
import { useState } from "react";
import OrderModal from "@/components/ui/modal/order-modal";
import { CartItem, Order, ShipmentInfo } from "@/interfaces";

export default function OrdersPage() {
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

  if (loading) {
    return <Loading />;
  }

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
        orderData.shipmentInfo
      );
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteExistingOrder(orderId);
    }
  };

  return (
    <>
      <Title title="Orders" />
      <div className="mb-10">
        <button
          onClick={handleCreateOrderClick}
          className="mb-4 px-4 py-2 btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> New Order
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-300 dark:bg-zinc-700 border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  #ID
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium px-6 py-4 text-left"
                >
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.order_id}
                  className="bg-white dark:bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-orange-100 dark:hover:bg-orange-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.order_id}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.order_shipment[0]
                      ? `${order.order_shipment[0].name} ${order.order_shipment[0].surname}`
                      : "No shipment info"}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${order.total_amount.toFixed(2)}
                  </td>
                  <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <IoCardOutline
                      className={order.paid ? "text-green-600" : "text-red-600"}
                    />
                    <span
                      className={
                        order.paid ? "mx-2 text-green-600" : "mx-2 text-red-600"
                      }
                    >
                      {order.paid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link href={`/orders/${order.order_id}`}>
                        <FaEye className="cursor-pointer text-blue-500" />
                      </Link>
                      <FaEdit
                        className="cursor-pointer text-yellow-500"
                        onClick={() => handleEditOrderClick(order)}
                      />
                      <FaTrash
                        className="cursor-pointer text-red-500"
                        onClick={() => handleDeleteOrder(order.order_id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={currentOrder}
        onSubmit={handleModalSubmit}
        title={modalTitle}
      />
    </>
  );
}
