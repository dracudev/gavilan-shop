"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useCartStore } from "@/store/cart/cart-store";
import { useState, useEffect } from "react";

interface Props {
  id: string;
  updateCart?: boolean;
  onQuantityChange?: (quantity: number) => void;
}

export function QtySelector({
  id,
  updateCart = true,
  onQuantityChange,
}: Props) {
  const { items, updateItemQuantity } = useCartStore();
  const item = items.find((i) => i.id === id);
  const [quantity, setQuantity] = useState(item ? item.quantity : 1);

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(quantity);
    }
  }, [quantity, onQuantityChange]);

  const onQtyChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity < 1 || newQuantity > 10) return;
    setQuantity(newQuantity);
    if (updateCart) {
      updateItemQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex">
      <button onClick={() => onQtyChange(-1)} role="remove-qty">
        <IoRemoveCircleOutline />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center dark:text-black rounded">
        {quantity}
      </span>

      <button onClick={() => onQtyChange(+1)} role="add-qty">
        <IoAddCircleOutline />
      </button>
    </div>
  );
}
