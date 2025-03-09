"use client";

import { Title } from "@/components";
import Loading from "@/components/ui/loading/loading";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useProduct from "@/hooks/use-product";
import { useState } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const {
    products,
    loading,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  } = useProduct();
  const [newProduct, setNewProduct] = useState({
    id: "",
    description: "",
    images: [],
    inStock: 0,
    price: 0,
    sizes: [],
    slug: "",
    tags: [],
    title: "",
    type: "shirts",
    gender: "unisex",
  });

  if (loading) {
    return <Loading />;
  }

  const handleCreateProduct = async () => {
    await createNewProduct(newProduct);
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteExistingProduct(productId);
  };

  const handleUpdateProduct = async (productId: string, updatedData) => {
    await updateExistingProduct(productId, updatedData);
  };

  return (
    <>
      <Title title="Products" />
      <div className="mb-10">
        <button
          onClick={handleCreateProduct}
          className="mb-4 px-4 py-2 btn-primary"
        >
          <strong className="me-2">+</strong> New Product
        </button>
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-300 dark:bg-zinc-700 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
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
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium px-6 py-4 text-left"
              >
                Gender
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
                    <FaEdit
                      className="cursor-pointer text-yellow-500"
                      onClick={() =>
                        handleUpdateProduct(product.id, {
                          /* updatedData */
                        })
                      }
                    />
                    <FaTrash
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
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
