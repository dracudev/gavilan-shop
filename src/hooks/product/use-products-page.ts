import { useState } from "react";
import { Product, ProductWithoutId } from "@/interfaces";
import useProduct from "@/hooks/product/use-product";

export const useProductsPage = () => {
  const {
    products,
    loading,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  } = useProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [modalTitle, setModalTitle] = useState("Create New Product");

  const handleCreateProductClick = () => {
    setCurrentProduct(null);
    setModalTitle("Create New Product");
    setIsModalOpen(true);
  };

  const handleEditProductClick = (product: Product) => {
    setCurrentProduct(product);
    setModalTitle(`Edit Product: ${product.title}`);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (productData: ProductWithoutId) => {
    if (currentProduct) {
      // Update existing product
      await updateExistingProduct(currentProduct.id, productData);
    } else {
      // Create new product
      await createNewProduct(productData);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteExistingProduct(productId);
    }
  };

  return {
    products,
    loading,
    isModalOpen,
    setIsModalOpen,
    currentProduct,
    modalTitle,
    handleCreateProductClick,
    handleEditProductClick,
    handleModalSubmit,
    handleDeleteProduct,
  };
};
