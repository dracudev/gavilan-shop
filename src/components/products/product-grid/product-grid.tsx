import { Product } from "@/interfaces";
import { ProductItem } from "./product-item";

interface ProductGridProps {
  products: Product[] | null;
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-10">
      {" "}
      {products?.map((product) => (
        <ProductItem key={product.slug} product={product}></ProductItem>
      ))}
    </div>
  );
}
