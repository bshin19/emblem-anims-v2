import db from "../model";
import { Response, Request } from "express";
import { Error } from "sequelize/types";

// Given a class, search the database for all matches in the class column.
export const getAnimsByClass = (req: Request, res: Response): void => {
	// console.log(req.params);
	db.Anim
		.findAll({
			where: {
				feClass: req.params.class
			},
			include: [ {
				model: db.Weapon,
				through: {
					attributes: ["weapon"]
				}
			} ]
		})
		.then((response: Record<string, any>): void => {
			// console.log(response);
			res.json(response);
		})
		.catch((err: Error): Response => res.status(422).json(err));
};

// Given a string[], search the database for all matches that contain every element in the string[].
export const getAnimsBySearch = (req: Request, res: Response): void => {
	db.Anim
		.findAll({
			where: req.query.search,
			include: [ {
				model: db.Weapon,
				through: {
					attributes: ["weapon"]
				}
			} ]
		})
		.then((response: Record<string, any>): void => {
			// console.log(response);
			res.json(response);
		})
		.catch((err: Error): Response => res.status(422).json(err));
};

// Given a search object, search the database for exact matches in all provided columns.
export const getAnimsByExactSearch = (req: Request, res: Response): void => {
	Object.keys(req.query).forEach((key): boolean => (req.query[key] == "" || req.query[key] == "T") && delete req.query[key]);

	db.Anim
		.findAll({
			where: req.query,
			include: [ {
				model: db.Weapon,
				through: {
					attributes: ["weapon"]
				}
			} ]
		})
		.then((response: Record<string, any>): void => {
			// console.log(response);
			res.json(response);
		})
		.catch((err: Error): Response => res.status(422).json(err));
};
