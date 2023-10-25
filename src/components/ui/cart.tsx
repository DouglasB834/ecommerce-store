import React, { useContext } from "react";

import { Badge } from "./badge";
import { ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/providers/context-cart";
import { CartItem } from "./cart-item";
import { computerProductPrice } from "@/helps/product";

export const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit uppercase  border-primary font-bold text-base gap-1 "
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} /> Catálogo
      </Badge>
      <ul className="flex flex-col gap-4">
        {products.map((product) => (
          <CartItem
            key={product.id}
            product={computerProductPrice(product) as any}
          />
        ))}
      </ul>
    </div>
  );
};
