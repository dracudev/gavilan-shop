"use client";

import { login } from "@/services/supabase/actions";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn-primary" type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Login"}
    </button>
  );
}

type LoginFormState = { error: string | { message?: string } | null };
function getInitialState(): LoginFormState {
  return { error: null };
}

// Server action wrapper for useFormState
async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const result = await login(formData);
  if (result && result.error) {
    return { error: result.error.message || "Invalid credentials" };
  }
  return { error: null };
}

type LoginFormProps = {
  redirect?: string;
};

export default function LoginForm({ redirect }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, getInitialState());

  return (
    <form action={formAction}>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-4xl mb-5">Login</h1>

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
                : state.error?.message || "Invalid credentials"}
            </span>
          </div>
        )}

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

          {/* Hidden redirect input for server action */}
          {redirect && <input type="hidden" name="redirect" value={redirect} />}

          <SubmitButton />

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
