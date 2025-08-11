import { create } from "zustand";
import { CartItem } from "@/interfaces";

let toastInstance:
  | ((toast: {
      title: string;
      description?: string;
      type: "success" | "error" | "warning" | "info";
    }) => void)
  | null = null;

export const setCartToastInstance = (
  instance: (toast: {
    title: string;
    description?: string;
    type: "success" | "error" | "warning" | "info";
  }) => void
) => {
  toastInstance = instance;
};

interface State {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearItems: () => void;
}

export const useCartStore = create<State>()((set) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,
  addItem: (item: CartItem) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + item.quantity;
        if (newQuantity > 10) {
          if (toastInstance) {
            toastInstance({
              title: "Maximum quantity reached",
              description:
                "You can't add more than 10 items of the same product",
              type: "warning",
            });
          }
          return state;
        }

        if (toastInstance) {
          toastInstance({
            title: "Cart updated",
            description: `Updated ${item.title} quantity to ${newQuantity}`,
            type: "success",
          });
        }

        return {
          items: state.items.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: newQuantity }
              : i
          ),
          totalItems: state.totalItems + item.quantity,
          totalAmount: state.totalAmount + item.price * item.quantity,
        };
      } else {
        if (toastInstance) {
          toastInstance({
            title: "Added to cart",
            description: `${item.title} has been added to your cart`,
            type: "success",
          });
        }

        return {
          items: [...state.items, item],
          totalItems: state.totalItems + item.quantity,
          totalAmount: state.totalAmount + item.price * item.quantity,
        };
      }
    }),
  removeItem: (id: string, size: string) =>
    set((state) => {
      const itemToRemove = state.items.find(
        (i) => i.id === id && i.size === size
      );
      if (!itemToRemove) return state;

      if (toastInstance) {
        toastInstance({
          title: "Item removed",
          description: `${itemToRemove.title} has been removed from your cart`,
          type: "info",
        });
      }

      return {
        items: state.items.filter((i) => !(i.id === id && i.size === size)),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount:
          state.totalAmount - itemToRemove.price * itemToRemove.quantity,
      };
    }),
  updateItemQuantity: (id: string, quantity: number) =>
    set((state) => {
      if (quantity < 1) return state;
      const itemToUpdate = state.items.find((i) => i.id === id);
      if (!itemToUpdate) return state;
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        totalItems: state.totalItems - itemToUpdate.quantity + quantity,
        totalAmount:
          state.totalAmount -
          itemToUpdate.price * itemToUpdate.quantity +
          itemToUpdate.price * quantity,
      };
    }),
  clearItems: () => {
    if (toastInstance) {
      toastInstance({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
        type: "info",
      });
    }
    return set({ items: [], totalItems: 0, totalAmount: 0 });
  },
}));
