import { create } from "zustand";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  size: string;
  slug: string;
  image: string;
}

interface State {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearItems: () => void;
  incrementTotalAmount: (amount: number) => void;
  decrementTotalAmount: (amount: number) => void;
  resetTotalAmount: () => void;
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
        if (newQuantity > 10) return state;

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
  clearItems: () => set({ items: [], totalItems: 0, totalAmount: 0 }),
  incrementTotalAmount: (amount: number) =>
    set((state) => ({ totalAmount: state.totalAmount + amount })),
  decrementTotalAmount: (amount: number) =>
    set((state) => ({ totalAmount: state.totalAmount - amount })),
  resetTotalAmount: () => set({ totalAmount: 0 }),
}));
