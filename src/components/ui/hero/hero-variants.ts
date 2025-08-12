/**
 * A/B testing, seasonal campaigns.
 */

export interface HeroVariant {
  id: string;
  name: string;
  headline: string;
  subheading: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  theme?: "default" | "heritage" | "modern" | "seasonal";
}

export const HERO_VARIANTS: Record<string, HeroVariant> = {
  heritage: {
    id: "heritage",
    name: "Heritage Focus",
    headline: "Crafting Timeless Elegance Since 1880",
    subheading:
      "Over a century of artisanal hats, bags, and accessories, crafted for those who value quality and style.",
    primaryCtaText: "Explore Collection",
    secondaryCtaText: "Our Story",
    theme: "heritage",
  },

  elegant: {
    id: "elegant",
    name: "Elegant Simplicity",
    headline: "Elegance Since 1880",
    subheading:
      "Discover our collection of premium leather goods and traditional Spanish craftsmanship.",
    primaryCtaText: "Shop Now",
    secondaryCtaText: "Learn More",
    theme: "default",
  },

  modern: {
    id: "modern",
    name: "Traditional Meets Modern",
    headline: "Where Tradition Meets Style",
    subheading:
      "From our workshop in Alicante to your wardrobe, authentic luxury that transcends generations.",
    primaryCtaText: "Discover Collection",
    secondaryCtaText: "Our Heritage",
    theme: "modern",
  },

  artisanal: {
    id: "artisanal",
    name: "Artisanal Excellence",
    headline: "Masters of Spanish Craftsmanship",
    subheading:
      "Each piece tells a story of dedication, skill, and passion,handcrafted in the heart of Alicante since 1880.",
    primaryCtaText: "View Craftsmanship",
    secondaryCtaText: "Visit Workshop",
    theme: "heritage",
  },

  luxury: {
    id: "luxury",
    name: "Luxury Positioning",
    headline: "Exclusive Spanish Luxury",
    subheading:
      "Experience the pinnacle of Mediterranean elegance with our curated collection of premium accessories.",
    primaryCtaText: "Exclusive Collection",
    secondaryCtaText: "Private Consultation",
    theme: "default",
  },
};

export const SEASONAL_VARIANTS: Record<string, HeroVariant> = {
  spring: {
    id: "spring",
    name: "Spring Collection",
    headline: "Spring Elegance Awaits",
    subheading:
      "Discover our new spring collection,light, refined pieces perfect for the Mediterranean lifestyle.",
    primaryCtaText: "Shop Spring",
    secondaryCtaText: "Style Guide",
    theme: "seasonal",
  },

  summer: {
    id: "summer",
    name: "Summer Essentials",
    headline: "Summer in Alicante Style",
    subheading:
      "Breathable panama hats and elegant beach accessories, your perfect companions for sunny days.",
    primaryCtaText: "Summer Collection",
    secondaryCtaText: "Care Tips",
    theme: "seasonal",
  },

  autumn: {
    id: "autumn",
    name: "Autumn Classics",
    headline: "Autumn Sophistication",
    subheading:
      "Rich textures and warm tones, embrace the season with our timeless leather goods and wool hats.",
    primaryCtaText: "Autumn Arrivals",
    secondaryCtaText: "Material Guide",
    theme: "seasonal",
  },

  winter: {
    id: "winter",
    name: "Winter Warmth",
    headline: "Winter Warmth & Style",
    subheading:
      "Luxurious materials meet practical elegance, stay stylish through the cooler months.",
    primaryCtaText: "Winter Collection",
    secondaryCtaText: "Warmth Guide",
    theme: "seasonal",
  },
};

export const CAMPAIGN_VARIANTS: Record<string, HeroVariant> = {
  anniversary: {
    id: "anniversary",
    name: "Anniversary Special",
    headline: "145 Years of Excellence",
    subheading:
      "Celebrating nearly a century and a half of Spanish craftsmanship, join us in honoring our legacy.",
    primaryCtaText: "Anniversary Collection",
    secondaryCtaText: "Our Journey",
    theme: "heritage",
  },

  newCustomer: {
    id: "new-customer",
    name: "New Customer Welcome",
    headline: "Welcome to El Gavilán",
    subheading:
      "Begin your journey into authentic Spanish luxury, discover why we&apos;ve been Alicante&apos;s choice since 1880.",
    primaryCtaText: "Start Shopping",
    secondaryCtaText: "Why Choose Us",
    theme: "modern",
  },

  giftGuide: {
    id: "gift-guide",
    name: "Gift Guide Focus",
    headline: "Gifts of Lasting Beauty",
    subheading:
      "Give the gift of Spanish elegance, our curated collection features pieces that become treasured heirlooms.",
    primaryCtaText: "Gift Guide",
    secondaryCtaText: "Personalization",
    theme: "default",
  },
};

// Utility function
export const getAllVariants = (): HeroVariant[] => [
  ...Object.values(HERO_VARIANTS),
  ...Object.values(SEASONAL_VARIANTS),
  ...Object.values(CAMPAIGN_VARIANTS),
];

export const getVariantById = (id: string): HeroVariant | undefined => {
  return getAllVariants().find((variant) => variant.id === id);
};

export const getVariantsByTheme = (
  theme: HeroVariant["theme"]
): HeroVariant[] => {
  return getAllVariants().filter((variant) => variant.theme === theme);
};

export const getRandomVariant = (): HeroVariant => {
  const variants = Object.values(HERO_VARIANTS);
  return variants[Math.floor(Math.random() * variants.length)];
};

// A/B Testing Support
export interface ABTestVariant extends HeroVariant {
  weight: number; // Percentage of traffic (0-100)
  isControl?: boolean;
}

export const AB_TEST_VARIANTS: ABTestVariant[] = [
  {
    ...HERO_VARIANTS.heritage,
    weight: 50,
    isControl: true,
  },
  {
    ...HERO_VARIANTS.elegant,
    weight: 30,
  },
  {
    ...HERO_VARIANTS.modern,
    weight: 20,
  },
];

export const selectABTestVariant = (): ABTestVariant => {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const variant of AB_TEST_VARIANTS) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      return variant;
    }
  }

  // Fallback to control
  return AB_TEST_VARIANTS.find((v) => v.isControl) || AB_TEST_VARIANTS[0];
};

// Export default variant for easy import
export const DEFAULT_HERO_VARIANT = HERO_VARIANTS.heritage;
