import LoginForm from "@/components/ui/form/login-form";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const currSearchParams = await searchParams;

  const redirect = Array.isArray(currSearchParams.redirect)
    ? currSearchParams.redirect[0]
    : currSearchParams.redirect;

  return <LoginForm redirect={redirect} />;
}
