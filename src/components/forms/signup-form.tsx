"use client";

import { signup } from "@/services/supabase/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useActionState } from "react";

type SignupFormState = { error: string | { message?: string } | null };
function getInitialState(): SignupFormState {
  return { error: null };
}

function useSignupAction() {
  const router = useRouter();
  return async function signupAction(
    prevState: SignupFormState,
    formData: FormData
  ): Promise<SignupFormState> {
    try {
      const result = await signup(formData);
      if (result?.error) {
        return { error: result.error.message || "Signup failed" };
      }
      if (result?.redirectUrl) {
        router.push(result.redirectUrl);
      }
      return { error: null };
    } catch (error) {
      if (typeof error === "object" && error && "message" in error) {
        return {
          error: (error as { message?: string }).message || "Signup failed",
        };
      }
      return { error: "Signup failed" };
    }
  };
}

export default function SignupForm({ redirect }: { redirect?: string }) {
  const signupAction = useSignupAction();
  const [state, formAction] = useActionState(signupAction, getInitialState());

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card
        variant="elevated"
        padding="lg"
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl min-w-0 bg-surface-primary"
      >
        <form action={formAction} className="space-y-4 sm:space-y-6">
          <h1 className="text-4xl mb-5 text-center">Sign Up</h1>

          {state?.error && (
            <div className="mb-4 bg-error-color/10 text-error-color border border-error-color rounded-md px-3 sm:px-4 py-2 sm:py-3 flex gap-2 shadow-soft animate-fadeIn justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 sm:mt-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className="text-sm sm:text-base leading-tight">
                {typeof state.error === "string"
                  ? state.error
                  : state.error?.message || "Signup failed"}
              </span>
            </div>
          )}

          <div className="space-y-4 sm:space-y-5">
            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="username"
                className="block text-sm sm:text-base font-medium"
              >
                Username
              </label>
              <input
                className="w-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 border bg-gray-200 dark:text-black rounded-md sm:rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium"
              >
                Email
              </label>
              <input
                className="w-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 border bg-gray-200 dark:text-black rounded-md sm:rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium"
              >
                Password
              </label>
              <input
                className="w-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 border bg-gray-200 dark:text-black rounded-md sm:rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>

            {/* Hidden redirect input for server action */}
            {redirect && (
              <input type="hidden" name="redirect" value={redirect} />
            )}

            <div className="pt-2">
              <button className="btn-primary w-full" type="submit">
                Sign Up
              </button>
            </div>

            <div className="flex items-center my-4 sm:my-6">
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              <div className="px-3 sm:px-4 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                O
              </div>
              <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <Link
              href="/login"
              className="btn-secondary w-full text-center block py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-md sm:rounded-lg transition-all"
            >
              Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
