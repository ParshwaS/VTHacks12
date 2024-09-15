import axios from 'axios';

// Fetch sale listings from external API
export const fetchSaleListingsFromAPI = async (
  limit: number,
  page: number,
  state?: string,
  city?: string,
  bathrooms?: number,
  bedrooms?: number,
  zipCode?: string
) => {
  const url = `https://api.rentcast.io/v1/listings/sale`;
  // Build query parameters dynamically
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
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
      'X-Api-Key': process.env.RENTCAST_API_KEY,  // Make sure this is loaded from env
    }
  };

  try {
    const response = await axios(fullUrl, options);

    // Check if the response is empty and throw an error if necessary
    if (!response.data || response.data.length === 0) {
      throw new Error('No sale listings found for the provided criteria.');
    }

    return response.data; // Return the sale listings data
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching sale listings from external API');
  }
};
