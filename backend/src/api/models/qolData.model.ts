import { Schema, model } from "mongoose";

// Define the schema
const qolDataPerNPASchema = new Schema({
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
	nuisanceViolation: {
		type: Number,
		required: true,
	},
	proximityToParks: {
		type: Number,
		required: true,
	},
	proximityToHealthcare: {
		type: Number,
		required: true,
	},
	proximityToTransportation: {
		type: Number,
		required: true,
	},
	proximityToGroceries: {
		type: Number,
		required: true,
	},
	proximityToPharmacies: {
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
export const QolData = model("QolData", qolDataPerNPASchema, "QolData"); // QolData is the name of the model
