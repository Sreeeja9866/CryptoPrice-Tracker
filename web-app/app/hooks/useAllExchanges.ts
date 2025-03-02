"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchExchanges } from "../data/exchanges";

export function useExchanges() {
  return useQuery<unknown[], Error>({
    queryKey: ["exchanges"],
    queryFn: async () => {
      const data = await fetchExchanges();
      return data;
    },

    staleTime: 1000000,
  });
}
