"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchMarketGlobal } from "../data/globalMarketData";

export function useGlobalMarket() {
  return useQuery<unknown, Error>({
    queryKey: ["globalMarket"],
    queryFn: async () => {
      const data = await fetchMarketGlobal();

      return data;
    },

    staleTime: 1000000,
  });
}
