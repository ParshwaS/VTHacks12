import { groupByQuarter,calculatePercentageChange } from "../helpers/quarterUtils";
import { fetchRentalListingsFromAPI } from "./rentalListing.service";
import { fetchSaleListingsFromAPI } from "./saleListing.service";



// Service to fetch and process sale and rent data by zip code
export async function getQuarterlyPercentageChange(
    zipCode: string,
    limit: number = 500,
    page: number = 1,
    state?: string,
    city?: string,
    bathrooms?: number,
    bedrooms?: number
  ) {
    try {
      // Fetch sale and rent data based on zipCode code and other optional parameters
      const saleListings = await fetchSaleListingsFromAPI(limit, page, state, city, bathrooms, bedrooms, zipCode);
      const rentListings = await fetchRentalListingsFromAPI(limit, page, state, city, bathrooms, bedrooms, zipCode);
  
      // Group by quarter and calculate average prices
      const saleAverages = groupByQuarter(saleListings);
      const rentAverages = groupByQuarter(rentListings);
  
      // Calculate percentage changes
      const saleChanges = calculatePercentageChange(saleAverages);
      const rentChanges = calculatePercentageChange(rentAverages);
  
      // Structure the result
      return {
        success: true,
        data: {
          sale: saleChanges,
          rent: rentChanges,
        },
      };
    } catch (error) {
      console.error('Error in getQuarterlyPercentageChange service:', error);
      throw new Error('Failed to fetch and process quarterly data');
    }
  }