import {
  ProductSlideshow,
  ProductSlideshowMobile,
  QtySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Product } from "@/interfaces";
import { getProducts } from "@/utils/get-products";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const data: Product[] = (await getProducts()) ?? [];
  const foundProduct = data.find((product: Product) => product.slug === slug);

  if (!foundProduct) {
    return notFound();
  }

  return (
    <div className="md:mt-10 mb-10 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile */}
        <ProductSlideshowMobile
          title={foundProduct.title}
          images={foundProduct.images}
          className="block md:hidden"
        />
        {/* Desktop */}
        <ProductSlideshow
          title={foundProduct.title}
          images={foundProduct.images}
          className="hidden md:block"
        />
      </div>

      {/* Product Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {foundProduct.title}
        </h1>

        <p className="text-lg mb-5">{foundProduct.price}€</p>

        {/* Selectors */}
        <SizeSelector
          selectedSize={foundProduct.sizes[0]}
          availableSizes={foundProduct.sizes}
        />
        <QtySelector quantity={1} />

        <button className="btn-primary my-5">Add to cart</button>

        <h3 className="font-bold text-sm mb-3">Description</h3>
        <p className="font-light">{foundProduct.description}</p>
      </div>
    </div>
  );
}
