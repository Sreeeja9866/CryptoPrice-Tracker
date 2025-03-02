// https://api.coingecko.com/api/v3/global

import { MarketGlobalType, marketGlobalSchema } from "./marketGlobalSchema";

export async function fetchMarketGlobal(): Promise<MarketGlobalType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COINGECKO_GLOBAL_API as string}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch global market data");
  }

  const data = await response.json();

  // Validate the data against the schema
  const parsedData = marketGlobalSchema.parse(data);

  return parsedData;
}
