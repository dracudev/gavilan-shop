"use client";

import { Title } from "@/components";
import { useCartStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default function OrderPage() {
  const { id } = useParams();
  const { items, totalAmount } = useCartStore();

  // TODO: Validate id and fetch order data from DB

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Cart Items */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Paid</span>
            </div>

            {items.map((product) => (
              <div
                key={`${product.id}-${product.size}`}
                className="flex mb-5 truncate"
              >
                <Image
                  src={`/products/${product.image}`}
                  alt={product.title}
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>
                    {product.price}€ x {product.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: ${product.price * product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white dark:bg-zinc-800  shadow-xl p-7 rounded h-fit">
            <h2 className="text-2xl mb-2">Address</h2>
            <div className="mb-10">
              <p>Javier Andreu</p>
              <p>Carrer Aurora</p>
              <p>Barcelona, 08001</p>
              <p>637358834</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 ">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>Shipment</span>
              <span className="text-right">4,99€</span>

              <span>Sales Tax</span>
              <span className="text-right">4,99€</span>

              <span className="mt-5 font-bold text-2xl">Total:</span>
              <span className="text-right mt-5 font-bold text-2xl">
                {totalAmount}€
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {" "}
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
