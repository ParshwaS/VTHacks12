import { Schema, model } from "mongoose";

// Define the schema
const qolDataPerNPASchema = new Schema({
	NPA: {
		type: String,
		required: true,
	},
	violentCrime: {
		type: Number,
	},
	propertyCrime: {
		type: Number,
	},
	nuisanceViolation: {
		type: Number,
	},
	proximityToParks: {
		type: Number,
	},
	proximityToHealthcare: {
		type: Number,
	},
	proximityToTransportation: {
		type: Number,
	},
	proximityToGroceries: {
		type: Number,
	},
	proximityToPharmacies: {
		type: Number,
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
export const QolData = model("QolData", qolDataPerNPASchema, "QolData"); // QolData is the name of the model
