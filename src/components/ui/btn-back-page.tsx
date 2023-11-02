import Link from "next/link";
import { Button } from "./button";

export const BtnBackPage = () => {
  return (
    <Link href="javascript:history.back()">
      <Button title="botão para boltar " className="pt-2 " variant={"outline"}>
        Voltar
      </Button>
    </Link>
  );
};
