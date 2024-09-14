import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldApi } from "@tanstack/react-form";
import FieldInfo from "@/components/customs/forms/fieldInfo";

function TextField({
	field,
	label,
	fType,
}: {
	field: FieldApi<any, any, any, any>;
	label: string;
	fType: string;
}) {
	return (
		<div className="flex items-center gap-3 w-100">
			<Label htmlFor={field.name}>{label}</Label>
			<div>
				<Input
					id={field.name}
					type={fType}
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					onBlur={field.handleBlur}
				/>
				<FieldInfo field={field} />
			</div>
		</div>
	);
}

function MyField({
	field,
	label,
	fType,
}: {
	field: FieldApi<any, any, any, any>;
	label: string;
	fType: string;
}) {
	switch (fType) {
		case "string":
		case "password":
		case "email":
			return <TextField field={field} label={label} fType={fType} />;
		default:
			return <TextField field={field} label={label} fType={fType} />;
	}
}

export default MyField;
