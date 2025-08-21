"use client";

import { Title } from "@/components/ui/title";
import Loading from "@/components/ui/loading";
import Link from "next/link";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Image from "next/image";
import ProductModal from "@/components/ui/modal/product-modal";
import { useProductsPage } from "@/hooks/product/use-products-page";

export default function ProductsPage() {
  const {
    products,
    loading,
    isModalOpen,
    setIsModalOpen,
    currentProduct,
    modalTitle,
    handleCreateProductClick,
    handleEditProductClick,
    handleModalSubmit,
    handleDeleteProduct,
  } = useProductsPage();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center ">
        <Title title="Products" />
        <button
          onClick={handleCreateProductClick}
          className="mb-4 px-4 py-2 btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> New Product
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
                      src={product.images[0]}
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
                        onClick={() => handleEditProductClick(product)}
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
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={currentProduct}
        onSubmit={handleModalSubmit}
        title={modalTitle}
      />
    </>
  );
}
