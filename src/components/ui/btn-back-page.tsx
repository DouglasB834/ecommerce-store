import Link from "next/link";
import { Button } from "./button";

export const BtnBackPage = () => {
  return (
    <Button className="pt-2 " variant={"outline"}>
      <Link href="javascript:history.back()">Voltar</Link>
    </Button>
  );
};
