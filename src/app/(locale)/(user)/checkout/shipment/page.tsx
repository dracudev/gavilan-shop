"use client";

import { Title } from "@/components/ui/title/title";
import { useState } from "react";
import { useOrderStore } from "@/store/order/order-store";
import { redirect } from "next/navigation";

// TODO: Add validation to the form

export default function ShipmentPage() {
  const setShipmentInfo = useOrderStore((state) => state.setShipmentInfo);
  const [shipmentInfo, setShipmentInfoState] = useState({
    name: "",
    surname: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
    telephone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShipmentInfoState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShipmentInfo(shipmentInfo);
    redirect("/checkout");
  };

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-5 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Shipment" />

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
        >
          <div className="flex flex-col mb-2">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={shipmentInfo.name}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
              required
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Surname</span>
            <input
              type="text"
              name="surname"
              value={shipmentInfo.surname}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
              required
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input
              type="text"
              name="address"
              value={shipmentInfo.address}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
              required
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address 2 (optional)</span>
            <input
              type="text"
              name="address2"
              value={shipmentInfo.address2}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Postal Code</span>
            <input
              type="text"
              name="postalCode"
              value={shipmentInfo.postalCode}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
              required
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>City</span>
            <input
              type="text"
              name="city"
              value={shipmentInfo.city}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
              required
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select
              name="country"
              value={shipmentInfo.country}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
              required
            >
              <option value="">[ Select ]</option>
              <option value="SPA">Spain</option>
              <option value="CAT">Catalonia</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Telephone</span>
            <input
              type="text"
              name="telephone"
              value={shipmentInfo.telephone}
              onChange={handleChange}
              className="p-2 border rounded-md bg-gray-200 dark:text-black"
              required
            />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <button
              type="submit"
              className="btn-primary flex w-full sm:w-1/2 justify-center"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
