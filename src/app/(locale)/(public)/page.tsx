import { ProductGrid } from "@/components/products/product-grid/product-grid";
import { Title } from "@/components/ui/title/title";
import { Product } from "@/interfaces";
import { getProducts } from "@/services/product-service";

export default async function Shop() {
  const data: Product[] = await getProducts();

  return (
    <>
      <Title title="All Products" className="mb-2 ps-5 sm:ps-0" />
      <ProductGrid products={data} />
    </>
  );
}
