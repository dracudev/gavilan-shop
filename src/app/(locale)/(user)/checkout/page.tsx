"use client";

import { Title } from "@/components";
import { useCartStore } from "@/store";
import { useOrderStore } from "@/store/order/order-store";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { handleCheckout } from "@/services/stripe/checkout";

export default function CheckoutPage() {
  const { items, totalAmount } = useCartStore();
  const { shipmentInfo, setItems, setTotalAmount, placeOrder } =
    useOrderStore();
  // const router = useRouter();

  const handlePlaceOrder = async () => {
    setItems(items);
    setTotalAmount(totalAmount);
    const orderId = await placeOrder();
    if (!orderId) return;
    await handleCheckout(items, orderId);
    /*
    
    router.push(`/orders/${orderId}`);
    setTimeout(() => {
      clearItems();
      clearOrder();
    }, 3000);
    */
  };

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Cart Items */}
          <div className="flex flex-col mt-5">
            <Link
              href="/cart"
              className="underline mb-5 decoration-[var(--primary-color)] decoration-2"
            >
              Edit Cart
            </Link>

            {items.map((product) => (
              <div
                key={`${product.id}-${product.size}`}
                className="flex mb-5 truncate"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>
                    {product.price}€ x <span>{product.quantity}</span>
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
            <h2 className="text-2xl mb-2">Shipment</h2>
            <div className="mb-10">
              <p>
                {shipmentInfo.name} {shipmentInfo.surname}
              </p>
              <p>{shipmentInfo.address}</p>
              <p>
                {shipmentInfo.city}, {shipmentInfo.postalCode}
              </p>
              <p>{shipmentInfo.telephone}</p>
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
              {/* Disclaimer */}
              <p className="text-xs mb-2">
                By placing your order, you agree to our{" "}
                <a
                  href="www.wikipedia.com"
                  className="text-[var(--primary-color)] hover:underline decoration-[var(--primary-color)]"
                >
                  Terms of Use and Privacy Policy
                </a>
                .
              </p>
              <div
                className="flex btn-primary justify-center cursor-pointer"
                onClick={handlePlaceOrder}
              >
                Place Order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
