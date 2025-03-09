"use client";

import { signup } from "@/services/supabase/actions";
import Link from "next/link";

export default function SignupForm({ redirect }: { redirect?: string }) {
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (redirect) {
      formData.set("redirect", redirect);
    }
    await signup(formData);
  };

  return (
    <form onSubmit={handleSignup}>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-4xl mb-5">Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="px-5 py-2 border bg-gray-200 dark:text-black rounded mb-5"
            id="username"
            name="username"
            type="text"
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

          <label htmlFor="password">Password</label>
          <input
            className="px-5 py-2 border bg-gray-200 dark:text-black rounded mb-5"
            id="password"
            name="password"
            type="password"
            required
          />

          <button className="btn-primary" type="submit">
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
