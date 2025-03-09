import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";

interface CustomJwtPayload extends JwtPayload {
  user_role: string;
}

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/login");
  }

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !sessionData?.session) {
    redirect("/login");
  }

  const jwt = jwtDecode<CustomJwtPayload>(sessionData.session.access_token);
  const userRole = jwt.user_role;
  if (userRole !== "admin") {
    redirect("/");
  }

  return <p>Hello {userData.user.email}</p>;
}
