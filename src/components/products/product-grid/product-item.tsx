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
  const [imageError, setImageError] = useState(false);

  return (
    <div className="md:rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`} prefetch={false}>
        <Image
          src={
            imageError ? "/imgs/fallback-image.webp" : `/products/${isHovered}`
          }
          alt={product.title}
          className="w-full object-cover sm:rounded"
          width={500}
          height={500}
          onMouseEnter={() => setIsHovered(product.images[1])}
          onMouseLeave={() => setIsHovered(product.images[0])}
          onError={() => setImageError(true)}
          unoptimized
        ></Image>
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className=" hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-color)] transition-all duration-300"
          href={`/products/${product.slug}`}
          prefetch={false}
        >
          {product.title}
        </Link>
        <span className="font-bold">{product.price}€</span>
      </div>
    </div>
  );
}
