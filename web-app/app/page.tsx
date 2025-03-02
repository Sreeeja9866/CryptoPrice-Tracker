
"use client";

import { useTheme } from "next-themes";
import { Header } from "./Components/Header";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CryptoChart } from "./Components/crypto-chart";

import { MarketTable } from "./Components/market-table";

const queryClient = new QueryClient();

export default function Home() {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    setBgColor(theme === "dark" ? "bg-slate-900" : "bg-slate-100");
  }, [theme]);

  return (
    <div className={`poppins ${bgColor} p-2 min-h-screen`}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className=" grid grid-cols-[2fr_1.1fr] mt-4 max-md:grid-cols-1">
          <div>
          <CryptoChart />

            <MarketTable />
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}
