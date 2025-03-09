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
import { logout } from "@/services/supabase/actions";

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
          className="absolute top-5 right-5 cursor-pointer hover:text-[var(--primary-color)]  dark:hover:text-[var(--primary-color)]  transition-colors transform duration-500"
          onClick={toggleSideBar}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2 dark:text-black"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded pl-10 py-1 pr-10 border-b-2 dark:text-black text-xl border-gray-200 focus:outline-none focus:border-[var(--primary-color)] "
          />
        </div>

        {/* Menu */}
        <Link
          href="/account"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300  dark:hover:text-black  rounded transition-all  hover:text-[var(--primary-color)] transform duration-500"
          onClick={toggleSideBar}
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Account</span>
        </Link>

        <Link
          href="/orders"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300  dark:hover:text-black  rounded transition-all  hover:text-[var(--primary-color)] transform duration-500"
          onClick={toggleSideBar}
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link
          href="/login"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300  dark:hover:text-black  rounded transition-all  hover:text-[var(--primary-color)] transform duration-500"
          onClick={toggleSideBar}
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Login</span>
        </Link>

        <div
          onClick={() => {
            logout();
            toggleSideBar();
          }}
          className="flex items-center mt-5 p-2 hover:bg-zinc-300  dark:hover:text-black cursor-pointer  rounded transition-all  hover:text-[var(--primary-color)] transform duration-500"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Logout</span>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gray-300 my-5"></div>

        <Link
          href="/dashboard/products"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300  dark:hover:text-black  rounded transition-all  hover:text-[var(--primary-color)] transform duration-500"
          onClick={toggleSideBar}
        >
          <FaRedhat size={30} />
          <span className="ml-3 text-xl">Products</span>
        </Link>

        <Link
          href="/dashboard/orders"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300  dark:hover:text-black  rounded transition-all  hover:text-[var(--primary-color)] transform duration-500"
          onClick={toggleSideBar}
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link
          href="/dashboard/users"
          className="flex items-center mt-5 p-2 hover:bg-zinc-300  dark:hover:text-black  rounded transition-all  hover:text-[var(--primary-color)] transform duration-500"
          onClick={toggleSideBar}
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Users</span>
        </Link>
      </nav>
    </div>
  );
}
