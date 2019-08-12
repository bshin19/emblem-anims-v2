import { Router } from "express";
import { getAnimsByClass, getAnimsByExactSearch, getAnimsBySearch } from "../database/controller";
import { getZippedDirectory } from "../util/get-zip-directory";

const router = Router();

export const apiRoutes = (): void => {

	// Gathers animations based on the selected class category
	router.route("anims/:class")
		.get(getAnimsByClass);

	// Search API route takes search terms as an array and searches the database using term info
	router.route("search")
		.get(getAnimsBySearch);

	// Detailed search route takes an object and searches the database for exact messages
	router.route("detailedSearch")
		.get(getAnimsByExactSearch);

	// Download path zips the item selected and outputs it
	router.route("download/unit/:path")
		.get(getZippedDirectory);
};
