import { z } from "zod";

// Create an extremely flexible schema
export const marketGlobalSchema = z
  .object({
    data: z
      .object({
        active_cryptocurrencies: z.number().optional(),
        ongoing_icos: z.number().optional(),
        total_market_cap: z.record(z.string(), z.number()).optional(),
        total_volume: z.record(z.string(), z.number()).optional(),
        market_cap_percentage: z.record(z.string(), z.number()).optional(),
        market_cap_change_percentage_24h_usd: z.number().optional(),
      })
      .optional(),
  })
  .passthrough(); // Allow extra fields

// Type inference
export type MarketGlobalType = z.infer<typeof marketGlobalSchema>;
