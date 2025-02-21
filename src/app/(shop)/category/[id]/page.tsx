"use client";

import { ProductGrid, Title } from "@/components";
import { notFound, useParams } from "next/navigation";
import { type Category } from "@/interfaces";
import { useFetchProducts } from "@/hooks/use-fetch-products";

export default function CategoryPage() {
  const params = useParams<{ id: Category }>();
  const { products, loading } = useFetchProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  const categoryProducts = products.filter(
    (product) => product.gender === params.id
  );

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
      <Title title={labels[params.id]} className="mb-2 ps-5 sm:ps-0" />
      <ProductGrid products={categoryProducts} />
    </>
  );
}
