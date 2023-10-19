"use client";
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
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export const Header = () => {
  const { data, status } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  console.log(useSession());
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
          {status === "authenticated" && data.user && (
            <div className="flex gap-2 items-center my-2 pb-1 border-b-2 wfull ">
              <Avatar>
                <AvatarFallback>
                  {data?.user?.name?.[0].toLocaleUpperCase()}
                </AvatarFallback>
                {data.user?.image && <AvatarImage src={data.user?.image!} />}
              </Avatar>
              <div>
                <span className="text-gray-400 text-xs  ">Boas compras</span>
                <figcaption className="max-w-[20ch] overflow-hidden truncate">
                  {data?.user?.name}
                </figcaption>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 ">
            {status === "authenticated" ? (
              <Button
                variant={"outline"}
                className="w-full justify-start gap-2"
                onClick={handleLogoutClick}
              >
                <LogInIcon size={16} /> Sair
              </Button>
            ) : (
              <Button
                variant={"outline"}
                className="w-full justify-start gap-2"
                onClick={handleLoginClick}
              >
                <LogInIcon size={16} /> Fazer login
              </Button>
            )}

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
