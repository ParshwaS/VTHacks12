// Helper function to group listings by quarter and calculate average price
export function groupByQuarter(listings: any[]) {
    const grouped: { [key: string]: { total: number, count: number } } = {};
  
    listings.forEach(listing => {
      const listedDate = new Date(listing.listedDate);
      const year = listedDate.getFullYear();
      const quarter = Math.floor(listedDate.getMonth() / 3) + 1;  // Get quarter (1 to 4)
  
      const key = `${year} Q${quarter}`;
  
      if (!grouped[key]) {
        grouped[key] = { total: 0, count: 0 };
      }
  
      // Add price to the respective quarter's total
      grouped[key].total += listing.price;
      grouped[key].count += 1;
    });
  
    // Calculate average prices, rounded to 2 decimal places
  const averages = Object.keys(grouped).map(quarter => ({
    quarter,
    average_price: parseFloat((grouped[quarter].total / grouped[quarter].count).toFixed(2))  // Round to 2 decimal places
  }));

  // Sort by quarter in ascending order (e.g., Q1 2022, Q2 2022)
  averages.sort((a, b) => {
    const [yearA, quarterA] = a.quarter.split(' Q').map(Number);
    const [yearB, quarterB] = b.quarter.split(' Q').map(Number);

    if (yearA === yearB) {
      return quarterA - quarterB;  // Sort by quarter if years are equal
    }
    return yearA - yearB;  // Otherwise, sort by year
  });
  
    return averages;
  }
  
  // Helper function to calculate percentage change between quarters
  export function calculatePercentageChange(data: any[]) {
    const result = [];

    // First entry should have percentage_change set to 0
  result.push({
    quarter: data[0].quarter,
    average_price: data[0].average_price,
    percentage_change: 0  // Set to 0 for the first quarter
  });
  
    for (let i = 1; i < data.length; i++) {
      const previous = data[i - 1];
      const current = data[i];
      const percentageChange = ((current.average_price - previous.average_price) / previous.average_price) * 100;
  
      result.push({
        quarter: current.quarter,
        average_price: current.average_price,
        percentage_change: percentageChange.toFixed(2)  // Round to two decimal places
      });
    }
  
    return result;
  }
  