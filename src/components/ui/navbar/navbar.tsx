"use client";

import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

export const Navbar = () => {
  const toggleSideBar = useUIStore((state) => state.toggleSideBar);

  return (
    <nav className="fixed top-0 left-0 right-0 flex px-5 justify-between items-center w-full bg-[var(--background)] shadow-md z-50">
      {/* Logo */}
      <div>
        <Link href="/">
          <span
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            El Gavilán
          </span>{" "}
          | <span className="text-orange-500">Hat Shop</span>
        </Link>
      </div>

      {/* Categories */}
      <div className="hidden sm:block">
        <Link
          href="/category/men"
          className="m-2 p-2 rounded-md transition-all hover:text-orange-600 transform duration-500"
        >
          Men
        </Link>

        <Link
          href="/category/women"
          className="m-2 p-2 rounded-md transition-all hover:text-orange-600 transform duration-500"
        >
          Women
        </Link>

        <Link
          href="/category/kid"
          className="m-2 p-2 rounded-md transition-all hover:text-orange-600 transform duration-500"
        >
          Kids
        </Link>
      </div>

      {/* Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5 hover:text-orange-600 transform duration-500" />
        </Link>

        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-orange-600 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5 hover:text-orange-600 transform duration-500" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:text-orange-600 transform duration-500"
          onClick={toggleSideBar}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
