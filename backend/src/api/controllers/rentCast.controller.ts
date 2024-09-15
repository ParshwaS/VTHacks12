import { Request, Response } from 'express';
import { fetchRentalListingsFromAPI, storeRentalListingsInDB } from '../../lib/service/rentalListing.service'
import { RentalListing } from '../models/rentalListing.model';


// Controller to fetch and store rental listings
export const fetchAndStoreRentalListings = async (req: Request, res: Response) => {

  const { limit = 5, page = 1, state, city, bathrooms, bedrooms, zipCode } = req.query;

  try {
    
     // Pass the query parameters to the service function
     const rentalListings = await fetchRentalListingsFromAPI(
      Number(limit),
      Number(page),
      state as string,
      city as string,
      Number(bathrooms),
      Number(bedrooms),
      zipCode as string
    );

    // Store data in the database
    await storeRentalListingsInDB(rentalListings);

    res.status(200).json({ message: 'Rental listings fetched and stored successfully', data: rentalListings });
  } catch (error: any) {
   // Handle the error and return the error message to the user
   res.status(400).json({ message: error.message });
  }
};

// Controller to retrieve stored rental listings from MongoDB
export const getRentalListings = async (req: Request, res: Response) => {
  try {
    const rentalListings = await RentalListing.find({});
    res.status(200).json(rentalListings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rental listings from database' });
  }
};
