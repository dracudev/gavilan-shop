import { useState, useEffect } from "react";
import { Product, ProductWithoutId } from "@/interfaces";

interface UseProductFormProps {
  product?: Product | null;
  isOpen: boolean;
}

export const useProductForm = ({ product, isOpen }: UseProductFormProps) => {
  const [productData, setProductData] = useState<ProductWithoutId>({
    description: "",
    images: [],
    inStock: 0,
    price: 0,
    sizes: [],
    slug: "",
    tags: [],
    title: "",
    type: "shirts",
    gender: "unisex",
  });

  useEffect(() => {
    if (product) {
      const { ...rest } = product;
      setProductData(rest);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen && !product) {
      setProductData({
        description: "",
        images: [],
        inStock: 0,
        price: 0,
        sizes: [],
        slug: "",
        tags: [],
        title: "",
        type: "shirts",
        gender: "unisex",
      });
    }
  }, [isOpen, product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return {
    productData,
    setProductData,
    handleChange,
  };
};
