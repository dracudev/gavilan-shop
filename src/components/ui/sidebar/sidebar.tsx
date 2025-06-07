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
    <div>
      {isSideBarOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-[var(--overlay)]"></div>
      )}

      {isSideBarOpen && (
        <div
          onClick={toggleSideBar}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={clsx(
          "fixed overflow-y-auto p-5 mt-14 right-0 top-0 w-screen sm:w-[500px] h-screen bg-[var(--sidebar-bg)] z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideBarOpen,
          }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer hover:text-[var(--primary-color)] transition-colors transform duration-500"
          onClick={toggleSideBar}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2 text-[var(--input-text)]"
          />
          <input
            id="sidebar-search-input"
            type="text"
            placeholder="Search..."
            className="w-full bg-[var(--input-bg)] rounded pl-10 py-1 pr-10 border-b-2 text-[var(--input-text,var(--foreground))] text-xl border-[var(--separator)] focus:outline-none focus:border-[var(--primary-color)] placeholder:text-gray-500"
          />
        </div>

        {/* Category Links (Mobile Only) */}
        <div className="block sm:hidden">
          <Link
            href="/category/men"
            className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
            onClick={toggleSideBar}
          >
            <IoManOutline size={30} />
            <span className="ml-3 text-xl">Men</span>
          </Link>

          <Link
            href="/category/women"
            className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
            onClick={toggleSideBar}
          >
            <IoWomanOutline size={30} />
            <span className="ml-3 text-xl">Women</span>
          </Link>

          <Link
            href="/category/kid"
            className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
            onClick={toggleSideBar}
          >
            <IoAccessibilityOutline size={30} />
            <span className="ml-3 text-xl">Kids</span>
          </Link>

          {/* Separator */}
          <div className="w-full h-px bg-[var(--separator)] my-5"></div>
        </div>

        {/* User Menu */}
        {(userRole === "user" || userRole === "unidentified") && (
          <>
            <Link
              href="/account"
              className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
              onClick={toggleSideBar}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">
                {userData?.email ?? "Account"}
              </span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
              onClick={toggleSideBar}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>
          </>
        )}

        {/* Admin Menu */}
        {userRole === "admin" && (
          <>
            <Link
              href="/dashboard/products"
              className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
              onClick={toggleSideBar}
            >
              <FaRedhat size={30} />
              <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link
              href="/dashboard/orders"
              className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
              onClick={toggleSideBar}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <Link
              href="/dashboard/users"
              className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
              onClick={toggleSideBar}
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Users</span>
            </Link>
          </>
        )}

        {/* Separator */}
        <div className="w-full h-px bg-[var(--separator)] my-5"></div>

        {/* Login Button */}
        {userRole === "unidentified" && (
          <>
            <Link
              href="/login"
              className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
              onClick={toggleSideBar}
            >
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Login</span>
            </Link>

            <Link
              href="/sign-up"
              className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
              onClick={toggleSideBar}
            >
              <IoCreateOutline size={30} />
              <span className="ml-3 text-xl">Sign Up</span>
            </Link>
          </>
        )}

        {/* Logout Button */}
        {userRole && userRole !== "unidentified" && (
          <div
            onClick={() => {
              logout();
              toggleSideBar();
            }}
            className="flex items-center mt-5 p-2 hover:bg-[var(--sidebar-hover)] cursor-pointer rounded transition-all hover:text-[var(--primary-color)] transform duration-500"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Logout</span>
          </div>
        )}
      </nav>
    </div>
  );
}
