import { Schema, model } from 'mongoose';

// Define the schema
const rentalListingSchema = new Schema({
  id: { type: String, required: true, unique: true },
  formattedAddress: { type: String, required: true },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  county: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  propertyType: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  squareFootage: { type: Number },
  lotSize: { type: Number },
  yearBuilt: { type: Number },
  status: { type: String },
  price: { type: Number },
  listedDate: { type: Date },
  removedDate: { type: Date },
  createdDate: { type: Date },
  lastSeenDate: { type: Date },
  daysOnMarket: { type: Number }
}, {
  timestamps: true
});

// Export the model
export const RentalListing = model('RentalListing', rentalListingSchema);
