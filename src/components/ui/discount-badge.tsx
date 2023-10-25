import { ArrowDown } from "lucide-react";
import React from "react";
import { Badge, BadgeProps } from "./badge";
import { twMerge } from "tailwind-merge";

export const DiscountBadge = ({
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <Badge className={twMerge("py-[4px] px-[8px]", className)} {...props}>
      <ArrowDown size={14} />
      {children}%
    </Badge>
  );
};
