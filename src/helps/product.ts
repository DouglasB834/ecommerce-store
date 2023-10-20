import { Product } from "@prisma/client";

interface IProductTotalPrice extends Product {
  totalPrice: number;
}

export const computerProductPrice = (product: Product): IProductTotalPrice => {
  if (product.discountPercentage === 0) {
    return { ...product, totalPrice: Number(product.basePrice) };
  }

  const totalPrice =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return { ...product, totalPrice };
};
