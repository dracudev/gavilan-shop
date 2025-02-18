"use client";

import {
  ProductSlideshow,
  ProductSlideshowMobile,
  QtySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import useFetchProduct from "@/hooks/use-fetch-product";
import { notFound, useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const { product, loading: productLoading } = useFetchProduct(params.slug);

  if (productLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="md:mt-10 mb-10 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
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
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        <QtySelector quantity={1} />

        <button className="btn-primary my-5">Add to cart</button>

        <h3 className="font-bold text-sm mb-3">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
