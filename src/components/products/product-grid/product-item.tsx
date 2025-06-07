"use client";

import { useImagePreloader } from "@/hooks/ui/useImagePreloader";
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

  useImagePreloader(product.images);

  return (
    <div className="md:rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`} prefetch={false}>
        <Image
          src={imageError ? "/imgs/fallback-image.webp" : `${isHovered}`}
          alt={product.title}
          className="w-full h-96 sm:h-[325px] object-cover sm:rounded"
          width={400}
          height={400}
          onMouseEnter={() => setIsHovered(product.images[1])}
          onMouseLeave={() => setIsHovered(product.images[0])}
          onError={() => setImageError(true)}
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
