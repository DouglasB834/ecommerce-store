import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "./componets/product-images";

interface IProductDetailsPageProps {
  params: { slug: string };
}

export default async function page({
  params: { slug },
}: IProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: { slug: slug },
  });

  return (
    <div className="">
      <ProductImages imageUrls={product?.imageUrls!} name={product?.name!} />
    </div>
  );
}
