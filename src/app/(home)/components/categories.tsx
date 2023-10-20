import { prismaClient } from "@/lib/prisma";
import React from "react";
import { CategoryItem } from "./category-item";

export const Categories = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-x-[10px] gap-y-4 ">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
