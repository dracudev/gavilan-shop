"use client";

import { useState, useEffect } from "react";
import { CartItem, Order, ShipmentInfo, Size } from "@/interfaces";
import { FaTimes } from "react-icons/fa";
import { getProduct } from "@/services/product-service";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
  onSubmit: (orderData: {
    userId: string;
    totalAmount: number;
    items: CartItem[];
    shipmentInfo: ShipmentInfo;
    paid?: boolean;
  }) => Promise<void>;
  title?: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  order,
  onSubmit,
  title = "Create New Order",
}: OrderModalProps) {
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

  // Add a new item to the order
  const [newItem, setNewItem] = useState<CartItem>({
    id: "",
    title: "",
    price: 0,
    quantity: 1,
    size: "M",
    slug: "",
    image: "",
  });

  // Populate form when editing an existing order
  useEffect(() => {
    if (order) {
      setUserId(order.user_id);
      setTotalAmount(order.total_amount);
      setPaid(order.paid);

      // Transform order_items to CartItem format
      const cartItems: CartItem[] = order.order_items.map((item) => ({
        id: item.product_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.size as Size,
        slug: "", // TODO: Get slug from product service
        image: item.image,
      }));
      setItems(cartItems);

      // Set shipment info if available
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

  // Calculate total amount whenever items change
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
        // Reset new item form
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      userId,
      totalAmount,
      items,
      shipmentInfo,
      paid,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Order Details
              </h3>

              <div>
                <label className="block text-sm font-medium mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Total Amount
                </label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  readOnly
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="paid"
                  checked={paid}
                  onChange={(e) => setPaid(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="paid" className="ml-2 text-sm font-medium">
                  Mark as Paid
                </label>
              </div>
            </div>

            {/* Shipment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">
                Shipment Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={shipmentInfo.name}
                    onChange={handleShipmentInfoChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={shipmentInfo.surname}
                    onChange={handleShipmentInfoChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shipmentInfo.address}
                  onChange={handleShipmentInfoChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address 2 (Optional)
                </label>
                <input
                  type="text"
                  name="address2"
                  value={shipmentInfo.address2 || ""}
                  onChange={handleShipmentInfoChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shipmentInfo.city}
                    onChange={handleShipmentInfoChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shipmentInfo.postalCode}
                    onChange={handleShipmentInfoChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shipmentInfo.country}
                    onChange={handleShipmentInfoChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Telephone
                  </label>
                  <input
                    type="text"
                    name="telephone"
                    value={shipmentInfo.telephone}
                    onChange={handleShipmentInfoChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-black"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-8">
            <h3 className="text-lg font-medium border-b pb-2">Order Items</h3>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {item.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.size}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Item Form */}
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h4 className="text-md font-medium mb-3 text-black">
                Add Product
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-black">
                    Product ID
                  </label>
                  <input
                    type="text"
                    value={newItem.id}
                    onChange={(e) =>
                      setNewItem({ ...newItem, id: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Size
                  </label>
                  <select
                    value={newItem.size}
                    onChange={(e) =>
                      setNewItem({ ...newItem, size: e.target.value as Size })
                    }
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-black"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-black">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-black"
                    min="1"
                  />
                </div>

                <div className="md:col-span-2 flex items-end">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="btn-primary text-sm"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {order ? "Update Order" : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
