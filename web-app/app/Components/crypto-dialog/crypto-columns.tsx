import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";

import Image from "next/image";
import { LuArrowDownUp } from "react-icons/lu";
import { IoArrowUpSharp, IoArrowDownSharp } from "react-icons/io5";

export type CryptoData = {
  name: string;
  icon: string;
  price: number;

  marketRank: number;
  changePercentage: number;
};

interface SortableHeaderProps {
  column: Column<CryptoData, unknown>;
  label: string;
}
function sortingIcon(isSorted: boolean | string) {
  if (isSorted === "asc") {
    return <IoArrowUpSharp />;
  } else if (isSorted === "desc") {
    return <IoArrowDownSharp />;
  } else {
    return <LuArrowDownUp />;
  }
}

function SortableHeader({ column, label }: SortableHeaderProps) {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className={`${isSorted && "text-primary"}`}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {sortingIcon(isSorted)}
    </Button>
  );
}

export const cryptoColumns: ColumnDef<CryptoData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Name" />;
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Image
          src={row.original.icon}
          alt={row.original.name}
          className="w-6 h-6"
          width={20}
          height={20}
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Price" />;
    },
    cell: ({ getValue }) => {
      const price = getValue() as number;
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);

      return <span className="font-medium">{formattedPrice}</span>;
    },
  },
  {
    accessorKey: "changePercentage",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Change" />;
    },
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const colorClass = value >= 0 ? "text-green-500" : "text-red-500";
      return (
        <span className={`font-medium ${colorClass}`}>{value.toFixed(2)}%</span>
      );
    },
  },
  {
    accessorKey: "marketRank",
    header: ({ column }) => {
      return <SortableHeader column={column} label="Market Rank" />;
    },
  },
];
