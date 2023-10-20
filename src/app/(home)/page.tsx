import Image from "next/image";
import { Categories } from "./components/categories";

export default function Home() {
  return (
    <main>
      <div className="p-5 ">
        <figure>
          {/* fazer component promo passar somente src */}
          <Image
            src={"/banner_home_01.png"}
            alt="Até 55% de desconto esse mês"
            width={120}
            height={350}
            sizes="100vw"
            className="w-full h-auto object-cover"
          />
        </figure>
        {/* category */}
        <div className="pt-12">
          <Categories />
        </div>
      </div>
    </main>
  );
}
