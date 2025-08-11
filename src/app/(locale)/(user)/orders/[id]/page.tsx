"use client";

import { Title } from "@/components/ui/title/title";
import Loading from "@/components/ui/loading/loading";
import { useFetchOrder } from "@/hooks/order/use-fetch-order";
import clsx from "clsx";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const { order, loading } = useFetchOrder(id);

  if (loading) {
    return <Loading />;
  }

  if (!order) {
    return notFound();
  }

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
                  "bg-red-500": !order.paid,
                  "bg-green-700": order.paid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">{order.paid ? "Paid" : "Pending"}</span>
            </div>

            {order.order_items.map((product) => (
              <div
                key={`${product.product_id}-${product.size}`}
                className="flex mb-5 truncate"
              >
                <Image
                  src={product.image}
                  alt={product.product_id}
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>
                    {product.price}€ x {product.quantity} ({product.size})
                  </p>
                  <p className="font-bold">
                    Subtotal: {product.price * product.quantity}€
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white dark:bg-zinc-800 shadow-xl p-7 rounded h-fit">
            <h2 className="text-2xl mb-2">Shipment</h2>
            <div className="mb-10">
              {order.order_shipment[0] ? (
                <>
                  <p>
                    {order.order_shipment[0].name}{" "}
                    {order.order_shipment[0].surname}
                  </p>
                  <p>{order.order_shipment[0].address}</p>
                  <p>
                    {order.order_shipment[0].city},{" "}
                    {order.order_shipment[0].postal_code}
                  </p>
                  <p>{order.order_shipment[0].telephone}</p>
                </>
              ) : (
                <p>No shipment info</p>
              )}
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>Shipment</span>
              <span className="text-right">4,99€</span>

              <span>Sales Tax</span>
              <span className="text-right">4,99€</span>

              <span className="mt-5 font-bold text-2xl">Total:</span>
              <span className="text-right mt-5 font-bold text-2xl">
                {order.total_amount}€
              </span>
            </div>
            <div
              className={clsx(
                "flex items-center rounded-lg py-1 mt-5 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order.paid,
                  "bg-green-700": order.paid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">{order.paid ? "Paid" : "Pending"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
