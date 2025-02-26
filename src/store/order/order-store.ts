import { create } from "zustand";
import { CartItem } from "@/interfaces";
import { ShipmentInfo } from "@/interfaces";
import { createClient } from "@/services/supabase/client";

interface OrderState {
  userId: string;
  orderId: string;
  shipmentInfo: ShipmentInfo;
  items: CartItem[];
  totalAmount: number;
  setShipmentInfo: (info: ShipmentInfo) => void;
  setItems: (items: CartItem[]) => void;
  setTotalAmount: (amount: number) => void;
  placeOrder: () => Promise<void>;
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
      return;
    }
    const userId = user.id;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          total_amount: state.totalAmount,
        },
      ])
      .select("order_id")
      .single();

    if (orderError) {
      console.error("Error placing order:", orderError);
      return;
    }

    const orderId = orderData.order_id;
    set({ orderId });

    const orderItems = state.items.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      size: item.size,
      price: item.price,
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error("Error inserting order items:", orderItemsError);
      return;
    }

    const { error: shipmentError } = await supabase
      .from("order_shipment")
      .insert([
        {
          order_id: orderId,
          user_id: userId,
          name: state.shipmentInfo.name,
          surname: state.shipmentInfo.surname,
          address: state.shipmentInfo.address,
          address_2: state.shipmentInfo.address2,
          postal_code: state.shipmentInfo.postalCode,
          city: state.shipmentInfo.city,
          country: state.shipmentInfo.country,
          telephone: state.shipmentInfo.telephone,
        },
      ]);

    if (shipmentError) {
      console.error("Error inserting shipment info:", shipmentError);
      return;
    }

    console.log("Order placed successfully");
    set({ shipmentInfo: {} as ShipmentInfo, items: [], totalAmount: 0 });
  },

  clearOrder: () =>
    set({ shipmentInfo: {} as ShipmentInfo, items: [], totalAmount: 0 }),
}));
