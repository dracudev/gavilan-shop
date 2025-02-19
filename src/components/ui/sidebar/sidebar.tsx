"use client";

import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { FaRedhat } from "react-icons/fa";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
} from "react-icons/io5";

export function Sidebar() {
  const isSideBarOpen = useUIStore((state) => state.isSideBarOpen);
  const toggleSideBar = useUIStore((state) => state.toggleSideBar);

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSideBarOpen]);

  return (
    <div>
      {isSideBarOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
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
          "fixed overflow-y-auto p-5 mt-10 right-0 top-0 w-screen sm:w-[500px] h-screen bg-white dark:bg-[var(--background)] z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideBarOpen,
          }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer hover:text-[var(--primary-color)]  dark:hover:text-[var(--primary-color)] dark:text-white transition-colors transform duration-500 text-zinc-700"
          onClick={toggleSideBar}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2 text-zinc-700"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-[var(--primary-color)] text-zinc-700"
          />
        </div>

        {/* Menu */}
        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300 dark:text-white dark:hover:text-black  rounded transition-all text-zinc-700 hover:text-[var(--primary-color)] transform duration-500"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Account</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300 dark:text-white dark:hover:text-black  rounded transition-all text-zinc-700 hover:text-[var(--primary-color)] transform duration-500"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link
          href="/auth/login"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300 dark:text-white dark:hover:text-black  rounded transition-all text-zinc-700 hover:text-[var(--primary-color)] transform duration-500"
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Login</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300 dark:text-white dark:hover:text-black  rounded transition-all text-zinc-700 hover:text-[var(--primary-color)] transform duration-500"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Logout</span>
        </Link>

        {/* Separator */}
        <div className="w-full h-px bg-gray-300 my-5"></div>

        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300 dark:text-white dark:hover:text-black  rounded transition-all text-zinc-700 hover:text-[var(--primary-color)] transform duration-500"
        >
          <FaRedhat size={30} />
          <span className="ml-3 text-xl">Products</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300 dark:text-white dark:hover:text-black  rounded transition-all text-zinc-700 hover:text-[var(--primary-color)] transform duration-500"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300 dark:text-white dark:hover:text-black  rounded transition-all text-zinc-700 hover:text-[var(--primary-color)] transform duration-500"
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Users</span>
        </Link>
      </nav>
    </div>
  );
}
