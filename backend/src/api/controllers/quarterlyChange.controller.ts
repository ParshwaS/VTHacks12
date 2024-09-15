import { getQuarterlyPercentageChange } from '@/lib/service/quarterlyPercentageChange.service';
import { Request, Response } from 'express';

// Controller to handle the quarterly percentage change API
export async function getQuarterlyChange(req: Request, res: Response) {
  try {
    const { zipCode, limit = 500, page = 1, state, city, bathrooms, bedrooms } = req.query;

    // Ensure zipCode code is provided
    if (!zipCode) {
      return res.status(400).json({
        success: false,
        message: 'zipCode is required',
      });
    }

    // Fetch the quarterly change data using the provided parameters
    const data = await getQuarterlyPercentageChange(
      zipCode as string,
      parseInt(limit as string),
      parseInt(page as string),
      state as string,
      city as string,
      bathrooms ? parseInt(bathrooms as string) : undefined,
      bedrooms ? parseInt(bedrooms as string) : undefined
    );

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch quarterly data',
      error: error.message,
    });
  }
}