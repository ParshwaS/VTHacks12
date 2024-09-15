class PricesqTimeService {
	public async getPts(zipCode: string | null = "10001") {
		if (!zipCode) zipCode = "10001"; // Default zip code
		return fetch(
			process.env.NEXT_PUBLIC_BACKEND_URI! +
				"/api/" +
				`rentals/average-price-per-sqft?zipCode=${zipCode}`,
			{}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				return data;
			});
	}
}

export default new PricesqTimeService();
