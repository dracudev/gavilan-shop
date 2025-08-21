import SignupForm from "@/components/forms/signup-form";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SignupPage({ searchParams }: Props) {
  const currSearchParams = await searchParams;

  const redirect = Array.isArray(currSearchParams.redirect)
    ? currSearchParams.redirect[0]
    : currSearchParams.redirect;

  return <SignupForm redirect={redirect} />;
}
