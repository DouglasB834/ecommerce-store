import { computerProductPrice } from "@/helps/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface IOrderProductProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}
const formattedPrice = (price: number) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

export const OrderProductItem = ({ orderProduct }: IOrderProductProps) => {
  const totalPrice = computerProductPrice(orderProduct.product);

  return (
    <div className="flex gap-4 ">
      <figure className="flex items-center justify-center w-[91px] h-[91px] bg-accent rounded-xl">
        <Image
          src={orderProduct?.product?.imageUrls[0]}
          alt={orderProduct?.product?.name}
          width={0}
          height={0}
          sizes="100vw"
          className="object-contain w-[90%] h-full max-h-[70%] "
        />
      </figure>
      {/* Content */}
      <div className="flex flex-col justify-around w-full ">
        <p className="text-[10px] w-fit bg-accent px-1  sm:px-3 rounded  text-center">
          Vendido e entregue Por:
          <span className="font-semibold">DG Store</span>
        </p>
        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex  justify-between gap-1 ">
          <div className="flex gap-1 items-center ">
            <p className="text-sm font-semibold">
              {formattedPrice(totalPrice.totalPrice)}
            </p>
            {totalPrice.discountPercentage > 0 && (
              <span className="opacity-75 line-through text-xs">
                {formattedPrice(Number(totalPrice.basePrice))}
              </span>
            )}
          </div>
          <span>Qtd:{orderProduct.quantity}</span>
        </div>
      </div>
    </div>
  );
};
