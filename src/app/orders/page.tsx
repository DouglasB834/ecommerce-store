import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { CreditCardIcon, UserIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { OrderItem } from "./components/order-item";
import { BtnBackPage } from "@/components/ui/btn-back-page";

const OrderPage = async () => {
  const session = await getServerSession(authOptions); //tras user auth serve side

  if (!session?.user || !session) {
    return (
      <div className="flex flex-col justify-center items-center">
        <UserIcon size={64} className="text-primary" />
        <h1 className="text-2xl font-bold">Você não está logado</h1>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (session.user as any).id,
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
    <div className="flex flex-col p-5 gap-4 max-w-[1250px] m-auto">
      <div className="flex gap-2 ">
        <Badge
          className="w-fit uppercase px-[12px] py-[5px] border-primary font-bold text-base gap-1 "
          variant={"outline"}
        >
          <CreditCardIcon size={16} /> Meus Pedidos
        </Badge>
        <BtnBackPage />
      </div>
      <ul className="flex flex-col gap-5">
        {orders
          .map((order) => <OrderItem key={order.id} order={order} />)
          .reverse()}
      </ul>
    </div>
  );
};

export default OrderPage;
