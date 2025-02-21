import { Product } from "@/interfaces";
import { createClient } from "./supabase/client";

export async function getProducts(): Promise<Product[] | null> {
  if (process.env.NEXT_PUBLIC_IS_BUILD) {
    // Skip fetching during the build process
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) console.error("Error fetching products:", error);
  return data;
}
