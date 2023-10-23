import { ProductItem } from "@/components/ui/product-item";
import { TitlesProducts } from "@/components/ui/titlesProducts";
import { computerProductPrice } from "@/helps/product";
import { prismaClient } from "@/lib/prisma";
import { Product } from "@prisma/client";

import React from "react";

interface IProductListProps {
  products: Product[];
}

export const ProductList = async ({ products }: IProductListProps) => {
  // const deals = await prismaClient.product.findMany({
  //     where: {
  //       discountPercentage: {
  //         gt: 0,
  //       },
  //     },
  //   });

  return (
    <section
      aria-label="Carde com desconto"
      className="px-3 flex flex-col gap-2 "
    >
      <TitlesProducts text={"Ofertas"} />
      <div
        className="flex overflow-x-auto  
    [&::-webkit-scrollbar]:hidden gap-4
    "
      >
        {products.map((product) => (
          <ProductItem
            key={product?.id}
            product={computerProductPrice(product)}
          />
        ))}
      </div>
    </section>
  );
};
