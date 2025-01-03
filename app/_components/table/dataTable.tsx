"use client";
import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { useEffect, useState } from "react";
import { DataTableFilterInput } from "./data-table-filter-input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { X } from "lucide-react";
import { TableProps } from "@/app/_types/table";
import { DataTableFilterPeriod } from "./data-table-filter-period";
import { Button } from "../ui/button";
import { DataTablePagination } from "./data-table-pagination";

export const DataTable = ({
  data,
  columns,
  filterInput,
  filters,
  pageFilterPeriod,
}: TableProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns.forEach((column: any) => {
      if (column.hidden)
        setColumnVisibility({
          ...columnVisibility,
          [column.accessorKey]: false,
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex w-full items-center justify-between">
          <div className="mr-2 flex flex-1 flex-wrap items-center gap-2">
            {filterInput && (
              <DataTableFilterInput
                name={filterInput.name}
                table={table}
                title={filterInput.title}
              />
            )}

            {filters?.map((filter, index) => {
              if (!table.getColumn(filter.column)) return null;
              return (
                <DataTableFacetedFilter
                  key={index}
                  column={table.getColumn(filter.column)}
                  title={filter.title}
                  options={filter.options}
                />
              );
            })}
            {pageFilterPeriod && (
              <DataTableFilterPeriod page={pageFilterPeriod} />
            )}

            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Redefinir
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-md border">
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
                            header.getContext(),
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
                        cell.getContext(),
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
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} registros
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
