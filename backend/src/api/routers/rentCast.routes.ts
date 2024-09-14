import { Router } from 'express';
import { fetchAndStoreRentalListings, getRentalListings } from '../controllers/rentCast.controller';

const router = Router();

// Route to fetch rental listings and store in MongoDB
router.get('/fetch', fetchAndStoreRentalListings);

// Route to get stored rental listings
router.get('/', getRentalListings);

export default router;
