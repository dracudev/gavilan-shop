"use client";

import logo from "@/assets/head-logo.png";
import { titleFont } from "@/config/fonts";
import { useTheme } from "@/context/theme-context";
import { useCartStore, useUIStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { ToggleButton } from "../toggle-button/toggle-button";

export const Navbar = () => {
  const toggleSideBar = useUIStore((state) => state.toggleSideBar);
  const setSearchFocus = useUIStore((state) => state.setSearchFocus);
  const { theme, toggleTheme } = useTheme();
  const totalItems = useCartStore((state) => state.totalItems);

  const handleSearchClick = () => {
    toggleSideBar();
    setSearchFocus(true);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex px-5 justify-between items-center w-full bg-[var(--background)] z-50"
      style={{
        boxShadow:
          "0 4px 4px -1px var(--shadow-color), 0 2px 2px -1px var(--shadow-color)",
        backgroundColor:
          theme === "dark"
            ? "rgba(32, 27, 23, 0.8)"
            : "rgba(247, 245, 243, 0.8)",
      }}
    >
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

      {/* Logo */}
      <div>
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            className="w-auto h-auto me-2  hidden sm:block "
            width={40}
            height={40}
          />
          <span
            className={`${titleFont.className} antialiased text-xl text-nowrap`}
          >
            El Gavilán
          </span>
        </Link>
      </div>

      {/* Menu */}
      <div className="flex items-center">
        <ToggleButton
          isDark={theme === "dark"}
          onChange={toggleTheme}
        ></ToggleButton>
        <button className="mx-2" onClick={handleSearchClick}>
          <IoSearchOutline className="w-5 h-5 hover:text-[var(--primary-color)] transform duration-500" />
        </button>

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
