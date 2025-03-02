"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAllCategories } from "../data/categories";

export function useAllCategories() {
  return useQuery<unknown[], Error>({
    queryKey: ["allCategories"],
    queryFn: async () => {
      // Simulate an error for testing purposes
      // const simulateError = true; // Toggle to `false` to disable simulation
      // if (simulateError) {
      //   throw new Error("Simulated rate limit error");
      // }

      const data = await fetchAllCategories();
      return data;
    },
    staleTime: 1000000,
  });
}
