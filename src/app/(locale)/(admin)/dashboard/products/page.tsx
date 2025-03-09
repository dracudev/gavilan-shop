"use client";

import { Title } from "@/components";
import Loading from "@/components/ui/loading/loading";
import { useFetchProducts } from "@/hooks/product/use-fetch-products";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function ProductsPage() {
  const { products, loading } = useFetchProducts();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Title title="Products" />

      <div className="mb-10">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-300 dark:bg-zinc-700  border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium  px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Description
              </th>
              <th
                scope="col"
                className="text-sm font-medium  px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium  px-6 py-4 text-left"
              >
                Gender
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
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white dark:bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-orange-100 dark:hover:bg-orange-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                    width={500}
                    height={500}
                  />
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate max-w-xs">
                  {product.title}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate max-w-xs">
                  {product.description}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  ${product.price}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Link href={`/product/${product.slug}`}>
                      <FaEye className="cursor-pointer text-blue-500" />
                    </Link>
                    <FaEdit className="cursor-pointer text-yellow-500" />
                    <FaTrash className="cursor-pointer text-red-500" />
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
