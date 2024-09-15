import type { RentalListing } from "@/api/models/rentalListing.model";


export async function calculateAverageRentPerMonth(listings: RentalListing[]) {
  const groupedByMonth: { [key: string]: any } = {};

  listings.forEach(listing => {
    const month = new Date(listing.listedDate).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Initialize month in the group if not already present
    if (!groupedByMonth[month]) {
      groupedByMonth[month] = {
        "1_bedroom": { totalListings: 0, totalPrice: 0 },
        "2_bedroom": { totalListings: 0, totalPrice: 0 },
        "3_bedroom": { totalListings: 0, totalPrice: 0 },
        "4_bedroom": { totalListings: 0, totalPrice: 0 }
      };
    }

    // Categorize by bedrooms
    if (listing.bedrooms >= 1 && listing.bedrooms <= 4) {
      const bedroomKey = `${listing.bedrooms}_bedroom`;
      groupedByMonth[month][bedroomKey].totalListings += 1;
      groupedByMonth[month][bedroomKey].totalPrice += listing.price;
    }
  });

  // Now calculate the average rent for each bedroom category in each month
  const result = Object.keys(groupedByMonth).map(month => {
    const rentals = groupedByMonth[month];

    return {
      month,
      rentals: {
        "1_bedroom": {
          total_listings: rentals["1_bedroom"].totalListings,
          average_rent: rentals["1_bedroom"].totalListings > 0
            ? rentals["1_bedroom"].totalPrice / rentals["1_bedroom"].totalListings
            : 0
        },
        "2_bedroom": {
          total_listings: rentals["2_bedroom"].totalListings,
          average_rent: rentals["2_bedroom"].totalListings > 0
            ? rentals["2_bedroom"].totalPrice / rentals["2_bedroom"].totalListings
            : 0
        },
        "3_bedroom": {
          total_listings: rentals["3_bedroom"].totalListings,
          average_rent: rentals["3_bedroom"].totalListings > 0
            ? rentals["3_bedroom"].totalPrice / rentals["3_bedroom"].totalListings
            : 0
        },
        "4_bedroom": {
          total_listings: rentals["4_bedroom"].totalListings,
          average_rent: rentals["4_bedroom"].totalListings > 0
            ? rentals["4_bedroom"].totalPrice / rentals["4_bedroom"].totalListings
            : 0
        }
      }
    };
  });

  // Sort by month in descending order
  result.sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime());


  return result;
}
