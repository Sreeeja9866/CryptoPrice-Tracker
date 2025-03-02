"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import PaginationArea from "./pagination/pagination-area";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { CryptoData } from "./crypto-columns";
import { useAppStore } from "@/app/hooks/useAppStore";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

export function CryptoTable({
  columns,
  data,
}: DataTableProps<CryptoData, unknown>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 8,
  });

  const { openTableDialog, search } = useAppStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,

    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  function updateInputChange(event: ChangeEvent<HTMLInputElement>) {
    table.getColumn("name")?.setFilterValue(event.target.value);
  }

  // When the dialog is opened, and the search state is filled, update the filter input
  useEffect(() => {
    console.log(search);
    if (search.length > 0 && openTableDialog) {
      table.getColumn("name")?.setFilterValue(search);
    }
  }, [openTableDialog, search]);

  // Download data as CSV
  // Download data as CSV
  const downloadCSV = () => {
    // Extract column names from the first object in data
    const headers = Object.keys(data[0] || {});

    // Create CSV content
    const csvContent = [
      headers.join(","), // Header row
      ...data.map((item) =>
        headers
          .map((header) => item[header as keyof typeof item] ?? "")
          .join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "crypto_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="  h-full flex flex-col">
      <div className="flex items-center justify-between py-4 mb-4">
        {/* input search */}
        <Input
          placeholder="Filter by crypto..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={updateInputChange}
          className="max-w-sm"
        />
        <Button onClick={downloadCSV}>Download as CSV</Button>
      </div>
      <div className="flex-1 overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationArea
        table={table}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
