"use client";

import { titleFont } from "@/config/fonts";
import { useTheme } from "@/context/theme-context";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { ToggleButton } from "../toggle-button/toggle-button";

export const Navbar = () => {
  const toggleSideBar = useUIStore((state) => state.toggleSideBar);
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <nav className="fixed top-0 left-0 right-0 flex px-5 justify-between items-center w-full bg-[var(--background)] shadow-md z-50">
      {/* Logo */}
      <div>
        <Link href="/">
          <span
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            El Gavilán
          </span>
        </Link>
      </div>

      {/* Categories */}
      <div className="hidden sm:block">
        <Link
          href="/category/men"
          className="m-2 p-2 rounded-md transition-all hover:text-[var(--primary-color)] transform duration-500"
        >
          Men
        </Link>

        <Link
          href="/category/women"
          className="m-2 p-2 rounded-md transition-all hover:text-[var(--primary-color)] transform duration-500"
        >
          Women
        </Link>

        <Link
          href="/category/kid"
          className="m-2 p-2 rounded-md transition-all hover:text-[var(--primary-color)] transform duration-500"
        >
          Kids
        </Link>
      </div>

      {/* Menu */}
      <div className="flex items-center">
        <ToggleButton
          isDark={theme === "dark"}
          onChange={toggleTheme}
        ></ToggleButton>
        <Link href="#" className="mx-2">
          <IoSearchOutline className="w-5 h-5 hover:text-[var(--primary-color)] transform duration-500" />
        </Link>

        <Link href="/cart" className="mx-2">
          <div className="relative">
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary-color)] text-[var(--background)] rounded-full px-0.5 text-xs">
                {totalItems}
              </span>
            )}

            <IoCartOutline className="w-5 h-5 hover:text-[var(--primary-color)] transform duration-500" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:text-[var(--primary-color)] transform duration-500"
          onClick={toggleSideBar}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
