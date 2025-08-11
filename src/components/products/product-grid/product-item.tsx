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
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useImagePreloader(product.images);

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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onError={() => setImageError(true)}
            onLoad={() => setIsLoading(false)}
            priority={false}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/5 transition-colors duration-300" />

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-surface-primary/90 backdrop-blur-sm rounded-full p-2 shadow-soft">
              <svg
                className="w-4 h-4 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
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

          {/* Product Details */}
          {product.description && (
            <p className="text-sm text-text-secondary line-clamp-2 group-hover:text-text-primary transition-colors duration-200">
              {product.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
