export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Category;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  slug: string;
  image: string;
}

export interface ShipmentInfo {
  name: string;
  surname: string;
  address: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  telephone: string;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
export type Category = "men" | "women" | "kid" | "unisex";
