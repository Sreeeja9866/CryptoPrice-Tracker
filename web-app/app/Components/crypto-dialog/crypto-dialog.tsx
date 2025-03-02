import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CryptoTable } from "./data-table";
import { cryptoColumns, CryptoData } from "./crypto-columns";
import { allCryptosType } from "@/app/data/allCryptos";
import { useAppStore } from "@/app/hooks/useAppStore";

type SingleCoinType = Pick<
  allCryptosType[number],
  | "name"
  | "image"
  | "current_price"
  | "total_volume"
  | "market_cap_rank"
  | "market_cap"
  | "price_change_percentage_24h"
  | "high_24h"
  | "low_24h"
>;

export default function CryptoTableDialog({
  allCoins,
}: {
  allCoins: allCryptosType;
}) {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const { openTableDialog, setOpenDialog, setSearch } = useAppStore();

  useEffect(() => {
    const formattedData: CryptoData[] = allCoins.map(
      (coin: SingleCoinType) => ({
        name: coin.name,
        icon: coin.image,
        price: coin.current_price,
        marketRank: coin.market_cap_rank,
        changePercentage: coin.price_change_percentage_24h,
        
      })
    );

    setCryptoData(formattedData);
  }, [allCoins]);

  useEffect(() => {
    if (!openTableDialog) {
      setSearch("");
    }
  }, [openTableDialog]);

  return (
    <Dialog open={openTableDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant={"link"} className="h-10">
          See all
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 poppins max-h-svh">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            All Cryptocurrencies
          </DialogTitle>
          <DialogDescription>
            View a comprehensive list of all available cryptocurrencies,
            including their prices, market capitalization, and other key
            details.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex-grow overflow-auto pr-2">
          <CryptoTable columns={cryptoColumns} data={cryptoData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
