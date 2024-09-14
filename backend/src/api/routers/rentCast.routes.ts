import { Router } from 'express';
import { fetchAndStoreRentalListings, getRentalListings } from '../controllers/rentCast.controller';
import { getAveragePricePerSqft } from '../controllers/getAveragePricePerSqft';

const router = Router();

// Route to fetch rental listings and store in MongoDB
router.get('/fetch', fetchAndStoreRentalListings);

// Route to get stored rental listings
router.get('/', getRentalListings);


// New route to get average price per square foot grouped by month-year
router.get('/average-price-per-sqft', getAveragePricePerSqft);

export default router;
