"use client";
import { IProductTotalPrice } from "@/helps/product";
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface ICartProduct extends IProductTotalPrice {
  quantity: number;
}

interface ICardContext {
  products: ICartProduct[];
  cartTotalPrice: number;
  cartBaseprice: number;
  cartTotalDiscount: number;
  // cartTotalQuantity: number;
  decreseProductCart: (productId: string) => void;
  increseProductCart: (productId: string) => void;
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

    // se o produto já existir no carrinho, soma a quantidade
    const productInCart = products.some((item) => item.id === product.id);

    if (productInCart) {
      setProducts((prev) =>
        prev.map((productCart) => {
          if (productCart.id === product.id) {
            return {
              ...productCart,
              quantity: productCart.quantity + product.quantity,
            };
          }
          return productCart;
        })
      );
      return; // se nao nao faz nada
    }
    setProducts((prev) => [...prev, product]); // evita problema de renderização
  };

  const decreseProductCart = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((productCart) => {
          if (productCart.id === productId) {
            return {
              ...productCart,
              quantity: productCart.quantity - 1,
            };
          }
          return productCart;
        })
        .filter((item) => item.quantity > 0)
    );
  };
  const increseProductCart = (productId: string) => {
    setProducts((prev) =>
      prev.map((productCart) => {
        if (productCart.id === productId) {
          return {
            ...productCart,
            quantity: productCart.quantity + 1,
          };
        }
        return productCart;
      })
    );
  };

  const value = {
    products,
    addToCart,
    decreseProductCart,
    increseProductCart,
    cartTotalPrice: 0,
    cartBaseprice: 0,
    cartTotalDiscount: 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
