/*import { redirect } from "next/navigation";
import { checkUserRole } from "@/utils/auth";

export default async function PrivatePage() {
  const { role, userData } = await checkUserRole();

  if (role === "unidentified") {
    redirect("/login");
  } else if (role !== "admin") {
    redirect("/");
  }

  if (!userData) {
    return <p>Error: User data is not available.</p>;
  }

  return <p>Hello {userData.email}</p>;
}
*/
export default async function PrivatePage() {
  return <p>Hello</p>;
}
