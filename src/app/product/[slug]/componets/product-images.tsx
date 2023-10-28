"use client";
import Image from "next/image";
import { useState } from "react";

interface IProductImgPros {
  name: string;
  imageUrls: string[];
}

export const ProductImages = ({ imageUrls, name }: IProductImgPros) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  return (
    <div className="flex flex-col justify-center m-auto w-full max-w-[1200px] py-2">
      <figure className="flex w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          alt={name}
          title={name}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full max-w-[80%] max-h-[450px] object-contain"
        />
      </figure>

      {/* imagens urls map */}
      <ul className="grid grid-cols-4 gap-4 mt-8 px-5 lg:px-0 ">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex  h-[100px] rounded-lg items-center justify-center bg-accent cursor-pointer  ${
              currentImage === imageUrl &&
              "border-solid border-primary border-2 "
            }`}
            onClick={() => setCurrentImage(imageUrl)}
          >
            <Image
              alt={name}
              src={imageUrl}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full max-w-[80%] max-h-[70%] object-contain"
            />
          </button>
        ))}
      </ul>
    </div>
  );
};
