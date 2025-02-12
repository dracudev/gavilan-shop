import { Navbar } from "@/components";

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen">
      <Navbar></Navbar>
      <div className="px-0 sm:px-10">{children}</div>
    </main>
  );
}
