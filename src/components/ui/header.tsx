"use client";
import { Card } from "./card";
import { Button } from "./button";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Cart } from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/context-cart";

export const Header = () => {
  const { data, status } = useSession();
  const { products } = useContext(CartContext);

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Card className="flex justify-between items-center w-full ">
      <div className="flex justify-between p-[1.8rem] items-center w-full max-w-[1250px]  m-auto ">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader className="text-lg font-semibold">Menu</SheetHeader>
            {status === "authenticated" && data.user && (
              <div className="flex gap-2 items-center my-2 pb-1 border-b-2 wfull ">
                <Avatar>
                  <AvatarFallback>
                    {data?.user?.name?.[0].toLocaleUpperCase()}
                  </AvatarFallback>
                  {data.user?.image && (
                    <AvatarImage src={data.user?.image! || ""} />
                  )}
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
                  <UserIcon size={16} /> Sair
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
              <SheetClose asChild>
                <Link href={"/"}>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} /> Inicio
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={"/orders"}>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start gap-2"
                  >
                    <ShoppingBagIcon size={16} /> Meu pedidos
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={"/deals"}>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start gap-2"
                  >
                    <PercentIcon size={16} /> Ofertas
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={`/catalogo`}>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon size={16} /> Catálogo
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="font-bold text-lg ">
          <Link href={"/"}>
            <span className="text-primary">Ecommerce</span> Store
          </Link>
        </h1>

        <div className="relative ">
          {products?.length > 0 && (
            <p className="absolute w-[15px] h-[15px] rounded-full right-0 bg-blue-500 flex items-center justify-center font-semibold border border-red-400 text-xs">
              {products?.length}
            </p>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <ShoppingCartIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side={"right"} className="p-4 w-[88%] ">
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Card>
  );
};
