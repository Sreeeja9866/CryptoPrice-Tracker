export async function fetchAllCategories(): Promise<unknown[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COINGECKO_CATEGORIES_API as string}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch global market data");
  }

  const data = await response.json();

  return data;
}
