"use client";

import logo from "@/assets/head-logo.png";
import { titleFont } from "@/config/fonts";
import { useTheme } from "@/context/theme-context";
import { useCartStore } from "@/store/cart/cart-store";
import { useUIStore } from "@/store/ui/ui-store";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-glass backdrop-blur-xl border-b border-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Categories - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/category/men"
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 group"
            >
              <span className="group-hover:scale-105 transition-transform duration-200">
                Men
              </span>
            </Link>
            <Link
              href="/category/women"
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 group"
            >
              <span className="group-hover:scale-105 transition-transform duration-200">
                Women
              </span>
            </Link>
            {/*
            <Link
              href="/category/kid"
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 group"
            >
              <span className="group-hover:scale-105 transition-transform duration-200">
                Kids
              </span>
            </Link>
            */}
            <span
              className="px-3 py-2 text-sm font-medium text-text-muted rounded-md"
              aria-disabled="true"
            >
              Kids
            </span>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative mr-3 group-hover:scale-105 transition-transform duration-200 -translate-y-1">
                <Image
                  src={logo}
                  alt="El Gavilán Logo"
                  className="w-9 h-9 drop-shadow-sm"
                  width={36}
                  height={36}
                  priority
                />
              </div>
              <span
                className={`${titleFont.className} text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-200`}
              >
                El Gavilán
              </span>
            </Link>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className="hidden sm:block p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 group"
              aria-label="Search products"
            >
              <IoSearchOutline className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
            </button>

            {/* Cart Button */}
            <Link href="/cart" className="group">
              <button className="relative p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200">
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-text-inverse text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-bounce-subtle">
                    {totalItems}
                  </span>
                )}
                <IoCartOutline className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
              </button>
            </Link>

            {/* Theme Toggle */}
            <div className="p-2">
              <ToggleButton isDark={theme === "dark"} onChange={toggleTheme} />
            </div>

            {/* Menu Button */}
            <button
              onClick={toggleSideBar}
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200 group"
              aria-label="Open menu"
            >
              <span className="group-hover:scale-105 transition-transform duration-200">
                Menu
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
