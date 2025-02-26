// src/app/(shop)/category/[id]/page.tsx
import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { Category } from "@/interfaces";
import { getProducts } from "@/services/product-service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  const isValidCategory = (value: string): value is Category => {
    return ["men", "women", "kid", "unisex"].includes(value);
  };

  if (!isValidCategory(id)) {
    return notFound();
  }

  const data = await getProducts();
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
      <Title title={labels[id as Category]} className="mb-2 ps-5 sm:ps-0" />
      <ProductGrid products={categoryProducts} />
    </>
  );
}
