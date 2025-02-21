import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { Product, type Category } from "@/interfaces";
import { getProducts } from "@/utils/get-products";

export default async function CategoryPage({
  params,
}: {
  params: { id: Category };
}) {
  const { id } = await params;
  const data: Product[] = (await getProducts()) ?? [];

  const categoryProducts = data.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "Men",
    women: "Women",
    kid: "Kids",
    unisex: "Unisex",
  };

  if (!categoryProducts.length) {
    return notFound();
  }

  return (
    <>
      <Title title={labels[id]} className="mb-2 ps-5 sm:ps-0" />
      <ProductGrid products={categoryProducts} />
    </>
  );
}
