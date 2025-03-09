import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { createClient } from "@/services/supabase/server";

interface CustomJwtPayload extends JwtPayload {
  user_role: string;
}

interface User {
  id: string;
  email: string;
}

interface UserRoleResult {
  role: string;
  userData?: User;
}

export async function checkUserRole(): Promise<UserRoleResult> {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return { role: "unidentified" };
  }

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !sessionData?.session) {
    return { role: "unidentified" };
  }

  const jwt = jwtDecode<CustomJwtPayload>(sessionData.session.access_token);
  const userRole = jwt.user_role;
  if (userRole === "admin") {
    return { role: "admin", userData: userData.user as User };
  }

  return { role: "user", userData: userData.user as User };
}
