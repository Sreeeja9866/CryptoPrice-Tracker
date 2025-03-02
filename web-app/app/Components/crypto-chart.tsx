"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { CoinCombobox, CryptoComboBox } from "./coin-combobox";
import { useAllCryptos } from "../hooks/useAllCryptos";
import { fetchCryptoPrices } from "../data/allCoinPrices";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
} from "recharts";

type ChartData = {
  date: string;
  price: string;
};

export function CryptoChart() {
  const { data: cryptos, isLoading, isError } = useAllCryptos();
  const [value, setValue] = useState<string>("");
  const [formattedPrice, setFormattedPrice] = useState("");

  const [selectedPeriod, setSelectedPeriod] = useState("7D");
  const [comboBoxCoins, setComboBoxCoins] = useState<CryptoComboBox[]>([]);
  const selectedCoin = comboBoxCoins?.find((coin) => coin.value === value);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // each time the data array from the useAllCryptos hook is updated,
  //format the data and get only the propreties that we need, and
  //then update the comboBoxCoins

  console.log(cryptos);

  //
  useEffect(() => {
    if (cryptos) {
      const formattedData: CryptoComboBox[] = (cryptos as unknown[])
        .map((crypto: unknown) => {
          if (
            typeof crypto === "object" &&
            crypto !== null &&
            "id" in crypto &&
            "name" in crypto &&
            "image" in crypto &&
            "current_price" in crypto &&
            "price_change_percentage_24h" in crypto
          ) {
            return {
              value: crypto.id as string,
              label: crypto.name as string,
              icon: crypto.image as string,
              price: String(crypto.current_price),
              change:
                (crypto.price_change_percentage_24h as number).toFixed(4)[0] !==
                "-"
                  ? `+${(crypto.price_change_percentage_24h as number).toFixed(
                      4
                    )}`
                  : (crypto.price_change_percentage_24h as number).toFixed(4),
            };
          }
          return null; // Explicitly return null for invalid entries
        })
        .filter((item): item is CryptoComboBox => item !== null); // Filter out null values

      setComboBoxCoins(formattedData);
    }
  }, [cryptos]);

  // Automatically select the first coin when data is available
  useEffect(() => {
    if (comboBoxCoins && comboBoxCoins.length > 0 && !value) {
      setValue(comboBoxCoins[0].value); // Set the first coin's value
    }
  }, [comboBoxCoins, value]);

  // Update formattedPrice whenever the selected coin's value changes
  useEffect(() => {
    if (value) {
      if (selectedCoin) {
        const numericCoinPrice = parseFloat(selectedCoin.price);
        const formattedPrice = numericCoinPrice.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
        setFormattedPrice(formattedPrice);
      }
    }
  }, [value, comboBoxCoins]);

  useEffect(() => {
    async function fetchPrices() {
      if (selectedCoin) {
        try {
          const data = await fetchCryptoPrices(selectedCoin.value);

          // Extract prices
          const prices = data.prices;

          // Format the prices for charting
          const formattedPrices: ChartData[] = prices.map(
            ([timestamp, price]: [number, number]) => ({
              date: new Date(timestamp).toISOString().slice(0, 10),
              price: price.toFixed(2),
            })
          );

          // Filter data based on the selected period
          let filteredPrices: ChartData[] = [];
          switch (selectedPeriod) {
            case "7D":
              filteredPrices = formattedPrices.slice(-7);
              break;
            case "15D":
              filteredPrices = formattedPrices.slice(-15);
              break;
            case "30D":
              filteredPrices = formattedPrices.slice(-30);
              break;
            default:
              break;
          }

          setChartData(filteredPrices);
        } catch (error) {
          console.error("Failed to fetch prices:", error);
        }
      }
    }

    fetchPrices();
  }, [selectedCoin, selectedPeriod]);

  function onChangeToggleGroup(item: string) {
    setSelectedPeriod(item);
  }

  return (
    <Card className="col-span-4 m-5 border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          <CoinCombobox
            coins={comboBoxCoins}
            isLoading={isLoading}
            isError={isError}
            value={value}
            setValue={setValue}
          />

          <div className="mt-4">
            <span className="text-2xl font-bold">{formattedPrice}</span>
            <span
              className={`ml-2 text-sm ${
                selectedCoin?.change[0] === "-"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {selectedCoin?.change}
            </span>
          </div>
        </CardTitle>
        {/* single toggle */}
        <div className="flex gap-2">
          <ToggleGroup
            value={selectedPeriod}
            onValueChange={onChangeToggleGroup}
            type="single"
          >
            {["7D", "15D", "30D"].map((period, key) => (
              <ToggleGroupItem key={key} value={`${period}`}>
                {period}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        {" "}
        {isLoading ? (
          <div className="h-[230px]">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          <div className="h-[230px] mt-5">
            <ResponsiveContainer
              className={"  text-[12px]"}
              width="100%"
              height={236}
            >
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" color="#64748b" />
                <YAxis dataKey="price" />

                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorWords)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
