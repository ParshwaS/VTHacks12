import { Request, Response } from 'express';
import { fetchRentalListingsFromAPI } from '@/lib/service/rentalListing.service';
import { RentalService } from '@/lib/service/averagePricePerSqft.service';


export const getAveragePricePerSqft = async (req: Request, res: Response) => {
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
    console.log(rentalListings);

    // Create an instance of the service
    const rentalService = new RentalService();


    // Calculate the monthly averages
    const monthlyAverages = rentalService.calculateMonthlyAverageCostPerSqFt(rentalListings);

    console.log("monthlyAverages");
    console.log(monthlyAverages);

   
    // Check if the graph data is empty
    if (monthlyAverages.length === 0) {
        return res.status(404).json({ message: 'No data available for the given filters.' });
    }

    // Send back the graph data sorted from latest to oldest
    res.status(200).json(monthlyAverages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
