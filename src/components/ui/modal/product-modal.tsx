"use client";

import { useProductForm } from "@/hooks/product/use-product-form";
import { FaTimes } from "react-icons/fa";
import { Product, ProductWithoutId, Size } from "@/interfaces";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSubmit: (productData: ProductWithoutId) => Promise<void>;
  title?: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  onSubmit,
  title = "Create New Product",
}: ProductModalProps) {
  const { productData, setProductData, handleChange } = useProductForm({
    product,
    isOpen,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(productData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  In Stock
                </label>
                <input
                  type="number"
                  name="inStock"
                  value={productData.inStock}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={productData.slug}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={productData.type}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                >
                  <option value="shirts">Shirts</option>
                  <option value="pants">Pants</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="hats">Hats</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={productData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kid">Kid</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sizes</label>
                <select
                  name="sizes"
                  value={productData.sizes}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      sizes: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value as Size
                      ),
                    })
                  }
                  multiple
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={productData.tags.join(", ")}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Images</label>
                <input
                  type="text"
                  name="images"
                  value={productData.images.join(", ")}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      images: e.target.value
                        .split(",")
                        .map((image) => image.trim()),
                    })
                  }
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {product ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
