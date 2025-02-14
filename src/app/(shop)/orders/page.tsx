import { Title } from "@/components";

import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

export default function OrdersPage() {
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-zinc-800  border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-zinc-500 border-b transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-zinc-600">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                1
              </td>
              <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="flex items-center text-sm  text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                <IoCardOutline className="text-green-600" />
                <span className="mx-2 text-green-600">Paid</span>
              </td>
              <td className="text-sm text-gray-900 dark:text-white font-light px-6 ">
                <Link
                  href="/orders/1"
                  className="hover:underline hover:text-orange-600 decoration-orange-600"
                >
                  View order
                </Link>
              </td>
            </tr>

            <tr className="bg-white dark:bg-zinc-500 border-b transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-zinc-600">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                2
              </td>
              <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="flex items-center text-sm  text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">
                <IoCardOutline className="text-red-600" />
                <span className="mx-2 text-red-600">Not Paid</span>
              </td>
              <td className="text-sm text-gray-900 dark:text-white font-light px-6 ">
                <Link
                  href="/orders/2"
                  className="hover:underline hover:text-orange-600 decoration-orange-600"
                >
                  View order
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
