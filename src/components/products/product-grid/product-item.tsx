"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState, memo } from "react";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = memo(function ProductItem({
  product,
}: ProductItemProps) {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = () => {
    if (product.images[1]) {
      setDisplayImage(product.images[1]);
    }
  };

  const handleMouseLeave = () => {
    setDisplayImage(product.images[0]);
  };

  return (
    <article className="group fade-in">
      <Link
        href={`/product/${product.slug}`}
        prefetch={false}
        className="block"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-surface-secondary aspect-[4/5] mb-4">
          {/* Loading Placeholder */}
          {isLoading && (
            <div className="absolute inset-0 bg-surface-secondary loading-shimmer rounded-lg" />
          )}

          <Image
            src={imageError ? "/img/fallback-image.webp" : displayImage}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onError={() => setImageError(true)}
            onLoad={() => setIsLoading(false)}
            loading="lazy"
            quality={75}
          />

          {/* Simplified Hover Overlay */}
          <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/5 transition-colors duration-200" />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200 leading-tight line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              {product.price}€
            </span>

            {product.gender && (
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider px-2 py-1 bg-surface-secondary rounded-md">
                {product.gender}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
});
