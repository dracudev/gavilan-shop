import { Footer } from "@/components/ui/footer/footer";
import { Navbar } from "@/components/ui/navbar/navbar";
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { ToastProvider } from "@/components/ui/toast/toast-provider";
import { ConditionalContainer } from "@/components/ui/layout/conditional-container";
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
          <ConditionalContainer>{children}</ConditionalContainer>
        </div>

        <Footer />
      </main>
    </ToastProvider>
  );
}
