import { Router } from 'express';
import { fetchAndStoreRentalListings, getRentalListings } from '../controllers/rentCast.controller';
import { getAveragePricePerSqft } from '../controllers/getAveragePricePerSqft';
import { getAverageRentPerMonth } from '../controllers/averageRent.controller';
import { getValueEstimate } from '../controllers/valueEstimate.controller';
import { getQuarterlyChange } from '../controllers/quarterlyChange.controller';




const router = Router();

// Route to fetch rental listings and store in MongoDB
router.get('/fetch', fetchAndStoreRentalListings);

// Route to get stored rental listings
router.get('/', getRentalListings);


// New route to get average price per square foot grouped by month-year
router.get('/average-price-per-sqft', getAveragePricePerSqft);

// Define the route to get average rent per month
router.get('/average-rent-per-month', getAverageRentPerMonth);

// Route to get property value estimate
router.get('/value-estimate', getValueEstimate);


// Route to get quarterly change in sales and rent values
router.get('/quarterly-change', getQuarterlyChange);

export default router;
