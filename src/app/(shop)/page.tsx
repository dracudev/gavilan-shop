import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
const products = initialData.products;

export default function Shop() {
  return (
    <>
      <Title title="All Products" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
