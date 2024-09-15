import { RentalListing } from "@/api/models/rentalListing.model";

export type MonthlyAverage = {
  month: string;
  averageCostPerSqFt: number;
};

export class RentalService {
  public calculateMonthlyAverageCostPerSqFt(listings:any): MonthlyAverage[] {
    const monthlyData: Record<string, { totalCostPerSqFt: number; count: number }> = {};

    listings.forEach((listing:any) => {
      const { price, squareFootage, listedDate } = listing;

      // Skip entries with missing data
      if (!price || !squareFootage || !listedDate) return;

      // Calculate cost per square foot
      const costPerSqFt = price / squareFootage;

      // Extract the month in 'YYYY-MM' format
      const month = listedDate.slice(0, 7);

      if (!monthlyData[month]) {
        monthlyData[month] = { totalCostPerSqFt: 0, count: 0 };
      }

      monthlyData[month].totalCostPerSqFt += costPerSqFt;
      monthlyData[month].count += 1;
    });

    const monthlyAverages: MonthlyAverage[] = Object.keys(monthlyData).map((month) => {
      const { totalCostPerSqFt, count } = monthlyData[month];
      const averageCostPerSqFt = parseFloat((totalCostPerSqFt / count).toFixed(2));
      return { month, averageCostPerSqFt };
    });

    // Sort the results by month
    monthlyAverages.sort((a, b) => (a.month < b.month ? 1 : -1));

    return monthlyAverages;
  }
}
