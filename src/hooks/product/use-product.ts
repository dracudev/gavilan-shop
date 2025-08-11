import { useState, useEffect } from "react";
import {
  getProducts,
  getProduct,
  getProductsByGender,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/product-service";
import { Product, ProductWithoutId } from "@/interfaces";

const useProduct = (
  addToast?: (toast: {
    title: string;
    description?: string;
    type: "success" | "error" | "warning" | "info";
  }) => void
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProduct(productId);
      setProduct(data);
    } catch {
      setError("Error fetching product");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByGender = async (gender: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsByGender(gender);
      setProducts(data);
    } catch {
      setError("Error fetching products by gender");
    } finally {
      setLoading(false);
    }
  };

  const createNewProduct = async (product: ProductWithoutId) => {
    setLoading(true);
    setError(null);
    try {
      const productId = await createProduct(product);
      if (productId) {
        await fetchProducts();
        addToast?.({
          title: "Product created",
          description: `${product.title} has been added to the inventory`,
          type: "success",
        });
      }
    } catch {
      const errorMsg = "Error creating product";
      setError(errorMsg);
      addToast?.({
        title: "Creation failed",
        description:
          "There was an error creating the product. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateExistingProduct = async (
    productId: string,
    product: Partial<Product>
  ) => {
    setLoading(true);
    setError(null);
    try {
      await updateProduct(productId, product);
      await fetchProducts();
      addToast?.({
        title: "Product updated",
        description: "The product has been successfully updated",
        type: "success",
      });
    } catch {
      const errorMsg = "Error updating product";
      setError(errorMsg);
      addToast?.({
        title: "Update failed",
        description:
          "There was an error updating the product. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingProduct = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(productId);
      await fetchProducts();
      addToast?.({
        title: "Product deleted",
        description: "The product has been successfully removed",
        type: "success",
      });
    } catch {
      const errorMsg = "Error deleting product";
      setError(errorMsg);
      addToast?.({
        title: "Deletion failed",
        description:
          "There was an error deleting the product. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProduct: fetchProductById,
    fetchProductsByGender,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  };
};

export default useProduct;
