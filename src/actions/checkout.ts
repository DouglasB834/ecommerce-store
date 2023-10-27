"use server";

import { ICartProduct } from "@/providers/context-cart";
import Stripe from "stripe";

//toda FN que criar aqui serão serves actions(executa no servidor )

export const craeteCheckout = async (products: ICartProduct[]) => {
  //criando checkout dentro do stripe
  const strip = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const checkout = await strip.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            images: product.imageUrls,
            description: product.description,
          },
          unit_amount: product.totalPrice * 100,
        },
        quantity: product.quantity,
      };
    }),
  });

  //retorna o checkout do stripe quando finalizado.
  return checkout;
};
