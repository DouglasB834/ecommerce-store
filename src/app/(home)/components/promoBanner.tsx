import Image from "next/image";
import React from "react";

interface IImgProps {
  src: string;
  alt: string;
}

export const PromoBanner = ({ src, alt }: IImgProps) => {
  return (
    <figure>
      {/* fazer component promo passar somente src */}
      <Image
        src={"/banner_home_01.png"}
        alt="Até 55% de desconto esse mês"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto object-cover"
      />
    </figure>
  );
};
