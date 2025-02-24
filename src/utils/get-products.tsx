import { Product } from "@/interfaces";
import { createClient } from "./supabase/server";

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .throwOnError();

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export const fetcher = async () => {
  const data: Product[] = await getProducts();
  return data;
};
