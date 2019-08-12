import { router } from "./route";
import bodyParser from "body-parser";
import db from "./database/model";
import express from "express";

// Express Entry Point
const app = express();
const PORT = process.env.PORT || 8080;

// Data Parsing via BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("client/public"));

app.use(router);

// db.sequelize.sync({ force: true }).then(function () { //add force true for restarting db
db.sequelize.sync({ db }).then(function (): void {
	app.listen(PORT, function (): void {
		// eslint-disable-next-line
		console.log("App listening on PORT " + PORT);

		// require("./database/script/seeder");	// Uncomment to seed local repo

	});
});
