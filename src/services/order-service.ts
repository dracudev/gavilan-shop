import { createClient } from "@/services/supabase/client";
import { createAdminClient } from "./supabase/admin-server";
import { CartItem, ShipmentInfo } from "@/interfaces";

export async function getOrders() {
  const supabase = createClient();
  const { data, error } = await supabase.from("orders").select(`
      order_id,
      user_id,
      paid,
      total_amount,
      order_items (
        title,
        image,
        product_id,
        quantity,
        size,
        price
      ),
      order_shipment (
        name,
        surname,
        address,
        address_2,
        postal_code,
        city,
        country,
        telephone
      )
    `);

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}

export async function getOrder(orderId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      order_id,
      user_id,
      paid,
      total_amount,
      order_items (
        title,
        image,
        product_id,
        quantity,
        size,
        price
      ),
      order_shipment (
        name,
        surname,
        address,
        address_2,
        postal_code,
        city,
        country,
        telephone
      )
    `
    )
    .eq("order_id", orderId)
    .single();

  if (error) {
    // console.error("Error fetching order:", error);
    return null;
  }

  return data;
}

export async function insertOrder(
  userId: string,
  totalAmount: number,
  items: CartItem[],
  shipmentInfo: ShipmentInfo
): Promise<string | null> {
  const supabase = createClient();

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total_amount: totalAmount,
        paid: false,
      },
    ])
    .select("order_id")
    .single();

  if (orderError) {
    console.error("Error placing order:", orderError);
    return null;
  }

  const orderId = orderData.order_id;

  const orderItems = items.map((item) => ({
    order_id: orderId,
    title: item.title,
    image: item.image,
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
    return null;
  }

  const { error: shipmentError } = await supabase
    .from("order_shipment")
    .insert([
      {
        order_id: orderId,
        user_id: userId,
        name: shipmentInfo.name,
        surname: shipmentInfo.surname,
        address: shipmentInfo.address,
        address_2: shipmentInfo.address2,
        postal_code: shipmentInfo.postalCode,
        city: shipmentInfo.city,
        country: shipmentInfo.country,
        telephone: shipmentInfo.telephone,
      },
    ]);

  if (shipmentError) {
    console.error("Error inserting shipment info:", shipmentError);
    return null;
  }

  // console.log("Order placed successfully");
  return orderId;
}

// Service role permission for updating order status (paid)
export const updateOrderStatus = async (orderId: number, isPaid: boolean) => {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("orders")
    .update({ paid: isPaid })
    .eq("order_id", orderId);

  if (error) {
    console.error("Error updating order status in database:", error);
    throw new Error("Failed to update order status in database");
  }
};
