import { titleFont } from "@/config/fonts";
import Link from "next/link";

export function Footer() {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link
        href="/"
        className="hover:underline hover:text-[var(--primary-color)] decoration-[var(--primary-color)]"
      >
        <span className={`${titleFont.className} antialiased font-bold`}>
          El Gavilán{" "}
        </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link
        href="/"
        className="mx-3 hover:underline hover:text-[var(--primary-color)] decoration-[var(--primary-color)]"
      >
        Privacy & Legal
      </Link>

      <Link
        href="/"
        className="hover:underline hover:text-[var(--primary-color)] decoration-[var(--primary-color)]"
      >
        Locations
      </Link>
    </div>
  );
}
