import { Schema, model } from 'mongoose';

const PropertySchema = new Schema({
  name: { type: String, required: true },
  investmentAmount: { type: Number, required: true },
  currentValue: { type: Number, required: true },
});

const PortfolioSchema = new Schema({
  userId: { type: String, required: true },
  properties: [PropertySchema],
  totalInvestment: { type: Number, default: 0 },
  currentPortfolioValue: { type: Number, default: 0 },
});

const Portfolio = model('Portfolio', PortfolioSchema);
export default Portfolio;
