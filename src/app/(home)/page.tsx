import Image from "next/image";
import { Categories } from "./components/categories";
import { ProductList } from "../../components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import { PromoBanner } from "./components/promo-banner";
import { TitlesProducts } from "@/components/ui/titlesProducts";

export default async function Home() {
  //mudar depois para dentro do product list
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: { slug: "keyboards" },
    },
  });
  const mouses = await prismaClient.product.findMany({
    where: {
      category: { slug: "mouses" },
    },
  });

  return (
    <main className="flex flex-col gap-8 py-8 ">
      <PromoBanner
        src={"/banner_home_01.png"}
        alt="Até 55% de desconto esse mês"
      />
      {/* category */}
      <div className="px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <TitlesProducts>Oferta</TitlesProducts>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src={"/banner_home_02.png"}
        alt="Até 55% de desconto em Mousese"
      />

      <div className="mt-8">
        <TitlesProducts>Teclados </TitlesProducts>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src={"/banner_home_03.png"}
        alt="Até 20% de desconto em Fone"
      />
      <div className="mt-8">
        <TitlesProducts>Teclados </TitlesProducts>
        <ProductList products={mouses} />
      </div>
    </main>
  );
}
