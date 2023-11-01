import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { CreditCardIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { OrderItem } from "./components/order-item";

const OrderPage = async () => {
  const user = await getServerSession(authOptions); //tras user auth serve side

  if (!user?.user) {
    return <div> Você não tem permissão para acessar essa página </div>;
  }
  const orders = await prismaClient.order.findMany({
    where: {
      id: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col p-5 gap-4 max-w-[1200px]">
      <Badge
        className="w-fit uppercase px-[12px] py-[5px] border-primary font-bold text-base gap-1 "
        variant={"outline"}
      >
        <CreditCardIcon size={16} /> Meus Pedidos
      </Badge>
      <ul className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
