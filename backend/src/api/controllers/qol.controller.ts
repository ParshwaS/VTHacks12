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
				$sort: {
					year: 1,
				},
			},
		];
		if (req.query.zip) {
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
                            $cond: [{ $eq: ["$nuisanceViolation", null] }, 1, 0],
                        },
                    },
                },
            },
            {
                $sort: {
                    year: 1,
                },
            },
        ];

        if (req.query.zip) {
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
                res.status(200).json(data);
            });
    }
}

export default new QualityOfLifeController();
