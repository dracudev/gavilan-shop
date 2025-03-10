import { useState, useEffect } from "react";
import { CartItem, Order, ShipmentInfo, Size } from "@/interfaces";
import { getProduct } from "@/services/product-service";

interface UseOrderFormProps {
  order?: Order | null;
  isOpen: boolean;
}

export const useOrderForm = ({ order, isOpen }: UseOrderFormProps) => {
  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [paid, setPaid] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [shipmentInfo, setShipmentInfo] = useState<ShipmentInfo>({
    name: "",
    surname: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
    telephone: "",
  });

  const [newItem, setNewItem] = useState<CartItem>({
    id: "",
    title: "",
    price: 0,
    quantity: 1,
    size: "M",
    slug: "",
    image: "",
  });

  useEffect(() => {
    if (order) {
      setUserId(order.user_id);
      setTotalAmount(order.total_amount);
      setPaid(order.paid);

      const cartItems: CartItem[] = order.order_items.map((item) => ({
        id: item.product_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size as Size,
        slug: "",
        image: item.image,
      }));
      setItems(cartItems);

      if (order.order_shipment && order.order_shipment.length > 0) {
        const shipment = order.order_shipment[0];
        setShipmentInfo({
          name: shipment.name,
          surname: shipment.surname,
          address: shipment.address,
          address2: shipment.address_2 || "",
          city: shipment.city,
          postalCode: shipment.postal_code,
          country: shipment.country,
          telephone: shipment.telephone,
        });
      }
    }
  }, [order]);

  useEffect(() => {
    if (isOpen && !order) {
      setUserId("");
      setTotalAmount(0);
      setPaid(false);
      setItems([]);
      setShipmentInfo({
        name: "",
        surname: "",
        address: "",
        address2: "",
        city: "",
        postalCode: "",
        country: "",
        telephone: "",
      });
      setNewItem({
        id: "",
        title: "",
        price: 0,
        quantity: 1,
        size: "M",
        slug: "",
        image: "",
      });
    }
  }, [isOpen, order]);

  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotal);
  }, [items]);

  const handleAddItem = async () => {
    if (newItem.id && newItem.quantity > 0) {
      const productDetails = await getProduct(newItem.id);
      if (productDetails) {
        const itemToAdd = {
          ...newItem,
          title: productDetails.title,
          price: productDetails.price,
          image: productDetails.images[0],
          slug: productDetails.slug,
        };
        setItems([...items, itemToAdd]);
        setNewItem({
          id: "",
          title: "",
          price: 0,
          quantity: 1,
          size: "M",
          slug: "",
          image: "",
        });
      } else {
        console.error("Product details not found for ID:", newItem.id);
      }
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleShipmentInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShipmentInfo({ ...shipmentInfo, [name]: value });
  };

  return {
    userId,
    setUserId,
    totalAmount,
    setTotalAmount,
    paid,
    setPaid,
    items,
    newItem,
    setNewItem,
    shipmentInfo,
    handleAddItem,
    handleRemoveItem,
    handleShipmentInfoChange,
  };
};
