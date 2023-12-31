import React, { useContext } from "react";
import { Badge } from "./badge";
import { Sheet, ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/providers/context-cart";
import { CartItem } from "./cart-item";
import { computerProductPrice } from "@/helps/product";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";

export const Cart = () => {
  const { products, totalPrice, subTotalPrice, totalDiscountPrice } =
    useContext(CartContext);
  const { data } = useSession();

  const formattedPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const handleCheckout = async () => {
    // serve action status da compra
    if (!data?.user) {
      return alert("Faça login para finalizar a compra");
    }
    const order = await createOrder(products, (data?.user as any).id);
    //backEnd criar checkout
    const checkout = await createCheckout(products, order.id);

    //front end
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    // Criar pedido no banco
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
    if (checkout) {
      localStorage.removeItem("store");
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full ">
      <Badge
        className="w-fit uppercase  border-primary font-bold text-base gap-1 "
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} />
        Carinho
      </Badge>
      <ul className="flex flex-col h-full  overflow-hidden ">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-5">
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
          </div>
        </ScrollArea>
      </ul>
      {products.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm border-b-[3px] opacity-75  py-1">
              <p>Subtotal</p>
              <p> {formattedPrice(subTotalPrice)}</p>
            </div>

            <div className="flex justify-between text-sm border-b-[3px] opacity-75  py-1">
              <p>Entrega</p>
              <p>GRÁTIS</p>
            </div>

            <div className="flex justify-between text-sm border-b-[3px] opacity-75  py-1">
              <p>Descontos</p>
              <p>- {formattedPrice(totalDiscountPrice)}</p>
            </div>
            <div className="flex justify-between  items text-base border-b-[3px] font-semibold py-1 ">
              <p>Total</p>
              <p>{formattedPrice(totalPrice)}</p>
            </div>
          </div>

          <Button
            className="text-sm font-semibold uppercase border-"
            onClick={handleCheckout}
          >
            Finalizar compra
          </Button>
          <p className="text-sm">
            {" "}
            Cartão para teste:{" "}
            <span className="font-semibold border-b-2 border-primary">
              4242-4242-4242-4242
            </span>{" "}
          </p>
        </>
      )}
    </div>
  );
};
