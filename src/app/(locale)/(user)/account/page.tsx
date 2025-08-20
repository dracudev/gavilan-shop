import { ProfilePageUI, UserData } from "@/components/ui/profile/profile-page";
import { checkUserRole } from "@/utils/auth";

export default async function ProfilePage() {
  const { userData } = await checkUserRole();

  // fallback user data
  const fallbackUserData: UserData = {
    name: "El Gavilán",
    email: "elgavilán@example.com",
    phone: "-",
    location: "The World",
    preferredStyle: "Classic Elegant",
    favoriteCategory: "Traditional Hats",
  };

  const displayName = userData?.user_metadata?.display_name;

  const mappedUserData: UserData = {
    name: displayName || fallbackUserData.name,
    email: userData?.email || fallbackUserData.email,
    phone: fallbackUserData.phone,
    location: fallbackUserData.location,
    preferredStyle: fallbackUserData.preferredStyle,
    favoriteCategory: fallbackUserData.favoriteCategory,
  };

  return <ProfilePageUI userData={mappedUserData} />;
}
