import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { SiLunacy } from "react-icons/si";

import { ModeToggle } from "../mode-toggle";

import { Card } from "@/components/ui/card";
import { useAllCryptos } from "../hooks/useAllCryptos";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { allCryptosSchema, allCryptosType } from "../data/allCryptos";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppStore } from "../hooks/useAppStore";

export function Header() {
  const [mainSearch, setMainSearch] = useState("");
  const { data } = useAllCryptos();
  const [allCoins, setAllCoins] = useState<allCryptosType>([]);

  useEffect(() => {
    if (data) {
      const validateSchema = allCryptosSchema.parse(data);
      setAllCoins(validateSchema);
    }
  }, [data]);

  return (
    <nav className="flex h-[73px] items-center justify-between  px-6">
      <Logo />
      <div className="flex items-center justify-between  gap-4   ">
        <div className=" relative">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary" />
            <Input
              type="search"
              value={mainSearch}
              onChange={(e) => setMainSearch(e.target.value)}
              placeholder="Search a coin..."
              className=" pl-8  border-none shadow-none w-[300px] "
            />
          </div>
          {mainSearch.length > 0 && (
            <LiveSearch
              allCoins={allCoins}
              mainSearch={mainSearch}
              setMainSearch={setMainSearch}
            />
          )}
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}

function LiveSearch({
  allCoins,
  mainSearch,
  setMainSearch,
}: {
  allCoins: allCryptosType;
  mainSearch: string;
  setMainSearch: Dispatch<SetStateAction<string>>;
}) {
  const filterCoins = allCoins.filter((coin) =>
    coin.name.toLowerCase().includes(mainSearch.toLowerCase())
  );

  const { setOpenDialog, setSearch } = useAppStore();

  return (
    <Card className="absolute p-2 top-[44px] w-full border-none">
      {filterCoins.length > 0 ? (
        <>
          {filterCoins.slice(0, 5).map((coin, index) => (
            <div
              key={index}
              onClick={() => {
                setSearch(coin.name);
                setMainSearch("");
                setOpenDialog(true);
              }}
              className="p-3 flex items-center justify-between gap-2 hover:border 
          border-primary rounded-md hover:bg-primary/10 cursor-pointer select-none"
            >
              <div className="flex items-center gap-1">
                <Image src={coin.image} width={16} height={16} alt="" />
                <span className="text-[13px] opacity-85">{coin.name}</span>
              </div>
              <span className="text-[13px] font-medium opacity-70">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(coin.current_price)}
              </span>
            </div>
          ))}
        </>
      ) : (
        <div className="text-[13px] opacity-70 p-2">No coins found</div>
      )}

      {filterCoins.length > 5 && (
        <Button
          onClick={() => {
            setSearch(mainSearch);
            setMainSearch("");
            setOpenDialog(true);
          }}
          variant={"link"}
          className="w-full text-center text-[13px] my-4 cursor-pointer hover:text-primary opacity-70"
        >
          See more coins (+{filterCoins.length - 5})
        </Button>
      )}
    </Card>
  );
}

function Logo() {
  return (
    <header className="flex items-center gap-2 left-10 top-8">
      <div className="size-9 bg-primary rounded-md flex justify-center items-center">
        <SiLunacy className="text-white text-lg" aria-hidden="true" />
      </div>

      <h1 className="font-semibold text-2xl font-poppins max-md:hidden">
        Crypto <span className="font-normal text-primary">Tracker</span>
      </h1>
    </header>
  );
}
