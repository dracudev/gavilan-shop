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

export interface Order {
  order_id: string;
  user_id: string;
  total_amount: number;
  paid: boolean;
  order_items: {
    product_id: string;
    title: string;
    image: string;
    quantity: number;
    size: string;
    price: number;
  }[];
  order_shipment: {
    name: string;
    surname: string;
    address: string;
    address_2: string;
    postal_code: string;
    city: string;
    country: string;
    telephone: string;
  }[];
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
export type Category = "men" | "women" | "kid" | "unisex";
