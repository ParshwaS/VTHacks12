import { fetchValueEstimate } from '@/lib/service/valueEstimate.service';
import { Request, Response } from 'express';

// Controller to handle fetching property value estimates and comparables
export async function getValueEstimate(req: Request, res: Response) {
  try {
    const { address, latitude, longitude, propertyType, bedrooms, bathrooms, squareFootage, compCount } = req.query;

    // Check if either address or latitude/longitude is provided
    if (!address && (!latitude || !longitude)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Either address or latitude and longitude must be provided.' 
      });
    }

    // Parse optional parameters
    const parsedBedrooms = bedrooms ? parseInt(bedrooms as string) : undefined;
    const parsedBathrooms = bathrooms ? parseInt(bathrooms as string) : undefined;
    const parsedSquareFootage = squareFootage ? parseInt(squareFootage as string) : undefined;
    const parsedCompCount = compCount ? parseInt(compCount as string) : undefined;

    // Debugging: Log the parameters being passed to the service
    console.log('Parameters being sent to fetchValueEstimate:', {
      address,
      latitude,
      longitude,
      propertyType,
      bedrooms: parsedBedrooms,
      bathrooms: parsedBathrooms,
      squareFootage: parsedSquareFootage,
      compCount: parsedCompCount
    });

    // Call the service to fetch the data
    const propertyData = await fetchValueEstimate({
      address: address as string,
      latitude: latitude ? parseFloat(latitude as string) : undefined,
      longitude: longitude ? parseFloat(longitude as string) : undefined,
      propertyType: propertyType as string,
      bedrooms: parsedBedrooms,
      bathrooms: parsedBathrooms,
      squareFootage: parsedSquareFootage,
      compCount: parsedCompCount
    });

    // Debugging: Log the property data returned
    console.log('Property data received from fetchValueEstimate:', propertyData);

    // Send back the property data as JSON
    return res.status(200).json({
      success: true,
      data: propertyData,
    });

  } catch (error: any) {
    // Debugging: Log the error object
    console.error('Error in getValueEstimate controller:', error);

    return res.status(500).json({
      success: false,
      message: 'Error fetching property data',
      error: error.message,
    });
  }
}
