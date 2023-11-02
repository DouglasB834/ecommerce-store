import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constans/category-items-icons";
import { Category } from "@prisma/client";

import Link from "next/link";

interface ICategoryProps {
  category: Category;
}

export const CategoryItem = ({ category }: ICategoryProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge
        variant={"outline"}
        className="flex  gap-2 justify-center items-center py-2 hover:bg-accent cursor-pointer"
      >
        {CATEGORY_ICON[category?.slug as keyof typeof CATEGORY_ICON]}

        {category?.name}
      </Badge>
    </Link>
  );
};
