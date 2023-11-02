import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { OrderProductItem } from "./order-product-item";
import { useMemo } from "react";
import { STATUS_ORDER } from "@/constans/order-product-item";
import { computerProductPrice } from "@/helps/product";

interface IOrderItemProps {
  // os pedidos vai incluir orderProduct e a order Product vai incluir os seus item de fato
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
}
//collapsible
export const OrderItem = ({ order }: IOrderItemProps) => {
  const { orderProducts } = order;

  const formattedPrice = (price: number) => {
    //fazer fn global
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const subTotal = useMemo(() => {
    return orderProducts.reduce(
      (acc, orderProduct) => acc + Number(orderProduct.basePrice),
      0
    );
  }, [orderProducts]);

  const totalPrice = useMemo(() => {
    return orderProducts.reduce((acc, product) => {
      const totalPriceOrder = computerProductPrice(product.product);

      return acc + totalPriceOrder.totalPrice * product.quantity;
    }, 0);
  }, [orderProducts]);

  const subtotalDescont = useMemo(() => {
    return subTotal - totalPrice;
  }, [subTotal, totalPrice]);

  return (
    <Card className="px-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`${order.id}`}>
          <AccordionTrigger>
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-sm">
                Pedido com {order.orderProducts.length} Produto
              </h3>
              <p className="text-xs">
                Pedido:{format(order?.updateAt, "dd/MM/yyyy")}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* informaçãp do produto  */}
            <div className="flex flex-col gap-4 ">
              <div className="flex justify-between  items-center">
                <div>
                  {/* status */}
                  <p className="uppercase font-semibold">Status</p>
                  <span className="text-[#8162FF]">
                    {STATUS_ORDER[order.status as keyof typeof STATUS_ORDER]}
                  </span>
                </div>
                <div>
                  {/* data */}
                  <p className="uppercase font-semibold">Data</p>
                  <span className="opacity-75">
                    {format(order.createAt, "dd/MM/yyyy")}
                  </span>
                </div>
                <div>
                  {/* forma de pagamento */}
                  <p className="uppercase font-semibold">Pago</p>
                  <span className="opacity-75">Cartão</span>
                </div>
              </div>
              {order.orderProducts.map((product) => (
                <OrderProductItem key={product.id} orderProduct={product} />
              ))}
            </div>
            {/* total prices */}
            <div className="borderB flex flex-col border-t-2 gap-2 mt-4 pt-2">
              <div className="flex justify-between ms-center text-xs sm:text-sm py-2">
                <p>Subtotal </p> <span>{formattedPrice(Number(subTotal))}</span>
              </div>
              <div className="flex justify-between ms-center text-xs sm:text-sm py-2">
                <p>Entrega </p> <span className="uppercase">Grátis</span>
              </div>
              <div className="flex justify-between ms-center text-xs sm:text-sm py-2">
                <p>Descontos </p>{" "}
                <span>- {formattedPrice(subtotalDescont)}</span>
              </div>
              <div className="flex justify-between ms-center text-xs sm:text-sm font-bold py-2">
                <p>Total </p> <span>{formattedPrice(totalPrice)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
