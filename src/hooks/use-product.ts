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

const useProduct = () => {
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

  const fetchProduct = async (productId: string) => {
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
      }
    } catch {
      setError("Error creating product");
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
    } catch {
      setError("Error updating product");
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
    } catch {
      setError("Error deleting product");
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
    fetchProduct,
    fetchProductsByGender,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  };
};

export default useProduct;
