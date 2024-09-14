import { ExpressError } from "../helpers/customError";

class Spacy {
	async processText(text: string): Promise<any> {
		return fetch(`http://localhost:8000/text/${text}`)
			.then((response) => response.json())
			.catch((error) => {
				console.error("Error:", error);
				throw new ExpressError("Failed to process text", 500);
			});
	}
}

export default new Spacy();
