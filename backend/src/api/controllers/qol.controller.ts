import { NextFunction, Request, Response } from "express";
import { QolData } from "../models/qolData.model";

class QualityOfLifeController {
	public async getProximityData(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		let aggregateQuery: any = [
			{
				$group: {
					_id: {
						year: "$dataYear",
					},
					count: { $sum: 1 },
					sumProximityToParks: { $sum: "$proximityToParks" },
					sumProximityToHealthcare: {
						$sum: "$proximityToHealthcare",
					},
					sumProximityToTransportation: {
						$sum: "$proximityToTransportation",
					},
					sumProximityToGroceries: { $sum: "$proximityToGroceries" },
					sumProximityToPharmacies: {
						$sum: "$proximityToPharmacies",
					},
					nullProximityToParks: {
						$sum: {
							$cond: [{ $eq: ["$proximityToParks", null] }, 1, 0],
						},
					},
					nullProximityToHealthcare: {
						$sum: {
							$cond: [
								{ $eq: ["$proximityToHealthcare", null] },
								1,
								0,
							],
						},
					},
					nullProximityToTransportation: {
						$sum: {
							$cond: [
								{ $eq: ["$proximityToTransportation", null] },
								1,
								0,
							],
						},
					},
					nullProximityToGroceries: {
						$sum: {
							$cond: [
								{ $eq: ["$proximityToGroceries", null] },
								1,
								0,
							],
						},
					},
					nullProximityToPharmacies: {
						$sum: {
							$cond: [
								{ $eq: ["$proximityToPharmacies", null] },
								1,
								0,
							],
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					year: "$_id.year",
					sumProximityToParks: 1,
					sumProximityToHealthcare: 1,
					sumProximityToTransportation: 1,
					sumProximityToGroceries: 1,
					sumProximityToPharmacies: 1,
					count: 1,
					nullProximityToParks: 1,
					nullProximityToHealthcare: 1,
					nullProximityToTransportation: 1,
					nullProximityToGroceries: 1,
					nullProximityToPharmacies: 1,
				},
			},
			{
				$sort: {
					year: 1,
				},
			},
		];
		if (req.query.zip && req.query.zip !== "" && req.query.zip !== "null") {
			aggregateQuery = [
				{
					$match: {
						zipCode: parseInt(req.query.zip as string),
					},
				},
				...aggregateQuery,
			];
		}
		return QolData.aggregate(aggregateQuery)
			.exec()
			.then((data) => {
				data.forEach((item) => {
					item.avgProximityToParks =
						item.sumProximityToParks /
						(item.count - item.nullProximityToParks);
					item.avgProximityToHealthcare =
						item.sumProximityToHealthcare /
						(item.count - item.nullProximityToHealthcare);
					item.avgProximityToTransportation =
						item.sumProximityToTransportation /
						(item.count - item.nullProximityToTransportation);
					item.avgProximityToGroceries =
						item.sumProximityToGroceries /
						(item.count - item.nullProximityToGroceries);
					item.avgProximityToPharmacies =
						item.sumProximityToPharmacies /
						(item.count - item.nullProximityToPharmacies);
					delete item.sumProximityToParks;
					delete item.sumProximityToHealthcare;
					delete item.sumProximityToTransportation;
					delete item.sumProximityToGroceries;
					delete item.sumProximityToPharmacies;
					delete item.count;
					delete item.nullProximityToParks;
					delete item.nullProximityToHealthcare;
					delete item.nullProximityToTransportation;
					delete item.nullProximityToGroceries;
					delete item.nullProximityToPharmacies;
				});
				// Populate null values with average
				data.forEach((item) => {
					item.avgProximityToParks = item.avgProximityToParks || 0;
					item.avgProximityToHealthcare =
						item.avgProximityToHealthcare || 0;
					item.avgProximityToTransportation =
						item.avgProximityToTransportation || 0;
					item.avgProximityToGroceries =
						item.avgProximityToGroceries || 0;
					item.avgProximityToPharmacies =
						item.avgProximityToPharmacies || 0;
				});
				res.status(200).json(data);
			});
		// }
	}

	public async crimesData(req: Request, res: Response, next: NextFunction) {
		let aggregateQuery: any = [
			{
				$group: {
					_id: {
						year: "$dataYear",
					},
					count: { $sum: 1 },
					sumViolentCrime: { $sum: "$violentCrime" },
					sumPropertyCrime: { $sum: "$propertyCrime" },
					sumNuisanceViolation: { $sum: "$nuisanceViolation" },
					nullViolentCrime: {
						$sum: {
							$cond: [{ $eq: ["$violentCrime", null] }, 1, 0],
						},
					},
					nullPropertyCrime: {
						$sum: {
							$cond: [{ $eq: ["$propertyCrime", null] }, 1, 0],
						},
					},
					nullNuisanceViolation: {
						$sum: {
							$cond: [
								{ $eq: ["$nuisanceViolation", null] },
								1,
								0,
							],
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					year: "$_id.year",
					sumViolentCrime: 1,
					sumPropertyCrime: 1,
					sumNuisanceViolation: 1,
					count: 1,
					nullViolentCrime: 1,
					nullPropertyCrime: 1,
					nullNuisanceViolation: 1,
				},
			},
			{
				$sort: {
					year: 1,
				},
			},
		];

		if (req.query.zip && req.query.zip !== "" && req.query.zip !== "null") {
			aggregateQuery = [
				{
					$match: {
						zipCode: parseInt(req.query.zip as string),
					},
				},
				...aggregateQuery,
			];
		}

		return QolData.aggregate(aggregateQuery)
			.exec()
			.then((data) => {
				data.forEach((item) => {
					item.avgViolentCrime =
						item.sumViolentCrime /
						(item.count - item.nullViolentCrime);
					item.avgPropertyCrime =
						item.sumPropertyCrime /
						(item.count - item.nullPropertyCrime);
					item.avgNuisanceViolation =
						item.sumNuisanceViolation /
						(item.count - item.nullNuisanceViolation);
					delete item.sumViolentCrime;
					delete item.sumPropertyCrime;
					delete item.sumNuisanceViolation;
					delete item.count;
					delete item.nullViolentCrime;
					delete item.nullPropertyCrime;
					delete item.nullNuisanceViolation;
				});
				// Populate null values with average
				data.forEach((item) => {
					item.avgViolentCrime = item.avgViolentCrime || 0;
					item.avgPropertyCrime = item.avgPropertyCrime || 0;
					item.avgNuisanceViolation = item.avgNuisanceViolation || 0;
				});
				res.status(200).json(data);
			});
	}
}

export default new QualityOfLifeController();
