import db from "../model";
import { Response, Request } from "express";

export const getAnimsByClass = (req: Request, res: Response): void => {
	// console.log(req.params);
	// Search for all anims of the class selected
	db.Anim.findAll({
		where: {
			feClass: req.params.class
		},
		// include all weapons through the linking table
		// along with attributes still and gif from the linking table
		include: [ {
			model: db.Weapon,
			through: {
				attributes: ["weapon"]
			}
		} ]
	}).then((response: Record<string, any>): void => {
		// console.log(response);
		res.json(response);
	});
};

export const getAnimsBySearch = (req: Request, res: Response): void => {
	db.Anim.findAll({
		where: req.query.search,
		// include all weapons through the linking table
		// along with attributes still and gif from the linking table
		include: [ {
			model: db.Weapon,
			through: {
				attributes: ["weapon"]
			}
		} ]
	}).then((response: Record<string, any>): void => {
		// console.log(response);
		res.json(response);
	});
};

export const getAnimsByExactSearch = (req: Request, res: Response): void => {
	Object.keys(req.query).forEach((key): boolean => (req.query[key] == "" || req.query[key] == "T") && delete req.query[key]);

	db.Anim.findAll({
		where: req.query,
		// include all weapons through the linking table
		// along with attributes still and gif from the linking table
		include: [ {
			model: db.Weapon,
			through: {
				attributes: ["weapon"]
			}
		} ]
	}).then((response: Record<string, any>): void => {
		// console.log(response);
		res.json(response);
	});
};
