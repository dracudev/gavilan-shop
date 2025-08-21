"use client";

import { Title } from "@/components/ui/title";
import Loading from "@/components/ui/loading";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import OrderModal from "@/components/ui/modal/order-modal";
import { useOrdersPage } from "@/hooks/order/use-orders-page";

export default function OrdersPage() {
  const {
    orders,
    loading,
    isModalOpen,
    setIsModalOpen,
    currentOrder,
    modalTitle,
    handleCreateOrderClick,
    handleEditOrderClick,
    handleModalSubmit,
    handleDeleteOrder,
  } = useOrdersPage();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center ">
        <Title title="Orders" />
        <button
          onClick={handleCreateOrderClick}
          className="mb-4 px-4 py-2 btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> New Order
        </button>
      </div>
      <div className="mb-10">
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-300 dark:bg-zinc-800 border-b">
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
