"use client";

import { QtySelector } from "@/components/product/qty-selector/qty-selector";
import { Title } from "@/components/ui/title/title";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useCartStore } from "@/store/cart/cart-store";
import { useEffect } from "react";

export default function CartPage() {
  const { items, removeItem, totalAmount } = useCartStore();

  useEffect(() => {
    if (items.length === 0) {
      redirect("/cart/empty");
    }
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Cart Items */}
          <div className="flex flex-col mt-5">
            <Link
              href="/"
              className="underline mb-5 decoration-[var(--primary-color)] decoration-2"
            >
              Continue Shopping
            </Link>

            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex mb-5 truncate"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.title}</p>
                  <p>{item.price}€</p>
                  <p>Size: {item.size}</p>
                  <QtySelector id={item.id} />

                  <button
                    className="underline mt-3 decoration-[var(--primary-color)] decoration-2"
                    onClick={() => removeItem(item.id, item.size)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className=" bg-white dark:bg-zinc-800  shadow-xl p-7 rounded h-fit">
            <h2 className="text-2xl mb-2 ">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>Shipment</span>
              <span className="text-right">4,99€</span>

              <span>Sales Tax</span>
              <span className="text-right">4,99€</span>

              <span className="mt-5 font-bold text-2xl">Subtotal:</span>
              <span className="text-right mt-5 font-bold text-2xl">
                {totalAmount}€
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center "
                href="/checkout/shipment"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
