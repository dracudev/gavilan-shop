"use client";

import { useState } from "react";
import {
  IoPersonOutline,
  IoTicketOutline,
  IoSettingsOutline,
  IoLocationOutline,
} from "react-icons/io5";
import type { Order } from "@/interfaces/types";
import useOrder from "@/hooks/order/use-order";
import { Card } from "@/components/ui/card/card";
import { Title } from "@/components/ui/title/title";
import { Badge } from "@/components/ui/badge/badge";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar/avatar";

// TODO: Define the correct UserData interface for type safety
// TODO: Implement user UPDATE/DELETE actions

export interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  preferredStyle: string;
  favoriteCategory: string;
}

export function ProfilePageUI({
  userData: initialUserData,
}: {
  userData: UserData;
}) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const { orders, loading } = useOrder();

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save functionality
    console.log("Saving user data:", userData);
  };

  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      icon: <IoPersonOutline size={20} />,
    },
    { id: "orders", label: "My Orders", icon: <IoTicketOutline size={20} /> },
    {
      id: "preferences",
      label: "Preferences",
      icon: <IoSettingsOutline size={20} />,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: <IoLocationOutline size={20} />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Title
              title="My Profile"
              size="lg"
              className="text-text-primary mb-2"
            />
            <p className="text-text-secondary">
              Manage your personal information and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 flex flex-col">
          {/* Profile Summary Card */}
          <Card className="order-1 lg:order-none p-6 bg-surface-primary border-border-primary text-center mb-6 lg:mb-6 w-full">
            <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Avatar
                alt="Profile logo"
                size="xl"
                className="mx-auto"
                name={userData.name}
              />
            </div>
            <h3 className="font-semibold text-text-primary mb-1">
              {userData.name}
            </h3>
            <p className="text-sm text-text-muted mb-3">{userData.location}</p>
          </Card>
          {/* Sidebar Navigation */}
          <Card className="order-2 lg:order-none p-1 bg-surface-primary border-border-primary ">
            <nav className="flex flex-row justify-center gap-2 sm:flex-col sm:justify-start sm:gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-center ${
                    activeTab === tab.id
                      ? "bg-primary-50 text-primary-700 border-primary-600"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                  } sm:w-full sm:justify-start`}
                >
                  <span className="mr-0 sm:mr-3 text-base flex-shrink-0">
                    {tab.icon}
                  </span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-8 bg-surface-primary border-border-primary w-full max-w-full">
            {activeTab === "personal" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-ghost px-4 py-2 text-primary-600 hover:bg-primary-50"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-ghost px-4 py-2 text-text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="btn-primary px-4 py-2"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        className="input-primary"
                      />
                    ) : (
                      <p className="py-2 text-text-secondary">
                        {userData.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        className="input-primary"
                      />
                    ) : (
                      <p className="py-2 text-text-secondary">
                        {userData.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                        className="input-primary"
                      />
                    ) : (
                      <p className="py-2 text-text-secondary">
                        {userData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.location}
                        onChange={(e) =>
                          setUserData({ ...userData, location: e.target.value })
                        }
                        className="input-primary"
                      />
                    ) : (
                      <p className="py-2 text-text-secondary">
                        {userData.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferences Section */}
                <div className="mt-8 pt-6 border-t border-border-secondary">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Style Preferences
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Preferred Style
                      </label>
                      {isEditing ? (
                        <select
                          value={userData.preferredStyle}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              preferredStyle: e.target.value,
                            })
                          }
                          className="input-primary"
                        >
                          <option value="Classic Elegant">
                            Classic Elegant
                          </option>
                          <option value="Modern Casual">Modern Casual</option>
                          <option value="Vintage Traditional">
                            Vintage Traditional
                          </option>
                          <option value="Contemporary">Contemporary</option>
                        </select>
                      ) : (
                        <p className="py-2 text-text-secondary">
                          {userData.preferredStyle}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Favorite Category
                      </label>
                      {isEditing ? (
                        <select
                          value={userData.favoriteCategory}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              favoriteCategory: e.target.value,
                            })
                          }
                          className="input-primary"
                        >
                          <option value="Traditional Hats">
                            Traditional Hats
                          </option>
                          <option value="Leather Bags">Leather Bags</option>
                          <option value="Modern Caps">Modern Caps</option>
                          <option value="Handcrafted Accessories">
                            Handcrafted Accessories
                          </option>
                        </select>
                      ) : (
                        <p className="py-2 text-text-secondary">
                          {userData.favoriteCategory}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="w-full max-w-full">
                <h2 className="text-xl font-semibold text-text-primary mb-6">
                  Order History
                </h2>

                {loading ? (
                  <p className="text-text-secondary">Loading orders...</p>
                ) : (
                  <div className="space-y-4 overflow-x-auto w-full max-w-full">
                    {!orders || orders.length === 0 ? (
                      <p className="text-text-secondary">No orders found.</p>
                    ) : (
                      [...orders]
                        .slice(-3)
                        .reverse()
                        .map((order: Order) => {
                          return (
                            <div
                              key={order.order_id}
                              className="border border-border-secondary rounded-lg p-6 hover:bg-surface-secondary transition-colors min-w-0 w-full max-w-full"
                            >
                              <div className="flex flex-wrap items-center justify-between mb-3 min-w-0 w-full max-w-full">
                                <div className="flex items-center space-x-4 min-w-0 flex-shrink flex-wrap">
                                  <Link
                                    href={`/orders/${order.order_id}`}
                                    className="font-mono text-sm text-primary-600 underline hover:text-primary-800 transition-colors break-words max-w-[120px] truncate overflow-hidden"
                                  >
                                    Order-{order.order_id}
                                  </Link>
                                  <Badge
                                    variant={order.paid ? "success" : "warning"}
                                    size="sm"
                                  >
                                    {order.paid ? "Paid" : "Pending"}
                                  </Badge>
                                </div>
                                <span className="font-semibold text-text-primary break-words max-w-[80px] truncate overflow-hidden flex-shrink">
                                  ${order.total_amount?.toFixed(2) ?? "0.00"}
                                </span>
                              </div>
                              <div className="text-text-secondary mb-2">
                                {order.order_items &&
                                order.order_items.length > 0 ? (
                                  <ul className="list-disc list-inside">
                                    {order.order_items.map((item, idx) => (
                                      <li
                                        key={idx}
                                        className="break-words max-w-[180px]"
                                      >
                                        {item.title}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span>-</span>
                                )}
                              </div>
                              <p className="text-sm text-text-muted">
                                Ordered on{" "}
                                {order.created_at
                                  ? new Date(
                                      order.created_at
                                    ).toLocaleDateString()
                                  : "-"}
                              </p>
                            </div>
                          );
                        })
                    )}
                  </div>
                )}

                <div className="mt-8 text-center">
                  <Link
                    href="/orders"
                    className="btn-secondary px-6 py-2 inline-block"
                  >
                    View all orders
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-6">
                  Settings & Preferences
                </h2>

                <div className="space-y-6">
                  <div className="border border-border-secondary rounded-lg p-6">
                    <h3 className="font-semibold text-text-primary mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3 text-primary-600"
                        />
                        <span className="text-text-secondary">
                          New products and collections
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3 text-primary-600"
                        />
                        <span className="text-text-secondary">
                          Special offers and promotions
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3 text-primary-600"
                        />
                        <span className="text-text-secondary">
                          Abandoned cart reminders
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="border border-border-secondary rounded-lg p-6">
                    <h3 className="font-semibold text-text-primary mb-4">
                      Privacy
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-3 text-primary-600"
                        />
                        <span className="text-text-secondary">
                          Allow personalized recommendations
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3 text-primary-600"
                        />
                        <span className="text-text-secondary">
                          Share data to improve service
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Saved Addresses
                  </h2>
                  <button className="btn-primary px-4 py-2">Add Address</button>
                </div>

                {/* TODO: Implement user addresses */}
                <div className="space-y-4">
                  <div className="border border-border-secondary rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          Home
                        </h3>
                        <Badge className="mt-1 px-2 py-1 text-xs bg-primary-50 text-primary-700 border-primary-200 rounded-full">
                          Primary
                        </Badge>
                      </div>
                      <button className="text-text-muted hover:text-text-primary">
                        Edit
                      </button>
                    </div>
                    <div className="text-text-secondary">
                      <p>Main Street, 123</p>
                      <p>Miami, FL 33101, USA</p>
                      <p className="mt-2 text-sm">+1 555 123 4567</p>
                    </div>
                  </div>

                  <div className="border border-border-secondary rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          Office
                        </h3>
                      </div>
                      <button className="text-text-muted hover:text-text-primary">
                        Edit
                      </button>
                    </div>
                    <div className="text-text-secondary">
                      <p>Station Avenue, 45</p>
                      <p>Miami, FL 33102, USA</p>
                      <p className="mt-2 text-sm">+1 555 987 6543</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
