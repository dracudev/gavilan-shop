import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5" />

      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-5">Your cart is empty</h1>
        <p className="text-lg font-light text-center">
          You have no items in your cart.{" "}
          <Link
            href="/"
            className="text-[var(--primary-color)] hover:underline decoration-[var(--primary-color)]"
          >
            Start adding some!
          </Link>
        </p>
      </div>
    </div>
  );
}
