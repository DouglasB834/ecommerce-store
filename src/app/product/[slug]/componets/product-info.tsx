"use client";
import { Button } from "@/components/ui/button";
import { DiscountBadge } from "@/components/ui/discount-badge";
import { IProductTotalPrice } from "@/helps/product";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react";
import React, { useState } from "react";

interface IProductInfoProps {
  product: Pick<
    IProductTotalPrice,
    "name" | "basePrice" | "description" | "discountPercentage" | "totalPrice"
  >; //ajuda e receber somente esses conteúdo tirando qualquer outro desnecessario
}

export const ProductInfo = ({
  product: { name, basePrice, description, discountPercentage, totalPrice },
}: IProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuatity = () => {
    setQuantity((prev) => (prev == 1 ? prev : prev - 1));
  };
  const handleIncreseQuantitu = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="mt-8 max-w-[480px] m-auto  p-5 bg-accent ">
      <div className="flex flex-col">
        <span className="flex gap-1">
          <StarIcon size={14} color="#8162FF" />
          <StarIcon size={14} color="#8162FF" />
          <StarIcon size={14} color="#8162FF" />
          <StarIcon size={14} color="#8162FF" />
          <StarIcon size={14} color="#8162FF" />
        </span>
        <h1 className="text-lg">{name}</h1>

        <div className="flex    gap-2 items-center">
          <h2 className=" text-lg font-bold">
            R$ {Number(totalPrice)?.toFixed(2)}
          </h2>
          {discountPercentage > 0 && (
            // <Badge className=" py-[4px] px-[8px]">
            //   <ArrowDown size={14} />
            //   {discountPercentage}%
            // </Badge> estudo
            <DiscountBadge>{discountPercentage}</DiscountBadge>
          )}
        </div>
        {discountPercentage > 0 && (
          <p className="opacity-75 text-[1rem]">
            De:
            <span className="line-through ">
              R$ {Number(basePrice)?.toFixed(2)}
            </span>
          </p>
        )}

        <div className="flex items-center  gap-2 my-4 ">
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={handleDecreaseQuatity}
          >
            <ArrowLeftIcon size={16} />
          </Button>

          <p>{quantity}</p>

          <Button
            size={"icon"}
            variant={"outline"}
            onClick={handleIncreseQuantitu}
          >
            <ArrowRightIcon size={16} />
          </Button>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <h3 className="text-base font-bold">Descriçao</h3>
          <p className="text-[14px] opacity-70">{description}</p>
          <Button
            variant={"default"}
            className=" text-base font-bold uppercase pt-2 mt-10"
          >
            Adicionar ao carrinho
          </Button>
        </div>
        <div className=" flex items-center justify-between py-2 px-5 mt-5 bg-[#2A2A2A] rounded-md">
          <div className="flex gap-3 items-center">
            <TruckIcon size={32} />
            <div className="flex items-center flex-col ">
              <p>
                Entre via <strong>FSPacket®</strong>
              </p>
              <p className=" text-[#8162FF]">
                Envia para <span className="font-semibold">Todo Braisl</span>
              </p>
            </div>
          </div>
          <p className="font-bold">Frete Gratis</p>
        </div>
      </div>
    </div>
  );
};
