import { Product } from "@/interfaces";
import { ProductItem } from "./product-item";

interface ProductGridProps {
  products: Product[] | null;
  loading?: boolean;
}

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-[4/5] bg-surface-secondary rounded-lg loading-shimmer" />
            <div className="space-y-2">
              <div className="h-4 bg-surface-secondary rounded loading-shimmer" />
              <div className="h-4 bg-surface-secondary rounded w-3/4 loading-shimmer" />
              <div className="h-5 bg-surface-secondary rounded w-1/2 loading-shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-surface-secondary rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No products found
        </h3>
        <p className="text-text-secondary max-w-md">
          We couldn&apos;t find any products matching your criteria. Try
          adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>

      {/* Show more products indicator */}
      {products.length > 0 && products.length % 12 === 0 && (
        <div className="flex justify-center mt-12">
          <div className="animate-pulse">
            <div className="flex items-center space-x-2 text-text-muted">
              <div
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-current rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
