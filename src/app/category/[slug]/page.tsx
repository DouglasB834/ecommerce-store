import { Badge } from "@/components/ui/badge";
import { ProductItem } from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constans/category-items-icons";
import { computerProductPrice } from "@/helps/product";
import { prismaClient } from "@/lib/prisma";

import React from "react";

export default async function CategoryProducts({ params }: any) {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col p-5 gap-8">
      <Badge
        className="w-fit uppercase px-[12px] py-[5px] border-primary font-bold text-base gap-1 "
        variant={"outline"}
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {params.slug}
      </Badge>

      <ul className="grid grid-cols-2 gap-8">
        {category?.products.map((product) => (
          <ProductItem
            key={product.id}
            product={computerProductPrice(product)}
          />
        ))}
      </ul>
    </div>
  );
}
