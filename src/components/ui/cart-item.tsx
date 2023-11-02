import { CartContext, ICartProduct } from "@/providers/context-cart";
import { ArrowLeftIcon, ArrowRightIcon, Sheet, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "./button";
import Link from "next/link";
import { SheetClose } from "./sheet";

interface IProductItemCartProps {
  product: ICartProduct;
}

export const CartItem = ({ product }: IProductItemCartProps) => {
  const { decreseProductCart, increseProductCart, removeProductCart } =
    useContext(CartContext);

  const handleDescreseProductCart = () => {
    decreseProductCart(product.id);
  };
  const handleIncreseProductCart = () => {
    increseProductCart(product.id);
  };
  const handleRemoveProductCart = () => {
    removeProductCart(product.id);
  };

  return (
    <li className="flex justify-between sm:items-center border-b-2 border-primary pb-2">
      <div className="flex gap-4 ">
        <SheetClose asChild>
          <Link href={`/product/${product.slug}`}>
            <figure className="w-[91px] h-[91px] flex items-center justify-center bg-accent rounded-xl">
              <Image
                alt={product.name}
                src={product.imageUrls?.[0]}
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain w-full h-auto max-w-[80%] max-h-[70%]"
              />
            </figure>
          </Link>
        </SheetClose>

        <div className="flex flex-col gap-2">
          <SheetClose asChild>
            <Link href={`/product/${product.slug}`}>
              <figcaption className="text-xs">{product.name}</figcaption>
            </Link>
          </SheetClose>
          <div className="flex gap-2 items-center flex-wrap">
            <p className="text-sm font-bold">
              R${Number(product.totalPrice).toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <span className="line-through text-xs opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 ">
            <Button
              size={"icon"}
              variant={"outline"}
              className="h-7"
              onClick={handleDescreseProductCart}
            >
              <ArrowLeftIcon size={14} />
            </Button>

            <p className="text-xs">{product.quantity}</p>

            <Button
              className="h-7"
              size={"icon"}
              variant={"outline"}
              onClick={handleIncreseProductCart}
            >
              <ArrowRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size={"icon"}
        variant={"outline"}
        className="flex border-2 border-accent rounded-[5px] p-[3px]  text-red-300 h-full "
        onClick={handleRemoveProductCart}
      >
        <Trash2Icon size={20} />
      </Button>
    </li>
  );
};
