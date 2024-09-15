import type { RentalListing } from "@/api/models/rentalListing.model";

export async function calculateAverageRentPerQuarter(listings: RentalListing[]) {
  const groupedByQuarter: { [key: string]: any } = {};

  listings.forEach(listing => {
    const date = new Date(listing.listedDate);
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;  // Calculate quarter (1 to 4)
    const quarterKey = `${year} Q${quarter}`;

    // Initialize quarter in the group if not already present
    if (!groupedByQuarter[quarterKey]) {
      groupedByQuarter[quarterKey] = {
        "1_bedroom": { totalListings: 0, totalPrice: 0 },
        "2_bedroom": { totalListings: 0, totalPrice: 0 },
        "3_bedroom": { totalListings: 0, totalPrice: 0 },
        "4_bedroom": { totalListings: 0, totalPrice: 0 }
      };
    }

    // Categorize by bedrooms
    if (listing.bedrooms >= 1 && listing.bedrooms <= 4) {
      const bedroomKey = `${listing.bedrooms}_bedroom`;
      groupedByQuarter[quarterKey][bedroomKey].totalListings += 1;
      groupedByQuarter[quarterKey][bedroomKey].totalPrice += listing.price;
    }
  });

  // Now calculate the average rent for each bedroom category in each quarter
  const result = Object.keys(groupedByQuarter).map(quarter => {
    const rentals = groupedByQuarter[quarter];

    return {
      quarter,
      rentals: {
        "1_bedroom": {
          total_listings: rentals["1_bedroom"].totalListings,
          average_rent: rentals["1_bedroom"].totalListings > 0
            ? parseFloat((rentals["1_bedroom"].totalPrice / rentals["1_bedroom"].totalListings).toFixed(2))
            : 0
        },
        "2_bedroom": {
          total_listings: rentals["2_bedroom"].totalListings,
          average_rent: rentals["2_bedroom"].totalListings > 0
            ? parseFloat((rentals["2_bedroom"].totalPrice / rentals["2_bedroom"].totalListings).toFixed(2))
            : 0
        },
        "3_bedroom": {
          total_listings: rentals["3_bedroom"].totalListings,
          average_rent: rentals["3_bedroom"].totalListings > 0
            ? parseFloat((rentals["3_bedroom"].totalPrice / rentals["3_bedroom"].totalListings).toFixed(2))
            : 0
        },
        "4_bedroom": {
          total_listings: rentals["4_bedroom"].totalListings,
          average_rent: rentals["4_bedroom"].totalListings > 0
            ? parseFloat((rentals["4_bedroom"].totalPrice / rentals["4_bedroom"].totalListings).toFixed(2))
            : 0
        }
      }
    };
  });

  // Sort by quarter in ascending order
  result.sort((a, b) => {
    const [yearA, quarterA] = a.quarter.split(' Q').map(Number);
    const [yearB, quarterB] = b.quarter.split(' Q').map(Number);

    if (yearA === yearB) {
      return quarterA - quarterB;  // Sort by quarter if years are equal
    }
    return yearA - yearB;  // Otherwise, sort by year
  });

  return result;
}
