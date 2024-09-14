import { Schema, model } from "mongoose";

// Define the schema
const qolDataSchema = new Schema({
	NPA: {
		type: String,
		required: true,
	},
	violentCrime: {
		type: Number,
		required: true,
	},
	propertyCrime: {
		type: Number,
		required: true,
	},
	medianIncome: {
		type: Number,
		required: true,
	},
	educationLevel: {
		type: String,
		required: true,
	},
	housingCost: {
		type: Number,
		required: true,
	},
	dataYear: {
		type: Number,
		required: true,
	},
	latitude: {
		type: Number,
		required: true,
	},
	longitude: {
		type: Number,
		required: true,
	},
	zipCode: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
});

// Export the model
export const QolData = model("QolData", qolDataSchema); // QolData is the name of the model
