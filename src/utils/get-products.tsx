import { Product } from "@/interfaces";
import { createClient } from "./supabase/client";

const getProducts = async (): Promise<Product[]> => {
  try {
    const supabase = createClient();

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
};

export { getProducts };
