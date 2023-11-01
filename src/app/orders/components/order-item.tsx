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
  return (
    <Card className="px-4">
      <Accordion type="single" collapsible className="">
        <AccordionItem value={`${order.id}`}>
          <AccordionTrigger>
            <div className="flex flex-col items-start gap-2">
              <h3 className="font-semibold text-sm">Número do pedido</h3>
              <p className="text-xs">Pedido: 002 </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* informaçãp do produto  */}
            <div className="flex flex-col gap-4 ">
              <div className="flex justify-between  items-center">
                <div>
                  {/* status */}
                  <p className="uppercase font-semibold">Status</p>
                  <span className="text-[#8162FF]">pago</span>
                </div>
                <div>
                  {/* data */}
                  <p className="uppercase font-semibold">Data</p>
                  <span className="opacity-75">
                    {format(order.createAt, "dd-mm-yyyy")}
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
