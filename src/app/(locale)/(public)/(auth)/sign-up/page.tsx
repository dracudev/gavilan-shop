import { useSearchParams } from "next/navigation";
import SignupForm from "@/components/ui/forms/signup-from";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || undefined;

  return <SignupForm redirect={redirect} />;
}
