export async function fetchCryptoPrices(
  id: string
): Promise<{ prices: [number, number][] }> {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch prices for ${id}`);
  }

  const data = await response.json();
  return data; // data.prices will contain the required price data
}
