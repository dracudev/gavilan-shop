import { Navbar } from "@/components";

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar></Navbar>
      {children}
    </main>
  );
}
