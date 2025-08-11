import { Footer, Navbar, Sidebar, ToastProvider } from "@/components";
import { checkUserRole } from "@/utils/auth";
import CartToastInitializer from "./cart-toast-initializer";

export default async function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { role, userData } = await checkUserRole();

  return (
    <ToastProvider>
      <CartToastInitializer />
      <main className="min-h-screen bg-background">
        <Navbar />
        <Sidebar userRole={role} userData={userData ?? null} />

        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>

        <Footer />
      </main>
    </ToastProvider>
  );
}
