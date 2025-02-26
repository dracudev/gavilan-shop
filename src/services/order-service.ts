import { createClient } from "@/services/supabase/client";

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
    // console.error("Error fetching orders:", error);
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
