import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCart,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

export const Header = () => {
  return (
    <Card className="flex justify-between p-[1.8rem] items-center ">
      <Sheet key={"left"}>
        {/* o btn que vai abrir as child  */}
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        {/* Shetcontent para o conteudo que vai ter dentro  */}
        <SheetContent side={"left"}>
          <SheetHeader className="text-lg font-semibold">Menu</SheetHeader>
          <div className="flex flex-col gap-4 ">
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <LogInIcon size={16} /> Fazer login
            </Button>
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <HomeIcon size={16} /> Inicio
            </Button>
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <PercentIcon size={16} /> Ofertas
            </Button>
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <ListOrderedIcon size={16} /> Catálago
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="font-bold text-lg ">
        <span className="text-primary">Ecommerce</span> Store
      </h1>
      <Button variant={"outline"} size={"icon"}>
        <ShoppingCart />
      </Button>
    </Card>
  );
};
