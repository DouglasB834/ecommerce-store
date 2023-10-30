import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ICategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: ICategoryItemProps) => {
  return (
    <Link href={`category/${category.slug}`} className="border rounded-sm">
      <li className="flex flex-col hover:brightness-125 cursor-pointer  m-auto ">
        <figure className="bg-category-gradient flex h-[150px] w-full items-center justify-center rounded-t-lg">
          <Image
            src={category?.imageUrl}
            alt={category?.name}
            title={category?.name}
            width={0}
            height={0}
            sizes="100vw"
            className=" h-auto w-auto  max-h-[70%] max-w-[80%] object-cover"
          />
        </figure>

        <div className="text-sm font-bold text-center py-3  rounded-b-lg bg-accent">
          <p>{category?.name}</p>
        </div>
      </li>
    </Link>
  );
};
