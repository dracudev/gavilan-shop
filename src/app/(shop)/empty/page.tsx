import { inter } from "@/config/fonts";

export default function EmptyPage() {
  return (
    <div className=" items-center justify-center flex h-screen">
      <h1 className={`${inter.className} text-4xl`}>Empty Page</h1>
    </div>
  );
}
