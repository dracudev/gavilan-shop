import { ProductGrid } from "@/components/products/product-grid/product-grid";
import { Title } from "@/components/ui/title/title";
import { notFound } from "next/navigation";
import { Category } from "@/interfaces";
import { getProductsByGender } from "@/services/product-service";

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

  const categoryProducts = await getProductsByGender(id);

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
      <Title title={labels[id as Category]} className="mb-2" />
      <ProductGrid products={categoryProducts} />
    </>
  );
}
