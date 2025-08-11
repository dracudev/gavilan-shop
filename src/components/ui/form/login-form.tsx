"use client";

import { login } from "@/services/supabase/actions";
import { useToast } from "@/components/ui/toast/toast-provider";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm({ redirect }: { redirect?: string }) {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    if (redirect) {
      formData.set("redirect", redirect);
    }

    addToast({
      title: "Signing in...",
      description: "Please wait while we log you in",
      type: "info",
    });

    try {
      await login(formData);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        typeof error.digest === "string" &&
        error.digest.includes("NEXT_REDIRECT")
      ) {
        return;
      }

      console.error("Login error:", error);
      addToast({
        title: "Login failed",
        description: "Please check your email and password and try again",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-4xl mb-5">Login</h1>

        <div className="flex flex-col">
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

          <button className="btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>

          <Link href="/sign-up" className="btn-secondary text-center">
            Create new account
          </Link>
        </div>
      </div>
    </form>
  );
}
