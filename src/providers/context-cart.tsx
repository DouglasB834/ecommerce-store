"use client";
import { IProductTotalPrice } from "@/helps/product";
import { Product } from "@prisma/client";
import { createContext, ReactNode, useMemo, useState } from "react";

export interface ICartProduct extends IProductTotalPrice {
  quantity: number;
}

interface ICardContext {
  products: ICartProduct[];
  cartTotalPrice: number;
  cartBaseprice: number;
  cartTotalDiscount: number;
  decreseProductCart: (productId: string) => void;
  increseProductCart: (productId: string) => void;
  removeProductCart: (productId: string) => void;
  addToCart: (product: ICartProduct) => void;
  subTotalPrice: number;
  totalPrice: number;
  totalDiscountPrice: number;
}

interface IChildrenProps {
  children: ReactNode;
}

export const CartContext = createContext<ICardContext>({} as ICardContext);

export const CartProvider = ({ children }: IChildrenProps) => {
  const [products, setProducts] = useState<ICartProduct[]>([]);

  // fazer a soma dos produto no carinho, com desconto
  const totalPrice = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.totalPrice) * product.quantity,
      0
    );
  }, [products]);

  //fazer a soma dos produto no carinho, sem desconto
  const subTotalPrice = useMemo(() => {
    //useMemo para fazer altaração somente no carinho  quando products tiver alteração
    return products.reduce(
      (acc, product) => acc + Number(product.basePrice) * product.quantity,
      0
    );
  }, [products]);
  //fazer a soma dos desconto do carinho
  // const cartTotalDiscount =
  //fazer a soma dos produto no carinho, sem desconto
  const totalDiscountPrice = useMemo(() => {
    return subTotalPrice - totalPrice;
  }, [subTotalPrice, totalPrice]);

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

  const removeProductCart = (productId: string) => {
    //remover produto do carrinho
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const value = {
    products,
    addToCart,
    decreseProductCart,
    increseProductCart,
    removeProductCart,
    cartTotalPrice: 0,
    cartBaseprice: 0,
    cartTotalDiscount: 0,
    totalPrice,
    subTotalPrice,
    totalDiscountPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
