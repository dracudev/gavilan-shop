import { createClient } from "@/services/supabase/client";

export async function getOrders() {
  const supabase = createClient();
  const { data, error } = await supabase.from("orders").select("*");

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
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return data;
}
