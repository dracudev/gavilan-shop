import { Product } from "@/interfaces";
import { createClient } from "@/services/supabase/client";

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

const getProduct = async (productId: string): Promise<Product | null> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single()
      .throwOnError();

    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const getProductsByGender = async (gender: string): Promise<Product[]> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("gender", gender)
      .throwOnError();

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products by gender:", error);
    return [];
  }
};

export { getProducts, getProduct, getProductsByGender };
