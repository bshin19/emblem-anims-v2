import db from "../database/model";
import fs from "fs";
import archiver from "archiver";
import express from "express";

const apiRoutes = (app: express.Application): void => {

	// Gathers animations based on the selected class category
	app.get("/api/anims/:class", (req, res): void => {
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
	});

	// Search API route takes search term as an object and searches the database using term info
	app.get("/api/search/", (req, res): void => {

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
	});

	app.get("/api/detailedSearch/", (req, res): void => {
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
	});

	// Download path zips the item selected and outputs it
	app.get("/api/unit/:path", (req, res): void => {
		const out = `${process.cwd()}/public/${req.params.path}.zip`;
		const source = `./public/${req.query.path}`;
		const archive = archiver("zip", { zlib: { level: 9 } });

		const promise = new Promise((resolve, reject): void => {

			var stream = fs.createWriteStream(out);
			archive
				.directory(source, false)
				.on("error", (err): void => {
					// eslint-disable-next-line
					console.log(err);
					reject(err);
				})
				.on("warning", (err): void => {
					if (err.code === "ENOENT") {
						// log warning
					} else {
						// throw error
						throw err;
					}
				})
				.pipe(stream);

			stream.on("close", (): void => {
				// eslint-disable-next-line
				console.log("success ", archive.pointer());
				resolve();
			});
			stream.on("error", (err): void => {
				// eslint-disable-next-line
				console.log(err);
			});

			archive.finalize();

		});
		promise.then(
			(): void => {
				res.json(`/${req.params.path}.zip`);
			},
			// eslint-disable-next-line
			error =>  console.log(error));
	});
};

export default apiRoutes;
