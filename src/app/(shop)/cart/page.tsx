import { QtySelector, Title } from "@/components";
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
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart Items */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add Items</span>
            <Link
              href="/"
              className="underline mb-5 decoration-orange-600 decoration-2"
            >
              Continue Shopping
            </Link>
          </div>

          {productsInCart.map((product) => (
            <div key={product.slug} className="flex">
              <Image
                src={`/products/${product.images[0]}`}
                alt={product.title}
                width={100}
                height={100}
                className="mr-5 rounded"
              />

              <div>
                <p>{product.title}</p>
                <p>{product.price}</p>
                <QtySelector quantity={3} />

                <button className="underline mt-3 decoration-orange-600 decoration-2">
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
        </div>
      </div>
    </div>
  );
}
