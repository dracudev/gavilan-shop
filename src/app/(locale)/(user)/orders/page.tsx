"use client";

import { Title } from "@/components/ui/title/title";
import Loading from "@/components/ui/loading/loading";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import useOrder from "@/hooks/order/use-order";

export default function OrdersPage() {
  const { orders, loading } = useOrder();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-300 dark:bg-zinc-700  border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium  px-6 py-4 text-left"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-sm font-medium  px-6 py-4 text-left"
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
                  {order.order_shipment[0] ? (
                    <>
                      {order.order_shipment[0].name}{" "}
                      {order.order_shipment[0].surname}
                    </>
                  ) : (
                    "No shipment info"
                  )}
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
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Link href={`/orders/${order.order_id}`}>
                      <FaEye className="cursor-pointer text-blue-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
