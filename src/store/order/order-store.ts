import { create } from "zustand";
import { CartItem } from "@/interfaces";
import { ShipmentInfo } from "@/interfaces";
import { createClient } from "@/services/supabase/client";
import { createOrder } from "@/services/order-service";

interface OrderState {
  userId: string;
  orderId: string;
  shipmentInfo: ShipmentInfo;
  items: CartItem[];
  totalAmount: number;
  paid: boolean;
  setShipmentInfo: (info: ShipmentInfo) => void;
  setItems: (items: CartItem[]) => void;
  setTotalAmount: (amount: number) => void;
  placeOrder: () => Promise<string | null>;
  clearOrder: () => void;
  setOrderId: (id: string) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  userId: "",
  orderId: "",
  shipmentInfo: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
    name: "",
    surname: "",
    telephone: "",
  },
  items: [],
  totalAmount: 0,
  paid: false,

  setShipmentInfo: (info: ShipmentInfo) => set({ shipmentInfo: info }),
  setItems: (items: CartItem[]) => set({ items }),
  setTotalAmount: (amount: number) => set({ totalAmount: amount }),
  setOrderId: (id: string) => set({ orderId: id }),

  placeOrder: async () => {
    const state = get();
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("User not authenticated");
      return null;
    }
    const userId = user.id;

    const orderId = await createOrder(
      userId,
      state.totalAmount,
      state.items,
      state.shipmentInfo
    );

    if (orderId) {
      set({ orderId });
      set({ shipmentInfo: {} as ShipmentInfo, items: [], totalAmount: 0 });
    }

    return orderId;
  },

  clearOrder: () =>
    set({ shipmentInfo: {} as ShipmentInfo, items: [], totalAmount: 0 }),
}));
