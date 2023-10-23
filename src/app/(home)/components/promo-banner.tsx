import Image from "next/image";
import React from "react";
import { ImageProps } from "next/image";

interface IImgProps {
  src: string;
  alt: string;
}

export const PromoBanner = ({ src, alt, ...props }: ImageProps) => {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto object-cover px-5"
        {...props}
      />
    </figure>
  );
};
