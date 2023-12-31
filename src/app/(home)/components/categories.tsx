import { prismaClient } from "@/lib/prisma";
import React from "react";
import { CategoryItem } from "./category-item";

export const Categories = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="grid ">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
