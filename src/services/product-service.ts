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

const createProduct = async (product: Product): Promise<string | null> => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select("id")
      .single()
      .throwOnError();

    if (error) throw error;
    return data.id || null;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

const updateProduct = async (
  productId: string,
  product: Partial<Product>
): Promise<void> => {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("products")
      .update(product)
      .eq("id", productId)
      .throwOnError();

    if (error) throw error;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .throwOnError();

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};

export {
  getProducts,
  getProduct,
  getProductsByGender,
  createProduct,
  updateProduct,
  deleteProduct,
};
