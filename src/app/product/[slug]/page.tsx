import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "./componets/product-images";
import { ProductInfo } from "./componets/product-info";
import { computerProductPrice } from "@/helps/product";
import { ProductList } from "@/components/ui/product-list";

interface IProductDetailsPageProps {
  params: { slug: string };
}

export default async function page({
  params: { slug },
}: IProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: { slug: slug },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: { not: slug },
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 mb-8">
      <ProductImages imageUrls={product?.imageUrls!} name={product?.name!} />

      <ProductInfo product={computerProductPrice(product!)} />
      <ProductList products={product?.category?.products!} />
    </div>
  );
}
