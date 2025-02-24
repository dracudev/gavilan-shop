import { ProductGrid, Title } from "@/components";
import { fetcher } from "@/utils/get-products";
import useSWR from "swr";

//export const dynamic = "force-dynamic";

export default function Shop() {
  const { data, error } = useSWR("products", fetcher);

  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Title title="All Products" className="mb-2 ps-5 sm:ps-0" />
      <ProductGrid products={data} />
    </>
  );
}
