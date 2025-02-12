import { Product } from "@/interfaces";
import { ProductItem } from "./product-item";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
      {" "}
      {products.map((product) => (
        <ProductItem key={product.slug} product={product}></ProductItem>
      ))}
    </div>
  );
}
