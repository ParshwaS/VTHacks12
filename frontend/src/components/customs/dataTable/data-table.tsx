"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	OnChangeFn,
	PaginationState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Filter from "./filter";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Tally1 } from "lucide-react";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	columnFilterActive: boolean;
}

interface ColumnFilter {
	id: string;
	value: string;
}

type ColumnFilterState = ColumnFilter[];

function withOnChange(func: Function): OnChangeFn<any> {
	return (data: any) => {
		func(data);
	};
}

function updateFilters(
	filters: ColumnFilterState,
	id: string,
	value: string,
	setFilter: Dispatch<SetStateAction<ColumnFilterState>>
) {
	let done = false;
	let newFilters = filters.map((filter) => {
		if (filter.id == id) done = true;
		return {
			id: filter.id,
			value: filter.id != id ? filter.value : value,
		};
	});
	if (!done) newFilters.push({ id: id, value: value });
	setFilter(newFilters);
}

export default function DataTable<TData, TValue>({
	columns,
	data,
	columnFilterActive,
}: DataTableProps<TData, TValue>) {
	const [filterState, setfilterState] = useState<ColumnFilterState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageSize: 10,
		pageIndex: 0,
	});

	const table = useReactTable({
		data,
		columns,
		columnResizeMode: "onChange",
		columnResizeDirection: "ltr",
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onColumnFiltersChange: withOnChange(setfilterState),
		state: {
			columnFilters: filterState,
			pagination: pagination,
		},
		autoResetPageIndex: false,
	});

	return (
		<>
			<div className="rounded-md border mb-2">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headers) => (
							<TableRow key={headers.id} className="divide-x">
								{headers.headers.map((header) => (
									<TableHead
										key={header.id}
										{...{
											style: {
												width: header.column.getSize(),
											},
										}}
										className={cn({
											"cursor-pointer":
												header.column.getCanSort(),
										})}
									>
										{header.isPlaceholder ? null : (
											<>
												<div
													{...{
														className:
															"flex flex-row" +
															(header.column.getCanSort()
																? "cursor-pointer select-none"
																: ""),
														onClick:
															header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(
														header.column.columnDef
															.header,
														header.getContext()
													)}
													{{
														asc: (
															<ArrowUpNarrowWide
																size={16}
															/>
														),
														desc: (
															<ArrowDownWideNarrow
																size={16}
															/>
														),
													}[
														header.column.getIsSorted() as string
													] ?? null}
												</div>
												{header.column.getCanFilter() &&
												columnFilterActive ? (
													<div>
														<Filter
															column={
																header.column
															}
														/>
													</div>
												) : null}
											</>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} className="divide-x">
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className={cn({
								"cursor-pointer": table.getCanPreviousPage(),
							})}
							onClick={() =>
								table.getCanPreviousPage() &&
								table.previousPage()
							}
						/>
					</PaginationItem>
					{[-1, 0, 1].map((i) =>
						table.getPageCount() >
							table.getState().pagination.pageIndex + i &&
						table.getState().pagination.pageIndex + i >= 0 ? (
							<PaginationItem key={i}>
								<PaginationLink
									className="cursor-pointer"
									isActive={i == 0}
									onClick={() =>
										table.setPageIndex(
											i +
												table.getState().pagination
													.pageIndex
										)
									}
								>
									{table.getState().pagination.pageIndex +
										i +
										1}
								</PaginationLink>
							</PaginationItem>
						) : null
					)}
					<PaginationItem>
						<PaginationNext
							className={cn({
								"cursor-pointer": table.getCanNextPage(),
							})}
							onClick={() =>
								table.getCanNextPage() && table.nextPage()
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
}
