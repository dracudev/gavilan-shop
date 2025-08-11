"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/toast/toast-provider";
import { setCartToastInstance } from "@/store/cart/cart-store";

export const useCartToast = () => {
  const { addToast } = useToast();

  useEffect(() => {
    setCartToastInstance(addToast);
  }, [addToast]);
};
