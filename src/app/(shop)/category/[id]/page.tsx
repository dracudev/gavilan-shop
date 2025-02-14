import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

const products = initialData.products;

interface CategoryPageProps {
  params: { id: Category };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;

  const categoryProducts = products.filter((product) => product.gender === id);

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
