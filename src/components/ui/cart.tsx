import React, { useContext } from "react";

import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/providers/context-cart";
import { CartItem } from "./cart-item";
import { computerProductPrice } from "@/helps/product";

export const Cart = () => {
  const { products, totalPrice, subTotalPrice, totalDiscountPrice } =
    useContext(CartContext);

  const formattedPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit uppercase  border-primary font-bold text-base gap-1 "
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} /> Catálogo
      </Badge>
      <ul className="flex flex-col gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={computerProductPrice(product) as any}
            />
          ))
        ) : (
          <div>
            <h2>Carinho vazio, vamos fazer compras? </h2>
          </div>
        )}
      </ul>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm border-b-[3px] opacity-75">
          <p>Subtotal</p>
          <p> {formattedPrice(subTotalPrice)}</p>
        </div>

        <div className="flex justify-between text-sm border-b-[3px] opacity-75">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <div className="flex justify-between text-sm border-b-[3px] opacity-75">
          <p>Descontos</p>
          <p>- {formattedPrice(totalDiscountPrice)}</p>
        </div>
        <div className="flex justify-between text-base border-b-[3px] font-semibold ">
          <p>Total</p>
          <p>{formattedPrice(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};
