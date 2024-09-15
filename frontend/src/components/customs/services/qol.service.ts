class QolService {
	public async getQol(zipCode: string | null = "10001") {
		if (!zipCode) zipCode = "10001"; // Default zip code
		return fetch(
			process.env.NEXT_PUBLIC_BACKEND_URI! +
				`/api/qol/crime?zip=${zipCode}`,
			{}
		)
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
	}
}

export default new QolService();
