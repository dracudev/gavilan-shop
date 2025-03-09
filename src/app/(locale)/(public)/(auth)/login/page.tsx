"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/ui/forms/login-form";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || undefined;

  return <LoginForm redirect={redirect} />;
}
