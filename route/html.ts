import express from "express";

const htmlRoutes = (app: express.Application): void => {
	// Home
	app.get("/", (req, res): void => {
		res.render("index");
	});
};

export default htmlRoutes;
