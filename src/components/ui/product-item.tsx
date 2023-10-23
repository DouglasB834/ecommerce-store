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
    <div className="flex flex-col gap-4">
      <div className="flex bg-accent relative w-[160px] max-w-[160px] h-[170px] justify-center items-center rounded-lg">
        <figure className="flex justify-center items-center">
          <Image
            src={product.imageUrls?.[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            title={product.name}
            className=" w-auto max-h-[70%] max-w-[80%]"
          />
        </figure>
        {product.discountPercentage > 0 && (
          <Badge className="absolute text-xs  top-3 left-2 py-[4px] px-[8px]">
            <ArrowDown size={14} />
            {product?.discountPercentage}%
          </Badge>
        )}
      </div>
      <div className="max-w-[160px] mx-[5px]">
        <p className="overflow-hidden whitespace-nowrap text-ellipsis text-[12px] ">
          {product.name}
        </p>
        <div>
          {product?.totalPrice > 0 ? (
            <div className="flex  gap-2 items-center">
              <p className="text-base font-semibold">
                R$ {product?.totalPrice.toFixed(2)}
              </p>
              <p className="text-xs line-through opacity-75">
                RS {Number(product?.basePrice).toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <p className="text-base font-semibold">
                RS {Number(product?.basePrice).toFixed(2)}
              </p>
            </div>
          )}
          <div className="starts flex">
            <p className="text-sm ">
              🌟🌟🌟🌟⭐ <span className=" line-through opacity-75">(25)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
