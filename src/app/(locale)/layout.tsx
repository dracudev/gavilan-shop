import { Footer, Navbar, Sidebar } from "@/components";
import { checkUserRole } from "@/utils/auth";

export default async function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { role, userData } = await checkUserRole();

  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <Sidebar userRole={role} userData={userData ?? null} />

      <div className="px-0 sm:px-5">{children}</div>

      <Footer />
    </main>
  );
}
