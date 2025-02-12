import { inter } from "@/config/fonts";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;

  if (id === "kids") {
    notFound();
  }

  return (
    <div className=" items-center justify-center flex h-screen">
      <h1 className={`${inter.className} text-4xl`}>Category Page {id}</h1>
    </div>
  );
}
