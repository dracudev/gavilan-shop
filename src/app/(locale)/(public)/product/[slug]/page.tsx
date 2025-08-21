"use client";

import { ProductSlideshow } from "@/components/product/slideshow/product-slideshow";
import { ProductSlideshowMobile } from "@/components/product/slideshow/product-slideshow-mobile";
import { QtySelector } from "@/components/product/qty-selector/qty-selector";
import { SizeSelector } from "@/components/product/size-selector/size-selector";
import Loading from "@/components/ui/loading";
import { titleFont } from "@/config/fonts";
import useFetchProduct from "@/hooks/product/use-fetch-product";
import { Size } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const { slug } = useParams();
  const { product, loading } = useFetchProduct(
    Array.isArray(slug) ? slug[0] : slug
  );
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<Size>("XS");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      size: selectedSize,
      slug: product.slug,
      image: product.images[0],
    });
  };

  return (
    <div className="md:mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Slideshow */}
      <div className="col-span-1">
        {/* Mobile */}
        <ProductSlideshowMobile
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/* Desktop */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Product Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}€</p>
        {/* Selectors */}
        <SizeSelector
          selectedSize={selectedSize}
          availableSizes={product.sizes}
          onSizeChange={setSelectedSize}
        />
        <QtySelector
          id={product.id}
          updateCart={false}
          onQuantityChange={setQuantity}
        />
        <button className="btn-primary my-5" onClick={handleAddToCart}>
          Add to cart
        </button>
        <h3 className="font-bold text-sm mb-3">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
