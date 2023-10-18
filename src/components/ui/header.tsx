import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import { MenuIcon, ShoppingCart } from "lucide-react";

export const Header = () => {
  return (
    <Card className="flex justify-between p-[1.8rem] items-center ">
      <Button variant={"outline"} size={"icon"}>
        <MenuIcon />
      </Button>
      <h1 className="font-bold text-lg ">
        <span className="text-primary">Ecommerce</span> Store
      </h1>
      <Button variant={"outline"} size={"icon"}>
        <ShoppingCart />
      </Button>
    </Card>
  );
};
