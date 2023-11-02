"use server";
//toda fn que roda do lado servidor

import { prismaClient } from "@/lib/prisma";
import { ICartProduct } from "@/providers/context-cart";

//criando uma fn que cria  as informações no db
export const createOrder = async (
  cartProducts: ICartProduct[],
  userId: string
) => {
  // no user serve consegui user o getServeSession() para pegar o userID
  //porem como temos o auth mas interessante esta passando por parametro

  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderProducts: {
        createMany: {
          data: cartProducts.map((product) => ({
            productId: product.id,
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            quantity: product.quantity,
          })),
        },
      },
    },
  });
  return order;
};
