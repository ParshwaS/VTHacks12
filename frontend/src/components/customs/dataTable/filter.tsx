import { Column } from "@tanstack/react-table";
import DebouncedInput from "../debouncedInput";

function Filter({ column }: { column: Column<any, unknown> }) {
	const columnFilterValue = column.getFilterValue();

	return (
		<input
			value={(columnFilterValue ?? "") as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			onClick={(e) => e.stopPropagation()}
			placeholder="Search..."
			type="text"
		/>
	);
}

export default Filter;
