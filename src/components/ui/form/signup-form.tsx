"use client";

import { signup } from "@/services/supabase/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <form action={formAction}>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-4xl mb-5">Sign Up</h1>

        {state?.error && (
          <div className="mb-4 bg-error-color/10 text-error-color border border-error-color rounded-md px-4 py-2 flex items-center gap-2 shadow-soft animate-fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
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
            <span>
              {typeof state.error === "string"
                ? state.error
                : state.error?.message || "Signup failed"}
            </span>
          </div>
        )}

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

          {redirect && <input type="hidden" name="redirect" value={redirect} />}

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
