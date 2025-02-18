import { Product } from "@/interfaces";
import { useState, useEffect } from "react";
import { FetchApi } from "../utils/fetch-api";

function useFetchProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const fetchedProducts = await FetchApi();
        const foundProduct = fetchedProducts.find(
          (product: Product) => product.slug === slug
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  return { product, loading };
}

export default useFetchProduct;
