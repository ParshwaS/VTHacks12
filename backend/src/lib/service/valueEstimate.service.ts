import axios from 'axios';

const RENTCAST_API_KEY = process.env.RENTCAST_API_KEY;  // Store your API key in an environment variable

// Function to fetch property value estimates and comparables from RentCast API
export async function fetchValueEstimate(params: {
  address?: string;
  latitude?: number;
  longitude?: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  compCount?: number;  // Optional
}) {
  try {
    const { address, latitude, longitude, propertyType, bedrooms, bathrooms, squareFootage, compCount } = params;

    const url = `https://api.rentcast.io/v1/avm/value`;
    // Construct parameters for the API call
    const apiParams: any = {};

    if (address) {
      apiParams.address = address;  // If address is provided
    } else if (latitude && longitude) {
      apiParams.latitude = latitude;
      apiParams.longitude = longitude;  // If latitude and longitude are provided
    }

    // Add optional parameters if they are provided
    if (propertyType) apiParams.propertyType = propertyType;
    if (bedrooms) apiParams.bedrooms = bedrooms;
    if (bathrooms) apiParams.bathrooms = bathrooms;
    if (squareFootage) apiParams.squareFootage = squareFootage;
    if (compCount) apiParams.compCount = compCount;

    console.log("api key", RENTCAST_API_KEY); 

    const response = await axios.get(url, {
      params: apiParams,
      headers: {
        accept: 'application/json',
        'X-Api-Key': process.env.RENTCAST_API_KEY
      }
    });

    // Check if response is successful
    if (response.status === 200) {
      return response.data;  // Return the data from RentCast API
    } else {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

  } catch (error:any) {
    console.error("Error fetching RentCast data:", error.message);
    throw error;  // Propagate error to caller
  }
}
