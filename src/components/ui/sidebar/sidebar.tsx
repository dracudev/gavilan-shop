"use client";

import { logout } from "@/services/supabase/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { FaRedhat } from "react-icons/fa";
import {
  IoAccessibilityOutline,
  IoCloseOutline,
  IoCreateOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoManOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
  IoWomanOutline,
} from "react-icons/io5";

interface User {
  id: string;
  email: string;
}

interface SidebarProps {
  userRole: string | null;
  userData: User | null;
}

export function Sidebar({ userRole, userData }: SidebarProps) {
  const isSideBarOpen = useUIStore((state) => state.isSideBarOpen);
  const isSearchFocused = useUIStore((state) => state.isSearchFocused);
  const toggleSideBar = useUIStore((state) => state.toggleSideBar);
  const setSearchFocus = useUIStore((state) => state.setSearchFocus);

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchFocus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSideBarOpen]);

  useEffect(() => {
    if (isSearchFocused) {
      const searchInput = document.getElementById("sidebar-search-input");
      searchInput?.focus();
    }
  }, [isSearchFocused]);

  return (
    <>
      {/* Backdrop */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm fade-in"
          onClick={toggleSideBar}
        />
      )}

      {/* Sidebar */}
      <nav
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-surface-glass backdrop-blur-xl border-l border-border-primary shadow-strong transform transition-all duration-300 ease-out",
          "flex flex-col",
          {
            "translate-x-full": !isSideBarOpen,
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-lg font-semibold text-text-primary">Menu</h2>
          <button
            onClick={toggleSideBar}
            className="p-2 -mr-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-md transition-all duration-200"
            aria-label="Close menu"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-6 space-y-6">
            {/* Search */}
            <div className="relative">
              <IoSearchOutline
                size={20}
                className="absolute top-3 left-3 text-text-muted pointer-events-none z-10"
              />
              <input
                id="sidebar-search-input"
                type="text"
                placeholder="Search products..."
                className="w-full pl-11 pr-3 py-3 h-12 text-base bg-surface-primary border border-border-primary rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                autoComplete="off"
              />
            </div>

            {/* Category Links - Mobile Only */}
            <div className="block lg:hidden">
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                <SidebarLink
                  href="/category/men"
                  icon={<IoManOutline size={20} />}
                  label="Men's Hats"
                  onClick={toggleSideBar}
                />
                <SidebarLink
                  href="/category/women"
                  icon={<IoWomanOutline size={20} />}
                  label="Women's Hats"
                  onClick={toggleSideBar}
                />
                <SidebarLink
                  href="/category/kid"
                  icon={<IoAccessibilityOutline size={20} />}
                  label="Kids' Hats"
                  onClick={toggleSideBar}
                />
              </div>
              <div className="border-t border-border-primary mt-6 pt-6" />
            </div>

            {/* User Menu */}
            {(userRole === "user" || userRole === "unidentified") && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                    Account
                  </h3>
                  <div className="space-y-1">
                    <SidebarLink
                      href="/account"
                      icon={<IoPersonOutline size={20} />}
                      label={
                        userData?.email
                          ? `Hi, ${userData.email.split("@")[0]}`
                          : "My Account"
                      }
                      description="Manage your profile"
                      onClick={toggleSideBar}
                    />
                    <SidebarLink
                      href="/orders"
                      icon={<IoTicketOutline size={20} />}
                      label="My Orders"
                      description="Track your purchases"
                      onClick={toggleSideBar}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Admin Menu */}
            {userRole === "admin" && (
              <div>
                <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                  Dashboard
                </h3>
                <div className="space-y-1">
                  <SidebarLink
                    href="/dashboard/products"
                    icon={<FaRedhat size={20} />}
                    label="Products"
                    description="Manage inventory"
                    onClick={toggleSideBar}
                  />
                  <SidebarLink
                    href="/dashboard/orders"
                    icon={<IoTicketOutline size={20} />}
                    label="Orders"
                    description="Process orders"
                    onClick={toggleSideBar}
                  />
                  <SidebarLink
                    href="/dashboard/users"
                    icon={<IoPeopleOutline size={20} />}
                    label="Users"
                    description="User management"
                    onClick={toggleSideBar}
                  />
                </div>
              </div>
            )}

            {/* Authentication */}
            {userRole === "unidentified" ? (
              <div>
                <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                  Get Started
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={toggleSideBar}
                    className="btn-primary w-full justify-center"
                  >
                    <IoLogInOutline size={20} className="mr-2" />
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={toggleSideBar}
                    className="btn-secondary w-full justify-center"
                  >
                    <IoCreateOutline size={20} className="mr-2" />
                    Create Account
                  </Link>
                </div>
              </div>
            ) : (
              userRole &&
              userRole !== "unidentified" && (
                <div>
                  <button
                    onClick={() => {
                      logout();
                      toggleSideBar();
                    }}
                    className="btn-ghost w-full justify-start text-error hover:bg-error/5"
                  >
                    <IoLogOutOutline size={20} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

// Reusable Sidebar Link Component
interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
}

function SidebarLink({
  href,
  icon,
  label,
  description,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 p-3 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-md transition-all duration-200 group"
    >
      <span className="text-text-muted group-hover:text-primary transition-colors duration-200">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{label}</div>
        {description && (
          <div className="text-xs text-text-muted mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
