import { createClient } from "@/services/supabase/client";
import { createAdminClient } from "./supabase/admin-server";
import { CartItem, Order, ShipmentInfo } from "@/interfaces";

async function getOrders() {
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

async function getOrder(orderId: string) {
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

async function createOrder(
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

  return orderId;
}

// Service role permission for updating order status (paid)
const updateOrderStatus = async (orderId: number, isPaid: boolean) => {
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

async function updateOrder(orderId: string, data: Order) {
  const supabase = createClient();

  const { error: orderError } = await supabase
    .from("orders")
    .update({
      user_id: data.user_id,
      total_amount: data.total_amount,
      paid: data.paid,
    })
    .eq("order_id", orderId);

  if (orderError) {
    console.error("Error updating order:", orderError);
    throw new Error("Failed to update order");
  }

  if (data.order_items) {
    const { error: deleteItemsError } = await supabase
      .from("order_items")
      .delete()
      .eq("order_id", orderId);

    if (deleteItemsError) {
      console.error("Error deleting existing order items:", deleteItemsError);
      throw new Error("Failed to delete existing order items");
    }

    const orderItems = data.order_items.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      title: item.title,
      image: item.image,
      quantity: item.quantity,
      size: item.size,
      price: item.price,
    }));

    const { error: insertItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (insertItemsError) {
      console.error("Error inserting order items:", insertItemsError);
      throw new Error("Failed to insert order items");
    }
  }

  if (data.order_shipment) {
    const shipmentInfo = data.order_shipment[0];
    const { error: shipmentError } = await supabase
      .from("order_shipment")
      .update({
        name: shipmentInfo.name,
        surname: shipmentInfo.surname,
        address: shipmentInfo.address,
        address_2: shipmentInfo.address_2,
        postal_code: shipmentInfo.postal_code,
        city: shipmentInfo.city,
        country: shipmentInfo.country,
        telephone: shipmentInfo.telephone,
      })
      .eq("order_id", orderId);

    if (shipmentError) {
      console.error("Error updating shipment info:", shipmentError);
      throw new Error("Failed to update shipment info");
    }
  }
}

async function deleteOrder(orderId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("order_id", orderId);

  if (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
}

export {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
};
