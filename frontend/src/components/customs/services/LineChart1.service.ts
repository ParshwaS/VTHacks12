class LineChart1Service {
	public async getLinePts(zipCode: string | null = "10001") {
        if (!zipCode) zipCode = "10001"; // Default zip code
		return fetch(
			process.env.NEXT_PUBLIC_BACKEND_URI! +
				"/api/" +
				`rentals/average-rent-per-month?zipCode=${zipCode}`
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.data)
				return data.data;
			});
	}
}

export default new LineChart1Service();
