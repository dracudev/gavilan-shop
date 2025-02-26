"use client";

import { Title } from "@/components";
import { useFetchOrders } from "@/hooks/order/use-fetch-orders";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

export default function OrdersPage() {
  const { orders, loading } = useFetchOrders();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-zinc-800 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="bg-white dark:bg-zinc-500 border-b transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-zinc-600"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.order_id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.order_shipment[0].name}{" "}
                  {order.order_shipment[0].surname}
                </td>
                <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={
                      order.paid === true ? "text-green-600" : "text-red-600"
                    }
                  />
                  <span
                    className={
                      order.paid === true
                        ? "mx-2 text-green-600"
                        : "mx-2 text-red-600"
                    }
                  >
                    {order.paid === true ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6">
                  <Link
                    href={`/orders/${order.order_id}`}
                    className="hover:underline hover:text-[var(--primary-color)] decoration-[var(--primary-color)]"
                  >
                    View order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
