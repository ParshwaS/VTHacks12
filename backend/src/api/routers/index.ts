import { Router } from 'express';
import authRoutes from './auth.routes';  // Assuming this exists
import rentalListingRoutes from './rentCast.routes'; // New rental routes

const mainRouter = Router();

// Auth routes
mainRouter.use('/auth', authRoutes);

// Rental Listing routes
mainRouter.use('/rentals', rentalListingRoutes);

export default mainRouter;
