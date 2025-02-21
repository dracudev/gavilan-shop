import { ProductGrid, Title } from "@/components";
import { Product } from "@/interfaces";
import { getProducts } from "@/utils/get-products";

export const dynamic = "force-dynamic";

export default async function Shop() {
  const data: Product[] = (await getProducts()) ?? [];

  return (
    <>
      <Title title="All Products" className="mb-2 ps-5 sm:ps-0" />
      <ProductGrid products={data} />
    </>
  );
}
