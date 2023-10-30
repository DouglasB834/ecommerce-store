import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import React from "react";
import { CategoryItem } from "./components/category-item";

export default async function page() {
  const categories = await prismaClient.category.findMany();

  return (
    <div className="flex flex-col gap-8 p-5  max-w-[1200px] m-auto ">
      <Badge
        className="w-fit uppercase px-[12px] py-[5px] border-primary font-bold text-base gap-1 "
        variant={"outline"}
      >
        <ShapesIcon size={16} /> Catálogo
      </Badge>
      <ul className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
}
