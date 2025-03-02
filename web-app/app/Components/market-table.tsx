import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useAllCryptos } from "../hooks/useAllCryptos";
import { allCryptosSchema, allCryptosType } from "../data/allCryptos";
import Image from "next/image";
import CryptoTableDialog from "./crypto-dialog/crypto-dialog";

interface TopCurrencies {
  name: string;
  price: string;
  change: string;
  marketRank: number;
  isPositive: boolean;
  icon: string;
}

export function MarketTable() {
  const {
    data: allCoinsData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAllCryptos();

  // React Query loading state (initial or subsequent fetch)
  const isTableLoading = isLoading || isFetching;

  // 1) Initialize showSkeleton to true, so we show it right away on first load
  const [showSkeleton, setShowSkeleton] = useState(true);

  // A ref to store the timestamp when loading begins
  const loadingStart = useRef<number | null>(null);

  // 2) Track changes in `isTableLoading` to enforce a minimum display time
  useEffect(() => {
    if (isTableLoading) {
      // If we just started loading, record the start time and ensure skeleton is visible
      loadingStart.current = performance.now();
      setShowSkeleton(true);
    } else {
      // Loading ended. Calculate how long loading lasted.
      const now = performance.now();
      const elapsed = now - (loadingStart.current ?? 0);
      const MIN_DURATION = 1500; // e.g. 1.5 seconds

      // If loading was under 1.5s, keep skeleton up for the remaining time
      const remaining = MIN_DURATION - elapsed;
      if (remaining > 0) {
        const timer = setTimeout(() => {
          setShowSkeleton(false);
        }, remaining);
        return () => clearTimeout(timer);
      } else {
        // Already exceeded 1.5s, hide immediately
        setShowSkeleton(false);
      }
    }
  }, [isTableLoading]);

  // State for top 5 and all coins
  const [topFiveCurrencies, setTopFiveCurrencies] = useState<TopCurrencies[]>([]);
  const [allCoins, setAllCoins] = useState<allCryptosType>([]);

  useEffect(() => {
    if (!allCoinsData) return;

    try {
      const validateSchema = allCryptosSchema.parse(allCoinsData);

      const mappedData: TopCurrencies[] = validateSchema
        .slice(0, 5)
        .map((coin) => ({
          name: coin.name,
          price: `$${coin.current_price.toLocaleString()}`,
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          marketRank: coin.market_cap_rank,
          isPositive: coin.price_change_percentage_24h >= 0,
          icon: coin.image,
        }));

      setAllCoins(validateSchema);
      setTopFiveCurrencies(mappedData);
    } catch (error) {
      console.error("Error parsing market data:", error);
    }
  }, [allCoinsData]);

  return (
    <Card className="space-y-4 p-6 mx-5 shadow-none border-none">
      {/* Header area with title, subtitle, and Refresh button */}
      <div className="flex items-center justify-between mb-9">
        <div>
          <h2 className="text-xl font-medium">Market Value</h2>
          <p className="text-xs text-slate-600">5 Top Cryptocurrencies</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
          <CryptoTableDialog allCoins={allCoins} />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader className="border-none">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Assets Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Rank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isError && <div className="text-red-500">Failed to fetch data</div>}

          {showSkeleton ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-9 w-full mb-2" />
                ))}
              </TableCell>
            </TableRow>
          ) : (
            topFiveCurrencies.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="flex items-center gap-2">
                  <div className="size-7 rounded-md flex items-center justify-center">
                    {item && (
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell
                  className={
                    item.isPositive
                      ? "text-green-500 font-medium"
                      : "text-red-500"
                  }
                >
                  {item.change}
                </TableCell>
                <TableCell className="text-center">{item.marketRank}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
