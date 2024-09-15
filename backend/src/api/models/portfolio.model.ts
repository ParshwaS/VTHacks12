import { Schema, model } from 'mongoose';

// Property Schema with rental indicator
const PropertySchema = new Schema({
  name: { type: String, required: true },
  date_purchased: { type: String, required: true },
  zipcode: { type: String, required: true },
  investmentAmount: { type: Number, required: true },
  currentValue: { type: Number, required: true },

  isForRent: { type: Boolean, default: false }, 
  
  rentPerMonth: { type: Number },  // Rent amount (only applicable if isForRent is true)
  totalRentCollected: { type: Number, default: 0 },  // Total rent collected
  totalRentDue: { type: Number, default: 0 },  // Remaining rent to be collected
  isPaid: { type: Boolean, default: false }  // Has the rent been fully paid


});

// Portfolio Schema
const PortfolioSchema = new Schema({
  userId: { type: String, required: true },
  properties: [PropertySchema],  // Array of properties
  totalInvestment: { type: Number, default: 0 },
  currentPortfolioValue: { type: Number, default: 0 },
});

const Portfolio = model('Portfolio', PortfolioSchema);
export default Portfolio;
