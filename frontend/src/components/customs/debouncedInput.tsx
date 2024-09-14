import { OnChangeFn } from "@tanstack/react-table";
import { InputHTMLAttributes, useEffect, useState } from "react";

function DebouncedInput({
	initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	initialValue: string | number;
	onChange: OnChangeFn<string | number>;
	debounce: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value, debounce, onChange]);

	return (
		<input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

export default DebouncedInput;
