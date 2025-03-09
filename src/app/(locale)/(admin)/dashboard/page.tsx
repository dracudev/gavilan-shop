import { checkUserRole } from "@/utils/auth";

export default async function PrivatePage() {
  const { userData } = await checkUserRole();

  if (!userData) {
    return <p>Error: User data is not available.</p>;
  }

  return <p>Hello {userData.email}</p>;
}
