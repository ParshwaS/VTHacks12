import { Request, Response } from 'express';
import { fetchRentalListingsFromAPI } from '@/lib/service/rentalListing.service';
import { RentalService } from '@/lib/service/averagePricePerSqft.service';
import { calculateAverageRentPerQuarter } from '@/lib/service/averageRentPerQuarter.service';


export const getAverageRentPerQuarter = async (req: Request, res: Response) => {
    
    const { limit = 500, page = 1, city, state, bedrooms, bathrooms, zipCode } = req.query;

    try {
        // Call the existing fetch API to get the filtered rental listings
        const rentalListings = await fetchRentalListingsFromAPI(
        Number(limit),
        Number(page),
        state as string,
        city as string,
        Number(bathrooms),
        Number(bedrooms),
        zipCode as string
        );


    console.log("rentalListings");
    // console.log(rentalListings);

    // Calculate the average rent per month using the service
    const averageRentData = await calculateAverageRentPerQuarter(rentalListings);

    // Return the data as JSON
    return res.status(200).json({
      success: true,
      data: averageRentData,
    });
  } catch (error) {
    console.error("Error fetching average rent data:", error);
    return res.status(500).json({
      success: false,
      message: "Error calculating average rent data.",
    });
  }
};