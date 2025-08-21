import { ProductGrid } from "@/components/product/product-grid";
import { Title } from "@/components/ui/title";
import { HeroSection } from "@/components/layout/hero/hero-section";
import { HERO_VARIANTS } from "@/components/layout/hero/hero-variants";
import { Product } from "@/interfaces";
import { getProducts } from "@/services/product-service";

export default async function HomePage() {
  const data: Product[] = await getProducts();

  return (
    <>
      <HeroSection variant={HERO_VARIANTS.heritage} />

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title title="Featured Products" className="mb-12 text-center" />
          <ProductGrid products={data} />
        </div>
      </section>
    </>
  );
}
