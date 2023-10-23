import { IProductTotalPrice } from "@/helps/product";
import { Product } from "@prisma/client";

import Image from "next/image";
import React from "react";
import { Badge } from "./badge";
import { ArrowDown } from "lucide-react";

interface IProductItemProps {
  product: IProductTotalPrice;
}

export const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <div className="flex flex-col gap-4  ">
      <div className="relative flex   items-center  justify-center rounded-lg bg-accent">
        <figure className="flex aspect-square justify-center items-center h-[170px] w-full">
          <Image
            src={product.imageUrls?.[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            title={product.name}
            className=" w-auto max-h-[70%] max-w-[90%]"
          />
        </figure>
        {product.discountPercentage > 0 && (
          <Badge className="absolute text-xs  top-3 left-2 py-[4px] px-[8px]">
            <ArrowDown size={14} />
            {product?.discountPercentage}%
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="overflow-hidden whitespace-nowrap text-ellipsis text-[12px] w-[22ch] ">
          {product.name}
        </p>
        <div className="flex   gap-2 items-center">
          {product?.discountPercentage > 0 ? (
            <>
              <p className="text-base font-semibold">
                R$ {product?.totalPrice.toFixed(2)}
              </p>
              <p className="text-xs line-through opacity-75">
                RS {Number(product?.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <p className="text-base font-semibold">
                RS {Number(product?.basePrice).toFixed(2)}
              </p>
            </div>
          )}
        </div>
        <div className="starts flex">
          <p className="text-sm ">
            🌟🌟🌟🌟⭐ <span className=" line-through opacity-75">(25)</span>
          </p>
        </div>
      </div>
    </div>
  );
};
