import { zodValidator } from "@tanstack/zod-form-adapter";
import { useForm } from "@tanstack/react-form";
import { ZodSchema } from "zod";
import MyField from "./field";

function GenForm({
	meta,
}: {
	meta: {
		defaultValues: Record<string, string | number>;
		fields: {
			name: string;
			type: string;
			label: string;
			validator: ZodSchema;
		}[];
		onSubmit: (props: any) => unknown;
	};
}) {
	meta.onSubmit = meta.onSubmit as (props: {
		value: Record<keyof typeof meta.defaultValues, string | number>;
		fieldApi: any;
	}) => unknown;

	meta.fields = meta.fields as {
		name: keyof typeof meta.defaultValues;
		type: string;
		label: string;
		validator: ZodSchema;
	}[];

	const form = useForm({
		defaultValues: meta.defaultValues,
		onSubmit: meta.onSubmit,
		validatorAdapter: zodValidator(),
	});

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div className="mx-auto">
					{meta.fields.map((fName) => (
						<form.Field
							key={fName.name}
							name={fName.name}
							validators={{ onChange: fName.validator }}
						>
							{(field) => (
								<MyField
									field={field}
									label={fName.label}
									fType={fName.type}
								/>
							)}
						</form.Field>
					))}
				</div>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<>
							<button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "..." : "Submit"}
							</button>
							<button type="reset" onClick={() => form.reset()}>
								Reset
							</button>
						</>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}

export default GenForm;
