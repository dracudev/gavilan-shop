import { Navbar, Sidebar } from "@/components";

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screenn pt-16">
      <Navbar />
      <Sidebar />

      <div className="px-0 sm:px-5">{children}</div>
    </main>
  );
}
