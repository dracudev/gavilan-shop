import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { signup } from "../../../../services/supabase/actions";

export default function Login() {
  return (
    <form>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className={`${titleFont.className} text-4xl mb-5`}>Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor="text">Username</label>
          <input
            className="px-5 py-2 border bg-gray-200 dark:text-black rounded mb-5"
            id="username"
            name="username"
            type="username"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            className="px-5 py-2 border bg-gray-200 dark:text-black rounded mb-5"
            id="email"
            name="email"
            type="email"
            required
          />

          <label htmlFor="text">Password</label>
          <input
            className="px-5 py-2 border bg-gray-200 dark:text-black rounded mb-5"
            id="password"
            name="password"
            type="password"
            required
          />

          <button className="btn-primary" formAction={signup}>
            Sign Up
          </button>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>

          <Link href="/login" className="btn-secondary text-center">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
