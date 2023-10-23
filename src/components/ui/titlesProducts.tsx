import React from "react";

interface ITextProps {
  text: string;
}

export const TitlesProducts = ({ text }: ITextProps) => {
  return <h2 className="uppercase font-bold text-base">{text}</h2>;
};
