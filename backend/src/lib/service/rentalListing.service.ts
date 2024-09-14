import { RentalListing } from '@/api/models/rentalListing.model';
import axios from 'axios';

// Fetch rental listings from external API
export const fetchRentalListingsFromAPI = async (
  limit: number,
  page: number,
  state?: string,
  city?: string,
  bathrooms?: number,
  bedrooms?: number,
  zipCode?: string
)=> {
  const url = `https://api.rentcast.io/v1/listings/rental/long-term`;
  // Build query parameters dynamically
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString()
  });

   // Add optional parameters if they are provided
   if (state) params.append('state', state);
   if (city) params.append('city', city);
   if (bathrooms) params.append('bathrooms', bathrooms.toString());
   if (bedrooms) params.append('bedrooms', bedrooms.toString());
   if (zipCode) params.append('zipCode', zipCode);

   // Construct the full URL with query parameters
  const fullUrl = `${url}?${params.toString()}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-Api-Key': process.env.RENTCAST_API_KEY
    }
  };

  try {
    const response = await axios(fullUrl, options);
    return response.data; // Return the rental listings data
  } catch (error) {
    throw new Error('Error fetching data from external API');
  }
};


// Store fetched rental listings in MongoDB
export const storeRentalListingsInDB = async (rentalListings: any[]) => {
  try {
    for (const listing of rentalListings) {
      // Save each rental listing to the database
      await RentalListing.findOneAndUpdate(
        { id: listing.id }, 
        { $set: listing }, 
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    throw new Error('Error storing rental listings in the database');
  }
};
