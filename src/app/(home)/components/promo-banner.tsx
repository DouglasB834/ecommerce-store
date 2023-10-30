import Image from "next/image";
import React from "react";
import { ImageProps } from "next/image";

export const PromoBanner = ({ src, alt, ...props }: ImageProps) => {
  return (
    <figure className="max-w-[1200px]">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto object-cover px-5 md:px-0"
        {...props}
      />
    </figure>
  );
};
