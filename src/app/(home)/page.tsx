import Image from "next/image";
import { Categories } from "./components/categories";
import { ProductList } from "./components/product-list";
import { prismaClient } from "@/lib/prisma";
import { PromoBanner } from "./components/promoBanner";

export default async function Home() {
  //mudar depois para dentro do product list
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <main>
      <div className="p-5 ">
        <PromoBanner
          src={"/banner_home_01.png"}
          alt="Até 55% de desconto esse mês"
        />
        {/* category */}
        <div className="pt-12">
          <Categories />
        </div>
      </div>
      <div className="mt-12">
        <ProductList products={deals} />
      </div>
    </main>
  );
}
