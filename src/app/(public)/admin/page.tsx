import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { createClient } from "@/services/supabase/server";

interface CustomJwtPayload extends JwtPayload {
  user_role: string;
}

export default async function PrivatePage() {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session) {
        const jwt = jwtDecode<CustomJwtPayload>(session.access_token);
        const userRole = jwt.user_role;
        if (userRole !== "admin") {
          redirect("/");
        }
      }
    }
  );

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>Hello {data.user.email}</p>;
}
