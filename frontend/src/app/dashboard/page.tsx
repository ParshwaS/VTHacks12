"use client";

import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/customs/dataTable/data-table";
import * as d3 from "d3";
import { DSVRowString } from "d3";
import { useEffect, useState } from "react";

type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

interface Data {
	Country: string;
	Value: string;
}

const columns: ColumnDef<Payment>[] = [
	{
		id: "stats",
		accessorKey: "status",
		header: "Status",
	},
	{
		id: "email",
		accessorKey: "email",
		header: "Email",
		meta: {
			filterVariant: "text",
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		enableColumnFilter: false,
	},
	{
		header: "Test",
		accessorFn: (props) => "Works",
		enableColumnFilter: false,
		enableSorting: false,
	},
];

const payments: Payment[] = [
	{
		id: "1234",
		amount: 100,
		status: "pending",
		email: "parshwa.surat@gmail.com",
	},
	{
		id: "4567",
		amount: 200,
		status: "success",
		email: "test@google.com",
	},
	{
		id: "1234",
		amount: 4230,
		status: "pending",
		email: "parshwa.surat@gmail.com",
	},
	{
		id: "4567",
		amount: 200,
		status: "success",
		email: "test@google.com",
	},
	{
		id: "1234",
		amount: 100,
		status: "pending",
		email: "parshwa.surat@gmail.com",
	},
	{
		id: "4567",
		amount: 200,
		status: "success",
		email: "test@google.com",
	},
];

function Dashboard() {
	const [filters, setFilters] = useState(false);

	useEffect(() => {}, []);

	return (
		<>
			<div className="container">
				<h1 className="w-full text-center text-3xl mb-3">Dashboard</h1>
				<DataTable
					columns={columns}
					data={payments}
					columnFilterActive={filters}
				/>
			</div>
		</>
	);
}

export default Dashboard;
