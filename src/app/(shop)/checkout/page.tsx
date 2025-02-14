import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {/* Cart Items */}
          <div className="flex flex-col mt-5">
            <Link
              href="/cart"
              className="underline mb-5 decoration-orange-600 decoration-2"
            >
              Edit Cart
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
                  <p>{product.price}€ x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white dark:bg-zinc-800  shadow-xl p-7 rounded">
            <h2 className="text-2xl mb-2">Address</h2>
            <div className="mb-10">
              <p>Javier Andreu</p>
              <p>Carrer Aurora</p>
              <p>Barcelona, 08001</p>
              <p>637358834</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 dark:text-white">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>Shipment</span>
              <span className="text-right">4,99€</span>

              <span>Sales Tax</span>
              <span className="text-right">4,99€</span>

              <span className="mt-5 font-bold text-2xl">Total:</span>
              <span className="text-right mt-5 font-bold text-2xl">300€</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* Disclaimer */}
              <p className="text-xs mb-2">
                By placing your order, you agree to our{" "}
                <a
                  href="www.wikipedia.com"
                  className="text-orange-600 hover:underline decoration-orange-600"
                >
                  Terms of Use and Privacy Policy
                </a>
                .
              </p>
              <Link
                className="flex btn-primary justify-center "
                href="/orders/1"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
