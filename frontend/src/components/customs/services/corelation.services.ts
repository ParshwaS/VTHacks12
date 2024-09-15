import { date } from "zod";

class CorelationServices {
	public async getcorelation(zipCode: string | null = "10001") {
		if (!zipCode) zipCode = "10001"; // Default zip code
		return fetch(
			process.env.NEXT_PUBLIC_BACKEND_URI! +
				"/api/" +
				`rentals/quarterly-change?zipCode=${zipCode}`,
			{}
		)
			.then((res) => res.json())
			.then((data_) => {
				let data = data_.data;
				let x = data.rent.map((x: any) => x.quarter);
				let y = data.sale.map((x: any) => x.quarter);
				/**
				 * The response is expected to be in the format:
				 *
				 * [
				 * rent: {
				 * quarters,
				 * average_rent,
				 * percent_change
				 * },
				 * sales: {
				 * quarters,
				 * average_rent,
				 * percent_change
				 * }
				 * ]
				 *
				 * Combine the data as
				 * [
				 * quarters: data.rent.quarters,
				 * rent: data.rent.average_rent,
				 * rent_percent_change: data.rent.percent_change,
				 * sales: data.sales.average_rent,
				 * sales_percent_change: data.sales.percent_change
				 * ]
				 */

				// Both can have different number of quarters, so we need to handle that
				const allQuarters = Array.from(new Set([...x, ...y]));

				const combinedData = allQuarters.map((quarter: string) => {
					const rentIndex = data.rent.findIndex(
						(item: any) => item.quarter === quarter
					);
					const salesIndex = data.sale.findIndex(
						(item: any) => item.quarter === quarter
					);

					return {
						quarter: quarter,
						rent:
							rentIndex !== -1
								? data.rent[rentIndex].average_price
								: 0,
						rentalPriceChange:
							rentIndex !== -1
								? parseFloat(data.rent[rentIndex].percentage_change)
								: 0,
						sales:
							salesIndex !== -1
								? data.sale[salesIndex].average_price
								: 0,
						salePriceChange:
							salesIndex !== -1
								? parseFloat(data.sale[salesIndex].percentage_change)
								: 0,
					};
				});

				return combinedData;
			});
	}
}

export default new CorelationServices();
