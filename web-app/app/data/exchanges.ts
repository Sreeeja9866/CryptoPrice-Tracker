import { z } from "zod";

const ExchangeSchema = z.object({
  id: z.string(),
  name: z.string(),
  year_established: z.number().optional(),
  country: z.string().nullable(),
  description: z.string().nullable(),
  url: z.string(),
  image: z.string(),
  has_trading_incentive: z.boolean().nullable(), // Accepts boolean or null
  trust_score: z.number(),
  trust_score_rank: z.number(),
  trade_volume_24h_btc: z.number(),
  trade_volume_24h_btc_normalized: z.number(),
});

export type Exchange = z.infer<typeof ExchangeSchema>;

export async function fetchExchanges(): Promise<Exchange[]> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/exchanges");

    if (!response.ok) {
      throw new Error(`Failed to fetch exchanges: ${response.statusText}`);
    }

    const data = await response.json();
    const result = ExchangeSchema.array().safeParse(data);

    if (result.success) {
      return result.data; // Return validated data
    } else {
      console.error("Validation failed:", result.error);
      throw new Error("Invalid data structure from API");
    }
  } catch (error) {
    console.error("Error fetching exchanges:", error);
    throw error; // Propagate the error
  }
}
