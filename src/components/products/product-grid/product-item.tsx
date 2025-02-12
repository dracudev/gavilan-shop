import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          className="w-full object-cover"
          width={500}
          height={500}
        ></Image>
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="dark:text-white hover:text-orange-600"
          href={`/products/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="font-bold">{product.price}€</span>
      </div>
    </div>
  );
}
