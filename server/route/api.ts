import express from "express";
import { getAnimsByClass, getAnimsBySearch, getAnimsByExactSearch } from "../database/controller";
import { getZippedDirectory } from "../util/get-zip-directory";

const apiRoutes = (app: express.Application): void => {

	// Gathers animations based on the selected class category
	app.get("/api/anims/:class", (req, res): void => {
		getAnimsByClass(req, res);
	});

	// Search API route takes search term as an object and searches the database using term info
	app.get("/api/search/", (req, res): void => {
		getAnimsBySearch(req, res);
	});

	app.get("/api/detailedSearch/", (req, res): void => {
		getAnimsByExactSearch(req, res);
	});

	// Download path zips the item selected and outputs it
	app.get("/api/unit/:path", (req, res): void => {
		getZippedDirectory(req, res);
	});
};

export default apiRoutes;
