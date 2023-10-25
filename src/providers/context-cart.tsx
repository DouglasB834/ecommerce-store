"use client";
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface ICartProduct extends Product {
  quantity: number;
}

interface ICardContext {
  products: ICartProduct[];
  cartTotalPrice: number;
  cartBaseprice: number;
  cartTotalDiscount: number;
  // cartTotalQuantity: number;
  addToCart: (product: ICartProduct) => void;
  // removeFromCart: (product: Product) => void;
}

interface IChildrenProps {
  children: ReactNode;
}

export const CartContext = createContext<ICardContext>({} as ICardContext);

export const CartProvider = ({ children }: IChildrenProps) => {
  const [products, setProducts] = useState<ICartProduct[]>([]);

  const addToCart = (product: ICartProduct) => {
    // setProducts([...products, product]); pode ser feito asim
    setProducts((prev) => [...prev, product]); // evita problema de renderização
  };

  //value
  const value = {
    products,
    addToCart,
    cartTotalPrice: 0,
    cartBaseprice: 0,
    cartTotalDiscount: 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
