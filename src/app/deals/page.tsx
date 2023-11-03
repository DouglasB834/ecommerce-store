import { Badge } from "@/components/ui/badge";
import { BtnBackPage } from "@/components/ui/btn-back-page";
import { ProductItem } from "@/components/ui/product-item";
import { computerProductPrice } from "@/helps/product";

import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="p-5 flex flex-col gap-4 max-w-[1200px] m-auto">
      <div className="flex gap-2">
        <Badge
          className="w-fit uppercase  border-primary font-bold text-base gap-1 "
          variant={"outline"}
        >
          <PercentIcon size={16} />
          Ofertas
        </Badge>
        <BtnBackPage />
      </div>
      <ul className="grid grid-cols-2 gap-4 ">
        {deals?.map((product) => (
          <ProductItem
            key={product?.id}
            product={computerProductPrice(product)}
          />
        ))}
      </ul>
    </div>
  );
};

export default DealsPage;
