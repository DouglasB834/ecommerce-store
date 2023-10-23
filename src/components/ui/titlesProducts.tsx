import React, { ComponentProps } from "react";

interface ITextProps {
  text: string;
}

export const TitlesProducts = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p className="pl-4 mb-3 uppercase font-bold text-base " {...props}>
      {children}
    </p>
  );
};
