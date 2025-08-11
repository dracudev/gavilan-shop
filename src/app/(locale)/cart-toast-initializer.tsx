"use client";

import { useCartToast } from "@/hooks/use-cart-toast";

export default function CartToastInitializer() {
  useCartToast();
  return null;
}
