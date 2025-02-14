"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const [isHovered, setIsHovered] = useState(product.images[0]);

  return (
    <div className="md:rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${isHovered}`}
          alt={product.title}
          className="w-full object-cover sm:rounded"
          width={500}
          height={500}
          onMouseEnter={() => setIsHovered(product.images[1])}
          onMouseLeave={() => setIsHovered(product.images[0])}
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
