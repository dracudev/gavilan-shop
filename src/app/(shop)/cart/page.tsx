import { QtySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  if (productsInCart.length === 0) redirect("/empty");

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Cart Items */}
          <div className="flex flex-col mt-5">
            <Link
              href="/"
              className="underline mb-5 decoration-orange-600 decoration-2"
            >
              Continue Shopping
            </Link>

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5 truncate">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{product.price}€</p>
                  <QtySelector quantity={3} />

                  <button className="underline mt-3 decoration-orange-600 decoration-2">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white dark:bg-zinc-800  shadow-xl p-7 rounded">
            <h2 className="text-2xl mb-2 dark:text-white">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>Shipment</span>
              <span className="text-right">4,99€</span>

              <span>Sales Tax</span>
              <span className="text-right">4,99€</span>

              <span className="mt-5 font-bold text-2xl">Subtotal:</span>
              <span className="text-right mt-5 font-bold text-2xl">300€</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center "
                href="/checkout/address"
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
